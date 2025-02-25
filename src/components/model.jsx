import React, { useState } from 'react';
import './JsonEditor.css';

const EditModal = ({ data, onClose, onSave, URL }) => {
    const [formData, setFormData] = useState({ ...data });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Enviar los datos actualizados al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Enviar los datos actualizados al backend mediante una solicitud POST
            const response = await fetch(`${URL}/student/editar/${data.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el estudiante');
            }

            // Llamar a la función `onSave` para notificar al padre que los datos han sido guardados
            onSave(formData);

            // Cerrar el modal
            onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Dividir los campos en secciones
    const personalInfoFields = [
        { key: 'APELLIDOS_NOMBRES', label: 'Apellidos y Nombres' },
        { key: 'SEXO', label: 'Sexo' },
        { key: 'DNI', label: 'DNI' },
        { key: 'CELULAR', label: 'Celular' },
        { key: 'DIRECCIÓN', label: 'Dirección' },
        { key: 'RELIGIÓN', label: 'Religión' },
    ];

    const academicInfoFields = [
        { key: 'GR', label: 'Grado' },
        { key: 'SITUACIÓN_MATRICULA', label: 'Situación de Matrícula' },
        { key: 'COMPROMISO_DOCUMENTOS', label: 'Compromiso de Documentos' },
        { key: 'APAFA', label: 'APAFA' },
        { key: 'QALIWARMA', label: 'Qali Warma' },
        { key: 'TARJETA_SALUD', label: 'Tarjeta de Salud' },
        { key: 'CONADIS', label: 'CONADIS' },
    ];

    const additionalInfoFields = [
        { key: 'APODERADO', label: 'Apoderado' },
        { key: 'CELULAR_ADICIONAL', label: 'Celular Adicional' },
        { key: 'NOMBRE', label: 'Nombre del Apoderado' },
        { key: 'PARENTESCO', label: 'Parentesco' },
        { key: 'OBSERVACIÓN', label: 'Observaciones' },
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Información</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {/* Sección de Información Personal */}
                    <section className="form-section">
                        <h3>Información Personal</h3>
                        <div className="form-group-container">
                            {personalInfoFields.map(({ key, label }) => (
                                <div className="form-group" key={key}>
                                    <label>{label}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={formData[key] ?? ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sección de Información Académica */}
                    <section className="form-section">
                        <h3>Información Académica</h3>
                        <div className="form-group-container">
                            {academicInfoFields.map(({ key, label }) => (
                                <div className="form-group" key={key}>
                                    <label>{label}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={formData[key] ?? ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sección de Información Adicional */}
                    <section className="form-section">
                        <h3>Información Adicional</h3>
                        <div className="form-group-container">
                            {additionalInfoFields.map(({ key, label }) => (
                                <div className="form-group" key={key}>
                                    <label>{label}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={formData[key] ?? ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Acciones del Modal */}
                    <div className="modal-actions">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button type="button" className="close-btn" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
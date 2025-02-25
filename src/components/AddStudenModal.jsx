import React, { useState } from 'react';

const AddStudentModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        GR: '',
        DNI: '',
        APELLIDOS_NOMBRES: '',
        SEXO: '',
        APODERADO: '',
        CELULAR: '',
        SITUACIÓN_MATRICULA: '',
        COMPROMISO_DOCUMENTOS: '',
        APAFA: '',
        QALIWARMA: '',
        TARJETA_SALUD: '',
        CONADIS: '',
        DIRECCIÓN: '',
        RELIGIÓN: '',
        CELULAR_ADICIONAL: '',
        NOMBRE: '',
        PARENTESCO: '',
        OBSERVACIÓN: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onAdd(formData); // Llama a la función pasada desde el padre para agregar el estudiante
            onClose(); // Cierra el modal después de agregar
        } catch (error) {
            console.error('Error al agregar el estudiante:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Nuevo Estudiante</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Grado</label>
                        <input type="text" name="GR" value={formData.GR} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>DNI</label>
                        <input type="number" name="DNI" value={formData.DNI} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Apellidos y Nombres</label>
                        <input type="text" name="APELLIDOS_NOMBRES" value={formData.APELLIDOS_NOMBRES} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Sexo</label>
                        <select name="SEXO" value={formData.SEXO} onChange={handleChange} required>
                            <option value="">Selecciona...</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                        </select>
                    </div>
                    {/* Agrega más campos según sea necesario */}
                    <div className="modal-actions">
                        <button type="submit" className="save-btn">Guardar</button>
                        <button type="button" className="close-btn" onClick={onClose}>Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentModal;
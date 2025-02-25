import React, { useState, useEffect } from "react";
import '../css/app.css';
import EditModal from "../components/model";
import StudentTable from "./StudentTable";
import Pagination from "./Pagination";
import AddStudentModal from "./AddStudenModal";
export default function StudentData({ URL }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para el modal de agregar
    const studentsPerPage = 40;
    const [message, setMessage] = useState(null); // Estado para mostrar mensajes al usuario
    // Obtener todos los estudiantes
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/student/`);
            if (!response.ok) throw new Error("Error al obtener los datos");
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [URL]);

    const handleChange = (event) => {
        const nombre = event.target.value;
        setNombre(nombre);
        nombre.trim() ? fetchFiltro(nombre) : fetchData();
        setCurrentPage(1);
    };
    const fetchFiltro = async (nombre) => {
        try {
            const response = await fetch(`${URL}/student/BUSCAR?nombre=${nombre}`);
            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }
            const result = await response.json();
            
            if (result.data && result.data.length === 0) {
                setData([]); // No hay resultados
                setError(null);
                setMessage(result.message || "No se ha encontrado resultado"); // Usamos el mensaje del servidor si existe
            } else {
                setData(result.data || result); // Ajusta según la estructura del resultado
                setError(null);
                setMessage(null);
            }
        } catch (error) {
            setError(error.message);
            setData([]);
            setMessage(null);
        }
    };
    const handleView = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    const handleUpdate = (updatedStudent) => {
        const updatedData = data.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
        );
        setData(updatedData);
    };

    const handleDelete = (id) => alert(`Eliminar estudiante con ID: ${id}`);

    // Función para agregar un nuevo estudiante
    const handleAddStudent = async (newStudent) => {
        try {
            const response = await fetch(`${URL}/student/agregar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });
            if (!response.ok) throw new Error('Error al agregar el estudiante');
            const result = await response.json();
            setData([...data, result]); // Agrega el nuevo estudiante al estado local
        } catch (error) {
            console.error('Error al agregar el estudiante:', error);
        }
    };
    const handleDownload = (URL) => {
        // Abre la pestaña de descarga
        const downloadWindow = window.open(URL + '/student/generar-excel', '_blank');
    
        // Intenta cerrar la pestaña después de un tiempo
        setTimeout(() => {
          if (downloadWindow) {
            downloadWindow.close();
          }
        }, 3000); // Cierra la pestaña después de 5 segundos (ajusta el tiempo según sea necesario)
      };

  
    
    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = data.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(data.length / studentsPerPage);

    return (
        <div className="container">
            <h1>Datos del Estudiante</h1>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={handleChange}
                    placeholder="Escribe el nombre..."
                    className="input"
                />
                <button className="button button-primary" onClick={() => setIsAddModalOpen(true)}>Agregar</button>
                <button className="button button-primary" onClick={() => handleDownload(URL)}>Exportar EXCEL</button>
            </div>

            <StudentTable
                students={currentStudents}
                onView={handleView}
                onDelete={handleDelete}
                message={message}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {isModalOpen && selectedStudent && (
                <EditModal
                    data={selectedStudent}
                    onClose={handleCloseModal}
                    onSave={handleUpdate}
                    URL={URL}
                />
            )}

            {isAddModalOpen && (
                <AddStudentModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddStudent}
                />
            )}
        </div>
    );
}
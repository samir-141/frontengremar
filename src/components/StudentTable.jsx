import React from "react";

const StudentTable = ({ students, onView, onDelete, message }) => {
    function Show(){
        if(message){
            return(
                <div className="bg-red-500 text-white p-2 text-center">{message}</div>
            )
        }
        else{
            return (<tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="border">
                            <td className="border p-2 text-center">{student.GR}</td>
                            <td className="border p-2 text-center">{student.DNI}</td>
                            <td className="border p-2 text-center">{student.APELLIDOS_NOMBRES}</td>
                            <td className="border p-2 text-center">{student.SITUACIÓN_MATRICULA}</td>
                            <td className="border p-2 text-center">
                                <div className="flex justify-center gap-2">
                                    <button className="button button-primary" onClick={() => onView(student)}>Ver</button>
                                    <button className="button button-danger" onClick={() => onDelete(student.id)}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>)
        }
    }
    return (
        <div className="container">
            <h2 className="text-xl font-bold mb-4">Lista de Estudiantes</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Grado</th>
                        <th className="border p-2">DNI</th>
                        <th className="border p-2">Nombre Completo</th>
                        <th className="border p-2">Situación Matrícula</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <Show/>
            </table>
        </div>
    );
};

export default StudentTable;
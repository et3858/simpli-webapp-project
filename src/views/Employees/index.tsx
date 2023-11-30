import { useState, useEffect } from "react";
import "./Employees.css";

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Obtener la lista de empleados desde el servidor
        const fetchEmployees = async () => {
            // const response = await fetch("https://api.example.com/employees");
            // const data = await response.json();
            // setEmployees(data);




            const data = [
                {
                    "id": 1,
                    "name": "Juan Pérez",
                    "rut": "12345678-9",
                    "email": "juan.perez@example.com",
                    "company": {
                        "id": 1,
                        "name": "Empresa 1"
                    }
                },
                {
                    "id": 2,
                    "name": "María González",
                    "rut": "98765432-1",
                    "email": "maria.gonzalez@example.com",
                    "company": {
                        "id": 2,
                        "name": "Empresa 2"
                    }
                }
            ];

            setEmployees(data);
        };
        fetchEmployees();
    }, []);

    return (
        <div className="employees">
            <h1>Empleados</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        <h2>{employee.name}</h2>
                        <p>{employee.rut}</p>
                        <p>{employee.email}</p>
                        <p>{employee.company.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Employees;

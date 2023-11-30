import { useState, useEffect } from "react";
import AddEmployee from "../../components/AddEmployee";
import Header from "../../components/Header";
import { IEmployee } from "../../interfaces";
import "./Employees.css";

const Employees = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [showModal, setShowModal] = useState(false);


    const handleClose = (e: IEmployee | null) => {
        setShowModal(false);

        if (!!e) {
            setEmployees(prev => [...prev, e]);
        }
    };
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        // Obtener la lista de empleados desde el servidor
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:3000/employees");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                const data = [
                    {
                        "id": 1,
                        "first_name": "Juan",
                        "last_name": "Pérez",
                        "dni": "12345678-9",
                        "email": "juan.perez@example.com",
                        "company_id": 1,
                        // "company": {
                        //     "id": 1,
                        //     "name": "Empresa 1"
                        // }
                    },
                    {
                        "id": 2,
                        "first_name": "María",
                        "last_name": "González",
                        "dni": "98765432-1",
                        "email": "maria.gonzalez@example.com",
                        "company_id": 2,
                        // "company": {
                        //     "id": 2,
                        //     "name": "Empresa 2"
                        // }
                    }
                ];

                setEmployees(data);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <>
            <Header />

            <div className="employees">
                <h1>Empleados</h1>


                <div className="container-md">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleShow}
                    >
                        Agregar
                    </button>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Rut</th>
                                <th>Email</th>
                                <th>Empresa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td><strong>{employee.first_name} {employee.last_name}</strong></td>
                                <td>{employee.dni}</td>
                                <td>{employee.email}</td>
                                <td>{employee.company_id}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddEmployee
                show={showModal}
                onClose={handleClose}
            />
        </>
    );
};

export default Employees;

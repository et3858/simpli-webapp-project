import { useState, useEffect } from "react";
import "./Companies.css";

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Obtener la lista de empresas desde el servidor
        const fetchCompanies = async () => {
            // const response = await fetch("https://api.example.com/companies");
            // const data = await response.json();
            // setCompanies(data);



            const data = [
                {
                    "id": 1,
                    "name": "Empresa 1",
                    "address": "Calle 1, 123",
                    "dni": "12345678-9",
                    "phone_number": "123456789"
                },
                {
                    "id": 2,
                    "name": "Empresa 2",
                    "address": "Calle 2, 456",
                    "dni": "98765432-1",
                    "phone_number": "987654321"
                }
            ];


            setCompanies(data);
        };
        fetchCompanies();
    }, []);

    return (
        <div className="companies">
            <h1>Empresas</h1>




            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rut</th>
                        <th>Dirección</th>
                        <th>Número de teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.id}>
                            <td>
                                <strong>{company.name}</strong>
                            </td>
                            <td>{company.address}</td>
                            <td>{company.dni}</td>
                            <td>{company.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul>
                {companies.map((company) => (
                    <li key={company.id}>
                        <h2>{company.name}</h2>
                        <p>{company.address}</p>
                        <p>{company.dni}</p>
                        <p>{company.phone_number}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Companies;

import { useState, useEffect } from "react";
import AddCompany from '../../components/AddCompany';
import Header from "../../components/Header";
import { ICompany } from "../../interfaces/index";
import { getRequest } from "../../services/fetching";
import "./Companies.css";



const Companies = () => {
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [showModal, setShowModal] = useState(false);

    const handleClose = (e: ICompany | null) => {
        setShowModal(false);

        if (!!e) {
            setCompanies(prev => [...prev, e]);
        }
    };
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        // Obtener la lista de empresas desde el servidor
        const fetchCompanies = async () => {
            try {
                const response = await getRequest("/companies");
                setCompanies(response);
            } catch (error) {
                console.log(error)
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
            }
        };

        fetchCompanies();
    }, []);

    return (
        <>
            <Header />

            <div className="companies">
                <h1>Empresas</h1>

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
                                <th>Dirección</th>
                                <th>Número de teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company) => (
                            <tr key={company.id}>
                                <td><strong>{company.name}</strong></td>
                                <td>{company.dni}</td>
                                <td>{company.address}</td>
                                <td>{company.phone_number}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddCompany
                show={showModal}
                onClose={handleClose}
            />
        </>
    );
};

export default Companies;

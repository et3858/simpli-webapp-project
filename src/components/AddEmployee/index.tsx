import { useEffect, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FormGroup from '../FormGroup';
import { getRequest, postRequest } from '../../services/fetching';
import { EmployeeDto } from '../../types';
import { ICompany, IEmployee } from '../../interfaces';



interface IProps {
    show: boolean
    onClose: Function,
};


function AddEmployee({ show, onClose }: IProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [companyId, setCompanyId] = useState(0);
    const [companyList, setCompanyList] = useState<ICompany[]>([]);


    const disabledButton = useMemo(() => {
        return !(firstName && lastName && dni && email && companyId);
    }, [firstName, lastName, dni, email, companyId]);


    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getRequest("/companies");
                setCompanyList(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCompanies();
    }, []);


    const resetFields = () => {
        setFirstName('');
        setLastName('');
        setDni('');
        setEmail('');
    };


    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompanyId(parseInt(e.target.value));
    };


    const handleClose = () => {
        resetFields();
        onClose();
    };


    const handleSave = async () => {
        const employeeDto: EmployeeDto = {
            first_name: firstName,
            last_name: lastName,
            dni,
            email,
            company_id: companyId,
        };

        try {
            const response = await postRequest("/employees", employeeDto) as IEmployee;
            resetFields();
            onClose(response);
        } catch (error) {
            console.log("LOL");
        }
    };


    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar empleado</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup
                        id={"txtFirstName"}
                        label={"Nombre"}
                        placeholder={"Ingresar nombre"}
                        value={firstName}
                        onChange={((v: string) => setFirstName(v))}
                    />

                    <FormGroup
                        id={"txtLastName"}
                        label={"Apellido"}
                        placeholder={"Ingresar apellido"}
                        value={lastName}
                        onChange={((v: string) => setLastName(v))}
                    />

                    <FormGroup
                        id={"txtDni"}
                        label={"Rut"}
                        placeholder={"Ingresar rut"}
                        value={dni}
                        onChange={((v: string) => setDni(v))}
                    />

                    <FormGroup
                        id={"txtEmail"}
                        label={"Email"}
                        placeholder={"Ingresar email"}
                        value={email}
                        onChange={((v: string) => setEmail(v))}
                    />

                    <Form.Group className="mb-3" controlId={"cbCompany"}>
                        <Form.Label>Empresa</Form.Label>
                        <Form.Select onChange={handleSelect}>
                            <option value="0">(seleccionar empresa)</option>
                            {companyList.map(company => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={disabledButton}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default AddEmployee;

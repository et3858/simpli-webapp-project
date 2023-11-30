import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormGroup from '../FormGroup';
import { EmployeeDto } from '../../types';
import { IEmployee } from '../../interfaces';


interface IProps {
    show: boolean
    onClose: Function,
};


function AddEmployee({ show, onClose }: IProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');

    const disabledButton = useMemo(() => {
        return !(firstName && lastName && dni && email);
    }, [firstName, lastName, dni, email]);


    const resetFields = () => {
        setFirstName('');
        setLastName('');
        setDni('');
        setEmail('');
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
            company_id: 1,
        };

        try {
            const response = await fetch("http://localhost:3000/employees", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(employeeDto),
            });
            const data: IEmployee = await response.json();

            resetFields();
            onClose(data);
        } catch (error) {
            console.log("LOL")
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

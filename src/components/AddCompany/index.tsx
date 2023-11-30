import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormGroup from '../FormGroup';
import { CompanyDto } from '../../types';
import { ICompany } from '../../interfaces';


interface IAddCompany {
    show: boolean
    onClose: Function,
};



function AddCompany({ show, onClose }: IAddCompany) {
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const disabledButton = useMemo(() => {
        return !(name && dni && address && phoneNumber);
    }, [name, dni, address, phoneNumber]);


    const resetFields = () => {
        setName('');
        setDni('');
        setAddress('');
        setPhoneNumber('');
    };


    const handleClose = () => {
        resetFields();
        onClose();
    };


    const handleSave = async () => {
        const companyDto: CompanyDto = {
            name,
            dni,
            address,
            phone_number: phoneNumber
        };

        try {
            const response = await fetch("http://localhost:3000/companies", {
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
                body: JSON.stringify(companyDto),
            });
            const data: ICompany = await response.json();

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
                    <Modal.Title>Agregar empresa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup
                        id={"txtName"}
                        label={"Nombre"}
                        placeholder={"Ingresar nombre"}
                        value={name}
                        onChange={((v: string) => setName(v))}
                    />

                    <FormGroup
                        id={"txtDni"}
                        label={"Rut"}
                        placeholder={"Ingresar rut"}
                        value={dni}
                        onChange={((v: string) => setDni(v))}
                    />

                    <FormGroup
                        id={"txtAddress"}
                        label={"Dirección"}
                        placeholder={"Ingresar dirección"}
                        value={address}
                        onChange={((v: string) => setAddress(v))}
                    />

                    <FormGroup
                        id={"txtPhoneNumber"}
                        label={"Número de teléfono"}
                        placeholder={"Ingresar número"}
                        value={phoneNumber}
                        onChange={((v: string) => setPhoneNumber(v))}
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


export default AddCompany;

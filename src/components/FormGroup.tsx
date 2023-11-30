import * as React from 'react';
import Form from 'react-bootstrap/Form';


interface IProps {
    id: string,
    value: string,
    label: string,
    placeholder: string,
    onChange: Function,
    type?: "text",
}


function FormGroup({
    id,
    type = "text",
    value,
    label,
    placeholder ="",
    onChange,
}: IProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value as string);
    };

    return (
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                onChange={handleChange}
            />
        </Form.Group>
    );
}


export default FormGroup;
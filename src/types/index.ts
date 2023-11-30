export type CompanyDto = {
    name: string,
    dni: string,
    address: string,
    phone_number: string,
};


export type EmployeeDto = {
    company_id: number,
    first_name: string,
    last_name: string,
    dni: string,
    email: string,
};

export interface ICompany {
    id: number,
    name: string,
    dni: string,
    address: string,
    phone_number: string,
}


export interface IEmployee {
    id: number,
    company_id: number,
    first_name: string,
    last_name: string,
    dni: string,
    email: string,
}

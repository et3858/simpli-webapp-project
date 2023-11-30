import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <div className="header">
            <ul className="menu">
                <li><Link to={"/companies"}>Mis empresas</Link></li>
                <li><Link to={"/employees"}>Empleados</Link></li>
            </ul>
        </div>
    );
}

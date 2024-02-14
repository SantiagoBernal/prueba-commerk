import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, handleLogout }) => {

    return (
        <div className="navbar">
            {/* <Link to="/">Inicio</Link> */}
            {/* <Link to="/task">Tareas</Link> */}
          
            {!loggedIn && <Link to="/login">Iniciar sesión</Link>}
            {!loggedIn && <Link to="/register">Registrarse</Link>}
            {loggedIn && <Link to="/profile">Perfíl</Link>}
            {loggedIn && <Link to="/task">Tareas</Link>}
            {loggedIn && <Link to="/logout" onClick={handleLogout}>Cerrar sesión</Link>}
        </div>
    )
}
export default Navbar;
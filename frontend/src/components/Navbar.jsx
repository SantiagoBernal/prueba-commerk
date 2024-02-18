import React from "react";
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, handleLogout }) => {


    const [logged, setLogged] = useState(false);

    const authenticate = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log(token)
          if (token) {
            setLogged(true)
          } else {
            setLogged(false)
          }
          console.log("logged",logged)
    
        } catch (err) {
          console.log(err)
          setLogged(false)
        }
      }
    
    
      useEffect(() => {
        authenticate();
      }, []);
    
    return (
        <div className="navbar">
            {/* <Link to="/">Inicio</Link> */}
            {/* <Link to="/task">Tareas</Link> */}
          
            {!logged && <Link to="/login">Iniciar sesión</Link>}
            {!logged && <Link to="/register">Registrarse</Link>}
            {logged && <Link to="/profile">Perfíl</Link>}
            {logged && <Link to="/task">Tareas</Link>}
            {logged && <Link to="/logout" onClick={handleLogout}>Cerrar sesión</Link>}
        </div>
    )
}
export default Navbar;
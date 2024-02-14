import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        last_name: '',
        position_company: '',
        phone_number: ''
    })
    console.log("formData",formData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://prueba-commerk-production.up.railway.app/register', formData);
            console.log("Registration Successful")
            navigate('/login')
        } catch (error) {
            console.log("Registration Failed: " + error)
        }
    }


    return (
        <div className="registration-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>

                <input type="text" name="username"
                    value={formData.username} onChange={handleChange}
                    required placeholder="Nombre" /> <br />

                <input type="text" name="last_name"
                    value={formData.last_name} onChange={handleChange}
                    required placeholder="Apellido" /> <br />

                <input type="text" name="phone_number"
                    value={formData.phone_number} onChange={handleChange}
                    required placeholder="Teléfono" /> <br />

                <input type="text" name="position_company"
                    value={formData.position_company} onChange={handleChange}
                    required placeholder="Cargo" /> <br />

                <input type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    required placeholder="Correo" /> <br />

                <input type="password" name="password"
                    value={formData.password} onChange={handleChange}
                    required placeholder="Contraseña" /> <br />

                <button type="submit">Registrarse</button>
            </form>
            <p>Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link></p>
        </div>
    )
}
export default Register;
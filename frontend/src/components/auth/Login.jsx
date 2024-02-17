import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

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
            // const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, formData);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL} /login`, formData);
            const { token } = response.data;
            console.log("Login Token is: " + token)
            localStorage.setItem('token', token);
            setError('')
            navigate('/profile')

        } catch (error) {
            console.log("Login Failed: " + error)
            setError(error.response.data.message)
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email"
                    value={formData.username} onChange={handleChange}
                    required placeholder="email" /> <br />

                <input type="password" name="password"
                    value={formData.password} onChange={handleChange}
                    required placeholder="Password" /> <br />
                <button type="submit">Iniciar</button>
            </form>
            <p>No tienes cuenta? <Link to='/register'>Regístrate</Link></p>
        </div>
    )
}
export default Login;
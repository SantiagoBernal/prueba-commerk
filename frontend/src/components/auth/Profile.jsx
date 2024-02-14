import React, { useState, useEffect } from "react";
import axios from "axios";
import "./card.css"
import FormDialog from "./dialog/dialog";

const Profile = () => {

    const [userData, setUserData] = useState(null)
    const [open, setOpen] = useState(false);

    useEffect(() => {

        const fetchUserDate = async () => {
            try {
                const response = await axios.get('http://prueba-commerk-production.up.railway.app/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUserData(response.data.usuario);
            } catch (err) {
                console.log('Error Fetching user profile data: ' + err)
            }
        }

        fetchUserDate();
    }, [])
    //console.log("userData", userData)

    const cardOpen = () => {
        setOpen(true)
    }

 
    return (
        <div className="profile-container">
            {
                userData ? (
                    <div>

                        <div className="information">
                            <h2>Usuario</h2>
                            <h2>Nombre: {userData.username.toUpperCase()}</h2>
                            <h2>Apellido: {userData.last_name.toUpperCase()}</h2>
                            <h2>Teléfono: {userData.phone_number}</h2>
                            <h2>Cargo: {userData.position_company.toUpperCase()}</h2>
                            <h2>Correo: {userData.email}</h2>
                        </div>

                        <FormDialog open={open} setOpen={setOpen}
                            id={userData.id}
                            username={userData.username}
                            last_name={userData.last_name}
                            phone_number={userData.phone_number}
                            position_company={userData.position_company}
                        />

                        <div className="information">
                            <button className="edit" onClick={cardOpen}>Editar Usuario</button>
                            {/* <button className="delete" onClick={handleDeleteGame}>Delete</button> */}
                        </div>

                    </div>

                ) : (
                    <p>Loading user data</p>
                )
            }

        </div>
    )
}
export default Profile;
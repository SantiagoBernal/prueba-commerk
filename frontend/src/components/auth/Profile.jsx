import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./card.css"
import FormDialog from "./dialog/dialog";

const Profile = () => {

    const [userData, setUserData] = useState(null)
    const [open, setOpen] = useState(false);



    const getTareas = () => {
       const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, { headers })
            .then(response => response.json())
            .then(data => setUserData(data.usuario));
          
    }

    //console.log("userData", userData)

    useEffect(() => {
        getTareas();
     },[])



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
                        </div>

                    </div>

                ) : (
                    <p>...</p>
                )
            }

        </div>
    )
}
export default Profile;
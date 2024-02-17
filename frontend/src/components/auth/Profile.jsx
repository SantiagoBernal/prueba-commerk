import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./card.css"
import FormDialog from "./dialog/dialog";

const Profile = () => {

    const [userData, setUserData] = useState(null)
    const [open, setOpen] = useState(false);
    // const [loading, setLoading] = useState(true);


    // const getTareas = () => {
    //    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
    //     fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, { headers })
    //         .then(response => response.json())
    //         .then(data => setUserData(data.usuario));
          
    // }

    // console.log("userData", userData)

    // useEffect(() => {
    //     getTareas();
    //  },[])

  

    // useEffect(() => {
    //     const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
    //     fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, { headers })
    //         .then(response => response.json())
    //         .then(data => setUserData(data.usuario));
        
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // console.log("userData", userData)

    useEffect(() => {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile`,{ headers })
            .then((response) => {
                //console.log("response", response)
                setUserData(response.data.usuario)
            })
    }, [])
    console.log("userData", userData)



    const cardOpen = () => {
        setOpen(true)
    }

    // const [url, setUrl] = useState("");
  
    // useEffect(() => {
    //   setLoading(true);
    //   async function fetchData() {
    //     const request = await fetch(
    //       `https://dog.ceo/api/breed/${props.raza}/images/random`
    //     );
    //     const response = await request.json();
    //     setLoading(false);
    
    //     setUrl(response.message);
      
    //   }
    //   fetchData();
      
    // }, [props.raza]);

 
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
                    <p>...</p>
                )
            }

        </div>
    )
}
export default Profile;
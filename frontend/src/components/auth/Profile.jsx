import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./card.css"
import FormDialog from "./dialog/dialog";
import FormDialogAddresses from "./dialogAddresses/dialogAddresses";
import Card from "../cardAddress";


const Profile = () => {

    const [userData, setUserData] = useState(null)
    const [open, setOpen] = useState(false);
    const [openAddresses, setOpenAddresses] = useState(false);
    const [address, setaddress] = useState();
    const [addressUser, setaddressUser] = useState();

    // const [loading, setLoading] = useState(true);

    const getAddress = () => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/address`)
            .then((response) => {
                setaddress(response.data)
            })
    }
    //console.log("address", address)

    useEffect(() => {
        getAddress();
    }, [])


    const getProfile = () => {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, { headers })
            .then(response => response.json())
            .then(data => setUserData(data.usuario));

    }

    //console.log("userData", userData)

    useEffect(() => {
        getProfile();
        //console.log("getProfile", getProfile)
    }, [])

    useEffect(() => {
        if (address && userData) {
            let tasksDone = []
            for (let i = 0; i < address.length; i++) {
                if (address[i].user_email === userData.email) {
                    tasksDone.push(address[i])
                }
            }
            setaddressUser(tasksDone)
        }
    }, [address, userData])
    //console.log("addressUser", addressUser)

    const cardOpenAddresses = () => {
        setOpenAddresses(true)
    }
    const cardOpen = () => {
        setOpen(true)
    }


    return (
        <div>
            {
                userData ? (
                    <div>

                        <div className="information">
                            <h2>PERFÍL</h2>
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

                        <FormDialogAddresses openAddresses={openAddresses} setOpenAddresses={setOpenAddresses}
                            id={userData.id}
                            username={userData.username}
                            last_name={userData.last_name}
                            phone_number={userData.phone_number}
                            position_company={userData.position_company}
                        />

                        <div className="buttons">
                            <button className="EditInformation" onClick={cardOpen}>Editar Usuario</button>
                            <button className="EditDirecctions" onClick={cardOpenAddresses}>Agregar Direcciones</button>
                            {/* <button className="delete" onClick={handleDeleteGame}>Delete</button> */}
                        </div>

                        <h3 className="title">
                            <b className="titleLeft">{address && address.length > 0 ? 'DIRECCIONES AGREGADAS' : 'NO TIENE DIRECCIONES AÚN'}</b>
                        </h3>
                        <div className="cards">
                            {typeof addressUser !== 'undefined' &&
                                addressUser.map((Addresses) => {
                                    return <Card
                                        key={Addresses.id}
                                        id={Addresses.id}
                                        description={Addresses.description}
                                        username={Addresses.username}
                                        location={Addresses.location}
                                        postal_code={Addresses.postal_code}
                                        user_email={Addresses.user_email}
                                        name_address={Addresses.name_address}
                                    >
                                    </Card>;
                                })}
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
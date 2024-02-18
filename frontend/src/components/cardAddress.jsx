import React, { useState } from "react";
import "./card.css"
// import FormDialog from "./dialogTask/dialogTask";
import axios from "axios";
import FormDialogEditAddresses from "./auth/dialogAddresses/dialogEditAddresses";



const Card = (props) => {
    //console.log("props Card", props)
    const [openEditAddresses, setOpenEditAddresses] = useState(false);

    const cardOpen = () => {
        setOpenEditAddresses(true)
    }


    const handleDeleteAddress = () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteAddress/${props.id}`);
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }

    return (
        <>
            <FormDialogEditAddresses openEditAddresses={openEditAddresses} setOpenEditAddresses={setOpenEditAddresses}
                id={props.id}
                user_email={props.user_email}
                location={props.location}
                postal_code={props.postal_code}
                description={props.description}
                name_address={props.name_address}
            />
            <div className="game-card">
                <div className="info">
                    <p><b>Nombre de la dirección:</b> {props.name_address}</p>
                    <p><b>Descripción:</b> {props.description}</p>
                    <p><b>Ubicación:</b> {props.location} <a href={props.location} target="_blank" rel="noreferrer">Ver ubicación</a></p>
                    <p><b>Código postal:</b> {props.postal_code}</p>
                </div>
                <div>
                    <button className="editAddress" onClick={cardOpen}>Editar dirección</button>
                    <button className="deleteAddress" onClick={handleDeleteAddress}>Eliminar dirección</button>
                </div>
            </div>
        </>
    );
};

export default Card;

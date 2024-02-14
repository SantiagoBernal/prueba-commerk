import React from "react";
import "./card.css"
import FormDialog from "./dialogTask/dialogTask";
import axios from "axios";


const Card = (props) => {
    //console.log("props",props)
    const [open, setOpen] = React.useState(false);

    const cardOpen = () => {
        setOpen(true)
    }
  

    const handleDeleteGame = () => {
        axios.delete(`http://prueba-commerk-production.up.railway.app/delete/${props.id}`);
    }

    return (
        <>
        <FormDialog open={open} setOpen={setOpen} id={props.id}  name_task={props.name_task} amount={props.amount}  />
        <div className="game-card">
            <div className="info">
                {/* <h4>{props.username}</h4> */}
                <p><b>Autor de tarea:</b> {props.username}</p>
                <p><b>Nombre de tarea:</b> {props.name_task}</p>
                <p><b>Valor de tarea:</b> ${(props.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }</p>
                <p><b>Registro de tarea:</b> {props.date}</p>
            </div>
            <div className="actions">
                <button className="edit" onClick={cardOpen}>Editar tarea</button>
                <button className="delete" onClick={handleDeleteGame}>Eliminar tarea</button>
            </div>
        </div>
        </>
    );
};

export default Card;

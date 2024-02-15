import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import SearchLocationInput from "./componentsMaps/GooglePlcasesApi";
// import MapComponent from "./componentsMaps/Map";

// import { useState } from "react";
import "./dialog.css"
import axios from "axios";


export default function FormDialog(props) {

   
    const [editValues, setEditValues] = useState({
        id: props.id,
        username: props.username,
        last_name: props.last_name,
        phone_number: props.phone_number,
        position_company: props.position_company,
    });

    //console.log("props",props)
   
    const handleEditValues = () => {
        console.log(props.baseUrl)
        axios.put(`${process.env.REACT_APP_BACKEND_URL} /edit`, {
            id: editValues.id,
            username: editValues.username,
            last_name: editValues.last_name,
            phone_number: editValues.phone_number,
            position_company: editValues.position_company,
        });
        handleClose();

    }

    // const handleDeleteGame = () => {
    //     axios.delete(`http://localhost:3001/delete/${editValues.id}`)
    // }

    const handleChangeValues = (value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        })
        )
    }

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>

            <div>
                <Dialog open={props.open} onClose={handleClose}>
                    <DialogTitle>Editar usuario</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Nombre"
                            defaultValue={props.username}
                            type="text"
                            onChange={handleChangeValues}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="last_name"
                            label="Apellido"
                            defaultValue={props.last_name}
                            type="text"
                            onChange={handleChangeValues}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="phone_number"
                            label="Teléfono"
                            defaultValue={props.phone_number}
                            type="text"
                            onChange={handleChangeValues}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="position_company"
                            label="Cargo"
                            defaultValue={props.position_company}
                            type="text"
                            onChange={handleChangeValues}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleEditValues}>Guardar cambios</Button>
                    </DialogActions>
                </Dialog>

            </div>

        </div>
    );
}

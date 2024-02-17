import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        name_task: props.name_task,
        amount: props.amount,
    });

   //console.log("props",props)

    const handleEditValues = () => {
        console.log(props.baseUrl)
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/editTask`, {
            id: editValues.id,
            name_task: editValues.name_task,
            amount: editValues.amount,
        });
        handleClose();
        setTimeout(() => {
            window.location.reload()
        }, 500);

    }

    // const handleDeleteGame = () => {
    //     axios.delete(`http://localhost:5500/delete/${editValues.id}`)
    // }

    const handleChangeValues = (value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        })
        )
    }

    // const handleClickOpen = () => {
    //     props.setOpen(true);
    // };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>

            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Editar tarea</DialogTitle>
                <DialogContent>
                  
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name_task"
                        label="Nombre tarea"
                        defaultValue={props.name_task}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Valor tarea"
                        defaultValue={props.amount}
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
    );
}

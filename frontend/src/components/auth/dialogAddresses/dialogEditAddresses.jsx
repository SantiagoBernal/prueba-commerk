import React, { useState } from "react";
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    TextField,
} from '@mui/material';

import "./dialog.css"
import axios from "axios";



export default function FormDialogEditAddresses(props) {

    // const [Address, setAddress] = useState(null);
    // const [userData, setUserData] = useState(null)


    const [editValues, setEditValues] = useState({
        id: props.id,
        name_address: props.name_address,
    });

    //console.log("editValues", editValues)
   // console.log("props FormDialogEditAddresses", props)

    const handleChangeValues = (value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        })
        )
    }


    const handlePostValues = () => {
        console.log(props.baseUrl)
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/editAddress`, {
            id: editValues.id,
            name_address: editValues.name_address,
        });
        handleClose();
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }
   
    const handleClose = () => {
        props.setOpenEditAddresses(false);
    };



    return (
        <div>

            <div>

                <Dialog open={props.openEditAddresses} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
                    <DialogTitle>Editar dirección</DialogTitle>
                    <DialogContent >

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name_address"
                            label="Nombre de la dirección"
                            defaultValue={props.name_address}
                            type="text"
                            onChange={handleChangeValues}
                            fullWidth
                            variant="standard"
                        />
                        <br /><br />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handlePostValues}>Guardar dirección</Button>
                    </DialogActions>
                </Dialog>

            </div>

        </div>
    );
}

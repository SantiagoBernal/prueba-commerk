import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Grid,
    TextField,
} from '@mui/material';
import GoogleMapsAutoComplete from './GoogleMapsAutoComplete';

import "./dialog.css"
import axios from "axios";



export default function FormDialogAddresses(props) {

    const [Address, setAddress] = useState(null);
    const [userData, setUserData] = useState(null)


    const [editValues, setEditValues] = useState({
        id: props.id,
        name_address: props.name_address,
    });

    //console.log("editValues", editValues)
    //console.log("props FormDialogAddresses", props)


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

    //console.log("Address ", Address)

    const handleChangeValues = (value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        })
        )
    }


    const handlePostValues = () => {
        console.log(props.baseUrl)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/address`, {
            username: userData.username,
            coords: `Latitud${Address.coords.lat}- longitud${Address.coords.lng}`,
            location: `http://maps.google.com/maps?q=${Address.coords.lat},${Address.coords.lng}`,
            description: Address.description,
            postal_code: "760033",
            user_email: userData.email,
            name_address: editValues.name_address,
        });
        handleClose();
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }


    const handleClose = () => {
        props.setOpenAddresses(false);
    };



    return (
        <div>

            <div>

                <Dialog open={props.openAddresses} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
                    <DialogTitle>Agregar dirección</DialogTitle>
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
                        <br /><br /><br />
                        <Grid container  >
                            <Grid item xs={12} >
                                <GoogleMapsAutoComplete
                                    fullWidth
                                    variant={"outlined"}
                                    placeholder={'Escriba su dirección'}
                                    value={Address}
                                    onChange={
                                        (value) => {
                                            setAddress(value);
                                        }
                                    }
                                />
                            </Grid>
                        </Grid>

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

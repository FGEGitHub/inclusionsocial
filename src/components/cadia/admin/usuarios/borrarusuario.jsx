import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import servicioAdministracion from '../../../../services/administracion'

import { Paper } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';


export default function Clasenueva(props) {
   
    const [modifcontra, setModifcontra] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState({ 
      
    id:props.id,


 })



    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleChange2 = (e) => {

        setModifcontra(!modifcontra)
    }

    const handleClickOpen = () => {
        setOpen(true);
        setForm   ({ 
            nivel:props.nivel,
            usuario:props.usuario,
            nombre:props.nombre,
        id:props.id,
        password:'undefined'
    
     })
    };
    const handleDeterminar = async (event) => {
        event.preventDefault();
        try {

            await servicioAdministracion.borrarusuario(form)


        } catch (error) {
            console.error(error);
            console.log('Error algo sucedio')


        }
        props.traer()

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>

<DeleteForeverIcon onClick={handleClickOpen}/>
           
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Borrar usuario? </DialogTitle>
                <Paper
                    sx={{
                        cursor: 'pointer',
                        background: '#fafafa',
                        color: '#bdbdbd',
                        border: '1px dashed #ccc',
                        '&:hover': { border: '1px solid #ccc' },
                    }}
                >
                    <DialogContent>
                        <DialogContentText>
                          Seguro borrar al usuario {props.usuario} ?
                         F {props.nombre }
                        </DialogContentText>
                        <form >


                            <DialogActions>
                                <Button variant="contained" color="primary" onClick={handleDeterminar}>Borrar</Button>
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                            </DialogActions>
                        </form>


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}
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
import servicioDtc from '../../../services/dtc'

import { Paper } from '@mui/material';

import Box from '@mui/material/Box';

export default function Clasenueva(props) {
    let params = useParams()
    let id = params.id

    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState()
    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleClickOpen = () => {
        setOpen(true);
        setForm({id:props.id,
            titulo:props.titulo,
            descripcion:props.descripcion,
            fecha:props.fecha
        })
    };
    const handleDeterminar = async (event) => {
        event.preventDefault();
        try {

         const respuesta=  await servicioDtc.modificarclase(form)
         alert(respuesta)


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


            <button onClick={handleClickOpen} /* style={{ width: '25%' }} */ >
       Modificar
            </button>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Borrar actividad</DialogTitle>
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
                    <TextField
defaultValue={props.fecha}
onChange={handleChange}
name="fecha"
id="date"
label="Fecha"
type="date"

sx={{ width: 220 }}
InputLabelProps={{
  shrink: true,
}}
/>
<TextField
            defaultValue={props.titulo}
              margin="dense"
              id="name"
              label="Titulo"
              name="titulo"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
              <TextField
              defaultValue={props.descripcion}
              margin="dense"
              id="name"
              label="Descripcion"
              name="descripcion"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
                      

                            <DialogActions>
                       <Button variant="contained" color="primary" onClick={handleDeterminar}>Modificar</Button>
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                            </DialogActions>
                      


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../../services/dtc'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import { Paper, CircularProgress, Typography, Card, CardActions } from '@mui/material';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';


const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
    const [open, setOpen] = React.useState(false);
    //const usuario  = useUser().userContext
    const [form, setForm] = useState({
        id: props.id,
        fecha_referencia: props.fecha_referencia,
        detalle: props.detalle,
        titulo: props.titulo,
        
    })
    const [datos, setDatos] = useState()
    const [activo, setActivo] = useState(false)







    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleClickOpen = () => {

        setOpen(true);


    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeterminar = async (event) => {

        try {
            event.preventDefault();

            const nov = await servicioDtc.modificarinterv(form)
alert(nov)
        } catch (error) {
            console.error(error);
            console.log('Error algo sucedio')


        }

        props.traer()

        setOpen(false);
    };

    const [currency, setCurrency] = React.useState('EUR');

    /*   const handleChange = (event) => {
        setCurrency(event.target.value);
      }; */


    return (




        <Box

            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            < Tooltip title="Modificar">
                <Button  variant="contained" 
        color="success" 
        sx={{ width: '150px', height: '40px', margin: '8px', fontSize: '14px', textTransform: 'none' }}
 onClick={handleClickOpen}> Modificar   </Button>

            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>


                    <h3>
                        <b> Modificar</b></h3>

                    <TextField

                        defaultValue={props.titulo}
                        margin="dense"
                        id="name"
                        label="Nombre"
                        name="titulo"
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />

<TextField
  margin="dense"
  id="detalle"
  defaultValue={props.detalle}
  label="Detalle"
  name="detalle"
  onChange={handleChange}
  multiline
  rows={4} // Cambia este valor para ajustar la altura inicial del campo
  fullWidth
  variant="standard"
/>
             
      


                    <DialogActions>


                        <>
                            <> <Button variant="contained" color="primary" onClick={handleDeterminar}> Modificar </Button></>
                        </>
                        <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
                    </DialogActions>


                </DialogContent>
            </Dialog>
        </Box >


    );
}
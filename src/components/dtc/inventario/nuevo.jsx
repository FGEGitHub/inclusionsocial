import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../services/dtc'
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
    id_inventario:props.id,
    observaciones:"Sin determinar",
    primer_contacto:"Sin determinar",
    primer_ingreso:"Sin determinar",
    admision:"Sin determinar",
    

  })
  const [datos, setDatos] = useState()
  const [activo, setActivo] = useState(false)







  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  const handleClickOpen = () => {

    setOpen(true);
    setForm({ id_inventario:props.id})
   
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {

    try {
      event.preventDefault();

      const nov = await servicioDtc.nuevaprestacioninv(form)
alert(nov)
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')


    }
    window.location.reload();


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
      < Tooltip title="Nueva Clase">
        <Button variant="contained" onClick={handleClickOpen}> Nuevo  </Button>

      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>

        
            <h3>
              <b> Nueva Prestacion </b>{props.id}</h3>
             
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="detalle"
              name="detalle"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />

<TextField
              autoFocus
              margin="dense"
              id="name"
              
              label="persona"
              name="persona"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
      <TextField

onChange={handleChange}
name="fecha_inicio"
id="date"
label="Fecha de inicio"
type="date"
defaultValue="2023-03-01"
sx={{ width: 220 }}
InputLabelProps={{
  shrink: true,
}}
/> <br/>
<TextField

onChange={handleChange}
name="fecha_fin"
id="date"
label="Fecha de fin"
type="date"
defaultValue="2023-03-01"
sx={{ width: 220 }}
InputLabelProps={{
  shrink: true,
}}
/>
            <br/>
    
          
            <DialogActions>


              <>
           <Button variant="contained" color="primary" onClick={handleDeterminar}> crear </Button>
             </>
              <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
            </DialogActions>


        </DialogContent>
      </Dialog>
    </Box >


  );
}
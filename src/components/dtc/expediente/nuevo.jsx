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
    fecha_nacimiento:"Sin determinar",
    observaciones:"Sin determinar",

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

      const nov = await servicioDtc.nuevoexpediente(form)
alert(nov)
if(nov!=="No realizado"){
  setForm({ fecha_nacimiento:"Sin determinar",

    hora_merienda:"Sin determinar",
    escuela:"Sin determinar",
    talle:"Sin determinar",
    fines:"Sin determinar",
    grado:"Sin determinar"})
    props.traer()

    setOpen(false);
}
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')


    }
   
   
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
              <b> NUEVO EXPENDIENTE</b></h3>
             
                        
                    
                   
                    <br />
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Titulo"
              name="titulo"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />

<TextField
              autoFocus
              margin="dense"
              id="name"
              
              label="inicio"
              name="inicio"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="dni"
              
              label="cierre"
              name="cierre"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <br/>
            <TextField
              autoFocus
              margin="dense"
              id="dni"
              
              label="detalle"
              name="detalle"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            



            <DialogActions>
              <Button variant="contained" color="primary" onClick={handleDeterminar}> crear </Button>
             
              <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
            </DialogActions>


        </DialogContent>
      </Dialog>
    </Box >


  );
}
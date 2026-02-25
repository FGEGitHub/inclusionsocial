import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';
import DialogActions from '@mui/material/DialogActions';
import servicioDtc from '../../../../services/dtc'
const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

const etapasPorProyecto = {
  'sector logística del Dispositivo': [
    'Acondicionamiento del Espacio',
    'Mantenimientos',
    'Gimnasio',
    'Limpieza'
  ],
  'EL DTC HACIA EL FUTURO 2024': [
    'Ninguna',
    'Refuerzo de Higiene personal para los usuarios',
    'Fin de año',
    'Dia de la primavera y del estudiante',
    'Dia de las infancias',
    'Dia del amigo',
    'CUMPLEAÑOS',
    'Colación Saludable',
    'Desayuno/Merienda'
  ]
};

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'proyecto') {
      setProyectoSeleccionado(e.target.value);
    }
  };

  const handleClickOpen = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    const usuario = JSON.parse(loggedUserJSON);
    setForm({ id_usuario: usuario.id });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {
      const nov = await servicioDtc.nuevoproducto(form);
      alert(nov);
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio');
    }
    props.traer();
    setOpen(false);
  };

  return (
    <Box
    sx={{
        '& .MuiTextField-root': { m: 1, width: '125ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Tooltip title="Nueva">
        <Button variant="outlined" onClick={handleClickOpen}  sx={{ color: "black", borderColor: "black" }}> Nuevo </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }}>
        <DialogContent>
          <h3>
            <b> Nuevo producto</b>
          </h3>
     
         
 
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="nombre"
            name="nombre"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            <Typography variant="p" component="div" color="black">
              <StyledParagraph>
                Descripcion
              </StyledParagraph>
            </Typography>
          </InputLabel>
 
        
          <TextField
            multiline
            rows={4}
            variant="outlined"
            onChange={handleChange}
            name="descripcion"
            fullWidth
          />
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleDeterminar}>crear</Button>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React, { useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@mui/material/Tooltip';
import servicioDtc from '../../../services/dtc';

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id_tallerista:props.id_tallerista,
    fecha: getCurrentDate(),
    // Establecer la fecha actual como valor predeterminado
  });

  // Función para obtener la fecha actual en formato YYYY-MM-DD
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Formatear mes y día a dos dígitos si es necesario
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value });
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
      const mergedObj = { ...form, ...{id_tallerista:props.id_tallerista} };
      await servicioDtc.nuevaclaseprof(mergedObj);
      props.traer();
      setOpen(false);
    } catch (error) {
      console.error(error);
      console.log('Error: algo sucedió');
    }
  };

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Tooltip title="Nueva Clase">
        <button onClick={handleClickOpen}>Nueva Actividad</button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h3><b>Nueva Actividad</b></h3>
       
          <TextField
            onChange={handleChange}
            name="fecha"
            id="date"
            label="Fecha"
            type="date"
            value={form.fecha} // Usar value en lugar de defaultValue para controlar el valor
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
          <DialogActions>
            {form.fecha ? (
              <Button variant="contained" color="primary" onClick={handleDeterminar}>crear</Button>
            ) : (
              <span>Completar los datos</span>
            )}
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

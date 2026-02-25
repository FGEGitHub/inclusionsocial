import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../../services/dtc'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({
    fecha_nacimiento: "Sin determinar",
    observaciones: "Sin determinar",
    primer_contacto: "Sin determinar",
    primer_ingreso: "Sin determinar",
    admision: "Sin determinar",
    dni: "Sin determinar",
    domicilio: "Sin determinar",
    telefono: "Sin determinar",
    autorizacion_imagen: "Sin determinar",
    fotoc_dni: "Sin determinar",
    fotoc_responsable: "Sin determinar",
    tel_responsable: "Sin determinar",
    visita_social: "Sin determinar",
    egreso: "Sin determinar",
    aut_retirar: "Sin determinar",
    dato_escolar: "Sin determinar",
    hora_merienda: "Sin determinar",
    escuela: "Sin determinar",
    fines: "Sin determinar",
    grado: "Sin determinar",
    fecha_espera: "Sin determinar"
  });
  const [enListaEspera, setEnListaEspera] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEnListaEspera(checked);
    } else {
      setForm({ ...form, [name]: value });
    }
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
      const nov = await servicioDtc.nuevochiquecadia(form);
      alert(nov);
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedió');
    }
    setForm({
      fecha_nacimiento: "Sin determinar",
      observaciones: "Sin determinar",
      primer_contacto: "Sin determinar",
      primer_ingreso: "Sin determinar",
      admision: "Sin determinar",
      dni: "Sin determinar",
      domicilio: "Sin determinar",
      telefono: "Sin determinar",
      autorizacion_imagen: "Sin determinar",
      fotoc_dni: "Sin determinar",
      fotoc_responsable: "Sin determinar",
      tel_responsable: "Sin determinar",
      visita_social: "Sin determinar",
      egreso: "Sin determinar",
      aut_retirar: "Sin determinar",
      dato_escolar: "Sin determinar",
      hora_merienda: "Sin determinar",
      escuela: "Sin determinar",
      fines: "Sin determinar",
      grado: "Sin determinar",
      fecha_espera: "Sin determinar"
    });
    props.traer();
    setOpen(false);
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
        <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h3><b>NUEVO</b></h3>

          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            name="nombre"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            id="apellido"
            label="Apellido"
            name="apellido"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            id="dni"
            label="DNI"
            name="dni"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            onChange={handleChange}
            name="fecha_nacimiento"
            id="date"
            label="Fecha de nacimiento"
            type="date"
            defaultValue="2023-03-01"
            sx={{ width: 220 }}
            InputLabelProps={{ shrink: true }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={enListaEspera}
                onChange={handleChange}
                name="enListaEspera"
              />
            }
            label="En lista de espera"
          />

          {enListaEspera && (
            <TextField
              onChange={handleChange}
              name="fecha_espera"
              id="fecha_espera"
              label="Fecha desde que está en lista de espera"
              type="date"
              defaultValue="2024-03-01"
              sx={{ width: 220 }}
              InputLabelProps={{ shrink: true }}
            />
          )}

          {/* Otros campos que ya tenías en el formulario */}
          <TextField
            margin="dense"
            id="direccion"
            label="Direccion"
            name="direccion"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <DialogActions>
            {form.nombre && form.apellido ? (
              <Button variant="contained" color="primary" onClick={handleDeterminar}>Crear</Button>
            ) : (
              <>Completar los datos</>
            )}
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

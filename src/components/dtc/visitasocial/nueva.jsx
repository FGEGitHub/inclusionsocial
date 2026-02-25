import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  InputLabel,
  Typography
} from '@mui/material';
import servicioDtc from '../../../services/dtc';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [archivo, setArchivo] = useState(null);

  const handleClickOpen = async () => {
    setOpen(true);
    try {
      const novedades_aux = await servicioDtc.listatodosdeldtc();
      setUsuarios(novedades_aux[0]);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleUserChange = (event, value) => {
    if (value) {
      setForm({
        ...form,
        id_usuario: value.id,
        usuariodispositivo: value.kid === undefined ? "No" : "Si", // Se agrega este campo
      });
    }
  };
  
  const handleDeterminar = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("titulo", form.titulo);
    formData.append("detalle", form.detalle);
    formData.append("fecha_carga", form.fecha_carga);
    formData.append("id_usuario", form.id_usuario);
    formData.append("id_trabajador", props.id_trabajador);
    formData.append("fecha_referencia", form.fecha_referencia);
    formData.append("usuariodispositivo", form.usuariodispositivo); // Se envía el campo
    formData.append("trabajo", form.trabajo);
  
    try {
      await servicioDtc.nuevaintervencion(formData);
      props.traer();
      setOpen(false);
    } catch (error) {
      console.error('Error al enviar la intervención:', error);
    }
  };

  return (
    <>
      <Tooltip title="Nueva">
        <Button variant="contained" color='success' onClick={handleClickOpen}>Nuevo</Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
        <DialogContent>
          <h3><b>Nueva Intervención</b></h3>

          <TextField
            autoFocus
            margin="dense"
            id="titulo"
            label="Título"
            name="titulo"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="fecha_referencia"
            label="Fecha"
            type="date"
            name="fecha_referencia"
            value={form.fecha_referencia}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

<Autocomplete
  options={usuarios}
  getOptionLabel={(option) =>
    `${option.apellido} ${option.nombre} ${option.kid == undefined ? "(paciente solamente)" : ""}`
  }
  onChange={handleUserChange}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Seleccionar Usuario"
      variant="outlined"
      margin="normal"
      fullWidth
    />
  )}
/>


          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            <Typography variant="p" component="div" color="black">
              <StyledParagraph>
                Detalle: {form.detalle ? <>Caracteres: {form.detalle.length} / 1999</> : <>Caracteres: 0 / 1999</>}
              </StyledParagraph>
            </Typography>
          </InputLabel>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            onChange={handleChange}
            name="detalle"
            fullWidth
          />
<TextField
  margin="dense"
  id="trabajo"
  label="Trabajo"
  name="trabajo"
  onChange={handleChange}
  fullWidth
  variant="standard"
/>
          <InputLabel>Adjuntar archivo o imagen</InputLabel>
          <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif" onChange={handleFileChange} />

          <DialogActions>
            {form.detalle && form.titulo && form.fecha_referencia ? (
              form.detalle.length < 1300 ? (
                <Button variant="contained" color="primary" onClick={handleDeterminar}>crear</Button>
              ) : (
                <Button variant="contained" color="primary" disabled>crear (muchos caracteres {form.detalle.length})</Button>
              )
            ) : (
              <Button variant="contained" color="primary" disabled>crear</Button>
            )}
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

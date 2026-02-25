import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControlLabel, Typography, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import React, { useState } from "react";
import servicioDtc from '../../../services/dtc';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [form, setForm] = useState({});
  const [nuevoUsuario, setNuevoUsuario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [barrio, setBarrio] = useState('');
  const [observaciones, setObservaciones] = useState('Sin observaciones');
  const [obraSocial, setObraSocial] = useState('No');
  const [obraSocialCual, setObraSocialCual] = useState('');

  const handleClickOpen = () => {
    console.log(props.chicos);
    setForm({ id: props.id });
    setSelectedValue(null);
    setNuevoUsuario(false);
    setNombre('');
    setApellido('');
    setDni('');
    setDomicilio('');
    setBarrio('');
    setObservaciones('Sin observaciones');
    setObraSocial('No');
    setObraSocialCual('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackendCall = async () => {
    let data = {};
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    const usuario = JSON.parse(loggedUserJSON);

    if (nuevoUsuario) {
      data = {
        id: form.id,
        nuevoUsuario: true,
        nombre,
        apellido,
        dni,
        domicilio,
        barrio,
        observaciones,
        obra_social: obraSocial,
        obra_social_cual: obraSocial === "Sí" ? obraSocialCual : "No",
        agendadopor: usuario.usuario,
        usuariodispositivo: "No"
      };
    } else {
      if (!selectedValue) return;

      data = {
        id_persona: selectedValue.id,
        id: form.id,
        agendadopor: usuario.usuario,
        usuariodispositivo: selectedValue.usuariodispositivo,
        observaciones
      };
    }

    console.log("Datos enviados al backend:", data);

    try {
      const response =
        usuario.nivel === 40 || usuario.nivel === 41
          ? await servicioDtc.agendarturnocadia(data)
          : await servicioDtc.agendarturno(data);
      alert(response);
      props.traer();
      handleClose();
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un error al enviar los datos");
    }
  };

  const verificarDatos = (option) => {
    const faltantes = [];
    if (!option.dni) faltantes.push("DNI");
    if (!option.domicilio) faltantes.push("Dirección");
    if (!option.barrio) faltantes.push("Barrio");

    if (faltantes.length === 0) return { texto: "Datos completos", color: "green" };
    if (faltantes.length === 1) return { texto: `Falta ${faltantes[0]}`, color: "red" };
    return { texto: `Faltan ${faltantes.join(" y ")}`, color: "red" };
  };

  const mensajeDatos = selectedValue ? verificarDatos(selectedValue) : null;

  return (
    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <Tooltip title="Nueva Clase">
        <Button
          variant="outlined"
          sx={{ color: "green", borderColor: "green", fontSize: "0.65rem" }}
          onClick={handleClickOpen}
        >
          Agendar
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h3><b>Agendar Turno</b></h3>

          <FormControlLabel
            control={
              <Checkbox
                checked={nuevoUsuario}
                onChange={(e) => {
                  setNuevoUsuario(e.target.checked);
                  setSelectedValue(null);
                }}
              />
            }
            label="Usuario Nuevo"
          />

          {nuevoUsuario ? (
            <>
              <TextField label="Nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth />
              <TextField label="Apellido" variant="outlined" value={apellido} onChange={(e) => setApellido(e.target.value)} fullWidth />
              <TextField label="DNI" variant="outlined" value={dni} onChange={(e) => setDni(e.target.value)} fullWidth />
              <TextField label="Domicilio" variant="outlined" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} fullWidth />
              <TextField label="Barrio" variant="outlined" value={barrio} onChange={(e) => setBarrio(e.target.value)} fullWidth />

              {/* ✅ Obra Social */}
              <TextField
                select
                label="¿Tiene obra social?"
                value={obraSocial}
                onChange={(e) => setObraSocial(e.target.value)}
                fullWidth
              >
                <MenuItem value="Sí">Sí</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>

              {obraSocial === "Sí" && (
                <TextField
                  label="¿Cuál?"
                  variant="outlined"
                  value={obraSocialCual}
                  onChange={(e) => setObraSocialCual(e.target.value)}
                  fullWidth
                />
              )}

              <TextField
                label="Observaciones"
                variant="outlined"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                fullWidth
              />
            </>
          ) : (
            <>
              <Autocomplete
                options={props.chicos}
                value={selectedValue}
                onChange={(event, newValue) => setSelectedValue(newValue)}
                getOptionLabel={(option) =>
                  `${option.apellido} ${option.nombre}`
                }
                isOptionEqualToValue={(option, value) => option.id === value?.id}
                renderInput={(params) => (
                  <TextField {...params} label="Selecciona una persona" variant="outlined" />
                )}
              />
              <br />
              {mensajeDatos && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    ml: 1,
                    color: mensajeDatos.color,
                    fontWeight: 500,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  {mensajeDatos.texto}
                </Typography>
              )}
              <TextField
                label="Observaciones"
                variant="outlined"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                fullWidth
              />
            </>
          )}

          <DialogActions>
            <Button variant="outlined" color="success" onClick={handleBackendCall}>Asignar turno</Button>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

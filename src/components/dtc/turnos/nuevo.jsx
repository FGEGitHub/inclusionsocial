import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Autocomplete
} from '@mui/material';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState, useEffect } from "react";
import serviciodtc from '../../../services/dtc';

export default function ExpedienteForm(props) {
  const [open, setOpen] = useState(false);
  const [listaChicos, setListaChicos] = useState([]);
  const [usarExistente, setUsarExistente] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const [form, setForm] = useState({
    expediente: "",
    juzgado: "",
    causa: "",
    solicitud: "",
    oficio: "",
    fecha: "",
    id_usuario: null,
    nombre: "",
    apellido: "",
    dni: "",
    tel: ""
  });

  useEffect(() => {
    if (usarExistente) {
      cargarListaChicos();
    }
  }, [usarExistente]);

  const cargarListaChicos = async () => {
    try {
      const lista = await serviciodtc.listachiquesmomentaneo();
      setListaChicos(lista[0]);
    } catch (error) {
      console.error("Error al cargar lista de chicos:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUsarExistente(false);
    setNuevoUsuario(false);
    setUsuarioSeleccionado(null);
    setForm({
      expediente: "",
      juzgado: "",
      causa: "",
      solicitud: "",
      oficio: "",
      fecha: "",
      id_usuario: null,
      nombre: "",
      apellido: "",
      dni: "",
      tel: ""
    });
  };

  const validarFormulario = () => {
    if (!usarExistente && !nuevoUsuario) {
      alert("Debes seleccionar un usuario existente o crear uno nuevo.");
      return false;
    }

    if (usarExistente && !usuarioSeleccionado) {
      alert("Debes seleccionar un usuario existente de la lista.");
      return false;
    }

    if (nuevoUsuario) {
      if (!form.nombre.trim() || !form.apellido.trim() || !form.dni.trim()) {
        alert("Faltan datos obligatorios del nuevo usuario (nombre, apellido o DNI).");
        return false;
      }
    }

    if (!form.expediente.trim() || !form.juzgado.trim() || !form.causa.trim()) {
      alert("Por favor completa los campos de expediente, juzgado y causa.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validarFormulario()) return;

    try {
      const datosEnviar = { ...form };

      if (usarExistente && usuarioSeleccionado) {
        datosEnviar.id_usuario = usuarioSeleccionado.id;
      }

      const respuesta = await serviciodtc.nuevooficio(datosEnviar);
      alert("Realizado correctamente.");
      props.traer();
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      alert("Error al enviar los datos. Verifica la conexión o contacta al administrador.");
    }

    handleClose();
  };

  return (
    <Box>
      <Tooltip title="Nuevo Expediente">
        <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Nuevo Expediente
          </Typography>

          {/* Checkbox - seleccionar usuario existente */}
          <FormControlLabel
            control={
              <Checkbox
                checked={usarExistente}
                onChange={(e) => {
                  setUsarExistente(e.target.checked);
                  setNuevoUsuario(false);
                }}
              />
            }
            label="Seleccionar usuario existente"
          />

          {usarExistente && (
            <Autocomplete
              options={listaChicos}
              getOptionLabel={(option) =>
                `${option.apellido}, ${option.nombre} (${option.dni})`
              }
              onChange={(e, newValue) => {
                setUsuarioSeleccionado(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Buscar usuario" margin="dense" fullWidth />
              )}
            />
          )}

          {/* Checkbox - agregar nuevo usuario */}
          <FormControlLabel
            control={
              <Checkbox
                checked={nuevoUsuario}
                onChange={(e) => {
                  setNuevoUsuario(e.target.checked);
                  setUsarExistente(false);
                }}
              />
            }
            label="Agregar nuevo usuario"
          />

          {nuevoUsuario && (
            <>
              <TextField label="Nombre" name="nombre" fullWidth margin="dense" onChange={handleChange} />
              <TextField label="Apellido" name="apellido" fullWidth margin="dense" onChange={handleChange} />
              <TextField label="DNI" name="dni" fullWidth margin="dense" onChange={handleChange} />
              <TextField label="Teléfono" name="tel" fullWidth margin="dense" onChange={handleChange} />
            </>
          )}

          {/* Campos de expediente */}
          <TextField label="Expediente" name="expediente" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Juzgado" name="juzgado" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Causa" name="causa" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Solicitud" name="solicitud" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="A través de" name="oficio" fullWidth margin="dense" onChange={handleChange} />
          <TextField
            label="Fecha"
            name="fecha"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

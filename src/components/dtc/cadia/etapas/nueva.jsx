import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import NativeSelect from "@mui/material/NativeSelect";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import styled from "styled-components";
import DialogActions from "@mui/material/DialogActions";
import servicioDtc from "../../../../services/dtc";

const StyledParagraph = styled.p`
  font-family: "Montserrat", sans-serif;
`;

// Lista de proyectos y etapas
const etapasPorProyecto = {
  "DTC ABORDAJE INTEGRAL COMUNITARIO": [],
  "sector logística del Dispositivo": [
    "Limpieza",
    "Gimnasio",
    "Mantenimiento",
    "Obras",
    "Acondicionamiento del espacio",
    "Identificación de personal",
  ],
  "EL DTC HACIA EL FUTURO 2024": [
    "Refuerzo de Higiene Personal de los Usuarios",
    "Fin de año",
    "Día del amigo",
    "Día de la primavera y estudiante",
    "Día de las infancias",
    "Festejo inicio de actividades",
    "Cumpleaños",
    "Colación saludable",
    "Desayuno/merienda",
  ],
};

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "proyecto") {
      setProyectoSeleccionado(e.target.value);
    }
  };

  const handleClickOpen = () => {
    setForm({ id_usuario: "usuario.id" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {
      const nov = await servicioDtc.nuevaetapacadia(form);
      alert(nov);
    } catch (error) {
      console.error(error);
      console.log("Error algo sucedió");
    }
    props.traer();
    setOpen(false);
  };
  const isFormValid =
  form.titulo && form.etapa && form.proyecto && form.fecha;

// Función para resaltar campos faltantes
const getFieldError = (field) => {
  return !form[field] ? "Este campo es obligatorio" : "";
};
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "60ch" }, // Incrementa el ancho
      }}
      noValidate
      autoComplete="off"
    >
      <Tooltip title="Nueva">
        <Button variant="contained" onClick={handleClickOpen}>
          Nuevo
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {/* Ajuste para ancho completo */}
        <DialogContent>
          <h3>
            <b>Nueva etapa</b>
          </h3>

          <InputLabel htmlFor="uncontrolled-native">
            <StyledParagraph>Proyecto</StyledParagraph>
          </InputLabel>
          <NativeSelect
            defaultValue=""
            onChange={handleChange}
            error={!form.proyecto}
            inputProps={{
              name: "proyecto",
              id: "uncontrolled-native",
            }}
            sx={{ width: "80%" }}
          >
            <option value="">Elegir</option>
            {Object.keys(etapasPorProyecto).map((proyecto, index) => (
              <option key={index} value={proyecto}>
                {proyecto}
              </option>
            ))}
          </NativeSelect>
          <br />
          <br />
          <br />

          <InputLabel htmlFor="uncontrolled-native">
            <StyledParagraph>Etapa</StyledParagraph>
          </InputLabel>
          <NativeSelect
            defaultValue=""
            onChange={handleChange}
            inputProps={{
              name: "etapa",
              id: "uncontrolled-native",
            }}
            sx={{ width: "80%" }}
          >
            <option value="">Elegir</option>
            {(etapasPorProyecto[proyectoSeleccionado] || []).map(
              (etapa, index) => (
                <option key={index} value={etapa}>
                  {etapa}
                </option>
              )
            )}
          </NativeSelect>
          <br />
          <br />
          <br />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Título"
            name="titulo"
            onChange={handleChange}
            fullWidth
            variant="standard"
            error={!form.titulo}
            helperText={getFieldError("titulo")}
          />
          <InputLabel htmlFor="uncontrolled-native">
            <StyledParagraph>EXPEDIENTE</StyledParagraph>
          </InputLabel>
          <NativeSelect
            defaultValue=""
            onChange={handleChange}
            inputProps={{
              name: "expediente",
              id: "uncontrolled-native",
            }}
            sx={{ width: "80%" }}
          >
            <option value="">Elegir</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </NativeSelect>

          <br />
          <br />
          <br />

          <TextField
            onChange={handleChange}
            name="fecha"
            id="date"
            label="Fecha"
            type="date"
            defaultValue={"2025-01-01"}
            error={!form.fecha}
            helperText={getFieldError("fecha")}
            sx={{ width: "80%" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />

          <InputLabel htmlFor="uncontrolled-native">
            <StyledParagraph>Detalle:</StyledParagraph>
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
          <Button 
  variant="contained" 
  color="primary" 
  onClick={handleDeterminar} 
  disabled={!isFormValid}
>
  Crear
</Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

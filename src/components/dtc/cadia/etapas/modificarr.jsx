import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Tooltip from "@material-ui/core/Tooltip";
import React, { useState } from "react";
import servicioDtc from "../../../../services/dtc";
export default function ModificarElementoDialog(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: props.id || "",
    titulo: props.titulo || "",
    fecha: props.fecha || "",
    estado: props.estado || "",
    descripcion: props.descripcion || "",
    fecha_fin: props.fecha_fin || "",
    proyectar: props.proyectar || "",
  });

  const handleClickOpen = () =>{ setOpen(true)
    setForm({id: props.id })
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
 try {
       const nov = await servicioDtc.modificaretapa(form);
       alert(nov.message);
     } catch (error) {
       console.error(error);
       console.log("Error algo sucedió");
     }
     props.traer();
     setOpen(false);
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Tooltip title="Modificar">
        <button variant="outlined" onClick={handleClickOpen}>
          Modificar
        </button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <h3>Modificar Elemento {props.titulo}</h3>
          <TextField
            label="Título"
            name="titulo"
            defaultValue={props.titulo}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Fecha de Inicio"
            name="fecha"
            type="date"
            defaultValue={props.fecha}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <InputLabel htmlFor="estado-select">Estado</InputLabel>
          <NativeSelect
            id="estado-select"
            name="estado"
            defaultValue={props.estado}
            onChange={handleChange}
            fullWidth
          >
            <option value ="">Elegir</option>
            <option value="Iniciado">Iniciado</option>
            <option value="Cerrado">Cerrado</option>
   
          </NativeSelect>
          <TextField
            label="Descripción"
            name="descripcion"
            value={props.descripcion}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Fecha de Finalización"
            name="fecha_fin"
            type="date"
            value={props.fecha_fin}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />



          Carga de pipo:
          <NativeSelect
            id="estado-select"
            name="proyectar"
            defaultValue={props.estado}
            onChange={handleChange}
            fullWidth
          >
            <option value ="">Elegir</option>
            <option value="Sin cargar">Sin cargar</option>
            <option value="Cargado inicio">Cargado inicio</option>
            <option value="Cargado fin">
            Cargado fin
            </option>
            <option value="Cerrado cargado en el proyectar">
              Cerrado cargado en el proyectar
            </option>
          </NativeSelect>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

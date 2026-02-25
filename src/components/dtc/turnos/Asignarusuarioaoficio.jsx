import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Autocomplete,
  TextField
} from "@mui/material";
import Tooltip from "@material-ui/core/Tooltip";
import serviciodtc from "../../../services/dtc";

export default function Asignar({ id_oficio, traer }) {
  const [open, setOpen] = useState(false);
  const [listaChicos, setListaChicos] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Abrir/cerrar diálogo
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUsuarioSeleccionado(null);
  };

  // Cargar lista de chicos
  useEffect(() => {
    const cargarLista = async () => {
      try {
        const lista = await serviciodtc.listachiquesmomentaneo();
        setListaChicos(lista[0]);
      } catch (error) {
        console.error("Error al cargar lista de chicos:", error);
      }
    };
    if (open) cargarLista();
  }, [open]);

  // Enviar asignación
  const handleAsignar = async () => {
    if (!usuarioSeleccionado) {
      alert("Debe seleccionar un chico.");
      return;
    }

    try {
        console.log("Asignando oficio", id_oficio, "a usuario", usuarioSeleccionado.id);
      await serviciodtc.asignarOficioAChico({
        id_oficio,
        id_usuario: usuarioSeleccionado.id
      });
      alert("Asignado correctamente.");
      handleClose();
      if (traer) traer(); // refrescar lista
    } catch (error) {
      console.error("Error al asignar oficio:", error);
      alert("Error al asignar. Verifique la conexión o contacte al administrador.");
    }
  };

  return (
    <>
      <Tooltip title="Asignar chico a este oficio">
        <Button variant="outlined" size="small" onClick={handleClickOpen}>
          Asignar
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Asignar chico al oficio
          </Typography>

          <Autocomplete
            options={listaChicos}
            getOptionLabel={(option) =>
              `${option.apellido}, ${option.nombre} (${option.dni})`
            }
            onChange={(e, newValue) => setUsuarioSeleccionado(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Seleccionar chico" margin="dense" fullWidth />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleAsignar}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

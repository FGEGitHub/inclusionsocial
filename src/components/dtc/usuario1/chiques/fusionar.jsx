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
import serviciodtc from "../../../../services/dtc";

export default function RelacionarChicos({ traer }) {
  const [open, setOpen] = useState(false);

  const [listaChicos, setListaChicos] = useState([]);
  const [destino, setDestino] = useState(null);          // uno
  const [relacionados, setRelacionados] = useState([]);  // muchos

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDestino(null);
    setRelacionados([]);
  };

  // Traer todos cuando abre el dialog
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await serviciodtc.listachiquesmomentaneo();
        setListaChicos(res[0] || []);
      } catch (e) {
        console.error(e);
      }
    };
    if (open) cargar();
  }, [open]);

  const handleGuardar = async () => {
    if (!destino) {
      alert("Seleccione un chico destino.");
      return;
    }
    if (!relacionados.length) {
      alert("Seleccione al menos un chico a relacionar.");
      return;
    }

    const idsRelacionados = relacionados.map(r => r.id);

    try {
      await serviciodtc.relacionar({
        iddestino: destino.id,
        arreglo: idsRelacionados
      });
      handleClose();
      if (traer) traer();
    } catch (e) {
      console.error(e);
      alert("Error al relacionar.");
    }
  };

  return (
    <>
      <Tooltip title="Relacionar chicos">
        <Button variant="outlined" size="small" onClick={handleOpen}>
          Relacionar
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Relacionar chicos
          </Typography>

          {/* Destino (uno) */}
          <Autocomplete
            options={listaChicos}
            value={destino}
            onChange={(e, v) => setDestino(v)}
            getOptionLabel={(o) =>
              `${o.apellido}, ${o.nombre} (${o.dni})`
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Chico destino"
                margin="dense"
                fullWidth
              />
            )}
          />

          {/* Relacionados (muchos) */}
          <Autocomplete
            multiple
            options={listaChicos.filter(c => !destino || c.id !== destino.id)}
            value={relacionados}
            onChange={(e, v) => setRelacionados(v)}
            getOptionLabel={(o) =>
              `${o.apellido}, ${o.nombre} (${o.dni})`
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Chicos a relacionar"
                margin="dense"
                fullWidth
              />
            )}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleGuardar}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

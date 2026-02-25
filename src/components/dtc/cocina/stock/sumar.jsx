import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Tooltip from "@material-ui/core/Tooltip";
import React, { useState, useEffect } from "react";
import servicioDtc from "../../../../services/dtc";

export default function ModificarElementoDialog(props) {
  const [open, setOpen] = useState(false);
  const [etapas, setEtapas] = useState();
  const [form, setForm] = useState({
    
    etapa1: "",
    etapa2: "",
  });

  useEffect(() => {
    const fetchEtapas = async () => {
      try {
        const response = await servicioDtc.traerparasumar();
        console.log(response)
        setEtapas(response);
      } catch (error) {
        console.error("Error al obtener las etapas", error);
      }
    };
    fetchEtapas();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setForm({ id: props.id });
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const nov = await servicioDtc.sumarstock(form);
      alert(nov);
    } catch (error) {
      console.error(error);
      console.log("Error algo sucedió");
    }
    props.traer();
    setOpen(false);
  };

  return (
    <Box sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }} noValidate autoComplete="off">
      <Tooltip title="Modificar">
        <Button variant="outlined" onClick={handleClickOpen} sx={{ color: "black", borderColor: "black" }} >
          Sumar stock 
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
            {etapas ? <>
        <InputLabel htmlFor="etapa1-select">Que producto quieres sumar stock</InputLabel>
          <NativeSelect id="etapa1-select" name="id_producto"  onChange={handleChange} fullWidth>
            <option value="">Elegir</option>
            {etapas[1].map((etapa, index) => (
              <option key={index} value={etapa.id}>{etapa.nombre}</option>
            ))}
          </NativeSelect>

          <InputLabel htmlFor="etapa2-select">¿cual fue el origen del producto?</InputLabel>
          <NativeSelect id="etapa2-select" name="id_exp" onChange={handleChange} fullWidth>
            <option value="">Ninguno</option>
            {etapas[0].map((etapa, index) => (
              <option key={index} value={etapa.id}>{etapa.titulo}</option>
            ))}
          </NativeSelect> 
          </>:<></>}
              <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="cantidad"
                      name="cantidad"
                      onChange={handleChange}
                      fullWidth
                      variant="standard"
                      type="number"
                    />


                       <TextField
                                onChange={handleChange}
                                name="fecha"
                                id="date"
                                label="Fecha"
                                type="date"
                                defaultValue={"07-09-2024"}
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
          
          </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Guardar</Button>
          <Button variant="outlined" color="error" onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

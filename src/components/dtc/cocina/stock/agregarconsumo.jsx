import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../../services/dtc';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';

export default function AgregarConsumoModal(props) {
  const today = new Date().toISOString().split('T')[0];
  
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id_producto: props.id || '',
    cantidad: '',
    fecha: today
  });

  const handleClickOpen = () => {
    setOpen(true);
    setForm({ id_producto: props.id_producto, cantidad: '', fecha: today });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await servicioDtc.agregarConsumo(form);
      alert('Consumo agregado correctamente');
      handleClose();
    } catch (error) {
      console.error('Error al agregar consumo:', error);
      alert('Error al agregar consumo');
    }
    props.traer()
  };

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Tooltip title="Agregar Consumo">
        <button variant="outlined" onClick={handleClickOpen}>
          Agregar Consumo
        </button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <h3>Agregar Consumo - Producto ID: {props.id}</h3>
          <TextField
            label="Cantidad Usado"
            name="cantidad"
            type="number"
            value={form.cantidad}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Fecha"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
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

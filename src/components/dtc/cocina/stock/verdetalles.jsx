import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import servicioDtc from '../../../services/dtc';

export default function ModalDetalle({ id, open, onClose }) {
  const [datos, setDatos] = useState({
    cantidad_usado: '',
    fecha: '',
  });

  useEffect(() => {
    if (id && open) {
      obtenerDatos();
    }
  }, [id, open]);

  const obtenerDatos = async () => {
    try {
      const response = await servicioDtc.getDetalle(id);
      setDatos({
        cantidad_usado: response.cantidad_usado || '',
        fecha: response.fecha || '',
      });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await servicioDtc.agregarConsumo(id, datos);
      alert('Consumo agregado correctamente');
      onClose();
    } catch (error) {
      console.error('Error al agregar consumo:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalle del Producto</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Cantidad Usado"
            name="cantidad_usado"
            value={datos.cantidad_usado}
            onChange={handleChange}
            type="number"
          />
          <TextField
            label="Fecha"
            name="fecha"
            value={datos.fecha}
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

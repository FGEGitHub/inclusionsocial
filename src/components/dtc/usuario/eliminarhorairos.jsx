import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import servicioDtc from '../../../services/dtc';

const EliminarHorarios = ({ id , traer}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
    const rts =  await servicioDtc.eliminartodosloshorariosdeusuario(id);
      alert(rts);
      traer()
      setOpen(false);
      // Aquí podrías llamar a la función para refrescar los datos
    } catch (error) {
      console.error('Error eliminando los horarios:', error);
      alert('Hubo un error eliminando los horarios');
    }
  };

  return (
    <>
      <Button variant="contained" sx={{ color: "black", borderColor: "black", fontSize: "0.65rem", }}  onClick={handleClickOpen}>
        Eliminar todos los horarios
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar todos los horarios? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EliminarHorarios;
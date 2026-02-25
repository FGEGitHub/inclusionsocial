import Box from '@mui/material/Box';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, DialogActions } from '@mui/material';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState, useEffect } from 'react';
import servicioDtc from '../../../../services/dtc';

export default function VerUsosModal({ id, nombre,traer }) {
  const [open, setOpen] = useState(false);
  const [usos, setUsos] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUso, setSelectedUso] = useState(null);
  const [consumo, setConsumo] = useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
    try {
      const data = await servicioDtc.verusosdeproducto(id);
      setUsos(data);
    } catch (error) {
      console.error('Error al obtener usos:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDeleteconsumo = (usoId) => {
    console.log(usoId)
    setSelectedUso(usoId);
    setConfirmOpen(true);
    setConsumo(true)
  };
   const handleConfirmDeleterecepcion = (usoId) => {
    setSelectedUso(usoId);
    setConfirmOpen(true);
    setConsumo(false)
  };
  
  const handleDelete = async () => {
    try {
       if (consumo){
        console.log('esconsumo',selectedUso)

        await servicioDtc.borrarusoconsumo({id:selectedUso});
        setUsos(usos.filter(uso => uso.id !== selectedUso));
       }else{
        console.log('noesconsumo')
       await servicioDtc.borrarrecepcion({id:selectedUso});
        setUsos(usos.filter(uso => uso.id !== selectedUso));
       }

       try {
        const data = await servicioDtc.verusosdeproducto(id);
        setUsos(data);
        traer()
      } catch (error) {
        console.error('Error al obtener usos:', error);
      }



    } catch (error) {
      console.error('Error al borrar uso:', error);
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <Box>
      <Tooltip title="Ver Usos">
        <button onClick={handleClickOpen}>Ver Usos</button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <h3>Usos del Producto: {nombre}, id: {id}</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tipo de uso</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Uso</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usos.map((uso, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {uso.cantidadconsumo ? (
                        <p style={{ color: 'crimson' }}>Uso</p>
                      ) : (
                        <p style={{ color: 'green' }}>Recepción</p>
                      )}
                    </TableCell>
                    <TableCell>{uso.fecha}</TableCell>
                    <TableCell>
                      {uso.cantidadconsumo ? (
                        <p style={{ color: 'crimson' }}>{uso.cantidadconsumo}</p>
                      ) : (
                        <p style={{ color: 'green' }}>{uso.cantidadrecibido}</p>
                      )}
                    </TableCell>
                    <TableCell>

                    {uso.cantidadconsumo ? (
                          <button variant="contained" color="error" onClick={() => handleConfirmDeleteconsumo(uso.id)}>
                          Borrar
                        </button>
                      ) : (
                        <button variant="contained" color="error" onClick={() => handleConfirmDeleterecepcion(uso.id)}>
                        Borrar
                      </button>
                      )}
                   
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogContent>
          <p>¿Estás seguro de que deseas borrar este uso?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

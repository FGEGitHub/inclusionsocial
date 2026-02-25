import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CardSeleccionFecha = (props) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');


  return (
    <Card  sx={{
        cursor: 'pointer',
        background: '#eceff1',
      
    
      }}>
      <CardContent >
        <Typography variant="h5" component="div" gutterBottom>
          Seleccionar Fecha para ver asistencias
        </Typography>
        <TextField
          type="date"
          defaultValue="2024-05-01"
          value={fechaSeleccionada}
          onChange={(e) =>{ props.traer(e.target.value) 
          setFechaSeleccionada(e.target.value) }}
          fullWidth
          style={{ marginTop: '16px', marginBottom: '16px' }}
        />
     
      </CardContent>
    </Card>
  );
};

export default CardSeleccionFecha;

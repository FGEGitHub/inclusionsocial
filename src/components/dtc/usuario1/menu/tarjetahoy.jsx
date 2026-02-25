import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CardInformacionDia = (props) => {
  // Puedes personalizar este avatar o icono según tus necesidades
  const icono = <Avatar>A</Avatar>;

  const handleIrActividades = () => {
    // Lógica para navegar a la página de actividades
    console.log('Ir a actividades');
  };

  return (
    <Card sx={{
      cursor: 'pointer',
      background: '#eceff1',
    
  
    }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
         Ir al dia de hoy
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
          {icono}
          <IconButton onClick={() => props.traer()}color="primary">
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardInformacionDia;

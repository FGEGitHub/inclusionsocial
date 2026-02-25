import React, { useEffect, useState } from 'react';
import servicioDtc from '../../../../services/dtc';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Widget from '../../../fiscalizacion/Widget/Widget';
import EqualizerIcon from '@mui/icons-material/Equalizer';
const nombresDiasSemana = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
];

const CardInformacionDia = () => {
  const [datos, setDatos] = useState();
  const [showStats, setShowStats] = useState(false); // Estado para mostrar/ocultar estadísticas
  const fechaActual = new Date();

  // Obtener el día de la semana (0 = domingo, 6 = sábado)
  const diaSemana = fechaActual.getDay();

  useEffect(() => {
    traer();
  }, []);
  
  const traer = async () => {
    try {

      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${today.getMonth() + 1}-${today.getFullYear()}`;
      

      const historial = await servicioDtc.traerestadisticas({ fecha: formattedDate });
      setDatos(historial);
      console.log(historial[0].semana);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Botón para mostrar/ocultar estadísticas */}
      <Button 
        variant="contained" 
        color="success" 
        onClick={() => setShowStats(!showStats)}
        style={{ marginBottom: '16px' }}
      >
        {showStats ? 'Ocultar estadísticas' : 'Ver estadísticas'}<EqualizerIcon/>
      </Button>

      {/* Mostrar estadísticas solo si showStats es true */}
      {showStats && (
        <Card
          sx={{
            cursor: 'pointer',
            background: '#eceff1',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Estadísticas
            </Typography>

            {datos ? (
              <>
                <div className="home">
                  <Widget
                    type="Asistencias tomadas en el mes: "
                    cantidad={datos[0].presentes_totales}
                  />
                  <Widget
                    type="Cantidad de usuarios que concurrieron en el mes:"
                    cantidad={datos[0].presentes_totales_reales}
                  />
                  <Widget
                    type="Cantidad de usuarios que concurrieron en el mes pasado:"
                    cantidad={datos[0].presentes_totales_reales_mespasado}
                  />
                </div>
                <div className="home">
                  <Widget
                    type="Asistencias en la semana"
                    cantidad={datos[0].presentes_totales_semana}
                  />
                  {nombresDiasSemana[diaSemana]}
                  <Widget
                    type={
                      'Presentes semana pasada hasta el ' +
                      nombresDiasSemana[diaSemana]
                    }
                    cantidad={datos[0].pres_Semanapasada}
                  />
                  <Widget
                    type="Usuarios en la semana"
                    cantidad={datos[0].presentes_totales_reales_semana}
                  />
                  <Widget
                    type={
                      'Usuarios en la semana pasada hasta el ' +
                      nombresDiasSemana[diaSemana]
                    }
                    cantidad={datos[0].pres_Semanal_real_semanapasada}
                  />
                </div>
              </>
            ) : (
              <Typography>Cargando...</Typography>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CardInformacionDia;

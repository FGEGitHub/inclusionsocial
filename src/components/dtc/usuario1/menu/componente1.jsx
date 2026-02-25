import React from 'react';
import servicioDtc from '../../../../services/dtc'
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import CardInformacionDia from './tarjetahoy';
import CardSeleccionFecha from './tarjetaselecionar';
import  Acordeon   from '../actividades/acordeon';
import  { useEffect, useState } from "react";
import Estadisticas from '../chiques/act2'
import Asistencia from  '../../usuario2/asistencia/tabla'

import Dtcito from '../bot';
//import Casasa from './asist'
const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '800px',
      margin: '0 auto',
    },
  },
}));

const handleFechaSeleccionada = (fecha) => {
  console.log('Fecha seleccionada:', fecha);
};

const LoginForm = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentDate, setCurrentDate] = useState();
  const [actividades, setactividades] = useState()

  useEffect(() => {
    traer()



}, [])
const traer = async () => {
  try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)


          const today = new Date();
          const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
          
          console.log(formattedDate);

          setCurrentDate(formattedDate);
          const historial = await servicioDtc.traertodaslasactividades({fecha:formattedDate})
          setactividades(historial)
      }

  } catch (error) {

  }

}
  const fechaActual = new Date();

  return (<>
    <Dtcito/>
    <Container component="main" >
    <Estadisticas/>
      <CssBaseline />
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <Card sx={{backgroundImage: 'linear-gradient(90deg, #1d6b14 0%, #9775fa 0%, #71ff89 0%, #ffd43b 0%, #ff5d00 100%, #9775fa 100%, #71ff89 100%)',}}>
            
            <CardContent>
              <CardInformacionDia fecha={fechaActual}
              traer={async () => {
                try {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                    if (loggedUserJSON) {
                        const usuario = JSON.parse(loggedUserJSON)
              
              
                        const today = new Date();
                        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
                        await  setCurrentDate()
                        await  setCurrentDate(formattedDate);
                        const historial = await servicioDtc.traertodaslasactividades({fecha:formattedDate})
                        setactividades(historial)
                    }
              
                } catch (error) {
              
                }
              
              }}  />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <CardSeleccionFecha 
              traer ={async (fechaa) => {
                try {
                  console.log(fechaa);
                  const partesFecha = fechaa.split("-");
                  const dia = partesFecha[2].padStart(2, "0");
                  const mes = partesFecha[1].padStart(2, "0");
                  const año = partesFecha[0];
          
                  const fechaFormateada = `${año}-${mes}-${dia}`;
                  console.log(22, fechaFormateada);
          
                  await setCurrentDate()
                  await setCurrentDate(fechaFormateada)
                        const historial = await servicioDtc.traertodaslasactividades({fecha:fechaFormateada,id:238})
                        console.log(historial)
                        setactividades(historial)            
              
                } catch (error) {
              
                }
              
              }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>


    {currentDate ? <>   <Asistencia fecha={currentDate} idt={236}/></>:<></>}
    {actividades ? <> <Acordeon
          actividades={actividades}

        
    />  
    

  
    </>:<>cargando</>}


    </>
  );
};

export default LoginForm;


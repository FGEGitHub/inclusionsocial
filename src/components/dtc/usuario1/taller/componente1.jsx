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
import { useNavigate, useParams } from "react-router-dom";
import  Acordeon   from '../actividades/acordeon';
import  { useEffect, useState } from "react";
import Asistencia from  '../../talleres/tablasistenciaparaadmin'
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Tallerestadistica from '../../talleres/estadisticastaller'
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
    let params = useParams()
    let id = params.id
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentDate, setCurrentDate] = useState('');
  const [clasesss, setClases] = useState()
  const [presentes, setPresentes] = useState()

  useEffect(() => {
    traer()
  


}, [])
const handleChange = async (e) => {
  try {
    console.log(e.target.value )
    await setCurrentDate();

   await setCurrentDate(e.target.value );

    const historial = await servicioDtc.traertodaslasactividades({fecha:e.target.value})
    setPresentes(historial)

  } catch (error) {

  }

}
const traer = async () => {
  try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)


          const today = new Date();
          const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

          setCurrentDate(formattedDate);
          if(usuario.nivel ==40){
            const historial = await servicioDtc.traerclasestallercadia(id)
            console.log(historial)
            setClases(historial)

          }else{    
            
            const historial = await servicioDtc.traerclasestaller(id)
            console.log(historial)
            setClases(historial)

          }
   
      }

  } catch (error) {

  }

}

  return (<>
   
   <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Clases
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'fecha',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >  

                            {clasesss ? <>
                             <option value={'1'}> Elegir</option>
                          
                             {clasesss.map((row) => (
                                       
                                       <option value={row.id}> {row.fecha} - {row.cantidad} Presentes</option>
         
                             ))}
                                  </>:<>Cargando</>}
                            </NativeSelect>

<Tallerestadistica/>

{/*     {currentDate ? <>   <Asistencia id={currentDate}
                                    idt={id}/></>:<></>} */}
   
  


    </>
  );
};

export default LoginForm;


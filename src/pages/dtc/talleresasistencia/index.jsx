import Asis from '../../../components/dtc/talleres/tablanuevaasitenciaclase'
import Asis2 from '../../../components/dtc/talleres/alumnosnoinscriptos'
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MenuuCel from '../../../components/dtc/Navbar'
import Tablaasis from '../../../components/dtc/talleres/tablaasistencia'

import {

  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      maxWidth: '600px', // Define el ancho máximo en pantallas más grandes
      margin: '0 auto', // Centra el contenido en pantallas más grandes
    },
    transform: 'scale(0.90)', // Escala al 75%
    transformOrigin: 'center center', // Origen de la transformación en el centro
  },
}));

export default function Paginas() {
  const navigate = useNavigate();
    const theme = useTheme();
   const [usuario, setUsuario] = useState()
    const [loginVisible, setLoginvisible] = useState(false)
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        console.log(loggedUserJSON) 
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUsuario(user)
          switch (user.nivel) {
            case 26:
             break;
        
           //   navigate('/')
           
           
            default:
            
                window.localStorage.removeItem('loggedNoteAppUser')
                navigate("/dtc/login")
              break;
          }
        }else{
          
          navigate('/dtc/login')
              window.localStorage.removeItem('loggedNoteAppUser')
              alert('usuario no autorizado')
        }
        setLoginvisible(true)
      }, [])

    return (
      <>
     <MenuuCel/>
     <br/>
     <br/>
     <br/>
     {  usuario ? <>
      { (usuario.id == 317 || usuario.id ==325 || usuario.id ==326 )?<>
        <Tablaasis/>
     
    {/* <Asis2/> */}</> :<>
   
    <Asis/>
     <br/>
     <Asis2/>
   </> }
   
   </>:<></>}

     <br/>
     <br/> 
       
 </>
   
    );

}
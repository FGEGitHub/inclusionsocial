



import Menuizq from '../../../../components/dtc/usuario1/menuizq1'
import MenuuCel from '../../../../components/dtc/usuario1/menuresp'

import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../../Assets/mantenimiento2.jpeg'
import Menu from '../../../../components/dtc/inscripciones/todas'
import React, { useEffect, useState } from "react";
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
   const classes = useStyles();
    const [loginVisible, setLoginvisible] = useState(false)
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        console.log(loggedUserJSON) 
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          switch (user.nivel) {
            case 20:
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
             {isMatch ? 
            <>
            <div  className={classes.container}> 

            <MenuuCel texto="Menu"/>
            <Menu/>
           </div>
            </>:<>
        <Menuizq>

      <Menu/>
      
      </Menuizq></>}
        </>
   
    );

}
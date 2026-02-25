



import Asis from '../../../../components/dtc/usuario1/personaspsiq/lista'
import Calendario from '../../../../components/dtc/turnos/calendario'
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MenuuCel from '../../../../components/dtc/vale/menuresp'
import Menuizq from '../../../../components/dtc/vale/menuizqval'

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
    const classes = useStyles();
    const [loginVisible, setLoginvisible] = useState(false)
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        console.log(loggedUserJSON) 
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          switch (user.nivel) {
            case 21:
             break;
             case 24:
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
         {isMatch ? <>
              <MenuuCel/>
              
              <Asis/>
            </>:<>

            <br/>
     <br/>
     <br/> <Menuizq>
    
     <Asis/>
     <br/></Menuizq>
     <br/>
     <br/> 

            </>}
 </>
   
    );

}
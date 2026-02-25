
import Menuizq from '../../../../components/dtc/usuario1/menuizq1'
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../../Assets/mantenimiento2.jpeg'
import React, { useEffect, useState } from "react";
import Listachiquesa from '../../../../components/dtc/usuario1/usuarios_gimnasio/lista'
import MenuuCel from '../../../../components/dtc/usuario1/menuresp'
import Mantenimiento from '../../../../Assets/mantenimiento2.jpeg';

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

      const islogo = {
        width: "60%",   
        margin: 0,
        padding: 0,
        display: "flex",
                
        };
    return (
      <>
      {isMatch ? 
     <>
     <div  className={classes.container}> 
     <MenuuCel texto="Chiques"/>
     <img style={islogo} src={Mantenimiento} alt="logo" /> 
    </div>
     </>:<>
 <Menuizq>
 <img style={islogo} src={Mantenimiento} alt="logo" /> 
</Menuizq></>}
 </>
   
    );

}
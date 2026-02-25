



import Asis from '../../../components/dtc/usuario1/talleres/todos'
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MenuuCel from '../../../components/dtc/Navbar'
import Menuizqcocia from '../../../components/dtc/cocina/menuizqcocina'
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
   

    return (
      <>
  <MenuuCel/>
  <br/> 
  <br/>   <br/>  <br/>  
  <button onClick={() =>   navigate("/dtc/talleresver") }>Ir a talleres </button>
  <Asis/>

     <br/> 
 </>
   
    );

}
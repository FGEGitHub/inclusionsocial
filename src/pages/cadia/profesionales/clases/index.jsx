import Menuizq from '../../../../components/cadia/profesionales/menuiz2';
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../../Assets/mantenimiento2.jpeg';
import React, { useEffect, useState } from "react";
import Listachiquesa from '../../../../components/cadia/profesionales/lista';
import MenuuCel from '../../../../components/cadia/profesionales/menucel';

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
    transform: 'scale(0.90)', // Escala al 90%
    transformOrigin: 'center center', // Origen de la transformación en el centro
    background: 'linear-gradient(to bottom, #f5f5dc, #f5deb3)', // Fondo beige degradado
  },
}));

export default function Paginas() {
    const navigate = useNavigate();
    const theme = useTheme();
    const classes = useStyles();
    const [loginVisible, setLoginvisible] = useState(false);
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        console.log(loggedUserJSON);
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          console.log(user);
          switch (user.nivel) {
            case 41:
              break;
            default:
              window.localStorage.removeItem('loggedNoteAppUser');
              navigate("/cadia/login");
              break;
          }
        } else {
          navigate('/dtc/login');
          window.localStorage.removeItem('loggedNoteAppUser');
          alert('usuario no autorizado');
        }
        setLoginvisible(true);
      }, []);

    return (
      <>
        {isMatch ? 
          <>
          <MenuuCel/>
            <div className={classes.container}> 
              <Listachiquesa/>
            </div>
          </> :
          <><Menuizq>
            <Listachiquesa/></Menuizq>
          </>
         
        }
          
      </>
    );
}

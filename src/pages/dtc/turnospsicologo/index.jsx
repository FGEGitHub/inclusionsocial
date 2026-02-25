import Asis from '../../../components/dtc/usuario1/psicologo/componente';
import { useNavigate } from "react-router-dom";
import MEnupc from '../../../components/dtc/usuario1/turnos/menunizq';
import MenuuCel from '../../../components/dtc/Navbar';
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
      maxWidth: '600px', 
      margin: '0 auto', 
    },
    transform: 'scale(0.90)', 
    transformOrigin: 'center center', 
  },
}));

export default function Paginas() {
  const navigate = useNavigate();
  const theme = useTheme();
  const classes = useStyles();
  const [loginVisible, setLoginvisible] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      switch (user.nivel) {
        case 21:
        case 22:
        case 23:
          break;
        default:
          window.localStorage.removeItem('loggedNoteAppUser');
          navigate("/dtc/login");
          break;
      }
    } else {
      navigate('/dtc/login');
      window.localStorage.removeItem('loggedNoteAppUser');
      alert('Usuario no autorizado');
    }
    setLoginvisible(true);
  }, [navigate]);

  const contenido = (
    <>
      <br />
      <br />
      <br />
      <Asis />
      <br />
      <br />
      <br />
    </>
  );

  return isMobile ? (
    <>
      <MenuuCel />
      {contenido}
    </>
  ) : (
    <MEnupc>{contenido}</MEnupc>
  );
}

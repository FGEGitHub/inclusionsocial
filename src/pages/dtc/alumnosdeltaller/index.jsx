import { useNavigate } from "react-router-dom";
import Inscriptos from '../../../components/dtc/talleres/infodeincriptos';
import OtroComponente from '../../../components/dtc/talleres/listadealumnosfines'; // 🔁 nuevo componente
import React, { useEffect, useState } from "react";
import MenuuCel from '../../../components/dtc/Navbar'

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
  const [usuario, setUsuario] = useState();
  const [loginVisible, setLoginvisible] = useState(false);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUsuario(user);
      switch (user.nivel) {
        case 26:
          break;
        default:
          window.localStorage.removeItem('loggedNoteAppUser');
          navigate("/dtc/login");
          break;
      }
    } else {
      navigate('/dtc/login');
      window.localStorage.removeItem('loggedNoteAppUser');
      alert('usuario no autorizado');
    }
    setLoginvisible(true);
  }, [navigate]);

  return (
    <>
      {isMatch && (
        <div className={classes.container}>
          <MenuuCel texto="Usuarios" />
        </div>
      )}

      {usuario && (
        usuario.id == 325
          ? <OtroComponente id={usuario.id} />   // 👈 si es 325 renderiza este
          : <Inscriptos id={usuario.id} />      // 👈 si no, el original
      )}
    </>
  );
}

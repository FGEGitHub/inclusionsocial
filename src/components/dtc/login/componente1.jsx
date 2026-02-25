import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
//import   Navbar from "../navbar"

import Logo from "../../../Assets/inviernodtc.png";
//import Registro from "./registro"
import servicioLogin from "../../../services/login"
//import servicioUsuario from "../../services/usuario"
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#607d8b', // Cambiar el color de fondo aquí
    padding: theme.spacing(2),
    backgroundImage: Logo,
    borderRadius: theme.spacing(2),
    color: 'white'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'white', // Cambiar el color de fondo del avatar aquí
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [form, setForm] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      switch (user.nivel) {
        case 20:
          navigate('/dtc/usuario1/menu')
          break;
        case 21: navigate('/dtc/usuario2/asistencia')
          window.location.reload(true);
          break;
        case 22: navigate('/dtc/cocina')
          window.location.reload(true);
          break;


        case 23:
          navigate('/dtc/turnos/lista')
          break;
          case 24: navigate('/dtc/psicologa/turnos')
          window.location.reload(true);
          break;
          case 25:
            navigate('/dtc/sole/inicio')
            window.location.reload(true);
            break;
            case 26:
              navigate('/dtc/tallerprincipal')
              break;
              case 27:
                navigate('/dtc/gimnasioclases')
                window.location.reload(true);
                break;
                case 28:
                  navigate('/dtc/visitasocial/menu')
                  break;
                  case 29:
                    navigate('/dtc/fines/menu')
                    break;
                    case 31:
                      navigate('/dtc/meriendas')
                      break;
        default:
          window.localStorage.removeItem('loggedNoteAppUser')
          navigate('/dtc/login')
          break;
      }
    }
  }, [])

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await servicioLogin.login(form)
    window.localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(user)
    )

    // servicioUsuario.setToken(user.token)

    switch (user.nivel) {
      case 20: navigate('/dtc/usuario1/menu')
        window.location.reload(true);
        break;
      case 21: navigate('/dtc/usuario2/asistencia')
        window.location.reload(true);
        break;
      case 22: navigate('/dtc/cocina')
        window.location.reload(true);
        break;


      case 23:
        navigate('/dtc/turnos/lista')
        break;
        case 24:
          navigate('/dtc/psicologa/turnos')
          window.location.reload(true);
          break;
          case 25:
            navigate('/dtc/sole/inicio')
            window.location.reload(true);
            break;
            case 26:
              navigate('/dtc/tallerprincipal')
              window.location.reload(true);
              break;
              case 27:
                navigate('/dtc/gimnasioclases')
                window.location.reload(true);
                break;
                case 28:
                  navigate('/dtc/visitasocial/menu')
                  break;
                  case 29:
                    navigate('/dtc/fines/menu')
                    break;
                    case 31:
                      navigate('/dtc/meriendas')
                      break;
      default: alert("error")
        break;

    };
  }

  const isLogo = {
    width: "90%",
  };

  return (<>

    <Container component="main" maxWidth="xs">
      {/* <Navbar/> */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={Logo} style={isLogo} alt="logo" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Usuario"
            name="usuario"
            autoComplete="email"

            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"

            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>

        </form>

        {/* <Registro/> */}
      </div>
    </Container>
  </>
  );
};

export default LoginForm;

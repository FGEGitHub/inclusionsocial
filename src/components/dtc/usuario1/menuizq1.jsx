import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import logo from "../../../Assets/dtcletra.png"
import servicioDtc from '../../../services/dtc'
import WcTwoToneIcon from '@mui/icons-material/WcTwoTone';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import Tooltip from '@mui/material/Tooltip';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import Navbar from '../Navbar'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import PsychologyIcon from '@mui/icons-material/Psychology';
const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b2dfdb',
    },
    secondary: {
      main: '#b2dfdb',
    },
  },
});

export default function MenuIzq2 ({children}) {
  const [cumple, setCumple] = useState()
  const [estemes, setEstemes] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    traer()
  }, [])

  const traer = async () => {
    try {
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const historial = await servicioDtc.traercumples({ fecha: formattedDate })

      setCumple(historial[0])
      setEstemes(historial[1])
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  const handleClick = (path) => {
    navigate(path);
  };

  const hanleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload(true);
  }

  const menuItems = [
    {
      text: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Inscripciones
      
      
        </div>
      ),
      icon: <ArchitectureIcon color="primary" />,
      path: '/dtc/usuario1/inscripciones',
    //  tooltip: 'Detalle de asistencias de usuarios',
    },
    {
      text: 'Actividades',
      icon: <GradingTwoToneIcon color="primary" />,
      path: '/dtc/usuario1/menu',
   //  tooltip: 'Asistencia y actividades de hoy'
    },
    {
      text: 'Personal',
      icon: <PeopleAltTwoToneIcon color="primary" />,
      path: '/dtc/usuario1/usuarios',
     // tooltip: 'Usuarios del sistema '
    },
    {
      text: 'Usuarios',
      icon: <WcTwoToneIcon color="primary" />,
      path: '/dtc/usuario1/chiques',
     // tooltip: 'Lista de usuarios del dispositivo'
    },
    {
      text: 'Trabajo territorial',
      icon: <GradingTwoToneIcon color="primary" />,
      path: '/dtc/usuario1/asistenciassoc',
   //   tooltip: 'Informes de las trabajadoras sociales'
    },
    {
      text: 'Talleres,clases,asistencia',
      icon: <ArchitectureIcon color="primary" />,
      path: '/dtc/usuario1/talleres',
    //  tooltip: 'Clases y asistencia de talleres'
    },
    {
      text: 'Psicologos',
      icon: <ArchitectureIcon color="primary" />,
      path: '/dtc/usuario1/psicologos',
    //  tooltip: 'Lista de personas con tratamiento'
    },
    {
      text: 'Personas Psiq',
      icon: <ArchitectureIcon color="primary" />,
      path: '/dtc/usuario1/personaspsiq',
    //  tooltip: 'Lista de personas con tratamiento'
    },
      { 
          text: 'turnos calendario', 
          icon: <PsychologyIcon />, 
          path: '/dtc/usuario1/turnos' 
        },
 { 
          text: 'Todos los turnos', 
          icon: <PsychologyIcon />, 
          path: '/dtc/usuario1/listatodoslosturnos' 
        },
      {
      text: 'Oficios',
      icon: <ArchitectureIcon color="primary" />,
      path: '/dtc/usuario1/oficios',
      //tooltip: 'Detalle de asistencias de usuarios'
    },
    {
      text: 'Asistencias',
      icon: <ArchitectureIcon color="primary" />,
      path: '/dtc/usuario1/asisencias',
      //tooltip: 'Detalle de asistencias de usuarios'
    },
    {
      text: 'Inventario',
      icon: <ArchitectureIcon color="primary" />,
      path: '/dtc/usuario1/inventario',
      //tooltip: 'Detalle de asistencias de usuarios'
    }
  ];

  const islogo = {
    marginTop: '10%',
    width: "70%",
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: "#2e7d32",
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          color="#2e7d32"
          anchor="left"
        >
          <Navbar logout={{ hanleLogout }} />
          <Toolbar />
          <img style={islogo} src={logo} alt="logo" />
          <Toolbar />
          <Divider />
          <List sx={{ color: "#fafafa" }}>
            {menuItems.map((item) => (
              <Tooltip title={item.tooltip} arrow key={item.text}>
                <ListItem button onClick={() => { handleClick(item.path); }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Tooltip>
            ))} 
          </List>
          {cumple ? <>
            {cumple.length > 0 ? <>
              {cumple.map((item) => (
                <ListItem>
                  HOY HAY CUMPLE
                  <p style={{ color: 'white' }}>{item.nombre} {item.apellido}</p>
                </ListItem>
              ))}
            </> : <><p style={{ color: 'white' }}>Hoy no hay cumples <SentimentVeryDissatisfiedIcon /> </p></>}
          </> : <></>}
          {estemes ? <>
            {estemes.length > 0 ? <>
              Cumples este mes
              {estemes.map((item) => (
                <ListItem>
                  <ListItemIcon style={{ color: 'white' }}>{item.nombre} {item.apellido} <br />el dia ({item.fecha_nacimiento})</ListItemIcon>
                </ListItem>
              ))}
            </> : <></>}
          </> : <></>}
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 0, /* backgroundColor: "#88f78e" */ }}
        >
          <Toolbar />
          <div>
            <br />    <br />    <br />
            {children}
          </div>
        </Box>
      </Box>
      <style>{`
        @keyframes pulsate {
          0% { background-color: #ffeb3b; }
          50% { background-color: #ff9800; }
          100% { background-color: #ffeb3b; }
        }
      `}</style>
    </>
  );
}

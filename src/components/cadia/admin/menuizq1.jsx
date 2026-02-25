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
import logo from "../../../Assets/logocadia.jpg";
import servicioDtc from '../../../services/dtc';
import WcTwoToneIcon from '@mui/icons-material/WcTwoTone';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import Navbar from '../Navbar';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const drawerWidth = 240;
const theme = createTheme({
  palette: {
    background: {
      default: "white" // Fondo crema
    },
    primary: {
      main: '#FFFDD0',
    },
    secondary: {
      main: '#000000',
    },
  },
});

export default function MenuIzq2 ({children}) {
  const [cumple, setCumple] = useState();
  const [estemes, setEstemes] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    traer();
  }, []);

  const traer = async () => {
    try {
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      console.log(formattedDate);
      const historial = await servicioDtc.traercumples({fecha:formattedDate});
      setCumple(historial[0]);
      setEstemes(historial[1]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    window.location.reload(true);
  };

  const menuItems = [
    { text: 'Calendario', icon: <GradingTwoToneIcon color="primary" />, path: '/cadia/usuario/calendario' },
    { text: 'Usuarios', icon: <PeopleAltTwoToneIcon color="primary" />, path: '/cadia/usuario/usuarios' },
    { text: 'Chicos', icon: <WcTwoToneIcon color="primary" />, path: '/cadia/usuario/chicos' },
    { text: 'Profesionales', icon: <WcTwoToneIcon color="primary" />, path: '/cadia/usuario/profesionales' },
    { text: 'Turnos', icon: <WcTwoToneIcon color="primary" />, path: '/cadia/usuario/turnos' },
    { text: 'Informes', icon: <WcTwoToneIcon color="primary" />, path: '/cadia/usuario/actividades' },
    { text: 'Lista de espera', icon: <WcTwoToneIcon color="primary" />, path: '/cadia/usuario/listaespera' },
  ];

  const logoStyle = {
    width: "80%",
    margin: "16px auto",
    display: "block"
  };

  return (
   
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              color: "#000000"
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Navbar logout={{ handleLogout }} />
          <Toolbar />
          <img style={logoStyle} src={logo} alt="logo" />
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => handleClick(item.path)}>
                <ListItemIcon sx={{ color: "#fafafa" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
      {/*     {cumple && cumple.length > 0 ? (
            <>
              <List>
                <ListItem>
                  <ListItemText primary="HOY HAY CUMPLE" />
                </ListItem>
                {cumple.map((item) => (
                  <ListItem key={item.nombre}>
                    <ListItemText primary={`${item.nombre} ${item.apellido}`} />
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <ListItem>
              <ListItemText primary="Hoy no hay cumples" />
              <SentimentVeryDissatisfiedIcon />
            </ListItem>
          )}
          {estemes && estemes.length > 0 && (
            <>
              <Divider />
              <List>
                <ListItem>
                  <ListItemText primary="Cumples este mes" />
                </ListItem>
                {estemes.map((item) => (
                  <ListItem key={item.nombre}>
                    <ListItemText primary={`${item.nombre} ${item.apellido} - el dia (${item.fecha_nacimiento})`} />
                  </ListItem>
                ))}
              </List>
            </>
          )} */}
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 0, backgroundColor: "#9dfaf7" }}>
          <Toolbar />
          <div >
            <br />
            {children}
          </div>
        </Box>
      </Box>
    
  );
}

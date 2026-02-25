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
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import Navbar from '../Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import servicioDtc from '../../../services/dtc';

// Importa todas las imágenes según el id
import Rocio from '../../../Assets/rocbon.png'; // id 290
import Gonzalo from '../../../Assets/gonz.png'; // id 286
import Laura from '../../../Assets/lauraal.png'; // id 279
import Mar from '../../../Assets/marburna.png'; // id 282
import Paz from '../../../Assets/pazizuet.png'; // id 285
import Vir from '../../../Assets/viraq.png'; // id 280
import Vic from '../../../Assets/vicsanch.png'; // id 287
import Ol from '../../../Assets/olgaac.png'; // id 278
import NAt from '../../../Assets/natacev.png'; // id 277
import Caro from '../../../Assets/carobernasc.png'; // id 281
import Agus from '../../../Assets/agfig.png'; // id 291
import Barb from '../../../Assets/barbfalc.png'; // id 284
import Guad from '../../../Assets/guadsot.png'; // id 290
import Pau from '../../../Assets/paukees.png'; // id 290

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    background: {
      default: "white"
    },
    primary: {
      main: '#E0F8F8',
    },
    secondary: {
      main: '#000000',
    },
  },
});

export default function MenuIzq2({ children }) {
  const [id, setId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    traer();
  }, []);

  const traer = async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        setId(usuario.id);
      }
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

  // Mapeo de ID a imágenes
  const imageMap = {
    290: Rocio,
    286: Gonzalo,
    279: Laura,
    282: Mar,
    285: Paz,
    280: Vir,
    287: Vic,
    278: Ol,
    277: NAt,
    281: Caro,
    291: Agus,
    284: Barb,
  };

  const menuItems = [
    { text: 'Actividades', icon: <GradingTwoToneIcon color="primary" />, path: '/cadia/profesionales/inicio' },
    { text: 'Turnos', icon: <GradingTwoToneIcon color="primary" />, path: '/cadia/profesionales/turnos' },
    { text: 'Informes', icon: <GradingTwoToneIcon color="primary" />, path: '/cadia/profesionales/informes' },
  ];

  const logoStyle = {
    width: "80%",
    margin: "16px auto",
    display: "block",
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
            //  color: "#000000",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Navbar logout={{ handleLogout }} />
          <Toolbar />

          {/* Renderiza la imagen basada en el ID */}
          {id && (
            <>
              <img style={logoStyle} src={imageMap[id]} alt="user" />
            </>
          )}

          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => handleClick(item.path)}>
                <ListItemIcon sx={{ color: "#E0F8F8" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 0, backgroundColor: "white" }}>
          <Toolbar />
          <div>
            <br />
            {children}
          </div>
        </Box>
      </Box>

  );
}

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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import logo from "../../../Assets/dtcletra.png"
import servicioDtc from '../../../services/dtc'
import WcTwoToneIcon from '@mui/icons-material/WcTwoTone'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import Tooltip from '@mui/material/Tooltip';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import Navbar from '../Navbar'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
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
        text: 'Hoy',
        icon: <CalendarTodayIcon color="primary" />,
        path: '/dtc/cocina',
       // tooltip: 'Lista de usuarios del dispositivo'
      },
      
      {
        text: 'Clases',
        icon: <CalendarTodayIcon color="primary" />,
        path: '/dtc/cocinaraciones',
       // tooltip: 'Lista de usuarios del dispositivo'
      },

    
      
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
              backgroundColor: "#1b5e20",
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          color="#37474f"
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
        
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 0, backgroundColor: "#88f78e" }}
        >
          <Toolbar />
          <div>
            <br />
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

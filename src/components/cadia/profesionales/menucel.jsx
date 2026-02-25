import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GroupIcon from '@mui/icons-material/Group';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState('/dtc/usuario1/menu'); // establece el valor inicial según la ruta actual

  const handleClick = (path) => {
    setValue(path); // actualiza el estado al hacer clic en una opción
    navigate(path);
  };

  // Puedes agregar más opciones según las secciones de tu página
  const menuPath = '/cadia/profesionales/inicio';
  const usuariosPath = '/cadia/profesionales/turnos';
  const chiquesPath = '/cadia/profesionales/informes';

  

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <Box>
        <BottomNavigation showLabels value={value}>
          <BottomNavigationAction
            label="Actividades"
            icon={<RestoreIcon />}
            onClick={() => handleClick(menuPath)}
          />
          <BottomNavigationAction
            label="turnos"
            icon={<GroupIcon />}
            onClick={() => handleClick(usuariosPath)}
          />
          <BottomNavigationAction
            label="informes"
            icon={<AccessibilityIcon />}
            onClick={() => handleClick(chiquesPath)}
          />
  
          
         {/*  <BottomNavigationAction
            label="Personal"
            icon={<LocationOnIcon />}
            onClick={() => handleClick(personalPath)}
          />*/}
        </BottomNavigation> 
      </Box>
    </>
  );
}
  
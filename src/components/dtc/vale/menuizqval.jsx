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
import logo from "../../../Assets/fotopsiq.png"
import servicioDtc from '../../../services/dtc'
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import WhereToVoteTwoToneIcon from '@mui/icons-material/WhereToVoteTwoTone';//import logo from "../../Assets/logocuqui.webp";
import Navbar from '../Navbar'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';const drawerWidth = 240;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64b5f6',
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
    console.log(formattedDate)
            //  setCurrentDate(formattedDate);
              const historial = await servicioDtc.traercumples({fecha:formattedDate})

    setCumple(historial[0])  
    setEstemes(historial[1])  
    
     
      } catch (error) {
    
      }
    
    }
    const handleClick = (path) => {
        
        navigate(path);
      }; 
    

       const hanleLogout = () => {
       /* console.log('click')
        setUser(null)
        servicioUsuario.setToken(user.token) */
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload(true);
      } 
    const menuItems = [
        { 
            text: 'informes', 
            icon: <PeopleAltTwoToneIcon />, 
            path: '/dtc/psicologa/informes' 
          },
     /*  { 
        text: 'Mapas', 
        icon: <WhereToVoteTwoToneIcon  />, 
        path: '/dtc/psicologa/turnos' 
      }, */
        { 
          text: 'turnos', 
          icon: <AccountBoxTwoToneIcon />, 
          path: '/dtc/psicologa/turnos' 
        },
        { 
          text: 'usuarios', 
          icon: <AccountBoxTwoToneIcon />, 
          path: '/dtc/psicologa/usuarios' 
        },
     
      
      ];
      const islogo = {
        width: "90%",                  
        };
    return(
      <>
        
    
    <Box sx={{  display: 'flex' }}>
      <CssBaseline />
      
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor:"#64b5f6",
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"

        color="#37474f"
        anchor="left"
      >
      
        <Navbar
      logout = {{hanleLogout}}/>
        <Toolbar />
        <br/>        <br/>
        <img style={islogo} src={logo} alt="logo" />  
       
        <Toolbar />
        <Divider />
        <List     sx={{  color:"black"}}>
        {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              color='black'
              onClick={() => {
                handleClick(item.path)
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        {cumple ? <>
       { cumple.length>0? <>
        {cumple.map((item) => (
            <ListItem 
             
            >
              
              HOY HAY CUMPLE
              <p sx={{color:'white'}}>{item.nombre}  {item.apellido} </p>
            
            </ListItem>
          ))}
       
       </>:<><p sx={{color:'white'}}>Hoy no hay cumples <SentimentVeryDissatisfiedIcon/> </p></>}
        
        </>:<></>}
        {estemes ? <>
       { estemes.length>0? <>
       Cumples este mes
        {estemes.map((item) => (
            <ListItem 
             
            >
              <ListItemIcon  sx={{  color:"black"}}>{item.nombre} {item.apellido} <br/>el dia ({item.fecha_nacimiento})</ListItemIcon>
            
            </ListItem>
          ))}
       
       </>:<></>}
        
        </>:<></>}
        
        <Divider />
       
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1,  p:0,backgroundColor:"#88f78e" }}
      >
        <Toolbar />
      {/*   <AlertaInusual
      cantidadInusual={cantidadInusual} />
        <AlertaAprobaciones
      cantidad={cantidad} /> */}
   
      <div >
        <br/>
   { children}
   </div>
      </Box>
    </Box>
    
   
    </>
  );

}
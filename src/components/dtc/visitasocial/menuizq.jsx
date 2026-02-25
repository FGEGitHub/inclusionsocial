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
import logo from "../../../Assets/trabajo-social.jpg"
import logoromi from "../../../Assets/fotoromi.jpeg"
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
  const [usuario, setUsuario] = useState()
    const navigate = useNavigate();
    useEffect(() => {
      traer()
  
  
  
  }, [])
    const traer = async () => {
      try {
      
          const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
          if (loggedUserJSON) {
              const usuario = JSON.parse(loggedUserJSON)

              setUsuario(usuario)

          }

    
    
    
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
        text: ' inscripciones', 
        icon: <PeopleAltTwoToneIcon />, 
        path: '/dtc/visitasocial/inscripciones' 
      },
        { 
            text: 'informes', 
            icon: <PeopleAltTwoToneIcon />, 
            path: '/dtc/visitasocial/menu' 
          },
      { 
        text: 'Mapas', 
        icon: <WhereToVoteTwoToneIcon  />, 
        path: '/dtc/visitasocial/mapas' 
      },
        { 
          text: 'Usuarios', 
          icon: <AccountBoxTwoToneIcon />, 
          path: '/dtc/visitasocial/usuarios' 
        },
     
        { 
          text: 'intervenciones', 
          icon: <AccountBoxTwoToneIcon />, 
          path: '/dtc/visitasocial/intervenciones' 
        },
        { 
          text: 'Personas con tratamiento', 
          icon: <AccountBoxTwoToneIcon />, 
          path: '/dtc/visitasocial/personastratamieto' 
        },
        { 
          text: 'Informes tratamiento', 
          icon: <AccountBoxTwoToneIcon />, 
          path: '/dtc/visitasocial/informes' 
        },
      ];
      const islogo = {
        width: "70%",                  
        };
        const islogo2 = {
          width: "60%",                  
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
        {usuario ? <>
        {usuario.id==274 ? <>
        
          <img style={islogo2} src={logoromi} alt="logo" />  
        </>:<>     <img style={islogo} src={logo} alt="logo" /> {usuario.id} </>}
        </>:<></>}
   
       
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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,

} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import servicioDtc from '../../services/dtc'
import MenuIcon from "@mui/icons-material/Menu";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
const pages = [
  "Inicio",
  "actividades",
  
  ,
  "Cerrar Sesión"];
  const pages2 = [
    "Inicio",
    "actividades",
    "raciones",
    
    ,
    "Cerrar Sesión"];
const pagesdeslogueado = [
  "Iniciar sesion ",
  "Nosotros",
  
  "Contacto",
  ]

const DrawerNav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cumple, setCumple] = useState()
  const [estemes, setEstemes] = useState()
  const [usuario, setUsuario] = useState(null)

  const navigate = useNavigate();
  useEffect(() => {
    traer()



}, [])
  const traer = async () => {
    try {
  
            const today = new Date();
            const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

          //  setCurrentDate(formattedDate);
            const historial = await servicioDtc.traercumples({fecha:formattedDate})

  setCumple(historial[0])  
  setEstemes(historial[1])  
  const loggedUserJSON = await window.localStorage.getItem('loggedNoteAppUser')

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    console.log(user)
    setUsuario(user)
    
  }
  

   
    } catch (error) {
  
    }
  
  }

  const handleClick = () => {
    navigate("/encargados/cursos");
  };
  const iraMenu = () => {
    navigate("/");
  };
  const irraciones = () => {
    navigate("/dtc/usuario2/raciones");
  }
  const irContacto = () => {
    navigate("/");
  }
  const iaActividades = () => {
    navigate("/dtc/actividades");
  }

  const notif = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    navigate("/cadia/login")

  };


  const hanleLogout = () => {
    /* console.log('click')
     setUser(null)
     servicioUsuario.setToken(user.token) 
        //  navigate('/login')
     */
   
    
     window.localStorage.removeItem('loggedNoteAppUser')
     navigate("/cadia/login")

   } 



  function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
    switch (rowIndex) {
      case 0:
        iraMenu()
        break;

      case 1:
        iaActividades()
        break;
      case 2:
        irraciones()
        break;
      case 3:
        hanleLogout()
        break;
        case 4:
          notif()
          break;
          case 4:
            hanleLogout()
            break;
          

    }
  }
    function CutomButtonsRendererdesloqueado(dataIndex, rowIndex, data, onClick) {
      switch (rowIndex) {
        case 0:
          handleClick()
          break;

        case 1:
          hanleLogout()
          break;
        case 2:
          hanleLogout()
          break;
        case 2:
          irContacto()
          break;
    


      }
    }

    const inicio = () => {
      navigate("/");

    }

    const notificaciones = () => {
      navigate("/usuario/notificaciones");
    }

    
    return (
      <React.Fragment>
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >

          {usuario ? <>
          

              {usuario.nivel==22 ? <>
              
                <List>
              {pages2.map((page, index) => (
                <ListItemButton key={index}>
                  <ListItemIcon>
                    <ListItemText onClick={() => CutomButtonsRenderer(page, index)} >  {page}  </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))} </List>
              
              </>:<>
              <List>
              {pages.map((page, index) => (
                <ListItemButton key={index}>
                  <ListItemIcon>
                    <ListItemText onClick={() => CutomButtonsRenderer(page, index)} >  {page}  </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))} </List></>}
          </> : <>
            <List>
              {pagesdeslogueado.map((page, index) => (
                <ListItemButton key={index}>
                  <ListItemIcon>
                    <ListItemText onClick={() => CutomButtonsRendererdesloqueado(page, index)} >  {page}  </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))} </List></>
          }
{usuario? <>Atencion {usuario.nombre}, </>:<></>}
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
  {/*       {estemes.map((item) => (
            <ListItem 
             
            >
              <ListItemIcon sx={{color:'black'}}>{item.nombre} {item.apellido} <br/>el dia ({item.fecha_nacimiento})</ListItemIcon>
            
            </ListItem>
          ))}
        */}
       </>:<></>}
        
        </>:<></>}

        </Drawer>
        <IconButton
          sx={{ color: "white", marginLeft: "auto" }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon color="white" />
        </IconButton>
      </React.Fragment>
    );
  };

export default DrawerNav;
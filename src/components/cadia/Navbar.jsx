import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import logo from "../Assets/logocoalicion.png";
import Typography from '@mui/material/Typography';
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerNav from "./DrawerNav";
import servicioPErsonas from '../../services/personas'
import logo from '../../Assets/dtc.png'


const Navbar = (props) => {
  

  
  const [user, setUser] = useState(null)
  const [cargado, setCargado] = useState(false)

  const [value, setValue] = useState();
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const islogo = {
                  width: "80px",                  
                  };
  const navigate = useNavigate();

  useEffect(() => {
    traer()
}, [])
const traer = async () => {


  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    const user = JSON.parse(loggedUserJSON)
 
  const notis = await servicioPErsonas.traerusuario(user.id)
  console.log(notis)
  setUser(notis)
  setCargado(true)


  /* if (notificaciones>0) {
    document.title= 'Santa Catalina ('+notificaciones+')'
 
  }   */
}

  const handleClick = () => {
    navigate("/cadia/actividades");
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

  const inicio = () => {
    navigate("/cadia/login")
    

  }
  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: '#E0F8F8', }}>
        <Toolbar>
           <img style={islogo} src={logo} alt="logo" />  
          {isMatch ? (
            <>
              <DrawerNav />
            </>
          ) : (
            <>
              
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="Secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
              <Tab label= '' />

         
                {cargado ? <div> <Button onClick={inicio} sx={{ marginLeft: "10px" }} variant="Outlined">
                {user.length > 0? <>
                 
                  <Tab sx={{fontSize:" 17px ", color:'#f73378',  textShadow: '1px 1px 2px black'}}label= {`hola  ${user[0].nombre} !`}/>

                  </>:<>
                  <Tab />
</>}

              </Button> </div>:<div></div>}


              {user? <>
          
              <Button onClick={hanleLogout} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab sx={{fontSize:" 17px ", color:'#f73378',  textShadow: '1px 1px 2px black'}} label= {`Cerrar sesion`}/>
              </Button>
              </>:<>
              <Button sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab sx={{fontSize:" 17px ", color:'#f73378',  textShadow: '1px 1px 2px black'}}llabel= {`Iniciar sesion`}/>
              </Button></>}
              </Tabs>
             


             

            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;

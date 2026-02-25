


import Asis from '../../../../components/dtc/vale/listaactividades'
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MenuuCel from '../../../../components/dtc/Navbar'
import Menuizq from '../../../../components/dtc/visitasocial/menuizq'
import {

  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

export default function Paginas() {
  const navigate = useNavigate();
    const theme = useTheme();
    const [loginVisible, setLoginvisible] = useState(false)
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        console.log(loggedUserJSON) 
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          switch (user.nivel) {
            case 21:
             break;
             case 28:
              break;
           //   navigate('/')
           
           
            default:
            
                window.localStorage.removeItem('loggedNoteAppUser')
                navigate("/dtc/login")
              break;
          }
        }else{
          
          navigate('/dtc/login')
              window.localStorage.removeItem('loggedNoteAppUser')
              alert('usuario no autorizado')
        }
        setLoginvisible(true)
      }, [])

    return (
      <>
     <MenuuCel/>
     <Menuizq>
     <br/>
     <br/>
     <br/> <br/>
     <Asis/>
     <br/>
     <br/>
     <br/>
      </Menuizq>
 </>
   
    );

}






import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../components/dtc/login/componente1'
import React, { useEffect, useState } from "react";
import Backg from '../../../Assets/fondodtc.jpg'


export default function Paginas() {
    const navigate = useNavigate();
    const [loginVisible, setLoginvisible] = useState(false)

    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        console.log(loggedUserJSON) 
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          switch (user.nivel) {
            case 1:
              alert('usuario no autorizado')
              window.localStorage.removeItem('loggedNoteAppUser')
           //   navigate('/')
              break;
            case 2:
              alert('usuario no autorizado')
              window.localStorage.removeItem('loggedNoteAppUser')
                            break;
          
            case 21:
              
                            navigate('/dtc/usuario2/asistencia')
              break;

              case 20:
           
                            navigate('/dtc/usuario1/menu')
                break;
            
           
                case 23:
                  navigate('/dtc/turnos/lista')
                  break;
                  case 24:
                    navigate('/dtc/psicologa/turnos')
                    break;
                    case 26:
                      navigate('/dtc/tallerprincipal')
                      break;
                      case 27:
                      navigate('/dtc/gimnasioclases')
                      break;
                      case 28:
                      navigate('/dtc/visitasocial/menu')
                      break;
                      case 29:
                        navigate('/dtc/fines/menu')
                        break;
                        case 31:
                          navigate('/dtc/meriendas')
                          break;
            default:
                
              window.localStorage.removeItem('loggedNoteAppUser')
              navigate('/dtc/login')
              
              break;
          }
        }
        setLoginvisible(true)
      }, [])
      const estiloComponente = {
        background: Backg,
       
       // backgroundSize: 'cover', // Ajusta el tamaño de la imagen al contenedor
    //    backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
        height: '100%', // Ajusta la altura según tus necesidades
        // Puedes agregar más estilos según lo que necesites
      };
    return (
        <>
        <div style={{background:Backg}}>

      
        {loginVisible ? <>
       
        <Login/>
        </>:<></>}
        </div>
        </>
   
    );

}
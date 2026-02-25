import servicioDtc from '../../../../services/dtc'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import Uno from "../../../../Assets/fotopsiq.png";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#4caf50",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const TablaNotificaciones = (props) => {
    const [traertalleres, setTalleres] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const [vista, setvista] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        traer()



    }, [])

    const islogo = {
        width: "90px",                  
        };
    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)
                const talleres = await servicioDtc.traterpsicologos2()
                console.log(talleres)
                setTalleres(talleres[0])
            }

        } catch (error) {

        }


    }
    const cambiarvista = () => {
        setvista(!vista)


    }

    const ir = (id) => {
        navigate('/dtc/turnos/psicologo/'+id)
    }
    // renderiza la data table
    return (
        <div>
       
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
             
           
               {traertalleres.map((row) => (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Item>
                            <div  onClick={() => ir(row.id)} className="body__Page">
                                <div  onClick={() => ir(row.id)}  className="container__article">

                                    <div  onClick={() => ir(row.id)} className="box__article">



                                  
                                    <div>
                                    <img  onClick={() => ir(row.id)}  style={islogo} src={Uno} alt="logo" /> 
    </div>


                                        <h5  onClick={() => ir(row.id)}  >{row.usuario}</h5>
                                        
                                        <label onClick={() => ir(row.id)} >{row.nombre}</label>
                                        <p  onClick={() => ir(row.id)} >Ver detalles</p>
                                        <p  >Cantidad de turnos {row.cantidad},En el mes {row.cantidadMes}  <br/>Hoy ({row.cantidadHoy} turnos)</p>                                 
                                      
                                        
                                        
                                    </div>


                                </div>
                            </div>
                        </Item>
                    </Grid>
                    ))}

                </Grid>
            </Box>


        </div>
    )
}
export default TablaNotificaciones
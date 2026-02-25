import servicioDtc from '../../../../services/dtc'
//import ModalVer from './ModalVer'
import ModaNueva from './nueva'
import ModaNuevacadia from './nuevacadia'
import React, { useEffect, useState, Fragment } from "react";
import Modalver from './modalver'
import Acordeon from './acordeon';
import Acordeoncadia from './acordeoncadia';

import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import {

    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
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


const TablaNotificaciones = (props) => {
    const theme = useTheme();
    const [actividades, setactividades] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const [currentDate, setCurrentDate] = useState('');


    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])
    const options = {
        selectableRows: false, // Desactivar la selección de filas
        stickyHeader: true,
    };

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)
console.log(usuario.nivel)
                const today = new Date();
                const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
///////////////////////actividades de todos 
                setCurrentDate(formattedDate);
                if(usuario.nivel==41){
                    const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                    setactividades(historial)
                }else{
                    if(usuario.nivel==40){
                        const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                        setactividades(historial)
                    }else{
                        const historial = await servicioDtc.traeractividadeschico({ id_usuario: id })
                        setactividades(historial)
                    }
                  
                }
             
            }

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                < Tooltip title="Ver">
                
                    <Modalver
                        id={actividades[dataIndex]['id']}
                        detalle={actividades[dataIndex]['detalle']}
                        titulo={actividades[dataIndex]['titulo']}
                        traer={async () => {
                            try {
                                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                if (loggedUserJSON) {
                                    const usuario = JSON.parse(loggedUserJSON)

                                    setUsuario(usuario)

                                    const today = new Date();
                                    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

                                    setCurrentDate(formattedDate);
                                    if(usuario.nivel==41){
                                        const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                        setactividades(historial)
                                    }else{
                                        if(usuario.nivel==40){
                                            const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                            setactividades(historial)
                                        }else{
                                            const historial = await servicioDtc.traeractividadeschico({ id_usuario: id })
                                            setactividades(historial)
                                        }
                                      
                                    }
                                }

                            } catch (error) {

                            }

                        }}
                    />
                </Tooltip>




            </>
        );
    }




    // definimos las columnas
    const columns = [
        {
            name: "fecha",
            label: "fecha",

        },
        {
            name: "titulo",
            label: "titulo",

        },



        {
            name: "Acciones",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },


    ];

    // renderiza la data table
    return (
        <div>
            <Paper
                sx={{
                    cursor: 'pointer',
                    background: '#fafafa',
                  

                    border: '1px dashed #ccc',
                    '&:hover': { border: '1px solid #ccc' },
                }}
            > <Typography variant="body1" style={{ color: 'black' }}>
                    <h2>Lista de intervenciones</h2></Typography>
                {actividades ? <>
                    <div>

{usuario.nivel==40 ||usuario.nivel==41 ? <>
    <ModaNuevacadia
                            id_usuario={id}
                            fecha={currentDate}
                            id_trabajador={usuario.id}
                            traer={async () => {
                                try {
                                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                    if (loggedUserJSON) {
                                        const usuario = JSON.parse(loggedUserJSON)

                                        setUsuario(usuario)

                                        const today = new Date();
                                        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

                                        setCurrentDate(formattedDate);
                                        if(usuario.nivel==41){
                                            const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                            setactividades(historial)
                                        }else{
                                            if(usuario.nivel==40){
                                                const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                                setactividades(historial)
                                            }else{
                                                const historial = await servicioDtc.traeractividadeschico({ id_usuario: id })
                                                setactividades(historial)
                                            }
                                          
                                        }
                                    }

                                } catch (error) {

                                }

                            }}
                        />

</>:<>
                        <ModaNueva
                            id_usuario={id}
                            fecha={currentDate}
                            id_tallerista={usuario.id}
                            traer={async () => {
                                try {
                                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                    if (loggedUserJSON) {
                                        const usuario = JSON.parse(loggedUserJSON)

                                        setUsuario(usuario)

                                        const today = new Date();
                                        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

                                        setCurrentDate(formattedDate);
                                        if(usuario.nivel==41){
                                            const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                            setactividades(historial)
                                        }else{
                                            if(usuario.nivel==40){
                                                const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                                setactividades(historial)
                                            }else{
                                                const historial = await servicioDtc.traeractividadeschico({ id_usuario: id })
                                                setactividades(historial)
                                            }
                                          
                                        }
                                    }

                                } catch (error) {

                                }

                            }}
                        /></> }
                        {actividades.length > 0 ? <>

                        

                            {actividades ? <> 
                            
                            
                            {usuario && 
                            
                            usuario.nivel==40||usuario.nivel==41 ?
                            <>      <Acordeoncadia
                          
                            actividades={actividades}
                            traer={async () => {
                                try {
                                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                    if (loggedUserJSON) {
                                        const usuario = JSON.parse(loggedUserJSON)

                                        setUsuario(usuario)

                                        const today = new Date();
                                        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

                                        setCurrentDate(formattedDate);
                                        if(usuario.nivel==41){
                                            const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                            setactividades(historial)
                                        }else{
                                            if(usuario.nivel==40){
                                                const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                                setactividades(historial)
                                            }else{
                                                const historial = await servicioDtc.traeractividadeschico({ id_usuario: id })
                                                setactividades(historial)
                                            }
                                          
                                        }
                                    }

                                } catch (error) {

                                }

                            }}

                        /> 
                        </>:<>
                                  <Acordeon
                          
                          actividades={actividades}
                          traer={async () => {
                              try {
                                  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                  if (loggedUserJSON) {
                                      const usuario = JSON.parse(loggedUserJSON)

                                      setUsuario(usuario)

                                      const today = new Date();
                                      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

                                      setCurrentDate(formattedDate);
                                      if(usuario.nivel==41){
                                          const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                          setactividades(historial)
                                      }else{
                                          if(usuario.nivel==40){
                                              const historial = await servicioDtc.traeractividadesprofcadiaadmin(usuario.id)
                                              setactividades(historial)
                                          }else{
                                              const historial = await servicioDtc.traeractividadeschico({ id_usuario: id })
                                              setactividades(historial)
                                          }
                                        
                                      }
                                  }

                              } catch (error) {

                              }

                          }}

                      /> </>
                            
                            }
                            
                      </> : <>cargando</>}

                        </> : <> <h2>No hay actividades aun</h2></>}



                    </div>
                </> : <></>}</Paper>
        </div>
    )
}
export default TablaNotificaciones
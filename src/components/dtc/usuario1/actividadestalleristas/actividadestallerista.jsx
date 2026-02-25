import servicioDtc from '../../../../services/dtc'
//import ModalVer from './ModalVer'
import ModaNueva from './nueva'
import React, { useEffect, useState, Fragment } from "react";
import Acordeon from './acordeon';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
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

                const today = new Date();
                const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

                setCurrentDate(formattedDate);
                const historial = await servicioDtc.traeractividades({id_usuario:usuario.id})
                setactividades(historial)
            }

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

             {/* 
                    < Tooltip title="Ver">
                    <Modalver
                    id={ actividades[dataIndex]['id']}
                    detalle={ actividades[dataIndex]['detalle']}
                    titulo={ actividades[dataIndex]['titulo']}
                    traer={async () => {
                        try {
                            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                            if (loggedUserJSON) {
                                const usuario = JSON.parse(loggedUserJSON)
                
                                setUsuario(usuario)
                
                                const today = new Date();
                                const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
                
                                setCurrentDate(formattedDate);
                                const historial = await servicioDtc.traeractividadeschico({id_usuario:id})
                                setactividades(historial)
                            }
                
                        } catch (error) {
                
                        }
                
                    }}
                    />
                    </Tooltip>
 */}



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
            <h2>Lista de actividades</h2>
            {actividades ? <>
                <div>


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
                                    const historial = await servicioDtc.traeractividades({id_usuario:usuario.id})
                                    setactividades(historial)
                                }
                    
                            } catch (error) {
                    
                            }
                    
                        }}
                    />
                    {actividades.length > 0 ? <>

{/* 
                        {isMatch ?
                            <>

                                <TableContainer>
                                    {!actividades ? <Skeleton /> : <>
                                        <h1>Lista de actividades </h1>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Fecha</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Titulo</b></TableCell>
                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Ver</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {actividades.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.fecha}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.titulo} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">  <Modalver
                    id={ row.id}
                    detalle={row.detalle}
                    titulo={row.titulo}
                    traer={async () => {
                        try {
                            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                            if (loggedUserJSON) {
                                const usuario = JSON.parse(loggedUserJSON)
                
                                setUsuario(usuario)
                
                                const today = new Date();
                                const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
                
                                setCurrentDate(formattedDate);
                                const historial = await servicioDtc.traeractividades({fecha:formattedDate,id_usuario:usuario.id})
                                setactividades(historial)
                            }
                
                        } catch (error) {
                
                        }
                
                    }}
                    /> </StyledTableCell>




                                                    </StyledTableRow>
                                                ))}




                                            </TableBody>
                                        </Table>
                                    </>}

                                </TableContainer>
                            </> : <><>
                                <MUIDataTable

                                    title={"Lista de actividades"}
                                    data={actividades}
                                    columns={columns}
                                    actions={[
                                        {
                                            icon: 'save',
                                            tooltip: 'Save User',
                                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                                        }
                                    ]}
                                    options={options}


                                />

                            </></>} */}

{actividades ? <> <Acordeon
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
                 
                    const historial = await servicioDtc.traeractividades({id_usuario:usuario.id})
                    setactividades(historial)
                }
    
            } catch (error) {
    
            }
    
        }}
    
    /> </>:<>cargando</>}

                    </> : <> <h2>El dia de hoy no hay actividades aun</h2></>}



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones
import servicioDtc from '../../../services/dtc'

import ModaNueva from './Modallegajo'
import React, { useEffect, useState, Fragment } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import TableRow from '@mui/material/TableRow';
import {

    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import Ver from './verlegajo';
import Borrarlegajo from './Modalborrar'
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
    const [chicos, setchicos] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const [cargando, setCargando] = useState(false)
   // const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));


    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])
    const options = {
        selectableRows: false, // Desactivar la selección de filas
        stickyHeader: true,
        filterType: 'checkbox', // Opciones adicionales de configuración según tus necesidades
    responsive: 'vertical',
    selectableRows: 'none',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30],
    elevation: 0, // Elimina la sombra si no la deseas

    
    };

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                const novedades_aux = await servicioDtc.listadelegajos(id)
                console.log(novedades_aux)
                setchicos(novedades_aux)
            }

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
<button style={{ width: '80px' }} onClick={() => window.open('/dtc/verfoto/'+chicos[dataIndex]['id'], '_blank')}>Ver imagen</button>

<button style={{ width: '80px' }} onClick={() => window.open('https://esme.cuquicalvano.com:4000/dtc/traerfoto/'+chicos[dataIndex]['id'], '_blank')}>Ver PDF</button>
{/* <Ver 
                        imagenBase64 = {chicos[dataIndex]['imagenBase64']}
                        descripcion = {chicos[dataIndex]['descripcion']}/> */}
                   
                        <Borrarlegajo 
                        id = {chicos[dataIndex]['id']}
                        traer={ async () => {
                            try {
                                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                if (loggedUserJSON) {
                                    const usuario = JSON.parse(loggedUserJSON)
                    
                                    setUsuario(usuario)
                    
                                    const novedades_aux = await servicioDtc.listadelegajos(id)
                                    setchicos(novedades_aux)
                                }
                    
                            } catch (error) {
                    
                            }
                    
                        }}
                       />
                  {!cargando ? <>
                    < Tooltip title="Descargar">
                     <button style={{ width: '80px' }} onClick={() => handleDownload(dataIndex)}>Descargar</button>   
                     
                    </Tooltip>
                    </>:<>Descarga en proceso</> }




            </>
        );
    }

  
  
        const handleDownload = async (dataIndex) => {
          // Lógica para descargar el archivo
          setCargando(true)
       await fetch('https://esme.cuquicalvano.com:4000/dtc/descargar/'+ chicos[dataIndex]['id'])
      //   await fetch('http://localhost:4000/dtc/descargar/'+ chicos[dataIndex]['id'])

            .then(response => response.blob())
            .then(blob => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const a = document.createElement('a');
              a.href = url;
              a.download = 'filename.pdf';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            });
            setCargando(false)
        }

        const handleDownloadd = async (dataIndex) => {
            // Lógica para descargar el archivo
            setCargando(true)
         await fetch('https://esme.cuquicalvano.com:4000/dtc/descargar/'+ dataIndex)
        //   await fetch('http://localhost:4000/dtc/descargar/'+ dataIndex)
              .then(response => response.blob())
              .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'filename.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              });
              setCargando(false)
          }
    // definimos las columnas
    const columns = [
        {
            name: "nombre",
            label: "nombre",

        },
        {
            name: "descripcion",
            label: "descripcion",

        },
       

        {
            name: "Ver",
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
            <h2>Legajo del usuario</h2>
            {chicos ? <>
                <div>


                    <ModaNueva
                        id_turno={id}
                        traer={async () => {
                            try {
                                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                if (loggedUserJSON) {
                                    const usuario = JSON.parse(loggedUserJSON)
                    
                                    setUsuario(usuario)
                    
                                    const novedades_aux = await servicioDtc.listadelegajos(id)
                                    setchicos(novedades_aux)
                                }
                    
                            } catch (error) {
                    
                            }
                    
                        }
                        }
                    />
                    {chicos.length > 0 ? <>


                        {isMatch ?
                            <>

                                <TableContainer>
                                    {!chicos ? <Skeleton /> : <>
                                        <h1>Lista de legajos </h1>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Descripcion</b></TableCell>
                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Opciones</b></TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {chicos.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row"> {row.nombre}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.descripcion} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">   <button style={{ width: '80px' }} onClick={() => window.open('/dtc/verfoto/'+row.id, '_blank')}>Ver foto</button>
                                                        <button style={{ width: '80px' }} onClick={() => window.open('https://esme.cuquicalvano.com:4000/dtc/traerfoto/'+row.id, '_blank')}>Ver PDF</button>


                         <Borrarlegajo 
                        id = {row.id}
                        traer={ async () => {
                            try {
                                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                if (loggedUserJSON) {
                                    const usuario = JSON.parse(loggedUserJSON)
                    
                                    setUsuario(usuario)
                    
                                    const novedades_aux = await servicioDtc.listadelegajos(id)
                                    setchicos(novedades_aux)
                                }
                    
                            } catch (error) {
                    
                            }
                    
                        }}
                       />
                   
                  {!cargando ? <>
                    < Tooltip title="Descargar">
                   
                         <button style={{ width: '80px' }} onClick={() => handleDownloadd(row.id)}>Descargar</button>  
                    </Tooltip>
                    </>:<>Descarga en proceso</> }

</StyledTableCell>



                                                    </StyledTableRow>
                                                ))}




                                            </TableBody>
                                        </Table>
                                    </>}

                                </TableContainer>
                            </> : <><>
                                <MUIDataTable

                                    title={"Lista de legajos"}
                                    data={chicos}
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

                            </></>}

                    </> : <> <p>Ninguno</p></>}



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones
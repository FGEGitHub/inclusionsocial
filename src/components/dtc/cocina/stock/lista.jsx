import servicioDtc from '../../../../services/dtc'

import React, { useEffect, useState, Fragment } from "react";
//import Bot from './bot';
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
import ModalAgregarconsumo from './agregarconsumo'
import Verusos from './verusos'
import Agregar from './sumar'
import {

    makeStyles,
    useMediaQuery,
    useTheme,
    Button
} from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Modalborrar from './borrar'
import Nuevo from './nuevo'

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
const transparentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Ajusta el valor alfa según sea necesario
  };

  const useStyles = makeStyles({
    table: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    bodyCell: {
      color: 'blue',
    },
    selectCell: {
      headerCell: {
        backgroundColor: '#880e4f',
      },
      checkboxRoot: {
        color: 'green',
      },
    },
  });



const TablaNotificaciones = (props) => {
    const theme = useTheme();
    const [chicos, setchicos] = useState([''])
    const [usuario, setUsuario] = useState([''])
  
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();

    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])

    
    const options = {
        setTableProps: () => {
            return {
              style: {
                backgroundColor: "#e3f2fd", // Cambia el color de fondo de la tabla
              },
            };
          },
          customHeadRender: (columnMeta, handleToggleColumn) => ({
            TableCell: {
              style: {
                backgroundColor: '#1565c0', // Cambia el color de fondo del encabezado
                color: 'white', // Cambia el color del texto del encabezado
              },
            },
          }),
        selectableRows: false, // Desactivar la selección de filas
        stickyHeader: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: true,
        responsive: 'scroll',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
        print: true,
        filter: true,
        viewColumns: true,
        pagination: true,

        textLabels: {
          body: {
            noMatch: "No se encontraron registros",
            toolTip: "Ordenar",
          },
          pagination: {
            next: "Siguiente",
            previous: "Anterior",
            rowsPerPage: "Filas por página:",
            displayRows: "de",
          },
          toolbar: {
            search: "Buscar",
            downloadCsv: "Descargar CSV",
            print: "Imprimir",
            viewColumns: "Ver columnas",
            filterTable: "Filtrar tabla",
          },
          filter: {
            all: "Todos",
            title: "FILTROS",
            reset: "RESETEAR",
          },
          viewColumns: {
            title: "Mostrar columnas",
            titleAria: "Mostrar/ocultar columnas de la tabla",
          },
          selectedRows: {
            text: "fila(s) seleccionada(s)",
            delete: "Eliminar",
            deleteAria: "Eliminar filas seleccionadas",
          },
        },

      };
    
      const theme2 = createTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
              color: '#1e88e5', // Cambia el color del texto en las celdas del cuerpo
            },
          },
          MUIDataTableSelectCell: {
            headerCell: {
              backgroundColor: '#3f51b5', // Cambia el color de fondo de las celdas de selección en el encabezado
            },
            checkboxRoot: {
              color: '#3f51b5', // Cambia el color del icono de la casilla de verificación de selección
            },
          },
        },
      });
    const traer = async () => {
        try {
          console.log('trayebdo')
          const novedades_aux = await servicioDtc.traerstock()
          setchicos(novedades_aux[0])

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                    < Tooltip title="Ver">
                    <Modalborrar id={chicos[dataIndex]['id']}
                      traer={async () => {
                        try {
                          console.log('trayebdo')
                          const novedades_aux = await servicioDtc.traerstock()
                          setchicos(novedades_aux[0])
                
                        } catch (error) {
                
                        }
                
                    } }
                    />
                    </Tooltip>





            </>
        );
    }




    // definimos las columnas
    const columns = [
      {
        name: "proyecto",
        label: "proyecto",

    },
    {
      name: "etapa",
      label: "etapa",

  },
    {
        name: "fecha",
        label: "fecha",

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
        <div sx={{
            cursor: 'pointer',
            backgroundImage: 'linear-gradient(90deg, #9775fa 0%, #69db7c 0%, #3bc9db 99%, #ec8c69 100%, #f783ac 100%, #ffa94d 100%, #ed6ea0 100%)',
            
            color: '#bdbdbd',
        
          }}
  >
   

            <h2>Lista de Stock</h2>
            <Nuevo
            traer={ async () => {
              try {
                console.log('trayebdo')
                const novedades_aux = await servicioDtc.traerstock()
                setchicos(novedades_aux[0])
      
              } catch (error) {
      
              }
      
          }}/>
           
            <Agregar
            
            traer={ async () => {
              try {
                console.log('trayebdo')
                const novedades_aux = await servicioDtc.traerstock()
                setchicos(novedades_aux[0])
      
              } catch (error) {
      
              }
      
          }}
            
            />
            {chicos ? <>
                <div>


                   
                    {chicos.length > 0 ? <>

                      <TableContainer>
                                    {!chicos ? <Skeleton /> : <>
                                     
                                     
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>id</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Stock</b></TableCell>
                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>descripcion</b></TableCell>
                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Acciones</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {chicos.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">{row.nombre}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.total_recepcion-row.total_consumo} de {row.total_recepcion} (total)</b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> descripcion </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> {/*  <Modalborrar id={row.id}
                      traer={async () => {
                        try {
                            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                            if (loggedUserJSON) {
                                const usuario = JSON.parse(loggedUserJSON)
                
                                setUsuario(usuario)
                
                                const novedades_aux = await servicioDtc.traerstock()
                                setchicos(novedades_aux[0])
                              
                            }
                
                        } catch (error) {
                
                        }
                
                    } }
                    /> */}<ModalAgregarconsumo id_producto={row.id}
                    traer={ async () => {
                      try {
                        console.log('trayebdo')
                        const novedades_aux = await servicioDtc.traerstock()
                        setchicos(novedades_aux[0])
              
                      } catch (error) {
              
                      }
              
                  }}
                  />
                  <Verusos
                  id={row.id}
                  nombre={row.nombre}
                  traer={ async () => {
                    try {
                      console.log('trayebdo')
                      const novedades_aux = await servicioDtc.traerstock()
                      setchicos(novedades_aux[0])
            
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

                    </> : <> <h2>Aun no hay productos</h2></>}



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones
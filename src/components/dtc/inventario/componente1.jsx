import servicioDtc from '../../../services/dtc'
import ModaNueva from './nuevo'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
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
import Alert from '@mui/material/Alert';
import {

    makeStyles,
    useMediaQuery,
    useTheme,
    Button
} from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';



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
    const [datos, setDatos] = useState()
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
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                const novedades_aux = await servicioDtc.listainventario()
                setchicos(novedades_aux[0])
                setDatos(novedades_aux[1])
            }

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                    < Tooltip title="prestacion">
                      
<ModaNueva id={chicos[dataIndex]['id']}

traer={async () => {
  try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)

          setUsuario(usuario)

          const novedades_aux = await servicioDtc.listainventario()
          setchicos(novedades_aux[0])
          setDatos(novedades_aux[1])
      }

  } catch (error) {

  }

}}/>
                    </Tooltip>






            </>
        );
    }

    function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
      return (
          <>


{chicos[dataIndex]['prestadas']}/{chicos[dataIndex]['stock']}






          </>
      );
  }



    // definimos las columnas
    const columns = [
     
        {
            name: "nombre",
            label: "nombre",

        },
        {
            name: "detalle",
            label: "detalle",

        },
        
        {
          name: "Ver",
          options: {
              customBodyRenderLite: (dataIndex, rowIndex) =>
                  CutomButtonsRenderer2(
                      dataIndex,
                      rowIndex,
                      // overbookingData,
                      // handleEditOpen
                  )
          }

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
   
    { datos ? <>  <Alert variant="filled" severity="success">
 <b> Actualmente {datos.total} usuarios  </b>  - "Kid1":{datos.kid1} usuarios, "Kid2":{datos.kid2} usuarios,  "Adolescentes":{datos.kid3} usuarios, ademas {datos.sind} sin determinar 
</Alert> </>:<></>}

            <h2>Lista de inventario</h2>
            {chicos ? <>
                <div>


                    <ModaNueva
                        id_turno={id}
                        traer={  async () => {
                          try {
                              const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                              if (loggedUserJSON) {
                                  const usuario = JSON.parse(loggedUserJSON)
                  
                                  setUsuario(usuario)
                  
                                  const novedades_aux = await servicioDtc.listainventario()
                                  setchicos(novedades_aux[0])
                                  setDatos(novedades_aux[1])
                              }
                  
                          } catch (error) {
                  
                          }
                  
                      }
                  
                  }
                    />
                    {chicos.length > 0 ? <>


                       
                            

                                <TableContainer>
                                    {!chicos ? <Skeleton /> : <>
                                        <h1>Lista de usuarios </h1>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>detalle</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>stock</b></TableCell>

                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>ir</b></TableCell>

                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>nueva</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {chicos.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.nombre}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.detalle} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.prestadas}/{row.stock} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <Button variant='contained'color="success" onClick={() => navigate('/dtc/inventario/prestaicones/'+row.id)}>Ver</Button></StyledTableCell>

                                                        
                    


                                                    </StyledTableRow>
                                                ))}




                                            </TableBody>
                                        </Table>
                                    </>}

                                </TableContainer>
                      

                    </> : <> <h2>sin datos</h2></>}



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones
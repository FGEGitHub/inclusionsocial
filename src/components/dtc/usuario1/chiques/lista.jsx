import servicioDtc from '../../../../services/dtc'
import ModaNueva from './nuevo'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import MujeresStats from "./estadistMujeres";
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Modificar from '../../usuario/modificar'

import {

  makeStyles,
  useMediaQuery,
  useTheme,
  Button
} from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Fusioanr from './fusionar'


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

const theme2 = createTheme({
  overrides: {
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#0d47a1',
        color: 'white',
        fontWeight: 'bold',
      },
    },
    MUIDataTableBodyRow: {
      root: {
        '&:hover': {
          backgroundColor: '#e3f2fd !important',
        },
      },
    },
    MUIDataTableBodyCell: {
      root: {
        fontSize: '0.9rem',
      },
    },
  },
});

const TablaNotificaciones = (props) => {
  const theme = useTheme();
  const [chicos, setchicos] = useState([''])
  const [usuario, setUsuario] = useState([''])
  const [datos, setDatos] = useState()
const [obrasChicos, setObrasChicos] = useState([]);
const [obrasPsico, setObrasPsico] = useState([]);
const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const navigate = useNavigate();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();

  let params = useParams()
  let id = params.id
  useEffect(() => {
    traer()



  }, [])


const options = {
  setTableProps: () => ({
    style: { backgroundColor: "#e3f2fd" }
  }),

  selectableRows: false,
  stickyHeader: true,
  responsive: "scroll",
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 15, 20],

  filter: true,
  search: true,
  viewColumns: true,
  pagination: true,
  print: true,

  // 👉 DESCARGA EXCEL FILTRADO
  download: true,
  downloadOptions: {
    filename: "dtc_filtrado.xlsx",
    separator: ","
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

        //const novedades_aux = await servicioDtc.listachiques()
        const novedades_aux = await servicioDtc.listachiquesmomentaneo()
        setchicos(novedades_aux[0])
        setDatos(novedades_aux[1])

        setchicos(novedades_aux[0]);
        setDatos(novedades_aux[1]);
        setObrasChicos(novedades_aux[2].chicos);
        setObrasPsico(novedades_aux[2].psicologa);
    
      }

    } catch (error) {

    }

  }

  function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    let usuario = null;

    if (loggedUserJSON) {
      usuario = JSON.parse(loggedUserJSON);
    }

    const handleNavigation = () => {
      const userPath = usuario?.nivel === 22
        ? `/dtc/cocina/usuario/${chicos[dataIndex]['id']}`
        : `/dtc/usuario1/usuario/${chicos[dataIndex]['id']}`;

      navigate(userPath);
    };

    return (
      <div>

        <Button onClick={handleNavigation} variant="outlined" sx={{ color: "#5d4037", borderColor: "#5d4037", fontSize: "0.65rem" }} >
          <b>Ver</b>
        </Button>
        <Modificar
          id={chicos[dataIndex].id}
          nombre={chicos[dataIndex].nombre}
          apellido={chicos[dataIndex].apellido}
          fecha_nacimiento={chicos[dataIndex].fecha_nacimiento}
          observaciones={chicos[dataIndex].observaciones}
          primer_contacto={chicos[dataIndex].primer_contacto}
          primer_ingreso={chicos[dataIndex].primer_ingreso}
          admision={chicos[dataIndex].admision}
          dni={chicos[dataIndex].dni}
          domicilio={chicos[dataIndex].domicilio}
          telefono={chicos[dataIndex].telefono}
          autorizacion_imagen={chicos[dataIndex].autorizacion_imagen}
          fotoc_dni={chicos[dataIndex].fotoc_dni}
          fotoc_responsable={chicos[dataIndex].fotoc_responsable}
          tel_responsable={chicos[dataIndex].tel_responsable}
          visita_social={chicos[dataIndex].visita_social}
          egreso={chicos[dataIndex].egreso}
          aut_retirar={chicos[dataIndex].aut_retirar}
          dato_escolar={chicos[dataIndex].dato_escolar}
          kid={chicos[dataIndex].kid}
          obra_social={chicos[dataIndex].obra_social}
          obra_social_cual={chicos[dataIndex].obra_social_cual}
          escuela={chicos[dataIndex].escuela}
          grado={chicos[dataIndex].grado}
          fines={chicos[dataIndex].fines}
          hora_merienda={chicos[dataIndex].hora_merienda}
          traer={async () => {
            try {
              const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
              if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                //const novedades_aux = await servicioDtc.listachiques()
                const novedades_aux = await servicioDtc.listachiquesmomentaneo()
                setchicos(novedades_aux[0])
                setDatos(novedades_aux[1])
              }

            } catch (error) {

            }

          }}
        />

      </div>
    );
  }


const columns = [
   {
   name: "id",
   label: "id",
 },
 {
   name: "dni",
   label: "DNI",
 },

 {
   name: "apellido",
   label: "Apellido",
 },

 {
   name: "nombre",
   label: "Nombre",
 },

 {
   name: "psico",
   label: "Psico",
   options: {
     filter: true,
     filterType: "checkbox",
     filterOptions: {
       names: ["Si", "No"],
     },
     customBodyRender: (value) => (
       value === "Si"
         ? <span style={{
             background:"#c8e6c9",
             padding:"3px 8px",
             borderRadius:10,
             fontWeight:"bold"
           }}>SI</span>
         : ""
     )
   }
 },

 {
   name: "fecha_nacimiento",
   label: "Edad",
   options: {
     customBodyRender: (value) => {
       if(!value) return "";
       const hoy = new Date();
       const fn = new Date(value);
       let edad = hoy.getFullYear() - fn.getFullYear();
       const m = hoy.getMonth() - fn.getMonth();
       if (m < 0 || (m === 0 && hoy.getDate() < fn.getDate())) edad--;
       return edad;
     }
   }
 },

 {
   name: "escuela",
   label: "Escuela",
 },



 {
   name: "obra_social_cual",
   label: "Obra Social",
 },

 {
   name: "Ver",
   options: {
     customBodyRenderLite: (dataIndex) =>
       CutomButtonsRenderer(dataIndex)
   }
 }
];


  // renderiza la data table
  return (
    <div sx={{
      cursor: 'pointer',
      backgroundImage: 'linear-gradient(90deg, #9775fa 0%, #69db7c 0%, #3bc9db 99%, #ec8c69 100%, #f783ac 100%, #ffa94d 100%, #ed6ea0 100%)',

      color: '#bdbdbd',

    }}
    >

      {datos ? (
        <>

{datos && <MujeresStats datos={datos} cantidad={chicos.length} />}
          <h1>
            <b>
              Actualmente {datos.total} usuarios ({datos.psicologa} personas en tratamiento psicológico)
           
            </b>
          </h1>

          <h3 style={{ marginTop: "10px", lineHeight: "1.6" }}>
            <b>📊 Estadísticas de obra social:</b><br />

            🔵 <b>Total general:</b> {datos.promedio_obra_social}<br />
            🟢 <b>Chicos:</b> {datos.promedio_obra_social_chicos}<br />
            🟣 <b>Psicóloga:</b> {datos.promedio_obra_social_psicologa}<br />
          </h3>


        </>
      ) : (
        <></>
      )}
{obrasChicos && obrasPsico ? (
  <div style={{ marginTop: "20px" }}>

    <Button 
      variant="contained" 
      color="secondary"
      onClick={() => setMostrarDetalles(!mostrarDetalles)}
      style={{ marginBottom: "15px" }}
    >
      {mostrarDetalles ? "Ocultar detalles" : "Ver detalles de obras sociales"}
    </Button>

    {mostrarDetalles && (
      <div>

        <h2>📋 Distribución de obras sociales</h2>

        <h3>Chicos</h3>
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Obra Social</b></TableCell>
                <TableCell><b>Cantidad</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {obrasChicos.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.obra}</TableCell>
                  <TableCell>{row.cantidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h3>Pacientes</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Obra Social</b></TableCell>
                <TableCell><b>Cantidad</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {obrasPsico.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.obra}</TableCell>
                  <TableCell>{row.cantidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    )}

  </div>
) : null}
      <h2>Lista de chicos</h2>
      {chicos ? <>
        <div>
<Fusioanr/>

          <ModaNueva
            id_turno={id}
            traer={async () => {
              try {
                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                if (loggedUserJSON) {
                  const usuario = JSON.parse(loggedUserJSON)

                  setUsuario(usuario)

                  //    const novedades_aux = await servicioDtc.listachiques()
                  const novedades_aux = await servicioDtc.listachiquesmomentaneo()

                  setchicos(novedades_aux[0])
                  setDatos(novedades_aux[1])
                }

              } catch (error) {

              }

            }}
          />
          {chicos.length > 0 ? <>


            {isMatch ?
              <>

                <TableContainer>
                  {!chicos ? <Skeleton /> : <>
                    <h1>Lista de usuarios </h1>
                    <Table >
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                          <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Dni</b></TableCell>
                          <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Ver</b></TableCell>


                        </TableRow>
                      </TableHead>
                      <TableBody>



                        {chicos.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.apellido} {row.nombre}</StyledTableCell>
                            <StyledTableCell component="th" scope="row"> <b>{row.dni} </b> </StyledTableCell>
                            <StyledTableCell component="th" scope="row">  <AccountBoxIcon onClick={() => navigate('/dtc/usuario1/usuario/' + row.id)} /> </StyledTableCell>




                          </StyledTableRow>
                        ))}




                      </TableBody>
                    </Table>
                  </>}

                </TableContainer>
              </> : <><>

<MuiThemeProvider theme={theme2}>
                <MUIDataTable

                  title={"Lista de chicos"}
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
                  className={classes.table} // Aplica el estilo de la tabla
                  classes={{
                    bodyCell: classes.bodyCell, // Aplica el estilo del texto en las celdas del cuerpo
                    selectCell: classes.selectCell, // Aplica el estilo de las celdas de selección
                  }}

                />
</MuiThemeProvider>
              </></>}

          </> : <> <h2>El curso aun no tiene chicos</h2></>}



        </div>
      </> : <></>}
    </div>
  )
}
export default TablaNotificaciones
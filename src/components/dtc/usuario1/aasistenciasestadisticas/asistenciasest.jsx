import { useParams } from "react-router-dom";
import servicioDtc from '../../../../services/dtc';
import React, { useEffect, useState, Fragment } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MUIDataTable from "mui-datatables";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Modaldia from './modaldia';
import TableBody from '@mui/material/TableBody';
import Skeleton from '@mui/material/Skeleton';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import { Typography } from '@mui/material';

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

const MensualInusuales = (props) => {
  let params = useParams();
  const [FormFecha, setFormFecha] = useState();
  const navigate = useNavigate();

  const [asistencias, setAsistencias] = useState();
  const [filteredAsistencias, setFilteredAsistencias] = useState([]);
  const [vista, setVista] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const buscar = async (e) => {
    e.preventDefault();
    const asistencias = await servicioDtc.consultarasitencias(FormFecha);
    console.log(asistencias);
    setAsistencias(asistencias);
    setFilteredAsistencias(asistencias);
  };

  const obtenerDiaSemana = (fecha) => {
    const [dia, mes, año] = fecha.split("-").map(Number);
    const date = new Date(año, mes - 1, dia); // Meses en JavaScript son 0-11
    return diasSemana[date.getDay()];
  };

  const filtrarPorDia = (dia) => {
    setSelectedDay(dia);
    if (dia === null) {
      setFilteredAsistencias(asistencias);
    } else {
      setFilteredAsistencias(asistencias.filter(asistencia => obtenerDiaSemana(asistencia.fecha) === dia));
    }
  };

  const columns = [
    {
      name: "fecha",
      label: "Fecha",
    },
    {
      name: "quedia",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const diaSemana = obtenerDiaSemana(filteredAsistencias[dataIndex].fecha);
          return (
            <>
              {filteredAsistencias ? (
                <>
                  {diaSemana}
                </>
              ) : (
                <></>
              )}
            </>
          );
        },
      },
    },
    {
      name: "cantidad",
      label: "cantidad",
    },
    {
      name: "Ver dia",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => (
          <Modaldia fecha={filteredAsistencias[dataIndex].fecha} />
        ),
      },
    },
  ];

  const handleChange = (e) => {
    console.log(FormFecha);
    setFormFecha({ ...FormFecha, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <br /> <br /> <br />
      <TextField
        onChange={handleChange}
        name="fecha_inicio"
        id="date"
        label="Desde"
        type="date"
        defaultValue="2025-03-01"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        onChange={handleChange}
        name="fecha_fin"
        id="date"
        label="Hasta"
        type="date"
        defaultValue="2025-03-01"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {FormFecha ? (
        <>
          {FormFecha.fecha_inicio && FormFecha.fecha_fin ? (
            <>
              <Button type="outlined" onClick={buscar}>Buscar</Button>
            </>
          ) : (
            <Button type="outlined" disabled>Buscar</Button>
          )}
        </>
      ) : (
        <Button type="outlined" disabled>Buscar</Button>
      )}
      <div>
        <div>
          <br /> <br />
          <Button variant="outlined" onClick={() => { setVista(!vista) }}> Cambiar vista</Button>
          {asistencias && (
            <div>
              <Typography variant="h6">Filtrar por día de la semana:</Typography>
              {diasSemana.map(dia => (
                <Button
                  key={dia}
                  variant="contained"
                  onClick={() => filtrarPorDia(dia)}
                  disabled={selectedDay === dia}
                >
                  {dia}
                </Button>
              ))}
              <Button variant="contained" onClick={() => filtrarPorDia(null)} disabled={selectedDay === null}>
                Todos
              </Button>
            </div>
          )}
          {vista ? (
            <>
              {filteredAsistencias ? (
                <MUIDataTable
                  title={"Lista de Asistencia"}
                  data={filteredAsistencias}
                  columns={columns}
                  actions={[
                    {
                      icon: 'save',
                      tooltip: 'Save User',
                      onClick: (event, rowData) => alert("You saved " + rowData.name),
                    },
                  ]}
                />
              ) : (
                <h2>Seleccionar fecha de inicio y de fin</h2>
              )}
            </>
          ) : (
            <Paper
              sx={{
                cursor: 'pointer',
                background: '#eeeeee',
                color: '#bdbdbd',
                border: '1px dashed #ccc',
                width: "90%",
                '&:hover': { border: '1px solid #ccc' },
                border: "1px solid black",
                margin: '75px',
              }}
            >
              <TableContainer>
                {!filteredAsistencias ? <Skeleton /> : (
                  <>
                    <h1>Lista</h1>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>FECHA</b> <b /></TableCell>
                          <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>CUIL/CUIT</b></TableCell>
                          <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>INGRESOS</b></TableCell>
                          <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>MONTO</b></TableCell>
                          <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>ESTADO</b></TableCell>
                          <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Clasificacion</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredAsistencias.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.mes}/{row.anio}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{row.cuil_cuit}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{row.ingresos}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{row.monto}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{row.estado === 'P' ? <>Pendiente</> : <>Aprobado</>}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{row.proceso}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </TableContainer>
            </Paper>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default MensualInusuales;

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import servicioDtc from '../../../services/dtc'
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Buscador from './buscador'
import Skeleton from '@mui/material/Skeleton';
import { useParams } from "react-router-dom"
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
const MobileFriendlyTable = (props) => {
  const [currentDate, setCurrentDate] = useState('');
  const [datos, setDatos] = useState();
  const [usuario, setUsuario] = useState();
  let params = useParams();
  let hora = params.id;
 const [tableData, setTableData] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      traer();
      setIsFetched(true);
    }
  }, [hora]);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      const requestData = { hora, id_taller: usuario.id };
setUsuario(usuario)
      console.log("Enviando solicitud con datos:", requestData);

      try {
        const response = await servicioDtc.traerpresentesdeclase2(requestData);
        setDatos(response)
        if (Array.isArray(response)) {
          setTableData(response[0] || []); // Datos de la clase
          setClassDetails(response[1] || []); // Lista de alumno
        }
      } catch (error) {
        console.error("Error al traer los datos:", error);
      }
    }
  };

  const ausente = async (row) => {
    console.log(row)
    const ta = await servicioDtc.ponerausenteclase({ id:row.id})
    console.log(ta)
    // Aquí puedes realizar la llamada al backend utilizando algún servicio o librería
    // Ejemplo: axios.post('/api/backend', { selectedValue });
    traer()
  }
  return (
    <div>
      {datos ? <>
        <Typography variant="p" gutterBottom>
          Lista de usuarios
        </Typography>
        {usuario ? <>
          <Buscador
              chicos={datos[1]}
              hora={hora}
              usuario={usuario}
              traer={async () => {
                const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
                if (loggedUserJSON) {
                  const usuario = JSON.parse(loggedUserJSON);
                  const requestData = { hora, id_taller: usuario.id };
            
                  console.log("Enviando solicitud con datos:", requestData);
            
                  try {
                    const response = await servicioDtc.traerpresentesdeclase2(requestData);
                    setDatos(response)
                    if (Array.isArray(response)) {
                      setTableData(response[0] || []); // Datos de la clase
                      setClassDetails(response[1] || []); // Lista de alumno
                    }
                  } catch (error) {
                    console.error("Error al traer los datos:", error);
                  }
                }
              }}
            /></> : <></>}
        <TableContainer>
          {!datos[0] ? <Skeleton /> : <>
            <h4>Lista de presentes ({datos[0].length}) </h4>
         
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Dni</b></TableCell>
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Kid</b></TableCell>



                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Hora</b></TableCell>
          
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Quitar</b></TableCell>


                </TableRow>
              </TableHead>
              <TableBody>



                {datos[0].map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">{row.apellido}  {row.nombre}</StyledTableCell>
                    <StyledTableCell component="th" scope="row"> <b>{row.dni} </b> </StyledTableCell>
                    <StyledTableCell component="th" scope="row"> <b>{row.kid == "kid3" ? <>Adolescentes</> : <>{row.kid}</>} </b> </StyledTableCell>
                    <StyledTableCell component="th" scope="row"> <b>{row.hora} </b> </StyledTableCell>
                


                    <StyledTableCell component="th" scope="row"> <b><button onClick={() => ausente(row)}>Quitar</button> </b> </StyledTableCell>



                  </StyledTableRow>
                ))}




              </TableBody>
            </Table>
          </>}

        </TableContainer>
      </> : <></>}

      <br />  <br />  <br />  <br />  <br /></div>
  );
};

export default MobileFriendlyTable;

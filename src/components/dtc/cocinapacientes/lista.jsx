import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Button, Box, Alert } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import servicioDtc from '../../../services/dtc';

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
    backgroundColor: "#1de9b6",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ResponsiveTable = styled(Table)(({ theme }) => ({
  overflowX: 'auto',
  '& .MuiTableCell-root': {
    whiteSpace: 'nowrap',
    padding: '8px 16px',
    textAlign: 'left',
  },
  '& .MuiTableBody-root .MuiTableCell-root': {
    borderBottom: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTableCell-root': {
      display: 'block',
      position: 'relative',
      paddingLeft: '40%',
      '&::before': {
        content: 'attr(data-label)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '40%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
      },
    },
    '& .MuiTableHead-root': {
      display: 'none',
    },
  },
}));

export default function Ingresos(props) {
  const navigate = useNavigate();
  const [inscrip, setInscrip] = useState([]);
  const [datos, setDatos] = useState();
  const [raciones, setRaciones] = useState();
  const [premerienda, setPremerienda] = useState();
  
  const [nuevos, setNuevos] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    traer();
  }, []);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const fecha = props.fecha || formattedDate;
      const id = props.idt || user.id;
      const historial = await servicioDtc.listadepersonaspsiq({ fecha, id });
console.log(historial)
      setInscrip(historial[0]);
      //const  kid1Data = historial[0].filter((row) => row.kid === 'kid1');
      //console.log(kid1Data)
      setDatos(historial[2]);
      setRaciones(historial[3]);
      setPremerienda(historial[4]);
      
      setCurrentDate(fecha);
    }
  };

  const checkede = async (id) => {
    await servicioDtc.restar1(id);
    traer();
  };

  const checkedep = async (id) => {
    await servicioDtc.restar1p(id);
    traer();
  };

  const checkedemasp = async (id) => {
    await servicioDtc.sumar1p(id);
    traer();
  };

  const checkedemas = async (id) => {
    await servicioDtc.sumar1(id);
    traer();
  };

  const revisto = async () => {
    await servicioDtc.revisto();
    traer();
  };

  const renderTable = (inscrip, title) => (
    <Box sx={{ overflowX: 'auto', marginBottom: '20px' }}>
      <h4>{title}</h4>
      <ResponsiveTable aria-label="customized table">
        <TableBody>
          {inscrip.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left" data-label="Apellido">
                {row.apellido}    {row.nombre}
              </StyledTableCell>
             <StyledTableCell align="left" data-label="Nombre">
                {row.nombre}
              </StyledTableCell>
              <StyledTableCell align="left" data-label="Premerienda">
                Restar<RemoveCircleRoundedIcon onClick={() => checkedep(row.id)} {...label} />
                <b>({row.premerienda})</b>
                <AddCircleRoundedIcon onClick={() => checkedemasp(row.id)} {...label} />
                Añadir
              </StyledTableCell>
              <StyledTableCell align="left" data-label="Merienda">
                Restar<RemoveCircleRoundedIcon onClick={() => checkede(row.id)} {...label} />
                <b>({row.racion})</b>
                <AddCircleRoundedIcon onClick={() => checkedemas(row.id)} {...label} />
                Añadir
              </StyledTableCell>
              <StyledTableCell align="left" data-label="Kid">
                {row.kid}
              </StyledTableCell> 
            </StyledTableRow>
          ))}
        </TableBody>
      </ResponsiveTable>
    </Box>
  );


  return (
    <div>
      {nuevos > 0 && (
        <Alert variant="filled" severity="success">
          <Button onClick={revisto} variant="contained">Ya revisè</Button>
        </Alert>
      )}
      {/* <Button variant="contained" onClick={() => navigate('/dtc/cargaetapas')}>Ir a Etapas</Button>
      <Button variant="contained" onClick={() => navigate('/dtc/cocinaasis')}>Ir a Asistencia</Button>
       */}
      {datos && (
        <>
          <h4>Lista de presentes ({inscrip.length})</h4>
 
        </>
      )}
      {renderTable(inscrip, "")}
      
    </div>
  );
}

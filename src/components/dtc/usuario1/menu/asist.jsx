import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import servicioDtc from '../../../../services/dtc'
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Buscador from './buscador'
import Skeleton from '@mui/material/Skeleton';
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
const MobileFriendlyTable = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [datos, setDatos] = useState();
  const [usuario, setUsuario] = useState();
  useEffect(() => {
    traer()
    const fetchCurrentDate = () => {
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      setCurrentDate(formattedDate);
    };

    fetchCurrentDate();
  }, []);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUsuario(user)
    }
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    setCurrentDate(formattedDate);
    const historial = await servicioDtc.traerpresentes(formattedDate)


    setDatos(historial)
    // 

};

  return (
    <div>    
        {datos ? <>
      <Typography variant="p" gutterBottom>
        Fechaa: <b>{currentDate}</b>
      </Typography>
      { usuario ?  <>
      <Buscador
      chicos={datos[1]}
      fecha={currentDate}
      traer={async () => {
        const today = new Date();
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        setCurrentDate(formattedDate);
        const historial = await servicioDtc.traerpresentes({formattedDate})
    
    
        setDatos(historial)
        // 
    
    }}
      /></>:<></>}
      <TableContainer>
                                    {!datos[0] ? <Skeleton /> : <>
                                        <h4>Lista de presentes ({datos[0].length}) </h4>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Dni</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {datos[0].map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.apellido}  {row.nombre}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.dni} </b> </StyledTableCell>




                                                    </StyledTableRow>
                                                ))}




                                            </TableBody>
                                        </Table>
                                    </>}

                                </TableContainer>
      </>:<></>}
      
      <br/>  <br/>  <br/>  <br/>  <br/></div>
  );
};

export default MobileFriendlyTable;

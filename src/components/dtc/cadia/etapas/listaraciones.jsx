import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import servicioDtc from '../../../../services/dtc'
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Ver from './ver'
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
const MobileFriendlyTable = (props) => {
  const [currentDate, setCurrentDate] = useState('');
  const [datos, setDatos] = useState();
  const [usuario, setUsuario] = useState();
  useEffect(() => {
    traer()

  }, []);

  const traer = async () => {

    
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    const historial = await servicioDtc.traerracionesmes({fecha:formattedDate})
    console.log(123)
    setDatos(historial)
    // 

};

const ausente = async (row) => {
  console.log(row)
  const ta = await servicioDtc.sacarturno({id:row.id})
alert(ta)
   // Aquí puedes realizar la llamada al backend utilizando algún servicio o librería
   // Ejemplo: axios.post('/api/backend', { selectedValue });
   traer()
}
  return (
    <div>    
        {datos ? <>
      <Typography variant="p" gutterBottom>
        Fecha: {currentDate}
      </Typography>
   
     
      <TableContainer>
                                    {!datos[0] ? <Skeleton /> : <>
                                        <h4>Lista de raciones </h4>
                                    
                                    
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }} ><b>Fecha</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Cantidad</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Ver</b></TableCell>



                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {datos[0].map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.fecha}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.cantidad} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b><Ver fecha={row.fecha}/> </b> </StyledTableCell>
 

                                                        
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

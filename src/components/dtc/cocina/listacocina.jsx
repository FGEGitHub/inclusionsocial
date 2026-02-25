import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import servicioDtc from '../../../services/dtc';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#f0f0f0",
  },
}));

export default function Ingresos(props) {
  const [inscrip, setInscrip] = useState([]);

  useEffect(() => {
    const traer = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const fecha = props.fecha || formattedDate;
        const id = props.idt || user.id;
        const historial = await servicioDtc.traerpresentescocina({ fecha:formattedDate, id });
        setInscrip(historial[0].map(({ nombre, apellido }) => ({ nombre, apellido })));
      }
    };
    traer();
  }, [props.fecha, props.idt]);

  return (
    <Paper>
      <h4>Lista de presentes ({inscrip.length})</h4>
      <Table>
        <TableBody>
          {inscrip.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{row.apellido}</StyledTableCell>
              <StyledTableCell>{row.nombre}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

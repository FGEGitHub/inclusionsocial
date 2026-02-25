import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import servicioDtc from '../../../services/dtc';

const CursoDialog = ({ id }) => {
  const [cursosData, setCursosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await servicioDtc.obtenerinfodecursos(id);
        setCursosData(response);
      } catch (error) {
        console.error('Error al obtener datos del curso:', error);
      }
    };

    fetchData();
  }, [id]);

  // Función para formatear la hora con la actividad correspondiente
  const formatHora = (hora, dia) => {
    if (hora === "14:30") return "14:30 - Gimnasio";
    if (["lunes", "miércoles", "viernes"].includes(dia)) {
      if (hora === "15:30") return "15:30 - Fútbol Masculino";
      if (hora === "16:30") return "16:30 - Fútbol Femenino";
    }
    if (["martes", "jueves"].includes(dia)) {
      if (hora === "15:30") return "15:30 - Vóley Masculino";
      if (hora === "16:30") return "16:30 - Vóley Femenino";
    }
    return hora; // Si no coincide con ninguna condición, devuelve la hora sin modificar
  };

  return (
    <div>
      {cursosData.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Día</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Cantidad de Kids</TableCell>
                <TableCell>Nombres</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cursosData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.dia}</TableCell>
                  <TableCell>{formatHora(row.hora, row.dia)}</TableCell>
                  <TableCell>{row.cantidad_kids}</TableCell>
                  <TableCell>{row.nombres_kids}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default CursoDialog;

import React, { useEffect, useState } from "react";
import servicioDtc from "../../../../services/dtc";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Skeleton, TextField, Grid
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TablaTurnosPsiq = () => {
  const [turnos, setTurnos] = useState([]);
  const [resumen, setResumen] = useState([]);
  const [filtroPersona, setFiltroPersona] = useState("");
  const [filtroPsicologo, setFiltroPsicologo] = useState("");

  useEffect(() => {
    traerTurnos();
  }, []);

  const traerTurnos = async () => {
    try {
            console.log('respuesta[0].length')
      const respuesta = await servicioDtc.traertodoslosturnospsiq();
      // Estructura esperada: [ [listado_turnos], [resumen_por_mes] ]
           console.log(respuesta)
console.log("Ejemplo de turno:", respuesta.todos[0]);

      setTurnos(respuesta.todos || []);
      setResumen(respuesta.resumen || []);
    } catch (error) {
      console.error("Error al traer los turnos:", error);
    }
  };

  // Filtrado local por persona y psicólogo
const turnosFiltrados = turnos.filter((t) => {
  const persona = t.persona?.toLowerCase() || "";
  const psicologo = t.psicologo?.toLowerCase() || "";

  // Si no hay ningún filtro, mostrar todos los turnos
  if (!filtroPersona && !filtroPsicologo) return true;

  const coincidePersona = filtroPersona
    ? persona.includes(filtroPersona.toLowerCase())
    : true;

  const coincidePsicologo = filtroPsicologo
    ? psicologo.includes(filtroPsicologo.toLowerCase())
    : true;

  return coincidePersona && coincidePsicologo;
});
  return (
    <div style={{ padding: 20, background: "rgba(255,255,255,0.8)", borderRadius: 10 }}>
      <h2>Turnos de Psicología</h2>

      {/* --- RESUMEN --- */}
      <div style={{
        marginBottom: 20,
        padding: 15,
        background: "#e3f2fd",
        borderRadius: 10,
        boxShadow: "0 0 8px rgba(0,0,0,0.1)"
      }}>
        <h3>Resumen mensual</h3>
        {resumen.length > 0 ? (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "black", color: "white" }}>Mes</TableCell>
                  <TableCell style={{ backgroundColor: "black", color: "white" }}>Cantidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resumen.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{item.mes}</StyledTableCell>
                    <StyledTableCell>{item.cantidad}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No hay datos de resumen disponibles.</p>
        )}
      </div>

      {/* --- BUSCADORES --- */}
      <Grid container spacing={2} style={{ marginBottom: 20 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Buscar por persona"
            variant="outlined"
            fullWidth
            value={filtroPersona}
            onChange={(e) => setFiltroPersona(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Buscar por psicólogo"
            variant="outlined"
            fullWidth
            value={filtroPsicologo}
            onChange={(e) => setFiltroPsicologo(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* --- TABLA PRINCIPAL --- */}
      <h3>Listado de Turnos</h3>
      <TableContainer component={Paper}>
        {!turnos.length ? (
          <Skeleton variant="rectangular" width="100%" height={200} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell><b>Persona</b></StyledTableCell>
                <StyledTableCell><b>Fecha</b></StyledTableCell>
                <StyledTableCell><b>Hora</b></StyledTableCell>
                <StyledTableCell><b>Psicólogo</b></StyledTableCell>
                <StyledTableCell><b>Agendado por</b></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {turnosFiltrados.length > 0 ? (
                turnosFiltrados.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.persona}</StyledTableCell>
                    <StyledTableCell>{row.fecha}</StyledTableCell>
                    <StyledTableCell>{row.hora}</StyledTableCell>
                    <StyledTableCell>{row.psicologo}</StyledTableCell>
                    <StyledTableCell>{row.agendadopor}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No se encontraron turnos con los filtros seleccionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default TablaTurnosPsiq;

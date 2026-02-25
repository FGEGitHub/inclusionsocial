import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Autocomplete, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from "@mui/material";
import servicioDtc from "../../../services/dtc";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const [chicos, setChicos] = useState([]);
  const [selectedChico, setSelectedChico] = useState(null);
  const [cursado, setCursado] = useState([]);
  const [orderBy, setOrderBy] = useState("mail");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchChicos = async () => {
      try {
        const data = await servicioDtc.listachiquesmomentaneo();
        setChicos(data[0]);
      } catch (error) {
        console.error("Error al obtener la lista de chicos:", error);
      }
    };
    fetchChicos();
  }, []);

  const verDetalles = async (idChico) => {
    try {
      const rts = await servicioDtc.datosdechique(idChico);
      setCursado(rts[3]);
    } catch (error) {
      console.error("Error al obtener detalles:", error);
    }
  };

  const handleSort = (col) => {
    const isAsc = orderBy === col && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(col);
  };

  const sortedCursado = [...cursado].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" gap={2} p={2} bgcolor="grey.100">
      <Button variant="contained" color="primary" size="large" fullWidth onClick={() => navigate("/dtc/alumnosdeltaller")}>
        Ver Inscriptos
      </Button>
      <Button variant="contained" color="success" size="large" fullWidth onClick={() => navigate("/dtc/tallerclases")}>
        Ir a Asistencia
      </Button>
      
      <Autocomplete
        options={chicos}
        getOptionLabel={(option) => option.nombre ? `${option.nombre} ${option.apellido || ""}`.trim() : "Sin nombre"}
        onChange={(event, newValue) => {
          setSelectedChico(newValue);
          if (newValue) verDetalles(newValue.id);
        }}
        renderInput={(params) => <TextField {...params} label="Buscar inscripto" variant="outlined" fullWidth />}
      />
      
      {selectedChico && (
        <Box width="100%">
          <h3>Detalles del Inscripto</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {["mail", "dia", "hora"].map((col) => (
                    <TableCell key={col}>
                      <TableSortLabel active={orderBy === col} direction={orderBy === col ? order : "asc"} onClick={() => handleSort(col)}>
                        <b>{col.charAt(0).toUpperCase() + col.slice(1)}</b>
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCursado.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.mail}</TableCell>
                    <TableCell>{item.dia}</TableCell>
                    <TableCell>{item.hora}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default MobileNavigation;

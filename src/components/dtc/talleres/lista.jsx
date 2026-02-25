import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Box,
  Typography, TablePagination, Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import servicioDtc from "../../../services/dtc";
import ModaNueva from "./ModalNuevaclase";
import ModalBorrar from "./borrarclase";

const TablaNotificaciones = () => {
  const [clases, setClases] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const traerDatos = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      setUsuario(usuario);
      const novedades_aux = await servicioDtc.traerclasestaller2(usuario.id);
      setClases(novedades_aux);
      setFiltradas(novedades_aux);
    }
  };

  useEffect(() => {
    traerDatos();
  }, []);

  useEffect(() => {
    const filtrado = clases.filter((c) =>
      c.titulo.toLowerCase().includes(search.toLowerCase())
    );
    setFiltradas(filtrado);
    setPage(0); // reinicia paginación al buscar
  }, [search, clases]);

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Clases Registradas
      </Typography>

      <ModaNueva id_tallerista={usuario.id} traer={traerDatos} />

      <Box my={2}>
        <TextField
          label="Buscar por título"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Título</b></TableCell>
                <TableCell align="center"><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtradas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((fila) => (
                  <TableRow key={fila.id}>
                    <TableCell>{fila.titulo}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" gap={1} justifyContent="center">
                        <ModalBorrar id={fila.id} traer={traerDatos} />
                        <Button
                          size="small"
                       
                           variant="outlined" sx={{ color: "#5d4037", borderColor: "#5d4037", fontSize: "0.65rem" }}
                          onClick={() => navigate("/dtc/tallerasistencia/" + fila.id)}
                        >
                          Asistencia
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              {filtradas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No se encontraron clases
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <TablePagination
          component="div"
          count={filtradas.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 15]}
          labelRowsPerPage="Filas por página"
        />
      </Paper>
    </Box>
  );
};

export default TablaNotificaciones;

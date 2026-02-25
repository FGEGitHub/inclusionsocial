import * as React from "react";
import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Asignar from "./Asignarusuarioaoficio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import serviciodtc from "../../../services/dtc";
import Nuevo from "./nuevo";
import EstadisticasFuero from "./estadoficiosfuero";
export default function OficiosTable() {
  const [oficios, setOficios] = useState([]);
  const [filteredOficios, setFilteredOficios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOficio, setSelectedOficio] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [oficioToDelete, setOficioToDelete] = useState(null);
const [confirmDeleteExp, setConfirmDeleteExp] = useState(false);
const [expedienteToDelete, setExpedienteToDelete] = useState(null);
  const [editedOficio, setEditedOficio] = useState({
    id: "",
    oficio: "",
    expediente: "",
    juzgado: "",
    causa: "",
    solicitud: "",
    fecha: "",
  });
const [selectedYear, setSelectedYear] = useState("ALL");
const years = React.useMemo(() => {
  const yearsSet = new Set(
    oficios
      .filter(o => o.fecha)
      .map(o => o.fecha.substring(0, 4))
  );
  return Array.from(yearsSet).sort((a, b) => b - a);
}, [oficios]);
const resumenPorAnio = React.useMemo(() => {
  const conteo = {};

  oficios.forEach((o) => {
    if (!o.fecha) return;

    const anio = o.fecha.substring(0, 4);
    conteo[anio] = (conteo[anio] || 0) + 1;
  });

  // lo devolvemos ordenado por año descendente
  return Object.entries(conteo)
    .sort((a, b) => b[0] - a[0])
    .map(([anio, cantidad]) => ({ anio, cantidad }));
}, [oficios]);
  useEffect(() => {
    traerOficios();
  }, []);
  useEffect(() => {
  const filtered = oficios.filter((oficio) => {
    const matchesSearch = `${oficio.fecha} ${oficio.oficio} ${oficio.juzgado}-${oficio.expediente} ${oficio.causa}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesYear =
      selectedYear === "ALL" ||
      (oficio.fecha && oficio.fecha.startsWith(selectedYear));

    return matchesSearch && matchesYear;
  });

  setFilteredOficios(filtered);
}, [searchTerm, selectedYear, oficios]);
const handleDeleteExpediente = (id) => {
  setExpedienteToDelete(id);
  setConfirmDeleteExp(true);
};
  const traerOficios = async () => {
    const data = await serviciodtc.traaeroficios();
    console.log("Oficios traídos:", data[0]);
    setOficios(data[0]);
    setFilteredOficios(data[0]);
  };
const confirmDeleteExpediente = async () => {
  try {
    await serviciodtc.borrarexpediente(expedienteToDelete);
    traerOficios(); // refresca la lista
    setConfirmDeleteExp(false);
    setExpedienteToDelete(null);
  } catch (error) {
    console.error("Error al borrar expediente:", error);
    alert("No se pudo borrar el expediente.");
  }
};

  useEffect(() => {
    const filtered = oficios.filter((oficio) => {
      const combinedFields = `${oficio.fecha} ${oficio.oficio} ${oficio.juzgado}-${oficio.expediente} ${oficio.causa}`.toLowerCase();
      return combinedFields.includes(searchTerm.toLowerCase());
    });
    setFilteredOficios(filtered);
  }, [searchTerm, oficios]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (oficioId, fechaOficio) => {
    if (!selectedFile) return alert("Selecciona un archivo");

    const formData = new FormData();
    formData.append("archivo", selectedFile);
    formData.append("id_oficio", oficioId);
    formData.append("fecha", fechaOficio);

    await serviciodtc.subirExpediente(formData);
    setSelectedFile(null);
    setSelectedOficio(null);
    traerOficios();
  };

  const handleVerExpediente = async (idExpediente) => {
    try {
      const response = await serviciodtc.obtenerExpediente(idExpediente);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => window.URL.revokeObjectURL(url), 5000);
    } catch (error) {
      console.error("Error al obtener el expediente:", error);
      alert("No se pudo abrir el expediente.");
    }
  };

  const handleOpenModal = (oficio) => {
    // Hereda los datos actuales para edición
    setEditedOficio({
      id: oficio.id,
      oficio: oficio.oficio || "",
      expediente: oficio.expediente || "",
      juzgado: oficio.juzgado || "",
      causa: oficio.causa || "",
      solicitud: oficio.solicitud || "",
      fecha: oficio.fecha || "",
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setEditedOficio({
      ...editedOficio,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateOficio = async () => {
    try {
      await serviciodtc.actualizarOficio(editedOficio);
      traerOficios();
      setModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el oficio:", error);
      alert("No se pudo actualizar el oficio.");
    }
  };

  const handleDeleteOficio = (id) => {
    setOficioToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteOficio = async () => {
    try {
      await serviciodtc.borraroficio(oficioToDelete);
      traerOficios();
      setConfirmDelete(false);
      setOficioToDelete(null);
    } catch (error) {
      console.error("Error al borrar el oficio:", error);
      alert("No se pudo borrar el oficio.");
    }
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <EstadisticasFuero oficios={oficios} />
      <Paper sx={{ mb: 2, p: 2 }}>
  <Typography variant="h6" gutterBottom>
    Resumen por año
  </Typography>

  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell><strong>Año</strong></TableCell>
        <TableCell><strong>Cantidad de oficios</strong></TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {resumenPorAnio.map((row) => (
        <TableRow key={row.anio}>
          <TableCell>{row.anio}</TableCell>
          <TableCell>{row.cantidad}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Paper>
      <Nuevo traer={traerOficios} />
<TextField
  fullWidth
  margin="dense"
  label="Buscar por fecha, oficio, juzgado o causa"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

<div style={{ marginBottom: 16 }}>
  <Button
    variant={selectedYear === "ALL" ? "contained" : "outlined"}
    sx={{ mr: 1 }}
    onClick={() => setSelectedYear("ALL")}
  >
    Todos
  </Button>

  {years.map((year) => (
    <Button
      key={year}
      variant={selectedYear === year ? "contained" : "outlined"}
      sx={{ mr: 1 }}
      onClick={() => setSelectedYear(year)}
    >
      {year}
    </Button>
  ))}
</div>

      <TextField
        fullWidth
        margin="dense"
        label="Buscar por fecha, oficio, juzgado o causa"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer>
        <Table>
        <TableHead>
  <TableRow>
    <TableCell>ID por año</TableCell>
    <TableCell>Fecha</TableCell>
    <TableCell>Personas/usuario</TableCell>
    <TableCell>A través de</TableCell>
    <TableCell>Juzgado-expte</TableCell>
    <TableCell>Causa</TableCell>
    <TableCell>Acciones</TableCell>
    <TableCell>Solicitud</TableCell>
  </TableRow>
</TableHead>
          <TableBody>
            {filteredOficios.map((oficio) => (
              <TableRow key={oficio.id}>
                  <TableCell>{oficio.id_anio}</TableCell>

                <TableCell>{oficio.fecha}</TableCell>
                <TableCell>
                  {oficio.nombre ? (
                    `${oficio.apellido} ${oficio.nombre}`
                  ) : (
                    <>
                      Sin enlazar{" "}
                      <Asignar id_oficio={oficio.id} traer={traerOficios} />
                    </>
                  )}
                </TableCell>
                <TableCell>{oficio.oficio}</TableCell>
                <TableCell>
                  {oficio.juzgado}-{oficio.expediente}
                </TableCell>
                <TableCell>{oficio.causa}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    sx={{ color: "black", borderColor: "black", mr: 1 }}
                    onClick={() => handleOpenModal(oficio)}
                  >
                    Modificar
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteOficio(oficio.id)}
                  >
                    Borrar
                  </Button>

                  <Accordion sx={{ mt: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Ver Expedientes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {oficio.expedientes.length > 0 ? (
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Fecha</TableCell>
                              <TableCell>Acción</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                         {oficio.expedientes.map((exp) => (
  <TableRow key={exp.id}>
    <TableCell>{exp.nombre}</TableCell>
    <TableCell>
      <Button
        variant="outlined"
        onClick={() => handleVerExpediente(exp.id)}
        sx={{ mr: 1 }}
      >
        Ver
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={() => handleDeleteExpediente(exp.id)}
      >
        Borrar
      </Button>
    </TableCell>
  </TableRow>
))}
                          </TableBody>
                        </Table>
                      ) : (
                        <Typography>No hay expedientes</Typography>
                      )}
                      <Button
                        variant="contained"
                        onClick={() => setSelectedOficio(oficio.id)}
                      >
                        Agregar Expediente
                      </Button>
                      {selectedOficio === oficio.id && (
                        <div style={{ marginTop: 10 }}>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf"
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleUpload(oficio.id, oficio.fecha)
                            }
                            disabled={!selectedFile}
                          >
                            Subir
                          </Button>
                        </div>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
                <TableCell>{oficio.solicitud}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Modificar */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Modificar Oficio</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Oficio"
            name="oficio"
            value={editedOficio.oficio}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Expediente"
            name="expediente"
            value={editedOficio.expediente}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Juzgado"
            name="juzgado"
            value={editedOficio.juzgado}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Causa"
            name="causa"
            value={editedOficio.causa}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Solicitud"
            name="solicitud"
            value={editedOficio.solicitud}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Fecha"
            type="date"
            name="fecha"
            value={editedOficio.fecha}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="error">
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateOficio}
            color="primary"
            variant="contained"
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmar Borrado */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>¿Seguro que quieres borrar?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancelar</Button>
          <Button
            onClick={confirmDeleteOficio}
            color="error"
            variant="contained"
          >
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmDeleteExp} onClose={() => setConfirmDeleteExp(false)}>
  <DialogTitle>¿Seguro que quieres borrar este expediente?</DialogTitle>
  <DialogActions>
    <Button onClick={() => setConfirmDeleteExp(false)}>Cancelar</Button>
    <Button
      onClick={confirmDeleteExpediente}
      color="error"
      variant="contained"
    >
      Borrar
    </Button>
  </DialogActions>
</Dialog>
    </Paper>
    
  );
}

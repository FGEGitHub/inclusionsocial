import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import servicioDtc from '../../../services/dtc';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const TablaAlumnosFinesMobile = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [open, setOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const [nuevoAlumno, setNuevoAlumno] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fecha_nacimiento: '',
  });

  const handleOpen = () => {
    setModoEdicion(false);
    setAlumnoEditando(null);
    setNuevoAlumno({
      nombre: '',
      apellido: '',
      dni: '',
      fecha_nacimiento: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setNuevoAlumno({
      nombre: '',
      apellido: '',
      dni: '',
      fecha_nacimiento: '',
    });
    setModoEdicion(false);
    setAlumnoEditando(null);
    setOpen(false);
  };

  const traerAlumnos = async () => {
    try {
      const data = await servicioDtc.traeralumnosfines();
      setAlumnos(data);
    } catch (error) {
      console.error('Error al traer alumnos:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoAlumno({ ...nuevoAlumno, [e.target.name]: e.target.value });
  };

 const handleGuardar = async () => {
  const { nombre, apellido, dni, fecha_nacimiento } = nuevoAlumno;

  if (!nombre || !apellido || !dni || !fecha_nacimiento) {
    alert('Por favor, completá todos los campos.');
    return;
  }

  try {
    if (modoEdicion) {
      await servicioDtc.modificar_alumno_fines(nuevoAlumno);
    } else {
      await servicioDtc.agregarAlumnoFines(nuevoAlumno);
    }
    handleClose();
    traerAlumnos();
  } catch (error) {
    console.error('Error al guardar alumno:', error);
  }
};


  const handleEditar = (alumno) => {
    setModoEdicion(true);
    setAlumnoEditando(alumno);
    setNuevoAlumno({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      dni: alumno.dni,
      fecha_nacimiento: alumno.fecha_nacimiento,
      id: alumno.id,
    });
    setOpen(true);
  };

  useEffect(() => {
    traerAlumnos();
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Lista de Alumnos Fines
      </Typography>
      <Button variant="contained" fullWidth onClick={handleOpen} sx={{ mb: 2 }}>
        Nuevo Alumno
      </Button>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="tabla de alumnos">
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>DNI</strong></TableCell>
              <TableCell><strong>Fecha Nacimiento</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno, index) => (
              <TableRow key={index}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.apellido}</TableCell>
                <TableCell>{alumno.dni}</TableCell>
                <TableCell>{alumno.fecha_nacimiento}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleEditar(alumno)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            {modoEdicion ? 'Editar Alumno' : 'Nuevo Alumno'}
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={nuevoAlumno.nombre}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Apellido"
            name="apellido"
            value={nuevoAlumno.apellido}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="DNI"
            name="dni"
            value={nuevoAlumno.dni}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Fecha de nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={nuevoAlumno.fecha_nacimiento}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleGuardar}>
            Guardar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TablaAlumnosFinesMobile;

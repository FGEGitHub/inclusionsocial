import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Button, Modal, Box, Checkbox, FormControlLabel
} from '@mui/material';

import servicioDtc from "../../../services/dtc";
import Snack from './snackbar';
import Nueva from './nueva';
import Modificar from './editaractividad';
import Borrar from './modalborrar';

import FirmaAugusto from "../../../Assets/firmaaugusto.jpeg";
import FirmaSole from "../../../Assets/firmasole.jpeg";
import logo from "../../../Assets/dtcletra.png";
import logo2 from "../../../Assets/logomuni.png";

const convertImageToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export default function TablaActividades() {
  const [asistencias, setAsistencias] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [includeSignature, setIncludeSignature] = useState(false);

  // Filtros
  const [filtroTrabajador, setFiltroTrabajador] = useState('');
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroFechaCarga, setFiltroFechaCarga] = useState('');
  const [filtroFechaReferencia, setFiltroFechaReferencia] = useState('');

  useEffect(() => {
    const traer = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        setUsuario(usuario);
        const datos = await servicioDtc.traerasitenciasociales(usuario.id);
        setAsistencias(datos);
      }
    };
    traer();
  }, []);
const normalizar = (texto) => {
  return texto
    ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    : "";
};

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignatureChange = (e) => {
    setIncludeSignature(e.target.checked);
  };

  const handleViewFile = async (id) => {
    try {
      const response = await servicioDtc.verArchivo(id);
      if (response?.data) {
        const fileBlob = new Blob([response.data], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(fileBlob);
        window.open(fileUrl, '_blank');
        setTimeout(() => URL.revokeObjectURL(fileUrl), 10000);
      }
    } catch (error) {
      console.error("Error al obtener el archivo PDF:", error);
    }
  };

  const handlePrint = async () => {
    const logoBase64 = await convertImageToBase64(logo);
    const logo2Base64 = await convertImageToBase64(logo2);
    let firmaBase64 = '';

    if (includeSignature && selectedRow) {
      if (selectedRow.id_tallerista === 262) {
        firmaBase64 = await convertImageToBase64(FirmaAugusto);
      } else if (selectedRow.id_tallerista === 267) {
        firmaBase64 = await convertImageToBase64(FirmaSole);
      }
    }

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Impresión</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 14px; }
            .header, .footer { display: flex; justify-content: space-between; align-items: center; }
            .logo { height: 60px; }
            .firma img { height: 100px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${logoBase64}" class="logo" />
            <h2>Dispositivo Territorial Comunitario</h2>
            <img src="${logo2Base64}" class="logo" />
          </div>
          <hr/>
          <p><b>Nombre:</b> ${selectedRow.apellido}, ${selectedRow.nombree}</p>
          <p><b>DNI:</b> ${selectedRow.dni}</p>
          <p><b>Fecha nacimiento:</b> ${selectedRow.fecha_nacimiento}</p>
          <p><b>Fecha actividad:</b> ${selectedRow.fecha_act}</p>
          <p><b>Escuela:</b> ${selectedRow.escuela}</p>
          <p><b>Grado:</b> ${selectedRow.grado}</p>
          <p><b>Detalle:</b><br/> ${(selectedRow.detalle || '').replace(/\./g, '<br/>')}</p>
          <div class="firma">
            ${firmaBase64 ? `<img src="${firmaBase64}" />` : ''}
          </div>
          <div class="footer">
            <p>Secretaría de Salud - Coordinación de Discapacidad e Inclusión Social</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);

    handleClose();
  };
const datosFiltrados = asistencias?.filter((item) => {
  const trabajador = normalizar(item.trabajador_nombre);
  const usuarioCompleto = normalizar(`${item.usuario_nombre} ${item.usuario_apellido}`);
  const fechaCarga = normalizar(item.fecha_carga);
  const fechaReferencia = normalizar(item.fecha_referencia);

  return (
    trabajador.includes(normalizar(filtroTrabajador)) &&
    usuarioCompleto.includes(normalizar(filtroUsuario)) &&
    fechaCarga.includes(normalizar(filtroFechaCarga)) &&
    fechaReferencia.includes(normalizar(filtroFechaReferencia))
  );
});

const formatearFecha = (fecha) => {
  if (!fecha) return "-";
  // Si es formato "YYYY-MM-DD", agregamos la zona horaria local (falsa hora)
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    fecha += 'T00:00:00'; // hora local sin desfase
  }
  const d = new Date(fecha);
  if (isNaN(d)) return fecha;
  return d.toLocaleDateString('es-AR'); // DD/MM/YYYY
};

  return (
    <div>
      <Snack />
      <Nueva
        id_trabajador={usuario?.id}
        traer={async () => {
          const usuario = JSON.parse(localStorage.getItem('loggedNoteAppUser'));
          setUsuario(usuario);
          const novedades = await servicioDtc.traerasitenciasociales(usuario.id);
          setAsistencias(novedades);
        }}
      />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <TextField label="Buscar por quién cargó" size="small" value={filtroTrabajador} onChange={(e) => setFiltroTrabajador(e.target.value)} />
        <TextField label="Buscar por usuario" size="small" value={filtroUsuario} onChange={(e) => setFiltroUsuario(e.target.value)} />
        <TextField type="date" label="Fecha de carga" size="small" InputLabelProps={{ shrink: true }} value={filtroFechaCarga} onChange={(e) => setFiltroFechaCarga(e.target.value)} />
        <TextField type="date" label="Fecha de referencia" size="small" InputLabelProps={{ shrink: true }} value={filtroFechaReferencia} onChange={(e) => setFiltroFechaReferencia(e.target.value)} />
      </div>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Quién cargó</TableCell>
              <TableCell>Usuario</TableCell>
                 <TableCell>Tipo</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Fecha de carga</TableCell>
              <TableCell>Fecha de referencia</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosFiltrados?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.trabajador_nombre}</TableCell>
                <TableCell>
                  {row.usuariodispositivo === "Si"
                    ? `${row.usuario_nombre} ${row.usuario_apellido}`
                    : row.psicologa_nombre}
                </TableCell>
                  <TableCell>{row.trabajo}</TableCell>
                <TableCell>{row.titulo}</TableCell>
         <TableCell>{(row.fecha_carga)}</TableCell>
<TableCell>{formatearFecha(row.fecha_referencia)}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleOpen(row)}>Ver</Button>
                  {row.ubicacion !== "no" && (
                    <Button size="small" onClick={() => handleViewFile(row.id)}>Online</Button>
                  )}
                  {usuario?.id === row.idu && (
                    <>
                      <Modificar
                        id={row.id}
                        fecha_referencia={row.fecha_referencia}
                        titulo={row.titulo}
                           trabajo={row.trabajo}
                        detalle={row.detalle}
                        traer={async () => {
                          const usuario = JSON.parse(localStorage.getItem('loggedNoteAppUser'));
                          setUsuario(usuario);
                          const novedades = await servicioDtc.traerasitenciasociales(usuario.id);
                          setAsistencias(novedades);
                        }}
                      />
                      <Borrar
                        id={row.id}
                        traer={async () => {
                          const usuario = JSON.parse(localStorage.getItem('loggedNoteAppUser'));
                          setUsuario(usuario);
                          const novedades = await servicioDtc.traerasitenciasociales(usuario.id);
                          setAsistencias(novedades);
                        }}
                      />
                    </>
                  )}
                </TableCell>
                <TableCell>
                          <>
<Button variant="outlined" sx={{ color: "#37474f", borderColor: "black", fontSize: "0.65rem", }} color="primary" onClick={() => handleOpen(row)}>
                  Ver detalles
                </Button><br/>
                {row.ubicacion !== "no" && (
                  <Button variant="outlined" sx={{ color: "#37474f", borderColor: "black", fontSize: "0.65rem", }} onClick={() => handleViewFile(row.id)}>
                    Ver Online
                  </Button>
                )}
               <Modificar id={row.id} 
                  fecha_referencia={row.fecha_referencia}
                  titulo={row.titulo}
                  detalle={row.detalle}
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                      setAsistencias(novedades_aux);
                    }
                  }}/>
                    <Borrar id={row.id} 
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                      setAsistencias(novedades_aux);
                    }
                  }}/>
                {usuario ? <>
      
                {usuario.id==row.idu ? <>
                  <Borrar id={row.id} 
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                       setAsistencias(novedades_aux);
                    }
                  }}/>
                <Modificar id={row.id} 
                  fecha_referencia={row.fecha_referencia}
                  titulo={row.titulo}
                  detalle={row.detalle}
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                    
                      setAsistencias(novedades_aux);
                    }
                  }}/>
             
                  
                  </>:<></>}
                
                </>:<></>}
               
        </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de detalles */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, p: 2, bgcolor: 'background.paper', m: 'auto', mt: 10, borderRadius: 2 }}>
          {selectedRow && (
            <>
              <h2>Detalles</h2>
              <p>{selectedRow.detalle}</p>
              <FormControlLabel
                control={<Checkbox checked={includeSignature} onChange={handleSignatureChange} />}
                label="Incluir firma"
              />
              <Button variant="contained" color="success" onClick={handlePrint} sx={{ mt: 1, mr: 1 }}>Imprimir</Button>
              <Button variant="outlined" onClick={handleClose} sx={{ mt: 1 }}>Cerrar</Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

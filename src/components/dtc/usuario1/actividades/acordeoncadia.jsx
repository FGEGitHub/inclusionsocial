import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Borrar from "./borrarcadia";
import '../../estilos.css';
import './paraimprimir.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FirmaAugusto from "../../../../Assets/logocadia.jpg";
import Rocio from '../../../../Assets/rocbon.png'; // id 290
import Gonzalo from '../../../../Assets/gonz.png'; // id 286
import Laura from '../../../../Assets/lauraal.png'; // id 279
import Mar from '../../../../Assets/marburna.png'; // id 282
import Paz from '../../../../Assets/pazizuet.png'; // id 285
import Vir from '../../../../Assets/viraq.png'; // id 280
import Vic from '../../../../Assets/vicsanch.png'; // id 287
import Ol from '../../../../Assets/olgaac.png'; // id 278
import NAt from '../../../../Assets/natacev.png'; // id 277
import Caro from '../../../../Assets/carobernasc.png'; // id 281
import Agus from '../../../../Assets/agfig.png'; // id 291
import Barb from '../../../../Assets/barbfalc.png'; // id 284
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function TablaActividades(props) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [includeSignature, setIncludeSignature] = useState(false);

  // Mapeo de IDs a imágenes
  const imagenes = {
    290: Rocio,
    286: Gonzalo,
    279: Laura,
    282: Mar,
    285: Paz,
    280: Vir,
    287: Vic,
    278: Ol,
    277: NAt,
    281: Caro,
    291: Agus,
    284: Barb,
  };

  const imagenPredeterminada = FirmaAugusto;

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const handlePrint = () => {
    window.print(); // Usa la funcionalidad de impresión del navegador
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Agrega el título del PDF
    doc.text('Detalle de Actividad', 20, 10);
    
    // Agregar detalles de la actividad seleccionada al PDF
    doc.autoTable({
      startY: 20,
      head: [['Campo', 'detalle']],
      body: [
        ['Creado por', selectedRow?.nombre],
        ['Título', selectedRow?.titulo],
        ['Fecha de Carga', selectedRow?.fecha],
        ['Fecha de Intervención', selectedRow?.fecha_act],
      ],
    });

    // Si `includeSignature` es verdadero, agrega la firma
    if (includeSignature) {
      doc.text('Firma:', 20, doc.lastAutoTable.finalY + 10);
      doc.addImage(imagenes[selectedRow?.id_tallerista] || imagenPredeterminada, 'JPEG', 20, doc.lastAutoTable.finalY + 20, 50, 25);
    }

    // Descargar el PDF
    doc.save('actividad_detalle.pdf');
  };

  return (
    <div>
      {props.actividades.length > 0 ? (
        <>
          <Button variant="contained" onClick={toggleDetail}>
            {showDetail ? 'Ocultar Detalle' : 'Mostrar Detalle'}
          </Button>
          <table>
            <thead>
              <tr>
                <th>Chico/a</th>
                <th>Foto</th>
                <th>Título</th>
                <th>Fecha de Carga</th>
                <th>Fecha de Intervención</th>
                {showDetail && <th>Detalle</th>}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {props.actividades.map((row, index) => (
                <tr key={index}>
                  <td>{row.nombre} {row.apellido}</td>
                  <td>
                    <img 
                      src={imagenes[row.id_trabajador] || imagenPredeterminada} 
                      alt="Foto" 
                      style={{ height: '50px' }} 
                    />
                  </td>
                  <td>{row.titulo}</td>
                  <td>{row.fecha_carga}</td>
                  <td>{row.fecha_referencia}</td>
                  {showDetail && <td>{row.detalle}</td>}
                  <td>
                    <Borrar id={row.id} traer={props.traer} />
                    <Button 
                      variant="contained" 
                      color="success" 
                      onClick={() => handleOpen(row)}
                    >
                      Ver / Imprimir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Dialog para ver e imprimir detalles */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Detalles de la Actividad</DialogTitle>
            <DialogContent>
              <Typography variant="h6">Detalles de {selectedRow?.titulo}</Typography>
              <Typography>Creado por: {selectedRow?.nombre}</Typography>
              <Typography>Fecha de Carga: {selectedRow?.fecha}</Typography>
              <Typography>Fecha de Intervención: {selectedRow?.fecha_act}</Typography>
              
              {/* Mostrar firma si includeSignature está activado */}
              {includeSignature && (
                <div>
                  <Typography variant="subtitle1">Firma:</Typography>
                  <img 
                    src={imagenes[selectedRow?.id_tallerista] || imagenPredeterminada} 
                    alt="Firma" 
                    style={{ height: '50px' }} 
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePrint} color="primary">Imprimir</Button>
              <Button onClick={handleDownloadPDF} color="primary">Descargar PDF</Button>
              <Button onClick={handleClose} color="secondary">Cerrar</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography>No hay actividades</Typography>
      )}
    </div>
  );
}

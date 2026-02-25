import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Borrar from "./modalborrar";
import '../../estilos.css';
import logo from "../../../../Assets/dtcletra.png";  // Logo 1
import logo2 from "../../../../Assets/logomuni.png"; // Logo 2
import './paraimprimir.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FirmaAugusto from "../../../../Assets/firmaaugusto.jpeg";
import FirmaSole from "../../../../Assets/firmasole.jpeg";
import Fotosole from "../../../../Assets/fotosole.jpeg";
import Fotoaugusto from "../../../../Assets/fotoaugusto.webp";


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

export default function TablaActividades(props) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedFields, setSelectedFields] = useState({
    dni: true,
    fecha_nacimiento: true,
    fecha_act: true,
    nombre: true,
    apellido: true,
    grado: true,
    escuela: true,
  });
  const [includeSignature, setIncludeSignature] = useState(false);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFieldChange = (event) => {
    setSelectedFields({
      ...selectedFields,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSignatureChange = (event) => {
    setIncludeSignature(event.target.checked);
  };

  const handlePrint = async () => {
    const logoBase64 = await convertImageToBase64(logo);
    const logo2Base64 = await convertImageToBase64(logo2);

    let firmaBase64 = '';
    if (includeSignature) {
      if (selectedRow.id_tallerista == 262) {
        firmaBase64 = await convertImageToBase64(FirmaAugusto);
      } else if (selectedRow.id_tallerista == 267) {
        firmaBase64 = await convertImageToBase64(FirmaSole);
      }
    }

    const row = selectedRow;
    let content = `<div>
      ${selectedFields.apellido && selectedFields.nombre ? `<b>Nombre: ${row.apellido} ${row.nombree}</b><br/>` : ''}
      ${selectedFields.dni ? `<b>DNI: ${row.dni}</b><br/>` : ''}
      ${selectedFields.fecha_nacimiento ? `<b>Fecha de nacimiento: ${row.fecha_nacimiento}</b><br/>` : ''}
      ${selectedFields.fecha_act ? `<b>Fecha: ${row.fecha_act}</b><br/>` : ''}
      ${selectedFields.grado ? `<b>Grado: ${row.grado}</b><br/>` : ''}
      ${selectedFields.escuela ? `<b>Escuela: ${row.escuela}</b><br/>` : ''}
      <p>${(row.detalle || '').replace(/\./g, '<br/>')}</p>
    </div>`;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Impresión de Actividades</title>
          <style>
            body {
              font-family: Arial, sans-serif; /* Cambia la fuente según sea necesario */
              font-size: 14px; /* Tamaño de fuente base */
              color: #000; /* Color de texto principal */
            }
            @media print {
              body * {
                visibility: hidden;
              }
              .print-container, .print-container * {
                visibility: visible;
              }
              .print-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              .print-container .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
              }
              .print-container .header img {
                height: 100px; /* Ajusta la altura del primer logo */
              }
              .print-container .header img.logo2 {
                height: 50px; /* Altura del segundo logo */
              }
              .print-container .header .title {
                flex-grow: 1;
                text-align: center;
              }
              .print-container .header .title h1 {
                font-size: 24px;
                color: #000;
                margin: 0;
              }
              .color-line {
                width: 100%;
                height: 5px;
              }
              .print-container .footer {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                text-align: center;
                font-size: 14px;
                color: #000;
              }
              .print-container table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              .print-container th, .print-container td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
              .firma {
                margin-top: 20px;
                text-align: center;
              }
              .firma img {
                height: 100px;
                margin-bottom: 20px;
              }
              .logo-footer {
                position: fixed;
                bottom: 0;
                left: 0;
                height: 50px;
              }
            }

            @keyframes colorTransition {
              0% {
                border-bottom: 5px solid blue; /* Azul */
              }
              25% {
                border-bottom: 5px solid green; /* Verde */
              }
              50% {
                border-bottom: 5px solid yellow; /* Amarillo */
              }
              75% {
                border-bottom: 5px solid red; /* Rojo */
              }
              100% {
                border-bottom: 5px solid blue; /* Vuelve a Azul */
              }
            }
            /* Estilos para la tabla en la vista normal */
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 16px;
              text-align: left;
              color: #333; /* Color de texto para celdas */
            }
            th, td {
              padding: 12px 15px;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f4f4f4;
              color: #333;
              font-weight: bold;
            }
            tr:nth-of-type(even) {
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="header">
              <img src="${logoBase64}" alt="Logo 1" />
              <div class="title">
                <h1>Dispositivo territorial comunitario</h1>
              </div>
              <img src="${logo2Base64}" alt="Logo 2" class="logo2" />
            </div>
            <div class="color-line" style="animation: colorTransition 8s linear infinite;"></div>
            ${content}
            <div class="firma">
              ${firmaBase64 ? `<img src="${firmaBase64}" alt="Firma" />` : ''}
            </div>
            <div class="footer">
              Secretaría de Salud - Coordinación de Discapacidad e Inclusión Social
              <img src="${logoBase64}" alt="Logo Footer" class="logo-footer" />
            </div>
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

  const toggleDetail = () => {
    setShowDetail(!showDetail);
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
                <th>Creado por</th>
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
                  <td>{row.nombre}</td>
                  <td>
                    {row.id_tallerista == 262 && <img src={Fotoaugusto} alt="Foto Augusto" style={{ height: '50px' }} />}
                    {row.id_tallerista == 267 && <img src={Fotosole} alt="Foto Sole" style={{ height: '50px' }} />}
                  </td>
                  <td>{row.titulo}</td>
                  <td>{row.fecha}</td>
                  <td>{row.fecha_act}</td>
                  {showDetail && <td>{row.detalle}</td>}
               
                  <td>
                    <Borrar id={row.id} traer={props.traer} />
                    <Button 
                      variant="contained" 
                      color="success" 
                      onClick={() => handleOpen(row)}
                    >
                      Imprimir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <Typography>No hay actividades </Typography>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Seleccione los campos a imprimir
          </Typography>
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedFields.nombre} 
                onChange={handleFieldChange} 
                name="nombre" 
              />
            }
            label="Nombre"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedFields.apellido} 
                onChange={handleFieldChange} 
                name="apellido" 
              />
            }
            label="Apellido"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedFields.dni} 
                onChange={handleFieldChange} 
                name="dni" 
              />
            }
            label="DNI"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedFields.fecha_nacimiento} 
                onChange={handleFieldChange} 
                name="fecha_nacimiento" 
              />
            }
            label="Fecha de Nacimiento"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedFields.fecha_act} 
                onChange={handleFieldChange} 
                name="fecha_act" 
              />
            }
            label="Fecha"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedFields.grado} 
                onChange={handleFieldChange} 
                name="grado" 
              />
            }
            label="Grado"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedFields.escuela} 
                onChange={handleFieldChange} 
                name="escuela" 
              />
            }
            label="Escuela"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={includeSignature} 
                onChange={handleSignatureChange} 
                name="firma" 
              />
            }
            label="Incluir Firma"
          />
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Imprimir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

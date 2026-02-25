import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Borrar from "./modalborrarcosa";
import '../estilos.css';
import logo from "../../../Assets/dtcletra.png";  // Logo 1
import logo2 from "../../../Assets/logomuni.png"; // Logo 2
import '../usuario1/actividades/paraimprimir.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FirmaAugusto from "../../../Assets/firmaaugusto.jpeg";
import FirmaSole from "../../../Assets/firmasole.jpeg";
import Fotosole from "../../../Assets/fotosole.jpeg";
import Fotoaugusto from "../../../Assets/fotoaugusto.webp";
import servicioDtc from "../../../services/dtc"
import Nueva from './nuevaccosa';
import axios from "axios"


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
  const [asistencias, setAsitencias] = useState();
  const [usuario, setUsuario] = useState([]);
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

  useEffect(() => {
    const traer = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        setUsuario(usuario);
        const novedades_aux = await servicioDtc.traercosassole(usuario.id);
        setAsitencias(novedades_aux);
      }
    };
    traer();
  }, []);

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
      if (selectedRow.id_tallerista === 262) {
        firmaBase64 = await convertImageToBase64(FirmaAugusto);
      } else if (selectedRow.id_tallerista === 267) {
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
              font-family: Arial, sans-serif;
              font-size: 14px;
              color: #000;
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
                height: 100px;
              }
              .print-container .header img.logo2 {
                height: 50px;
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
                border-bottom: 5px solid blue;
              }
              25% {
                border-bottom: 5px solid green;
              }
              50% {
                border-bottom: 5px solid yellow;
              }
              75% {
                border-bottom: 5px solid red;
              }
              100% {
                border-bottom: 5px solid blue;
              }
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 16px;
              text-align: left;
              color: #333;
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
  const openFile = async (id) => {
    try {
        // Realizar la solicitud para traer el archivo como un blob
        const response = await servicioDtc.traerarcchivoo(id, {
            responseType: 'blob' // Asegurarse de que la respuesta sea un blob para manejar archivos binarios
        });

        console.log('Respuesta de la API:', response);

        // Determinar el tipo de archivo
        const mimeType = response.data.type;
        const url = window.URL.createObjectURL(new Blob([response.data], { type: mimeType }));

        // Crear un enlace temporal para abrir o descargar el archivo
        const link = document.createElement('a');
        link.href = url;

        // Obtener el nombre del archivo del encabezado 'content-disposition' si está disponible
        const contentDisposition = response.headers['content-disposition'];
        const fileName = contentDisposition
            ? contentDisposition.split('filename=')[1].replace(/"/g, '')
            : `archivo_${id}.${mimeType.split('/')[1]}`; // Nombre por defecto con extensión según el mimeType

        // Si el archivo es visualizable (PDF, imágenes, etc.), abrir en nueva pestaña
        if (mimeType === 'application/pdf' || mimeType.startsWith('image/')) {
            window.open(url, '_blank');
        } else {
            // Para descargar el archivo
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Liberar la URL creada para evitar fugas de memoria
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al abrir el archivo', error);
    }
};

const downloadFile = async (id) => {
  try {
      // Realizar la solicitud para traer el archivo como un blob
      const response = await servicioDtc.traerarcchivoo(id, {
          responseType: 'blob' // Especificar que la respuesta sea un blob para manejar archivos binarios
      });

      console.log('Respuesta de la API:', response);

      // Determinar el tipo de archivo
      const mimeType = response.data.type || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const url = window.URL.createObjectURL(new Blob([response.data], { type: mimeType }));

      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement('a');
      link.href = url;

      // Obtener el nombre del archivo del encabezado 'content-disposition' si está disponible
      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : `archivo_${id}.docx`; // Nombre por defecto con extensión .docx si no se proporciona en el encabezado

      // Configurar el atributo de descarga con el nombre del archivo
      link.setAttribute('download', fileName);
      document.body.appendChild(link);

      // Simular un clic en el enlace para iniciar la descarga
      link.click();

      // Eliminar el enlace temporal
      document.body.removeChild(link);

      // Liberar la URL creada para evitar fugas de memoria
      window.URL.revokeObjectURL(url);
  } catch (error) {
      console.error('Error al descargar el archivo', error);
  }
};

  return (
    <div className="App">
      <Nueva
      id_trabajador={usuario.id}
      traer={ async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON);
          setUsuario(usuario);
          const novedades_aux = await servicioDtc.traercosassole(usuario.id);
          setAsitencias(novedades_aux);
        }
      }}/>
      <Typography variant="h5" gutterBottom>
       Archivos
      </Typography>
      <table>
        <thead>
          <tr>
          <th>Creado por</th>
                <th>Foto</th>
                <th>Título</th>
                <th>Fecha de Carga</th>
                {showDetail &&<> <th>Detalle</th>
                  <th>Fecha de Referencia</th>
                  </>}
                  <th>Acciones</th>
              
          </tr>
        </thead>
        <tbody>
          {asistencias && asistencias.map((row, index) => (
            <tr key={index}>
              <td>{row.nombre}</td>
                  <td>
                    {row.id_tallerista == 262 && <img src={Fotoaugusto} alt="Foto Augusto" style={{ height: '50px' }} />}
                    {row.id_tallerista == 267 && <img src={Fotosole} alt="Foto Sole" style={{ height: '50px' }} />}
                  </td>
                  <td>{row.titulo}</td>
                  <td>{row.fecha_carga}</td>
                 
                  {showDetail && <><td>{row.detalle}</td>
                   <td>{row.fecha_referencia}</td></>}
               
                  <td>
                <Button variant="contained" color="primary" onClick={() => handleOpen(row)}>
                  Ver detalles
                </Button>
                {row.ubicacion =="no" ? <></>:<> <Button variant="contained" color="secondary" onClick={() => openFile(row.id)}>
                  Ver Online
                </Button></>}
                 {row.ubicacion =="no" ? <></>:<> <Button variant="contained" color="secondary" onClick={() => downloadFile(row.id)}>
                 Descargar
                </Button></>}
                <Borrar id={row.id} 
                traer={ async () => {
                  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                  if (loggedUserJSON) {
                    const usuario = JSON.parse(loggedUserJSON);
                    setUsuario(usuario);
                    const novedades_aux = await servicioDtc.traercosassole(usuario.id);
                    setAsitencias(novedades_aux);
                  }
                }}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={open} onClose={handleClose}>
        <Box>
          {selectedRow && (
            <div>
              <h2>Detalles</h2>
              <p>{selectedRow.detalle}</p>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeSignature}
                    onChange={handleSignatureChange}
                    name="includeSignature"
                    color="primary"
                  />
                }
                label="Incluir Firma"
              />
    
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

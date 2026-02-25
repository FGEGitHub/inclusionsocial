import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import servicioDtc from '../../../services/dtc';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Buscador from '../usuario1/turnos/calendariobusquedadeturnos';
import Asignar from './asignar';
import Agregarvariasfechas from './agregarvariasfechas';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import Clasificar from '../usuario1/turnos/clasific';
import Borrar from '../usuario1/turnos/borrar';
import Skeleton from '@mui/material/Skeleton';
import logo from "../../../Assets/logomuni.png";
import Nuevo from "../usuario1/turnos/nuevoturno"
import MUIDataTable from "mui-datatables";
import Modalimprimir from '../usuario1/turnos/modalimprimir'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MobileFriendlyTable = (props) => {
  const [currentDate, setCurrentDate] = useState('');
  const [datos, setDatos] = useState();
  const [fecha, setFecha] = useState();
  const [usuario, setUsuario] = useState();
  const [form, setForm] = useState();
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  useEffect(() => {
    traer();
  }, [fechaSeleccionada]);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    const user = JSON.parse(loggedUserJSON);
    setUsuario(user);

    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    props.fecha === undefined ? setCurrentDate(formattedDate) : setCurrentDate(props.fecha);
    if(user.nivel==40 || user.nivel==41 ){
      const historial = await servicioDtc.traerparaturnoscadia(
        props.fecha === undefined
          ? { fecha: formattedDate, id: props.idt === undefined ? user.id : props.idt }
          : { fecha: props.fecha, id: props.idt === undefined ? user.id : props.idt }
      );
  
      setDatos(historial);
    }else{
      const historial = await servicioDtc.listatodosdeldtc(
        props.fecha === undefined
          ? { fecha: formattedDate, id: props.idt === undefined ? user.id : props.idt }
          : { fecha: props.fecha, id: props.idt === undefined ? user.id : props.idt }
      );
  
      setDatos(historial);
    }
  
  };

  const handlePrint = (row) => {
    const doc = new jsPDF();
  
    // Tamaño personalizado del logo
    const logoWidth = 40; // Ajusta el ancho del logo
    const logoHeight = 10; // Ajusta la altura del logo
  
    // Añadir imagen (logo) al PDF
    doc.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight); // Ajuste de posición para que esté alineado a la izquierda
    
    // Título del encabezado alineado a la derecha del logo
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("DISPOSITIVO TERRITORIAL COMUNITARIO", 60, 20); // Ajuste de posición
    doc.setFontSize(12);
    doc.text("Municipalidad de Corrientes", 60, 30); // Ajuste de posición
    
    // Línea divisoria degradada con colores alternados cada 1 cm
    const colors = [
      [0, 102, 204], // Celeste
      [0, 153, 51],  // Verde
      [153, 0, 51],  // Bordó
      [255, 204, 0]  // Amarillo
    ];
  
    let startX = 10; // Punto inicial en el eje X
    const lineY = 40; // Posición de la línea en el eje Y
    const lineWidth = 2; // Grosor de la línea
    const cmToPts = 28.35; // Conversión de 1 cm a puntos en PDF
    const segmentWidth = cmToPts; // Ancho de cada segmento en puntos (equivalente a 1 cm)
    const pageWidth = doc.internal.pageSize.width; // Ancho de la página
  
    let colorIndex = 0;
    
    while (startX < pageWidth) {
      const color = colors[colorIndex % colors.length]; // Alternar colores
      doc.setDrawColor(...color);
      doc.setLineWidth(lineWidth);
      doc.line(startX, lineY, startX + segmentWidth, lineY); // Dibujar el segmento de línea
      
      startX += segmentWidth; // Moverse al siguiente segmento
      colorIndex++; // Cambiar al siguiente color
    }
  
    // Datos del turno justificado a la izquierda
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`USUARIO: ${row.nombre || "N/A"}`, 10, 60);
    doc.text(`FECHA: ${row.fecha || "N/A"}`, 10, 70);
    doc.text(`HORA: ${row.detalle || "N/A"}`, 10, 80);
   
    doc.text(`PROF.: ${row.nombrepsiq== "Vale" ? "Valeria apellido" :row.nombrepsiq== "Sofia" ? "Sofia apellido" :"" || "N/A"}`, 10, 90);
  
    // Pie de página centrado
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Secretaría De Salud", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 30, { align: "center" });
    doc.text("Subsecretaría de Discapacidad e Inclusión Social", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 20, { align: "center" });
    doc.text("Calle 658 Nº 2100. Barrio Independencia", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
  
    // Guardar PDF
    doc.save(`${row.nombre}_turno.pdf`);
  };
  function customnombre(dataIndex, rowIndex, data, onClick) {
    return (
        <>

{datos[0][dataIndex]['nombre'] ? <>{datos[0][dataIndex]['nombre']} {datos[0][dataIndex]['apellido']} {datos[0][dataIndex]['agendadopor'] ? <>cargado por {datos[0][dataIndex]['agendadopor']}</>:<></>} el dia  {datos[0][dataIndex]['hora']}</> :<>Disponible</>}

        </>
    );
}

function customacciones(dataIndex, rowIndex, data, onClick) {
  return (
      <>

                        
<Clasificar 

              id={datos[0][dataIndex].id}
              traer={async (fecha) => {
                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                const user = JSON.parse(loggedUserJSON);
                setUsuario(user);
                if(user.nivel==40 || user.nivel==41 ){
                  const historial = await servicioDtc.traertodoslosturnosfechacadia(fecha.fecha);
                  setDatos(historial);
                  setFecha(fecha);
                }else{
                  const historial = await servicioDtc.traertodoslosturnosfecha(fecha.fecha);
                setDatos(historial);
                setFecha(fecha);
                }
              
              }}/>
           
              <Borrar 
               id={datos[0][dataIndex].id}
               traer={async () => {
                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                const user = JSON.parse(loggedUserJSON);
                setUsuario(user);
                if(user.nivel==40 || user.nivel==41 ){
                  const historial = await servicioDtc.traertodoslosturnosfechacadia(fecha);
                  setDatos(historial);
                  setFecha(fecha);
                }else{
                  const historial = await servicioDtc.traertodoslosturnosfecha(fecha);
                setDatos(historial);
                setFecha(fecha);
                }
              
              }} />

      </>
  );
}
function customaagendar(dataIndex, rowIndex, data, onClick) {
  return (
      <>
{datos[1] ? <>
<Asignar id={datos[0][dataIndex].id} chicos={datos[1]} chicos2={datos[2]} traer={async () => {
                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                const user = JSON.parse(loggedUserJSON);
                setUsuario(user);
                if(user.nivel==40 || user.nivel==41 ){
                  const historial = await servicioDtc.traertodoslosturnosfechacadia(fecha);
                  setDatos(historial);
                  setFecha(fecha);
                }else{
                  const historial = await servicioDtc.traertodoslosturnosfecha(fecha);
                setDatos(historial);
                setFecha(fecha);
                }
              
              }}
              fecha={fecha} /></>:<></>}
             
               { datos[0][dataIndex].estado == 'Agendado' ? <>   <Modalimprimir 
                nombrepersona={datos[0][dataIndex].nombre+ " "+ datos[0][dataIndex].apellido}
               nombrepsic={datos[0][dataIndex].nombrepsiq}
                                                       fecha={datos[0][dataIndex].fecha}
                                                       detalle={datos[0][dataIndex].detalle}


                                                       /> </>:<></>}
      </>
  );
}

  const columns = [
   
  {
    name: "nombre",
    options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          customnombre(
                dataIndex,
                rowIndex,
                // overbookingData,
                // handleEditOpen
            )
    }

},
{
  name: "estado",
  label: "estado",

},
{
  name: "nombrepsiq",
  label: "psicologo",
  
},
{
  name: "detalle",
  label: "horario",
  
},

{
  name: "presente",
  label: "asistencia",
  
},


      {
        name: "fecha",
        label: "fecha de cita",

    },
  
    
    {
      name: "agendar",
      options: {
          customBodyRenderLite: (dataIndex, rowIndex) =>
            customaagendar(
                  dataIndex,
                  rowIndex,
                  // overbookingData,
                  // handleEditOpen
              )
      }
  
  },
  {
    name: "acciones",
    options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          customacciones(
                dataIndex,
                rowIndex,
                // overbookingData,
                // handleEditOpen
            )
    }

},
    


  ];
   
  const options = {
    setTableProps: () => {
        return {
          style: {
            backgroundColor: "#e3f2fd", // Cambia el color de fondo de la tabla
          },
        };
      },
      customHeadRender: (columnMeta, handleToggleColumn) => ({
        TableCell: {
          style: {
            backgroundColor: '#1565c0', // Cambia el color de fondo del encabezado
            color: 'white', // Cambia el color del texto del encabezado
          },
        },
      }),
    selectableRows: false, // Desactivar la selección de filas
    stickyHeader: true,
    selectableRowsHeader: false,
    selectableRowsOnClick: true,
    responsive: 'scroll',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
    downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
    print: true,
    filter: true,
    viewColumns: true,
    pagination: true,

    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "RESETEAR",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/ocultar columnas de la tabla",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },

  };
  return (
    <div>
      
      {datos ? (
        <>
          <Typography variant="p" gutterBottom>
            Fecha: {currentDate}
          </Typography>

          <Buscador
            chicos={datos[1]}
            fecha={currentDate}
            
            usuario={usuario}
            traer={async (fecha) => {
              const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
              setForm({fecha:fecha})
              const user = JSON.parse(loggedUserJSON);
              setUsuario(user);
              if(user.nivel==40 || user.nivel==41 ){
                const historial = await servicioDtc.traertodoslosturnosfechacadia(fecha);
                setDatos(historial);
                setFecha(fecha);
              }else{
                const historial = await servicioDtc.traertodoslosturnosfecha(fecha);
              setDatos(historial);
              setFecha(fecha);
              }
           
            }}
          />
          <Agregarvariasfechas/>
          {form ? <><Nuevo fecha={form.fecha}
           turnosdeldia={datos[0]}
 traer={async (fecha) => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
  const user = JSON.parse(loggedUserJSON);
  setUsuario(user);
  if(user.nivel==40 || user.nivel==41 ){
    const historial = await servicioDtc.traertodoslosturnosfechacadia(form.fecha);
    setDatos(historial);
    setFecha(form.fecha);
  }else{
    const historial = await servicioDtc.traertodoslosturnosfecha(form.fecha);
  setDatos(historial);
  setFecha(form.fecha);
  }

}}/></>:<></>}
        {datos && datos[0].length<400 ?  <MUIDataTable

title={"Lista de Turnos"}
data={datos[0]}
columns={columns}
actions={[
    {
        icon: 'save',
        tooltip: 'Save User',
        onClick: (event, rowData) => alert("You saved " + rowData.name)
    }
]}
options={options}


/>:<></> }
          
        </>
      ) : (
        <></>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default MobileFriendlyTable;

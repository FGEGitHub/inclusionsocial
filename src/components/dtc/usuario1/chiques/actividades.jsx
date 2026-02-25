import servicioDtc from '../../../../services/dtc'
import ModaNueva from './nueva'
import React, { useEffect, useState } from "react";
import Modalver from './modalver'
import MUIDataTable from "mui-datatables";
import { useNavigate, useParams } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { useMediaQuery, useTheme } from '@material-ui/core';

// =====================
// ESTILOS TABLA
// =====================
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
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));

// =====================
// 🎨 GRAFICO TORTA SIN LIBRERIAS
// =====================
const PieChartCanvas = ({ data }) => {

  useEffect(() => {
    if (!data || data.length === 0) return;

    const canvas = document.getElementById("pieChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const total = data.reduce((a, b) => a + b.value, 0);
    if (total === 0) return;

    ctx.clearRect(0, 0, 300, 300);

    let startAngle = 0;
    const colors = ["#4caf50", "#f44336", "#2196f3"];

    data.forEach((slice, i) => {
      const sliceAngle = (slice.value / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.arc(150, 150, 120, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();

      startAngle += sliceAngle;
    });

  }, [data]);

  return (
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      <canvas id="pieChart" width="300" height="300"></canvas>

      <div style={{ display: "flex", justifyContent: "center", gap: 20, fontWeight: "bold" }}>
        <span style={{ color: "#4caf50" }}>■ En tratamiento</span>
        <span style={{ color: "#f44336" }}>■ Judicializados</span>
        <span style={{ color: "#2196f3" }}>■ Sin tratamiento</span>
      </div>
    </div>
  );
};

// =====================
// COMPONENTE PRINCIPAL
// =====================
const TablaNotificaciones = () => {

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [chicos, setchicos] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [currentDate, setCurrentDate] = useState('');
  const [grafico, setGrafico] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    traer();
  }, []);

  const options = {
    selectableRows: false,
    stickyHeader: true,
  };

  // =====================
  // TRAER ACTIVIDADES + ESTADISTICAS
  // =====================
  const traer = async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (!loggedUserJSON) return;

      const usuario = JSON.parse(loggedUserJSON);
      setUsuario(usuario);

      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      setCurrentDate(formattedDate);

      const historial = await servicioDtc.traeractividades({
        fecha: formattedDate,
        id_usuario: usuario.id
      });

      // ACTIVIDADES
      setchicos(historial?.[0] || []);

      // ====== ESTADISTICAS ======
      const stats = historial?.[1];
      if (stats) {

        const total = Number(stats.cantidad_usuarios || 0);
        const tratamiento = Number(stats.cantidad_tratamiento || 0);
        const judicializados = Number(stats.cantidad_judicializados || 0);

        // judicializados están dentro del tratamiento
        const tratamientoReal = tratamiento - judicializados;
        const sinTratamiento = total - tratamiento;

        setGrafico([
          { name: "Tratamiento", value: tratamientoReal },
          { name: "Judicializados", value: judicializados },
          { name: "Sin Tratamiento", value: sinTratamiento },
        ]);
      }

    } catch (e) {
      console.error("ERROR traer", e);
    }
  };

  // =====================
  // BOTON VER
  // =====================
  const CutomButtonsRenderer = (dataIndex) => (
    <Tooltip title="Ver">
      <Modalver
        id={chicos[dataIndex].id}
        detalle={chicos[dataIndex].detalle}
        titulo={chicos[dataIndex].titulo}
        traer={traer}
      />
    </Tooltip>
  );

  // =====================
  // COLUMNAS TABLA
  // =====================
  const columns = [
    { name: "fecha", label: "Fecha" },
    { name: "titulo", label: "Titulo" },
    {
      name: "Acciones",
      options: {
        customBodyRenderLite: (dataIndex) => CutomButtonsRenderer(dataIndex)
      }
    },
  ];

  return (
    <div style={{ padding: 20 }}>

      {/* ================== GRAFICO ARRIBA ================= */}
      <h2>📊 Situación Psicosocial General</h2>
      <PieChartCanvas data={grafico} />

      <hr />

      {/* ================== ACTIVIDADES ================= */}
      <h2>📋 Lista de actividades</h2>

      <ModaNueva id_usuario={usuario.id} fecha={currentDate} traer={traer} />

      {chicos.length > 0 ? (
        isMatch ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "black", color: "white" }}>Fecha</TableCell>
                  <TableCell style={{ backgroundColor: "black", color: "white" }}>Titulo</TableCell>
                  <TableCell style={{ backgroundColor: "black", color: "white" }}>Ver</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {chicos.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.fecha}</StyledTableCell>
                    <StyledTableCell>{row.titulo}</StyledTableCell>
                    <StyledTableCell>
                      <Modalver id={row.id} detalle={row.detalle} titulo={row.titulo} traer={traer} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        ) : (
          <MUIDataTable
            title={"Lista de actividades"}
            data={chicos}
            columns={columns}
            options={options}
          />
        )
      ) : (
        <h3>El día de hoy no hay actividades</h3>
      )}

    </div>
  );
};

export default TablaNotificaciones;
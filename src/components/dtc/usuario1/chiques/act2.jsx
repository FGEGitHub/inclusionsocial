import servicioDtc from '../../../../services/dtc'
import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery, useTheme } from "@mui/material"; // ✅ MUI v5
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

// 🎨 COLORES FIJOS PARA GRAFICO PRINCIPAL
const COLOR_MAP = {
  "En Tratamiento": "#2e7d32",
  "Judicializados": "#c62828",
  "Sin Tratamiento": "#1565c0",
  "No Judicializados": "#ff9800",
  "Total": "#9c27b0",
};

// 🎨 COLORES AUTOMATICOS PARA CATEGORIAS DINAMICAS
const randomColor = (i) => {
  const colors = ["#2196f3","#e91e63","#ff9800","#4caf50","#9c27b0","#00bcd4","#ffc107"];
  return colors[i % colors.length];
};

// =====================
// PIE CHART
// =====================
const PieChartCanvas = ({ data, onSliceClick }) => {
  const canvasRef = useRef(null);
  const slicesRef = useRef([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const total = data.reduce((a, b) => a + b.value, 0);
    if (!total) return;

    ctx.clearRect(0, 0, 400, 400);
    slicesRef.current = [];
    let startAngle = 0;

    data.forEach((slice, index) => {
      const sliceAngle = (slice.value / total) * 2 * Math.PI;
      const percent = ((slice.value / total) * 100).toFixed(1);

      slicesRef.current.push({
        startAngle,
        endAngle: startAngle + sliceAngle,
        name: slice.name,
        value: slice.value,
        percent,
      });

      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.arc(200, 200, 150, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = COLOR_MAP[slice.name] || randomColor(index);
      ctx.fill();

      const mid = startAngle + sliceAngle / 2;
      const x = 200 + Math.cos(mid) * 90;
      const y = 200 + Math.sin(mid) * 90;
      ctx.fillStyle = "white";
      ctx.font = "bold 14px Arial";
      ctx.fillText(`${percent}%`, x - 15, y);

      startAngle += sliceAngle;
    });
  }, [data]);

  const detectSlice = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 200;
    const y = e.clientY - rect.top - 200;
    const angle = Math.atan2(y, x);
    const fixed = angle < 0 ? angle + 2 * Math.PI : angle;
    return slicesRef.current.find(s => fixed >= s.startAngle && fixed <= s.endAngle);
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        onClick={(e) => {
          const s = detectSlice(e);
          if (s && onSliceClick) onSliceClick(s.name);
        }}
        onMouseMove={(e) => {
          const s = detectSlice(e);
          if (s) setTooltip({ x: e.clientX, y: e.clientY, text: `${s.name}: ${s.value} (${s.percent}%)` });
          else setTooltip(null);
        }}
        onMouseLeave={() => setTooltip(null)}
        style={{ cursor: "pointer", borderRadius: "50%", boxShadow: "0 0 15px rgba(0,0,0,.3)" }}
      />

      {tooltip && (
        <div style={{
          position: "fixed",
          left: tooltip.x + 10,
          top: tooltip.y + 10,
          background: "black",
          color: "white",
          padding: "6px 10px",
          borderRadius: 5,
          fontSize: 12,
          zIndex: 9999
        }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

// =====================
// COMPONENTE PRINCIPAL
// =====================
const TablaNotificaciones = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
const [totalVisitas, setTotalVisitas] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [grafico, setGrafico] = useState([]);
  const [graficoTratamiento, setGraficoTratamiento] = useState(null);
  const [graficoBackend2, setGraficoBackend2] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    tratamiento: 0,
    judicializados: 0,
    sinTratamiento: 0,
    noJudicializados: 0,
  });

  useEffect(() => {
    traer();
  }, []);

  // ===================== TRAER DATOS =====================
  const traer = async () => {
    try {
      const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
      if (!loggedUserJSON) return;
      const usuario = JSON.parse(loggedUserJSON);

      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

      const historial = await servicioDtc.traerestadisticas({
        fecha: formattedDate,
        id_usuario: usuario.id
      });

      console.log("HISTORIAL", historial);

      // ================= POSICION 1 =================
      const s = historial?.[1];
      if (s) {
        const total = Number(s.cantidad_usuarios || 0);
        const tratamiento = Number(s.cantidad_tratamiento || 0);
        const judicializados = Number(s.cantidad_judicializados || 0);
        const sinTratamiento = total - tratamiento;
        const noJudicializados = tratamiento - judicializados;

        setStats({ total, tratamiento, judicializados, sinTratamiento, noJudicializados });

        setGrafico([
          { name: "En Tratamiento", value: tratamiento },
          { name: "Sin Tratamiento", value: sinTratamiento },
        ]);
      }

      // ================= POSICION 2 DINAMICO =================
      const s2 = historial?.[2];

      // si viene como {OTRAS2: []}
      const arrayData = s2?.OTRAS2 || s2;

      if (Array.isArray(arrayData)) {
        const normalizado = {};

        const FIX = {
          "Visita Domicialiria": "Visita Domiciliaria",
          "Visista Domiciliaria": "Visita Domiciliaria",
        };

        arrayData.forEach(item => {
          const nombre = FIX[item.name?.trim()] || item.name?.trim() || "Sin dato";
          const valor = Number(item.value || 0);

          if (!normalizado[nombre]) normalizado[nombre] = 0;
          normalizado[nombre] += valor;
        });

        const dataGrafico = Object.entries(normalizado).map(([name, value]) => ({
  name,
  value
}));

// 🔥 SUMAR TOTAL DE VISITAS
const total = dataGrafico.reduce((acc, item) => acc + item.value, 0);
setTotalVisitas(total);

setGraficoBackend2(dataGrafico);
      }

    } catch (e) {
      console.error("❌ ERROR traer", e);
    }
  };

  // ================= CLICK TORTA =================
  const handleSliceClick = (name) => {
    if (name === "En Tratamiento") {
      setNivel(2);
      setGraficoTratamiento([
        { name: "Judicializados", value: stats.judicializados },
        { name: "No Judicializados", value: stats.noJudicializados },
      ]);
    }
  };

  const volver = () => {
    setGraficoTratamiento(null);
    setNivel(1);
  };

  return (
    <div style={{ padding: 20 }}>

      {/* ================= KPI CARDS ================= */}
      <Grid container spacing={2}>
        {[
          { title: "Total Usuarios", value: stats.total, color: "#212121" },
          { title: "En Tratamiento", value: stats.tratamiento, color: "#2e7d32" },
          { title: "No Judicializados", value: stats.noJudicializados, color: "#ff9800" },
          { title: "Judicializados", value: stats.judicializados, color: "#c62828" },
          { title: "Sin Tratamiento", value: stats.sinTratamiento, color: "#1565c0" },
        ].map((k, i) => (
          <Grid item xs={12} md={2} key={i}>
            <Card sx={{ background: k.color, color: "white" }}>
              <CardContent>
                <Typography>{k.title}</Typography>
                <Typography variant="h3">{k.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= GRAFICOS ================= */}
      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="h5" align="center">📊 Situación Psicosocial</Typography>

        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: isMobile ? "wrap" : "nowrap" }}>

          {/* GRAFICO 1 */}
          <div>
            <Typography align="center" fontWeight="bold">General</Typography>
            <PieChartCanvas data={grafico} onSliceClick={handleSliceClick} />
          </div>

          {/* GRAFICO 2 BACKEND */}
          {graficoBackend2.length > 0 && (
            <div>
              <Typography align="center" fontWeight="bold">
  Otras Intervenciones
</Typography>

<Typography align="center" sx={{ fontSize: 18, fontWeight: "bold", color: "#673ab7" }}>
  Total visitas: {totalVisitas}
</Typography>
              <PieChartCanvas data={graficoBackend2} />

              {/* LEYENDA */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:10 }}>
                {graficoBackend2.map((g,i)=>(
                  <span key={i} style={{ color: randomColor(i) }}>
                    ● {g.name} ({g.value})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* GRAFICO DETALLE */}
          {graficoTratamiento && (
            <div>
              <Typography align="center" fontWeight="bold">Detalle Tratamiento</Typography>
              <PieChartCanvas data={graficoTratamiento} />
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <Button variant="contained" onClick={volver}>
                  ⬅ Cerrar detalle
                </Button>
              </div>
            </div>
          )}
        </div>

      </Card>

    </div>
  );
};

export default TablaNotificaciones;
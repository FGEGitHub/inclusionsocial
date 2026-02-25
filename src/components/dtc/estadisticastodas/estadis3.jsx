import React, { useEffect, useState } from "react";
import servicioDtc from "../../../services/dtc";

const App = () => {
  const [chicos, setChicos] = useState([]);
  const [asistencias2025, setAsistencias2025] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [colaciones, setColaciones] = useState([]);
  const [meriendas, setMeriendas] = useState([]);
  const [talleres, setTalleres] = useState([]); // 👈 NUEVO

  useEffect(() => {
    const traerDatos = async () => {
      try {
        const data = await servicioDtc.traerestadisticastodas();
        console.log("Datos recibidos:", data);

        setChicos(data[0]);
        setAsistencias2025(data[1]);
        setPacientes(data[2]);
        setTurnos(data[3]);
        setUsuarios(data[4]);
        setColaciones(data[5]);
        setMeriendas(data[6]);
        setTalleres(data[7]); // 👈 NUEVO
      } catch (error) {
        console.error("Error al traer datos:", error);
      }
    };

    traerDatos();
  }, []);

  const agruparPorMes = (datos, campoFecha) => {
    const porMes = {};
    datos.forEach((item) => {
      const fecha = item[campoFecha];
      if (fecha && typeof fecha === "string") {
        const mes = fecha.substring(0, 7); // YYYY-MM
        porMes[mes] = (porMes[mes] || 0) + 1;
      }
    });
    return porMes;
  };

  const contarDiasDistintosPorMes = (datos, campoFecha) => {
    const diasPorMes = {};
    datos.forEach((item) => {
      const fecha = item[campoFecha];
      if (fecha && typeof fecha === "string") {
        const mes = fecha.substring(0, 7);
        const dia = fecha.substring(0, 10);
        if (!diasPorMes[mes]) diasPorMes[mes] = new Set();
        diasPorMes[mes].add(dia);
      }
    });

    const resultado = {};
    for (const mes in diasPorMes) {
      resultado[mes] = diasPorMes[mes].size;
    }

    return resultado;
  };

  const agruparPorClase = (usuarios) => {
    const clases = {};
    usuarios.forEach((usuario) => {
      const clase = usuario.clases || "Sin clase";
      clases[clase] = (clases[clase] || 0) + 1;
    });
    return clases;
  };

  const sumarCantidadPorMes = (datos) => {
    const porMes = {};
    datos.forEach((item) => {
      const mes = item.fecha?.substring(0, 7);
      if (!mes) return;
      porMes[mes] = (porMes[mes] || 0) + Number(item.cantidad || 0);
    });
    return porMes;
  };

  // Procesamientos
  const asistenciasPorMes = agruparPorMes(asistencias2025, "fecha");
  const diasConClasesPorMes = contarDiasDistintosPorMes(asistencias2025, "fecha");
  const turnosPorMes = agruparPorMes(turnos, "fecha");
  const usuariosPorClase = agruparPorClase(usuarios);
  const colacionesPorMes = sumarCantidadPorMes(colaciones);
  const meriendasPorMes = sumarCantidadPorMes(meriendas);
  const talleresPorMes = agruparPorMes(talleres, "fecha"); // ✅ NUEVO

  const totalColaciones = colaciones.length > 0 ? colaciones.reduce((acc, item) => acc + Number(item.cantidad || 0), 0) : 0;
  const totalMeriendas = meriendas.length > 0 ? meriendas.reduce((acc, item) => acc + Number(item.cantidad || 0), 0) : 0;
  const totalTalleres = talleres.length; // ✅ NUEVO

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📊 Resumen de Estadísticas julio-2025</h1>
       <p>🏥 {totalTalleres + asistencias2025.length +usuarios.length} prestaciones en 2025 (enero-julio): </p>

<h2><strong>👦 Cantidad de usuarios inscriptos en el dispositivo 2025:</strong> {chicos.length +pacientes.length + usuarios.length }</h2>
      <p><strong>👦 Cantidad de usuarios que asisten a los talleres 2025:</strong> {chicos.length}</p>

      <p><strong>🏥 Cantidad de usuarios  en tratamiento:</strong> {pacientes.length}</p>
      <p><strong>🏋️‍♀️ Cantidad de usuarios de gimnasio:</strong> {usuarios.length}</p>
{/*           <p><strong>📝 Cantidad de asistencias 2025:</strong> {asistencias2025.length}</p>
 */}      <p><strong>📅 Cantidad de prestaciones a personas en tratamiento:</strong> {turnos.length}</p>
       <p>🏥 Cantidad de asistencias sociales: 133</p>
     <p><strong>🏋️‍♀️ Cantidad de asistencias a talleres:</strong>{totalTalleres}</p>
  <p><strong>Total colaciones: {totalColaciones}</strong></p>
    <p><strong>🥛 Total meriendas: {totalMeriendas}</strong></p>

      {Object.keys(usuariosPorClase).length > 0 ? (
        <ul>
          {Object.entries(usuariosPorClase).map(([clase, cantidad]) => (
            <li key={clase}>{clase}: {cantidad}</li>
          ))}
        </ul>
      ) : (
        <p>Sin datos.</p>
      )}

      <h2>🗓️ Asistencias 2025 por mes</h2>
      {Object.keys(asistenciasPorMes).length > 0 ? (
        <ul>
          {Object.entries(asistenciasPorMes).map(([mes, cantidad]) => (
            <li key={mes}>
              {mes}: {cantidad} asistencias ({diasConClasesPorMes[mes] || 0} días con clases)
            </li>
          ))}
        </ul>
      ) : (
        <p>Sin datos.</p>
      )}

      <h2>🗓️ Turnos por mes</h2>
      {Object.keys(turnosPorMes).length > 0 ? (
        <ul>
          {Object.entries(turnosPorMes).map(([mes, cantidad]) => (
            <li key={mes}>{mes}: {cantidad}</li>
          ))}
        </ul>
      ) : (
        <p>Sin datos.</p>
      )}

      <h2>🍎 Total colaciones: {totalColaciones}</h2>
      {Object.keys(colacionesPorMes).length > 0 ? (
        <ul>
          {Object.entries(colacionesPorMes).map(([mes, cantidad]) => (
            <li key={mes}>{mes}: {cantidad}</li>
          ))}
        </ul>
      ) : (
        <p>Sin datos de colaciones.</p>
      )}

      <h2>🥛 Total meriendas: {totalMeriendas}</h2>
      {Object.keys(meriendasPorMes).length > 0 ? (
        <ul>
          {Object.entries(meriendasPorMes).map(([mes, cantidad]) => (
            <li key={mes}>{mes}: {cantidad}</li>
          ))}
        </ul>
      ) : (
        <p>Sin datos de meriendas.</p>
      )}

      <h2>🎨 Total de asistencia a los talleres: {totalTalleres}</h2>
      {Object.keys(talleresPorMes).length > 0 ? (
        <ul>
          {Object.entries(talleresPorMes).map(([mes, cantidad]) => (
            <li key={mes}>{mes}: {cantidad} asistencias</li>
          ))}
        </ul>
      ) : (
        <p>Sin datos de talleres.</p>
      )}
    </div>
  );
};

export default App;

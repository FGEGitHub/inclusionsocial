import React, { useEffect, useState } from 'react';
import serviciodtc from '../../../services/dtc'; // Asegurate que esté bien la ruta
import { useParams } from 'react-router-dom';
const EstadisticasTaller = () => {
  const { id } = useParams(); // Trae id desde la URL si está presente
  const [asistencias, setAsistencias] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    asistenciasMensuales: {},
    promedioPorDia: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        const idFinal = id || usuario.id; // Usa params.id si existe, si no, el id del usuario
        const dataa = await serviciodtc.traerestadisticastaller(idFinal);
        setAsistencias(dataa);
        procesarEstadisticas(dataa);
      }
    };

    fetchData();
  }, [id]);


  const procesarEstadisticas = (data) => {
    const asistenciasMensuales = {};
    const conteoDias = {};
    let total = data.length;

    data.forEach(item => {
      // Procesar mes (YYYY-MM)
      const mes = item.fecha.substring(0, 7); // ej: '2025-03'
      asistenciasMensuales[mes] = (asistenciasMensuales[mes] || 0) + 1;

      // Procesar día
      if (item.dia) {
        conteoDias[item.dia] = (conteoDias[item.dia] || 0) + 1;
      }
    });

    // Calcular promedio por día
    const promedioPorDia = {};
    for (let dia in conteoDias) {
      promedioPorDia[dia] = (conteoDias[dia] / total).toFixed(2);
    }

    setEstadisticas({
      total,
      asistenciasMensuales,
      promedioPorDia
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Estadísticas del Taller</h2>
      <p><strong>Total de asistencias:</strong> {estadisticas.total}</p>

      <h3>Asistencias por mes:</h3>
      <ul>
        {Object.entries(estadisticas.asistenciasMensuales).map(([mes, cantidad]) => (
          <li key={mes}>
            {mes}: {cantidad}
          </li>
        ))}
      </ul>

      <h3>Promedio de asistencias por día:</h3>
      <ul>
        {Object.entries(estadisticas.promedioPorDia).map(([dia, promedio]) => (
          <li key={dia}>
            {dia}: {promedio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstadisticasTaller;

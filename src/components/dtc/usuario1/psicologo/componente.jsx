import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // IMPORTANTE
import servicioDtc from '../../../../services/dtc';

const ListaAsistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const { id } = useParams(); // obtenés el id de la URL

  useEffect(() => {
    fetchAsistencias();
  }, []);

  const fetchAsistencias = async () => {
    try {
      if (id) {
        const response = await servicioDtc.traerturnosdepsico(id); // usás el id del parámetro
        setAsistencias(response);
      }
    } catch (error) {
      console.error('Error al obtener asistencias:', error);
    }
  };
const totalTurnos = asistencias.length;
const mesActual = new Date().toISOString().slice(0, 7); // Ej: "2025-05"
const asistenciasMes = asistencias.filter(a => a.fecha.startsWith(mesActual));

const turnosDelMes = asistencias.filter(a => a.fecha.startsWith(mesActual)).length;
const presentes = asistencias.filter(a => a.presente).length;

const presentesMes = asistenciasMes.filter(a => a.presente).length;

const ausentes = asistencias.filter(a => !a.presente).length;


const sinClasificar = asistencias.filter(a => a.presente !== true && a.presente !== false).length;
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Lista de Turnos</h2>
            <h2 className="text-xl font-bold mb-4">Lista de Turnos</h2>
      <div className="mb-4">
        <p><strong>Total de turnos:</strong> {totalTurnos}</p>
        <p><strong>Turnos en el mes ({mesActual}):</strong> {turnosDelMes}</p>
        <p><strong>Presentes:</strong> {presentes} ({presentesMes} este mes)</p>
        <p><strong>Ausentes:</strong> {ausentes}  </p>
          <p><strong>Sin clasificar:</strong> {sinClasificar}</p>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Nombre</th>
             <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {asistencias.length > 0 ? (
            asistencias.map((asistencia, index) => (
              <tr key={index} className="border-b">
                <td className="border px-4 py-2">{asistencia.fecha}</td>
                <td className="border px-4 py-2">{asistencia.nombre} {asistencia.apellido}</td>
                 <td className="border px-4 py-2">{asistencia.detalle} hs</td>
                <td className="border px-4 py-2">{asistencia.presente ? 'Presente' : 'Ausente'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">No hay asistencias registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaAsistencias;

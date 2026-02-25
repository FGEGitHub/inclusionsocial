import React, { useEffect, useState } from "react";
import servicioDtc from '../../../../services/dtc';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from "react-router-dom";

// Importar las imágenes
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
import Guad from '../../../../Assets/guadsot.png'; // id 290
import Pau from '../../../../Assets/paukees.png'; // id 290

// Crear un objeto para mapear id_psico a imágenes
const psicologos = {
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
    290: Guad,
    290: Pau,
};

const TablaNotificaciones = (props) => {
    const [chicos, setChicos] = useState([]);
    const [fechas1, setFechas1] = useState([]);
    const [fechas2, setFechas2] = useState([]);
    const [datos, setDatos] = useState();
    let params = useParams();
    let id = params.id;

    useEffect(() => {
        traer();
    }, []);

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON);
                if(usuario.nivel==40 || usuario.nivel==41 ){
                    const novedades_aux = await servicioDtc.traercitastodoscadia(usuario.id);
                    setChicos(novedades_aux[0]);
                    setDatos(novedades_aux[1]);
    
                    // Extrae fechas1 y fechas2 de los datos recibidos y convierte las fechas a objetos Date en UTC
                    const fechas1 = novedades_aux[0].map(item => new Date(item.fecha + 'T00:00:00Z'));
                    const fechas2 = novedades_aux[1].map(item => new Date(item.fecha + 'T00:00:00Z'));
                    setFechas1(fechas1);
                    setFechas2(fechas2);
                }else{
                    const novedades_aux = await servicioDtc.traercitastodos(usuario.id);
                    setChicos(novedades_aux[0]);
                    setDatos(novedades_aux[1]);
    
                    // Extrae fechas1 y fechas2 de los datos recibidos y convierte las fechas a objetos Date en UTC
                    const fechas1 = novedades_aux[0].map(item => new Date(item.fecha + 'T00:00:00Z'));
                    const fechas2 = novedades_aux[1].map(item => new Date(item.fecha + 'T00:00:00Z'));
                    setFechas1(fechas1);
                    setFechas2(fechas2);
                }
             
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }}

    const onDateClick = (date) => {
        const formattedDate = date.toISOString().split("T")[0];
        props.traer({ fecha: formattedDate });
    };

    const isSameDay = (date1, date2) => {
        return date1.getUTCDate() === date2.getUTCDate() &&
               date1.getUTCMonth() === date2.getUTCMonth() &&
               date1.getUTCFullYear() === date2.getUTCFullYear();
    };

    return (
        <div>
            <h2>Lista de Turnos .</h2>
            {chicos.length > 0 ? (
                <div>
                    <Calendar
                        onClickDay={onDateClick}
                        tileContent={({ date, view }) => {
                            if (view === 'month') {
                                // Buscar todos los eventos para la fecha actual
                                const eventos = chicos.filter(chico => isSameDay(new Date(chico.fecha + 'T00:00:00Z'), date));
                                
                                // Usar un Set para evitar duplicados
                                const psicosMostrados = new Set();
                                
                                return (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                                        {eventos.map((evento) => {
                                            if (!psicosMostrados.has(evento.id_psico)) {
                                                psicosMostrados.add(evento.id_psico);
                                                const imagen = psicologos[evento.id_psico];
                                                return imagen ? (
                                                    <img key={evento.id_psico} src={imagen} alt={`Psicólogo ${evento.id_psico}`} style={{ width: '30px', height: '30px', margin: '2px' }} />
                                                ) : null;
                                            }
                                            return null; // No renderizar si ya se mostró la foto
                                        })}
                                    </div>
                                );
                            }
                            return null;
                        }}
                        tileClassName={({ date, view }) => {
                            if (view === 'month') {
                                const isFecha1 = fechas1.some(f1 => isSameDay(f1, date));
                                const isFecha2 = fechas2.some(f2 => isSameDay(f2, date));
                                
                                if (isFecha1 && isFecha2) {
                                    return 'react-calendar__tile--fechas1y2'; // Clase para cuando ambas fechas coinciden
                                }
                                if (isFecha1) {
                                    return 'react-calendar__tile--fechas1'; // Clase para fechas1
                                }
                                if (isFecha2) {
                                    return 'react-calendar__tile--fechas2'; // Clase para fechas2
                                }
                            }
                            return null;
                        }}
                        className="custom-calendar"
                    />
                </div>
            ) : (
                <h2>El curso aún no tiene chicos</h2>
            )}
        </div>
    );
};

export default TablaNotificaciones;

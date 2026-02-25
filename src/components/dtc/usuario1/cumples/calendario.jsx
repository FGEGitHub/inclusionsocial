import React, { useEffect, useState } from "react";
import servicioDtc from '../../../../services/dtc';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import './CustomCalendar.css'; // Archivo CSS para personalizar el calendario

const TablaNotificaciones = () => {
    const [chicos, setChicos] = useState([]);
    const [datos, setDatos] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
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
                const novedades_aux = await servicioDtc.listachiques();
                setChicos(novedades_aux[0]);
                setDatos(novedades_aux[1]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const onDateClick = (date) => {
        const user = chicos.find(chico => {
            const chicoDate = new Date(chico.fecha_nacimiento);
            return chicoDate.getDate() === date.getDate() && chicoDate.getMonth() === date.getMonth();
        });
        if (user) {
            setSelectedUser(user);
            setDialogOpen(true);
        }
    };

    return (
        <div>
            {datos && (
                <Alert variant="filled" severity="success">
                    <b>Actualmente {datos.total} usuarios</b> - "Kid1":{datos.kid1} usuarios, "Kid2":{datos.kid2} usuarios, "Adolescentes":{datos.kid3} usuarios, además {datos.sind} sin determinar
                </Alert>
            )}

            <h2>Lista de chicos</h2>
            {chicos && chicos.length > 0 ? (
                <div>
                    <Calendar
                        onClickDay={onDateClick}
                        tileContent={({ date, view }) => {
                            if (view === 'month') {
                                const user = chicos.find(chico => {
                                    const chicoDate = new Date(chico.fecha_nacimiento);
                                    return chicoDate.getDate() === date.getDate() && chicoDate.getMonth() === date.getMonth();
                                });
                                return user ? <div className="birthday-icon"><FontAwesomeIcon icon={faBirthdayCake} /></div> : null;
                            }
                        }}
                        className="custom-calendar"
                    />
                    <Dialog
                        open={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                        aria-labelledby="user-dialog-title"
                        maxWidth="md"
                        fullWidth
                    >
                        {selectedUser && (
                            <div>
                                <DialogTitle id="user-dialog-title">{selectedUser.nombre}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Fecha de Nacimiento: {selectedUser.fecha_nacimiento}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setDialogOpen(false)} color="primary">
                                        Cerrar
                                    </Button>
                                </DialogActions>
                            </div>
                        )}
                    </Dialog>
                </div>
            ) : (
                <h2>El curso aún no tiene chicos</h2>
            )}
        </div>
    );
};

export default TablaNotificaciones;

import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './CustomCalendar.css'; // Archivo CSS para personalizar el calendario
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

const CustomCalendar = ({ dates, fecha1Key, fecha2Key, fecha3Key }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const onDateClick = (date) => {
        if (!Array.isArray(dates)) return;

        const user = dates.find(d => {
            const date1 = new Date(d[fecha1Key]);
            const date2 = new Date(d[fecha2Key]);
            const date3 = new Date(d[fecha3Key]);

            // Normalizar las fechas a medianoche (hora local)
            const normalizeDate = (d) => {
                const normalized = new Date(d);
                normalized.setHours(0, 0, 0, 0); // Ajustar a medianoche
                return normalized;
            };

            // Comparar solo el día, mes y año
            return (
                normalizeDate(date).getTime() === normalizeDate(date1).getTime() ||
                normalizeDate(date).getTime() === normalizeDate(date2).getTime() ||
                normalizeDate(date).getTime() === normalizeDate(date3).getTime()
            );
        });

        if (user) {
            setSelectedUser(user);
            setDialogOpen(true);
        }
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month' && Array.isArray(dates)) {
            const user = dates.find(d => {
                const date1 = new Date(d[fecha1Key]);
                const date2 = new Date(d[fecha2Key]);
                const date3 = new Date(d[fecha3Key]);

                // Normalizar las fechas a medianoche (hora local)
                const normalizeDate = (d) => {
                    const normalized = new Date(d);
                    normalized.setHours(0, 0, 0, 0); // Ajustar a medianoche
                    return normalized;
                };

                // Comparar solo el día, mes y año
                return (
                    normalizeDate(date).getTime() === normalizeDate(date1).getTime() ||
                    normalizeDate(date).getTime() === normalizeDate(date2).getTime() ||
                    normalizeDate(date).getTime() === normalizeDate(date3).getTime()
                );
            });

            if (user) {
                let icon = null;
                if (user[fecha1Key]) {
                    icon = <FontAwesomeIcon icon={faBirthdayCake} />;
                } else if (user[fecha2Key] || user[fecha3Key]) {
                    icon = <CircleNotificationsIcon icon={faCalendarAlt} />;
                }

                return (
                    <div className="event-icon">
                        {icon}
                    </div>
                );
            }
        }
    };

    return (
        <div>
            <Calendar
                onClickDay={onDateClick}
                tileContent={tileContent}
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
                                {fecha1Key}: {selectedUser[fecha1Key]} <br />
                                {fecha2Key}: {selectedUser[fecha2Key]} <br />
                                {fecha3Key}: {selectedUser[fecha3Key]}
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
    );
};

export default CustomCalendar;

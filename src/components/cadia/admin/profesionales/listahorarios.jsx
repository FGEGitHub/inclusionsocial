import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Box, Button, Modal, TextField, MenuItem, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import servicioDtc from '../../../../services/dtc';
import { useParams } from "react-router-dom";
import './customcalendar.css';

const categories = [
  { value: 'mañana', label: 'mañana', color: '#1E90FF' },
  { value: 'tarde', label: 'tarde', color: '#32CD32' },
  { value: 'otro', label: 'otro', color: '#FF6347' },
];

const daysOfWeek = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
];

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    titulo: '',
    fecha_inicio: '',
    fecha_fin: '',
    categoria: '',
    daysOfWeek: [],
  });
  let params = useParams();
  let id = params.id;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const talleres = await servicioDtc.traerhorariosprofesional(id);
      const parsedEvents = talleres.map(event => {
        let daysOfWeek = [];

        try {
          daysOfWeek = JSON.parse(event.dias);
        } catch (error) {
          console.error('Error parsing daysOfWeek:', error);
        }

        return {
          ...event,
          daysOfWeek: Array.isArray(daysOfWeek) ? daysOfWeek : [],
        };
      });
      setEvents(parsedEvents);
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setEventData(prevState => {
        const newDaysOfWeek = checked
          ? [...prevState.daysOfWeek, parseInt(value)]
          : prevState.daysOfWeek.filter(day => day !== parseInt(value));
        return { ...prevState, daysOfWeek: newDaysOfWeek };
      });
    } else {
      setEventData({
        ...eventData,
        [name]: value,
      });
    }
  };

  const handleAddEvent = async () => {
    try {
      const mergedObj = { ...eventData, id_usuario: id };
      await servicioDtc.agregarhorario(mergedObj);
      fetchEvents()
      handleClose();
    } catch (error) {
      console.error('Error adding event', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await servicioDtc.delete(`/api/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  const renderEvents = (date) => {
    const dayOfWeek = date.getDay();
    const dayEvents = events.filter(event => {
      const fecha_inicio = new Date(event.fecha_inicio);
      const fecha_fin = new Date(event.fecha_fin);
      return fecha_inicio <= date && date <= fecha_fin && event.daysOfWeek.includes(dayOfWeek);
    });

    return dayEvents.map(event => (
      <Box
        key={event.id}
        sx={{
          backgroundColor: categories.find(cat => cat.value === event.categoria)?.color || '#ccc',
          color: 'white',
          padding: '4px',
          margin: '2px 0',
          cursor: 'pointer',
          fontSize: '1rem' // Aumentar el tamaño de la fuente si es necesario
        }}
        onClick={() => setSelectedEvent(event)}
      >
        {event.titulo}
      </Box>
    ));
  };

  return (
    <Box sx={{ maxWidth: '1400px', margin: 'auto', padding: '20px' }}>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={({ date }) => renderEvents(date)}
        className="custom-calendar"
      />
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginTop: 2 }}>
        Agregar horario
      </Button>
      <Modal open={open || !!selectedEvent} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500, /* Ancho del modal */
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedEvent ? (
            <Box>
              <Typography variant="h6">Detalles del evento</Typography>
              <Typography variant="body1"><strong>Título:</strong> {selectedEvent.titulo}</Typography>
              <Typography variant="body1"><strong>Inicio:</strong> {new Date(selectedEvent.fecha_inicio).toLocaleString()}</Typography>
              <Typography variant="body1"><strong>Final:</strong> {new Date(selectedEvent.fecha_fin).toLocaleString()}</Typography>
              <Typography variant="body1"><strong>Categoría:</strong> {categories.find(cat => cat.value === selectedEvent.categoria)?.label}</Typography>
              <Typography variant="body1"><strong>Días:</strong> {selectedEvent.daysOfWeek.map(day => daysOfWeek.find(d => d.value === day)?.label).join(', ')}</Typography>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                Eliminar
              </Button>
            </Box>
          ) : (
            <Box>
              <TextField
                fullWidth
                label="Titulo"
                name="titulo"
                value={eventData.titulo}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Inicio"
                type="date"
                name="fecha_inicio"
                value={eventData.fecha_inicio}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Final"
                type="date"
                name="fecha_fin"
                value={eventData.fecha_fin}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                select
                label="Categoria"
                name="categoria"
                value={eventData.categoria}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <FormGroup>
                {daysOfWeek.map(day => (
                  <FormControlLabel
                    key={day.value}
                    control={
                      <Checkbox
                        value={day.value}
                        checked={eventData.daysOfWeek.includes(day.value)}
                        onChange={handleChange}
                      />
                    }
                    label={day.label}
                  />
                ))}
              </FormGroup>
              <Button variant="contained" color="primary" onClick={handleAddEvent}>
                Agregar horario
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default CalendarComponent;

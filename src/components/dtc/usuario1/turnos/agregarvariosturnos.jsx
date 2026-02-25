import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
   Radio, RadioGroup,
} from '@mui/material';
import servicioDtc from '../../../../services/dtc';




const ScheduleDialog = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [profesional, setProfesional] = useState('');
  const [profesionales, setProfesionales] = useState('');
  const [weekDays, setWeekDays] = useState([]);
  const [numFields, setNumFields] = useState(1);
  const [schedules, setSchedules] = useState({});
  const [usuario, setUsuario] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
    traerprof()
  }
  const handleClose = () => setOpen(false);

  const handleWeekDayChange = (event) => {
    const day = event.target.name;
    setWeekDays(prev => (
      event.target.checked ? [...prev, day] : prev.filter(d => d !== day)
    ));
  };

  const handleNumFieldsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumFields(value);
    setSchedules({});
  };

  const handleScheduleChange = (index, event) => {
    setSchedules(prev => ({ ...prev, [index]: event.target.value }));
  };
  const handleChange = (e) => {
  
    setProfesional({ ...profesional, [e.target.name]: e.target.value })
  }
  const traerprof = async (event) => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    const user = JSON.parse(loggedUserJSON)

    setUsuario(user)
    setProfesional({profesional:user.id})


 
  };
  const handleSubmit = async () => {
    const data = {
      startDate,
      endDate,
      weekDays,
      profesional,
      schedules: Object.values(schedules),
    };
    
    try {

     const rt=  await servicioDtc.agregarvariasfechas(data);
     alert(rt)
      handleClose();
    } catch (error) {
      console.error('Error :', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary"onClick={handleClickOpen}>
        Agregar varias fechas
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Seleccionar todos los campos</DialogTitle>
        <DialogContent>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
          />

          <div>
            {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map(day => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    name={day}
                    onChange={handleWeekDayChange}
                  />
                }
                label={day}
              />
            ))}
          </div>

          <FormControl fullWidth margin="normal">
            <InputLabel>Numero de horarios por dias</InputLabel>
            <Select
              value={numFields}
              onChange={handleNumFieldsChange}
            >
              {[1, 2, 3, 4].map(num => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {[...Array(numFields)].map((_, index) => (
            <TextField
              key={index}
              label={`Horario  ${index + 1}`}
              value={schedules[index] || ''}
              onChange={(event) => handleScheduleChange(index, event)}
              fullWidth
              margin="normal"
            />
          ))}
          
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={handleClose}>Cancelar</Button>
          <Button  variant='contained' onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScheduleDialog;

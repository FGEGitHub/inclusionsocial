import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../../services/dtc';
import React, { useState, useEffect } from "react";
import DialogActions from '@mui/material/DialogActions';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Función para obtener el día de la semana a partir de una fecha en formato 'YYYY-MM-DD'
const obtenerDiaSemana = (fecha) => {
  const diasSemana = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
  
  // Convertir la fecha a un formato aceptado por Date
  const [year, month, day] = fecha.split('-');
  const dia = new Date(`${year}-${month}-${day}`).getDay();
  
  return diasSemana[dia];
};

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id_persona: props.id_persona,  // Asignamos el id_persona que viene de props
    horariosSeleccionados: [],  // Inicializamos los horarios seleccionados
  });
  const [datos, setDatos] = useState([]);

  const traer = async () => {
    const nov = await servicioDtc.traerhorariosdisponiblescadia(props.id);
    setDatos(nov);
  };

  const handleChange = (idHorario) => {
    setForm((prevForm) => {
      const isSelected = prevForm.horariosSeleccionados.includes(idHorario);
      const nuevosHorarios = isSelected
        ? prevForm.horariosSeleccionados.filter((id) => id !== idHorario)
        : [...prevForm.horariosSeleccionados, idHorario];
      return { ...prevForm, horariosSeleccionados: nuevosHorarios };
    });
  };

  const handleClickOpen = () => {
    traer();
    setOpen(true);
  };

  const handleClose = () => {
    setForm({
      id_persona: props.id_persona,  // Asignamos el id_persona que viene de props
      horariosSeleccionados: [],  // Inicializamos los horarios seleccionados
    });
    setOpen(false);
  };

  const handleDeterminar = async (event) => {
    event.preventDefault();
    
    const dataToSend = {
      id_persona: props.id, // Solo enviar el id_persona heredado de props
      horariosSeleccionados: form.horariosSeleccionados // Solo enviar los id_turno seleccionados
    };

    try {
      await servicioDtc.enviarhorariosdlchico(dataToSend);  // Aquí se envían los datos formateados al backend
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  };

  return (
    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <Button variant="outlined" onClick={handleClickOpen}>Seleccionar Horarios</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <b>Elegir horarios</b><br/>
          {datos.map((horario) => {
            const diaSemana = obtenerDiaSemana(horario.fecha); // Obtener el día de la semana
            const estilo = horario.estado === 'Agendado' ? { color: 'blue' } : {}; // Color azul si está agendado

            return (
              <FormControlLabel
                key={horario.id}
                control={
                  <Checkbox
                    checked={form.horariosSeleccionados.includes(horario.id)}
                    onChange={() => handleChange(horario.id)}
                  />
                }
                label={`${horario.fecha} (${diaSemana}) - ${horario.detalle} hs - ${horario.nombreu} - ${horario.prof}`}
                style={estilo} // Aplicar estilo condicional
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeterminar}>Confirmar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

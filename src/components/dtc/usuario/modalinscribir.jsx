import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import servicioDtc from '../../../services/dtc';

const MyDialog = (props) => {
  const { id } = useParams();

  const optionKeys = {
    Música: 240,
    Físico: 304,
    Educativo: 306,
    Arte: 265,
    Lúdico: 307,
    Educativo2: 308,
    Merienda: 309,
    Baile: 266,
  };

  const physicalSubcategories = {
 
    "Fútbol Femenino": {
      horarios: ["16:00"],
      dias: ["lunes", "miércoles", "viernes"],
    },
    "Gimnasio": {
      horarios: ["14:00"],
      dias: ["lunes", "martes", "miércoles", "jueves", "viernes"],
    },
    "Vóley Masculino": {
      horarios: ["16:00"],
      dias: ["martes"],
    },
    "Vóley Femenino": {
      horarios: ["15:00"],
      dias: ["martes"],
    },
    "Básquet Masculino": {
      horarios: ["16:00"],
      dias: ["jueves"],
    },
    "Básquet Femenino": {
      horarios: ["15:00"],
      dias: ["jueves"],
    },
  
    // Nuevas subcategorías
    "Fútbol de 6 a 10 años": {
      horarios: ["15:00"],
      dias: ["lunes", "miércoles"],
    },
    "Fútbol mayores de 11 años": {
      horarios: ["16:00","15:00"],
      dias: ["miércoles", "viernes"],
    },
  };
  

  const generalHorarios = ["14:00", "15:00", "16:00"];
  const allDays = ["lunes", "martes", "miércoles", "jueves", "viernes"];

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedDays, setSelectedDays] = useState({});
  const [optionData, setOptionData] = useState(null);

  const resetState = () => {
    setSelectedOption('');
    setSelectedSubOption('');
    setSelectedHour('');
    setSelectedDays({});
    setOptionData(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  const handleOptionChange = async (event) => {
    const selected = event.target.value;
    resetState();
    setSelectedOption(selected);

    const selectedKey = optionKeys[selected] || null;
    if (selectedKey) {
      try {
        const response = await servicioDtc.obtenerinfodecursos(selectedKey);
        setOptionData(response);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setOptionData(null);
      }
    }
  };

  const handleSubOptionChange = (event) => {
    const selectedSub = event.target.value;
    setSelectedSubOption(selectedSub);
    setSelectedHour('');
    setSelectedDays({});

    const subcategory = physicalSubcategories[selectedSub] || {};
    const preselectedDays = subcategory.dias?.reduce((acc, day) => {
      acc[day] = false;
      return acc;
    }, {}) || {};

    setSelectedDays(preselectedDays);
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };
  const handleDayChange = (event) => {
    const { name, checked } = event.target;
  
    // Si hay una subcategoría seleccionada, restringir a sus días permitidos
    if (selectedOption === "Físico" && selectedSubOption) {
      const allowedDays = physicalSubcategories[selectedSubOption]?.dias || [];
  
      // Evitar selección de días no permitidos
      if (!allowedDays.includes(name)) return;
    }
  
    setSelectedDays({
      ...selectedDays,
      [name]: checked,
    });
  };
  

  const handleSubmit = async () => {
    const formData = {
      id,
      option: optionKeys[selectedOption] || null,
      subOption: selectedSubOption,
      number: selectedHour,
      days: Object.keys(selectedDays).filter((day) => selectedDays[day]),
    };

    await servicioDtc.inscribiracurso(formData);
    handleClose();
    props.traer();
  };

  // **Filtrado de la tabla según los días y la hora seleccionados**
  const filteredData = optionData
    ? optionData.filter((row) => {
        const dayMatch = Object.keys(selectedDays).some((day) => selectedDays[day] && row.dia === day);
        const hourMatch = selectedHour ? row.hora === selectedHour : true;
        return dayMatch && hourMatch;
      })
    : [];

  return (
    <div>
      <Button variant="outlined" sx={{ color: "black", borderColor: "black", fontSize: "0.65rem", }}onClick={handleOpen}>
        Inscribir
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Selecciona opciones</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Selecciona una opción</InputLabel>
            <Select value={selectedOption} onChange={handleOptionChange}>
              {Object.keys(optionKeys).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedOption === "Físico" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Selecciona una subcategoría</InputLabel>
              <Select value={selectedSubOption} onChange={handleSubOptionChange}>
                {Object.keys(physicalSubcategories).map((subOption) => (
                  <MenuItem key={subOption} value={subOption}>
                    {subOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {(selectedOption && selectedOption !== "Físico") || selectedSubOption ? (
            <FormControl fullWidth margin="normal">
              <InputLabel>Selecciona un horario</InputLabel>
              <Select value={selectedHour} onChange={handleHourChange}>
              {(selectedOption === "Merienda"
  ? ["17:00"]
  : selectedOption === "Físico" && selectedSubOption
  ? physicalSubcategories[selectedSubOption]?.horarios
  : generalHorarios
).map((hour) => {
  let label = hour;

  // Aclaraciones específicas para "Fútbol de 6 a 10 años"
  if (selectedSubOption === "Fútbol mayores de 11 años") {
    if (hour === "15:00") {
      label = "15:00 (Viernes)";
    } else if (hour === "16:00") {
      label = "16:00 (miércoles)";
    }
  }

  return (
    <MenuItem key={hour} value={hour}>
      {label}
    </MenuItem>
  );
})}
              </Select>
            </FormControl>
          ) : null}
{selectedOption && (
  allDays.map((day) => (
    <FormControlLabel
      key={day}
      control={
        <Checkbox
          checked={selectedDays[day] || false}
          onChange={handleDayChange}
          name={day}
          disabled={
            (selectedOption === "Lúdico" && !["lunes","martes", "jueves", "viernes"].includes(day)) ||
            (selectedOption === "Físico" && selectedSubOption && 
              !physicalSubcategories[selectedSubOption]?.dias.includes(day))
          }
        />
      }
      label={day.charAt(0).toUpperCase() + day.slice(1)}
    />
  ))
)}


          {optionData && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Día</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Cantidad Inscriptos</TableCell>
                    <TableCell>Nombres</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.dia}</TableCell>
                      <TableCell>{row.hora}</TableCell>
                      <TableCell>{row.cantidad_kids}</TableCell>
                      <TableCell>{row.nombres_kids}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!selectedHour}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyDialog;

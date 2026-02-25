import React, { useState } from 'react';

import TextField from '@mui/material/TextField';

import Ficha from '../usuario1/personapsic.js/ficha'
import { useNavigate } from "react-router-dom";
const MobileAutocomplete = (props) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState();
  const [form, setForm] = useState({})
  const today = new Date().toISOString().split("T")[0]
  const handleSelection = async (event, value) => {
    // Aquí puedes realizar alguna acción cuando se selecciona un valor
    console.log('Valor seleccionado:', value);
   await setSelectedValue();
   await setSelectedValue({id:value.id});
  
   
    // También puedes hacer un llamado al backend con el valor seleccionado
    // Ejemplo: hacerLlamadoAlBackend(value);
  };

  const handleChange = (e) => {
    props.traer({fecha:e.target.value}) 

    setForm({ ...form, [e.target.name]: e.target.value })
  }



  return (
    <div>
 <TextField
      onChange={handleChange}
      name="fecha"
      id="date"
      label="Fecha"
      type="date"
      defaultValue={today} // Establece el valor por defecto como la fecha actual
      sx={{ width: 220 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
     
     
    {selectedValue ? <><Ficha id={selectedValue.id}/></> :<></>}
    </div>
  );
};

export default MobileAutocomplete;

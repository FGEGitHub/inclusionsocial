import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { getThemeProps } from '@material-ui/styles';
import servicioDtc from '../../../services/dtc'

import { useNavigate } from "react-router-dom";
const MobileAutocomplete = (props) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState();

  const handleSelection = async (event, value) => {
    // Aquí puedes realizar alguna acción cuando se selecciona un valor
    console.log('Valor seleccionado:', value);
   await setSelectedValue();
   await setSelectedValue({id_usuario:value.id});
  
   
    // También puedes hacer un llamado al backend con el valor seleccionado
    // Ejemplo: hacerLlamadoAlBackend(value);
  };

  const handleBackendCall = async () => {
  if (selectedValue) {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    const user = JSON.parse(loggedUserJSON);

    const mergedJSON = {
      ...selectedValue,
      hora: props.hora,
      id_tallerista: user.id,
      id_clase: props.id_clase
    };

    console.log(mergedJSON);

    let ta;

    if (user.id == 317) {
      // ponerpresenteclase2
      ta = await servicioDtc.ponerpresenteclase2(mergedJSON);
    } else if (user.id == 325) {
      // ponerpresenteclase3
      ta = await servicioDtc.ponerpresenteclase2(mergedJSON);
    }else if (user.id == 326) {
      // ponerpresenteclase3
      ta = await servicioDtc.ponerpresenteclase2(mergedJSON);
    } else {
      // por defecto
      ta = await servicioDtc.ponerpresenteclase(mergedJSON);
    }

    alert(ta);
    props.traer();
  }
};

  const ir = async () => {
    // Lógica para hacer un llamado al backend con el valor seleccionado
    navigate('/dtc/usuario1/usuario/'+selectedValue.id)
    
  };

  return (
    <div>
      <Autocomplete 
        options={props.chicos}
        getOptionLabel={(option) => option.id_usuario == null ? option.nombre +" "+option.apellido :option.nombre +" "+option.apellido +"  Presente" }
        renderInput={(params) => (
          <TextField {...params} label="Selecciona una opción" variant="outlined" />
        )}
        onChange={handleSelection}
      />

      <button variant="outlined" color="primary" onClick={handleBackendCall}>
        Poner/Quitar Presente
      </button>
      {selectedValue ? <> 
        {props.usuario.id != 238 ? <>
       <button variant="outlined" color="primary" onClick={ir}>
        Ver usuario
      </button></>:<></>}
      </>
      :<>
      <button variant="outlined" color="primary" onClick={ir} disabled>
        Ver usuario
      </button></>}
  
    </div>
  );
};

export default MobileAutocomplete;

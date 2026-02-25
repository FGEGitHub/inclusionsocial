import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogContent, NativeSelect, Tooltip, Typography, InputLabel, DialogActions } from '@mui/material';
import servicioDtc from '../../../../services/dtc';
import React, { useState } from "react";
import styled from 'styled-components';
import { Checkbox, FormControlLabel } from '@mui/material';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    fecha_nacimiento: "Sin determinar",
    observaciones: "Sin determinar",
    primer_contacto: "Sin determinar",
    primer_ingreso: "Sin determinar",
    admision: "Sin determinar",
    dni: "Sin determinar",
    domicilio: "Sin determinar",
    telefono: "Sin determinar",
    autorizacion_imagen: "Sin determinar",
    fotoc_dni: "Sin determinar",
    fotoc_responsable: "Sin determinar",
    tel_responsable: "Sin determinar",
    visita_social: "Sin determinar",
    egreso: "Sin determinar",
    aut_retirar: "Sin determinar",
    dato_escolar: "Sin determinar",
    hora_merienda: "Sin determinar",
    escuela: "Sin determinar",
    fines: "Sin determinar",
    grado: "Sin determinar",
    obra_social: "Sin determinar",
    obra_social_cual: "",
    talle: "Sin determinar",
    sexo: "Sin determinar",
tiene_hijos: false,
cantidad_hijos: "",
  });

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
    ...(name === "obra_social" && value !== "Si" ? { obra_social_cual: "" } : {}),
    ...(name === "tiene_hijos" && !checked ? { cantidad_hijos: "" } : {})
  }));
};

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeterminar = async (event) => {
    event.preventDefault();

    // Validación: si tiene obra social, debe especificarla
    if (form.obra_social === "Si" && !form.obra_social_cual.trim()) {
      alert("Debe indicar cuál es la obra social.");
      return;
    }

    try {
      const nov = await servicioDtc.nuevochique(form);
      alert(nov);
      props.traer();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error: algo sucedió al guardar el usuario.");
    }

    // Reset del formulario
    setForm({
      fecha_nacimiento: "Sin determinar",
      observaciones: "Sin determinar",
      primer_contacto: "Sin determinar",
      primer_ingreso: "Sin determinar",
      admision: "Sin determinar",
      kid: "Sin determinar",
      dni: "Sin determinar",
      domicilio: "Sin determinar",
      telefono: "Sin determinar",
      autorizacion_imagen: "Sin determinar",
      fotoc_dni: "Sin determinar",
      fotoc_responsable: "Sin determinar",
      tel_responsable: "Sin determinar",
      visita_social: "Sin determinar",
      egreso: "Sin determinar",
      aut_retirar: "Sin determinar",
      dato_escolar: "Sin determinar",
      hora_merienda: "Sin determinar",
      escuela: "Sin determinar",
      talle: "Sin determinar",
      fines: "Sin determinar",
      obra_social: "Sin determinar",
      obra_social_cual: "",
      grado: "Sin determinar",
    });
  };

  return (
    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
      <Tooltip title="Nuevo Usuario">
        <Button variant="contained" onClick={handleClickOpen}>
          Nuevo
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            <b>NUEVO USUARIO</b>
          </Typography>

          <Typography variant="body1" color="black">
            <b>KID1 / KID2 / ADOLESCENTES</b>
          </Typography>

          <NativeSelect
            defaultValue={props.kid}
            onChange={handleChange}
            inputProps={{ name: 'kid', id: 'uncontrolled-native' }}
            sx={{ width: 250 }}
          >
            <option value="Sin determinar">Elegir</option>
            <option value="kid1">Kids 1</option>
            <option value="kid2">Kids 2</option>
            <option value="kid3">Adolescentes</option>
              <option value="Sala Blanda">Sala Blanda</option>
          </NativeSelect>


          <TextField label="Nombre" name="nombre" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Apellido" name="apellido" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="DNI" name="dni" onChange={handleChange} variant="standard" fullWidth />
<InputLabel htmlFor="sexo">
  <StyledParagraph>Sexo</StyledParagraph>
</InputLabel>
<NativeSelect
  value={form.sexo}
  onChange={handleChange}
  inputProps={{ name: 'sexo', id: 'sexo' }}
  sx={{ width: 250 }}
>
  <option value="Sin determinar">Elegir</option>
  <option value="Masculino">Masculino</option>
  <option value="Femenino">Femenino</option>
</NativeSelect>
          {/* Selector de obra social */}
          <InputLabel htmlFor="obra_social">
            <StyledParagraph>¿Tiene obra social?</StyledParagraph>
          </InputLabel>
          <NativeSelect
            value={form.obra_social}
            onChange={handleChange}
            inputProps={{ name: 'obra_social', id: 'obra_social' }}
            sx={{ width: 250 }}
          >
            <option value="Sin determinar">Elegir</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </NativeSelect>
       <br/>
          {/* Aparece solo si selecciona "Sí" */}
          {form.obra_social === "Si" && (
            <TextField
              label="¿Cuál obra social?"
              name="obra_social_cual"
              onChange={handleChange}
              variant="standard"
              fullWidth
              required
            />
          )}
          <br/>
          <FormControlLabel
  control={
    <Checkbox
      checked={form.tiene_hijos}
      onChange={handleChange}
      name="tiene_hijos"
    />
  }
  label="Tiene hijos"
/>

<br/>
{form.tiene_hijos && (
  <TextField
    label="¿Cuántos hijos?"
    name="cantidad_hijos"
    type="number"
    value={form.cantidad_hijos}
    onChange={handleChange}
    variant="standard"
    fullWidth
    required
  />
)}

<br/>
            <TextField

              onChange={handleChange}
              name="fecha_nacimiento"
              id="date"
              label="Fecha de nacimiento"
              type="date"
              defaultValue="2023-03-01"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
              <TextField

onChange={handleChange}
name="primer_contacto"
id="date"
label="primer_contacto"
type="date"
defaultValue="2023-03-01"
sx={{ width: 220 }}
InputLabelProps={{
  shrink: true,
}}
/>
<TextField

onChange={handleChange}
name="primer_ingreso"
id="date"
label="primer_ingreso"
type="date"
defaultValue="2023-03-01"
sx={{ width: 220 }}
InputLabelProps={{
  shrink: true,
}}
/>
<TextField

onChange={handleChange}
name="admision"
id="date"
label="admision"
type="date"
defaultValue="2023-03-01"
sx={{ width: 220 }}
InputLabelProps={{
  shrink: true,
}}
/>
<InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        ¿Autorizacion de imagen?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'autorizacion_imagen',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Si'}>
                                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                                        Si
                                    </Typography>
                                </option>
                                <option value={'No'}>No</option>

                            </NativeSelect>
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        ¿Fotocopia de DNI?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'fotoc_dni',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Si'}>
                                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                                        Si
                                    </Typography>
                                </option>
                                <option value={'No'}>No</option>

                            </NativeSelect>
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        ¿Fotocopia DNI Responsable?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'fotoc_responsable',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Si'}>
                                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                                        Si
                                    </Typography>
                                </option>
                                <option value={'No'}>No</option>

                            </NativeSelect>


                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        ¿Visita social?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'visita_social',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Si'}>
                                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                                        Si
                                    </Typography>
                                </option>
                                <option value={'No'}>No</option>

                            </NativeSelect>




                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        ¿Egreso del DTC
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'egreso',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Solo'}>
                                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                                       Solo
                                    </Typography>
                                </option>
                                <option value={'Con acompaniante'}>Con acompañante</option>

                            </NativeSelect>


                            
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Dato escolar
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'dato_escolar',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Turno maniana'}>
                                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                                       Turno mañana
                                    </Typography>
                                </option>
                                <option value={'Turno tarde'}>Turno tarde</option>
                                <option value={'Turno noche'}>Turno noche</option>
                                <option value={'Horario extendido'}>Horario extendido</option>
                                <option value={'No asiste'}>No asiste</option>
                                <option value={'Asiste'}>Asiste</option>
                            </NativeSelect>

          <TextField label="Domicilio" name="domicilio" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Teléfono" name="telefono" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Teléfono responsable" name="tel_responsable" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Autorizado a retirar" name="aut_retirar" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Hora merienda" name="hora_merienda" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Escuela" name="escuela" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Grado" name="grado" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Fines" name="fines" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Talle" name="talle" onChange={handleChange} variant="standard" fullWidth />
          <TextField label="Observaciones" name="observaciones" onChange={handleChange} variant="standard" fullWidth />

          <DialogActions>
            {form.nombre && form.apellido ? (
              <Button variant="contained" color="primary" onClick={handleDeterminar}>
                Crear
              </Button>
            ) : (
              <>Completar los datos</>
            )}
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

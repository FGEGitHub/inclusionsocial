import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../../services/dtc'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import { Paper, CircularProgress, Typography, Card, CardActions } from '@mui/material';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';


const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
    const [open, setOpen] = React.useState(false);
    //const usuario  = useUser().userContext
    const [form, setForm] = useState({
        id: props.id,
        kid: props.kid,
        fecha_nacimiento: props.fecha_nacimiento,
        observaciones: props.observaciones,
        primer_contacto: props.primer_contacto,
        primer_ingreso: props.primer_ingreso,
        admision: props.admision,
        nombre: props.nombre,
        apellido: props.apellido,
        dni: props.dni,
        domicilio: props.domicilio,
        telefono: props.telefono,
        autorizacion_imagen: props.autorizacion_imagen,
        fotoc_dni: props.fotoc_dni,
        fotoc_responsable: props.fotoc_responsable,
        tel_responsable: props.tel_responsable,
        visita_social: props.visita_social,
        egreso: props.egreso,
        aut_retirar: props.aut_retirar,
        dato_escolar: props.dato_escolar,
        hora_merienda: props.hora_merienda,
            obra_social: props.obra_social,
        obra_social_cual: props.obra_social_cual,
    })
    const [datos, setDatos] = useState()
    const [activo, setActivo] = useState(false)







    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleClickOpen = () => {

        setOpen(true);


    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeterminar = async (event) => {

        try {
            event.preventDefault();

            const nov = await servicioDtc.modificarusuariopsiq(form)
alert(nov)
        } catch (error) {
            console.error(error);
            console.log('Error algo sucedio')


        }

        props.traer()

        setOpen(false);
    };

    const [currency, setCurrency] = React.useState('EUR');

    /*   const handleChange = (event) => {
        setCurrency(event.target.value);
      }; */


    return (




        <Box

            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            < Tooltip title="Nueva Clase">
                <Button variant="outlined" onClick={handleClickOpen}> Modificar usuario  </Button>

            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>


                    <h3>
                        <b> Modificar a {props.nombre}</b></h3>

                    <TextField

                        defaultValue={props.nombre}
                        margin="dense"
                        id="name"
                        label="Nombre"
                        name="nombre"
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />

                    <TextField

                        margin="dense"
                        id="name"
                        defaultValue={props.apellido}
                        label="Apellido"
                        name="apellido"
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        margin="dense"
                        id="dni"
                        defaultValue={props.dni}
                        label="DNI"
                        name="dni"
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    /><br/>
                  <InputLabel variant="outlined" htmlFor="obra_social">
            <Typography variant="p" component="div" color="black">
              <StyledParagraph>¿Tiene obra social?</StyledParagraph>
            </Typography>
          </InputLabel>
          <NativeSelect
            defaultValue={props.obra_social}
            onChange={handleChange}
            inputProps={{
              name: 'obra_social',
              id: 'obra_social',
            }}
            sx={{ width: 250 }}
          >
            <option value={'Sin determinar'}>Elegir</option>
            <option value={'Si'}>Sí</option>
            <option value={'No'}>No</option>
          </NativeSelect>

          {/* 🔹 Campo adicional: ¿Cuál? (solo texto libre) */}
          <TextField
            margin="dense"
            id="obra_social_cual"
            label="¿Cuál obra social?"
            name="obra_social_cual"
            onChange={handleChange}
            defaultValue={props.obra_social_cual}
            fullWidth
            variant="standard"
          />
          <br/>
                    <br />
                    <TextField

                        onChange={handleChange}

                        name="fecha_nacimiento"
                        id="date"
                        label="Fecha de nacimiento"
                        type="date"
                        defaultValue={props.fecha_nacimiento}
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
                        defaultValue={props.primer_ingreso} sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                   
                    <TextField

                        margin="dense"
                        id="dni"
                        defaultValue={props.domicilio}
                        label="Domicilio"
                        name="domicilio"
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        margin="dense"
                        id="dni"
                        defaultValue={props.telefono}
                        label="Telefono"
                        name="telefono"
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                   
                    <TextField

                        margin="dense"
                        id="name"
                        label="Observaciones"
                        name="observaciones"
                        onChange={handleChange}
                        defaultValue={props.observaciones}
                        variant="standard"
                    />


                    <DialogActions>


                        <>
                            <> <Button variant="contained" color="primary" onClick={handleDeterminar}> Modificar </Button></>
                        </>
                        <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
                    </DialogActions>


                </DialogContent>
            </Dialog>
        </Box >


    );
}
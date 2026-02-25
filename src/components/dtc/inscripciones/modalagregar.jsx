import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import servicioDtc from '../../../services/dtc'
import { Paper, CircularProgress, Typography, Card, CardActions } from '@mui/material';
import Tooltip from '@material-ui/core/Tooltip';
import { useEffect, Fragment } from "react";
import InputLabel from '@mui/material/InputLabel'; import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import NativeSelect from '@mui/material/NativeSelect';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;



export default function Clasenueva(props) {
    let params = useParams()
    let id = params.id
    const [chicos, setchicos] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const [selectedValue, setSelectedValue] = useState();
    const [datos, setDatos] = useState()
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState({ id_curso: id })
    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleSelection = async (event, value) => {
        // Aquí puedes realizar alguna acción cuando se selecciona un valor
        console.log('Valor seleccionado:', value);
        await setSelectedValue();
        await setSelectedValue({ id: value.id });///id del chico


        // También puedes hacer un llamado al backend con el valor seleccionado
        // Ejemplo: hacerLlamadoAlBackend(value);
    };

    const handleBackendCall = async () => {
        // Lógica para hacer un llamado al backend con el valor seleccionado
        if (selectedValue) {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            console.log(loggedUserJSON)
            const mergedJSON = {
                ...selectedValue,
                ...form
            };

            const ta = await servicioDtc.inscribiracurso(mergedJSON)
            alert(ta)
            // Aquí puedes realizar la llamada al backend utilizando algún servicio o librería
            // Ejemplo: axios.post('/api/backend', { selectedValue });
            props.traer()
            handleClose()
        }
    };
    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                const novedades_aux = await servicioDtc.listachiquesparainscribir({id:props.id,dia:props.dia,hora:props.hora})
                setchicos(novedades_aux[0])
                setDatos(novedades_aux[1])
            }

        } catch (error) {

        }

    }

    const handleClickOpen = () => {
        setOpen(true);
        setForm({
            option: props.id,
            days: [props.dia],
            number: props.hora
        })
        traer()
    };


    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>


            <button style={{ width: '80px' }} onClick={handleClickOpen}>Aregar</button>


            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Inscribir a usuario a {props.nombre_curso}-{props.dia}-{props.hora} horas</DialogTitle>
                NAHUELITO: ahora figura en azul si esta inscripto/a en este mismo curso
                <Paper
                    sx={{
                        cursor: 'pointer',
                        background: '#fafafa',
                        color: '#bdbdbd',
                        border: '1px dashed #ccc',
                        '&:hover': { border: '1px solid #ccc' },
                    }}
                >
                    <DialogContent>
                        <DialogContentText>
                        <Autocomplete
    options={chicos}
    getOptionLabel={(option) =>
        `${option.nombre} ${option.apellido}${option.yainscripto ? ' - ya inscripto' : ''}`
    }
    renderOption={(props, option) => (
        <li {...props} style={{ color: option.yainscripto ? 'blue' : 'black' }}>
            {option.nombre} {option.apellido} {option.yainscripto ? ' - ya inscripto' : ''}
        </li>
    )}
    renderInput={(params) => (
        <TextField {...params} label="Selecciona una opción" variant="outlined" />
    )}
    onChange={handleSelection}
/>




                        </DialogContentText>


                        <DialogActions>
                            <Button variant="outlined" color="primary" onClick={handleBackendCall}>
                                Confirmar
                            </Button>

                            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                        </DialogActions>



                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}
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
    useEffect(() => {
        traer()



    }, [])


    const handleSelection = async (event, value) => {
        // Aquí puedes realizar alguna acción cuando se selecciona un valor
        console.log('Valor seleccionado:', value);
        await setSelectedValue();
        await setSelectedValue({ id_vinculo: value.id });


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

            const ta = await servicioDtc.determinarvinculo(mergedJSON)
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

                const novedades_aux = await servicioDtc.listachiques()
                setchicos(novedades_aux[0])
                setDatos(novedades_aux[1])
            }

        } catch (error) {

        }

    }

    const handleClickOpen = () => {
        setOpen(true);
        setForm({ id_usuario: id })
    };


    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>

            < Tooltip title="Vinculos">
                <Button variant='outlined' sx={{ color: "black", borderColor: "black", fontSize: "0.65rem", }} onClick={handleClickOpen}>Vinculos</Button>

            </Tooltip>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Registrar Vinculo</DialogTitle>
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
                                getOptionLabel={(option) => option.id_usuario == null ? option.nombre + " " + option.apellido : option.nombre + " " + option.apellido + "  Presente"}
                                renderInput={(params) => (
                                    <TextField {...params} label="Selecciona una opción" variant="outlined" />
                                )}
                                onChange={handleSelection}
                            />

                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        ¿Que vinculo tiene?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                            <NativeSelect
                                defaultValue={props.fotoc_dni}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'vinculoo',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Hermano'}>
                                    Hermano

                                </option>
                                <option value={'familiar'}>familiar(otro)</option>
                                <option value={'Amigo'}>Amigo</option>
                                <option value={'Reamigo'}>Reamigo</option>
                            </NativeSelect>

                        </DialogContentText>


                        <DialogActions>
                            <Button variant="outlined" color="primary" onClick={handleBackendCall}>
                                Confirmar vinculo
                            </Button>

                            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                        </DialogActions>



                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}
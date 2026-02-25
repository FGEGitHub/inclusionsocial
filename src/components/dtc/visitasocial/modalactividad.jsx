import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../services/dtc'
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
            const mergedJSON = {
                ...form,
                ...{id_usuario:props.id_usuario,fecha:props.fecha}
              };
              console.log(mergedJSON)
            const nov = await servicioDtc.nuevaactividad(mergedJSON)
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
                '& .MuiTextField-root': { m: 1, width: '125ch' },
            }}
            noValidate
            autoComplete="off"
        >
            < Tooltip title="Nueva Clase">
                <Button variant="contained" onClick={handleClickOpen}> Nuevo  </Button>

            </Tooltip>
            <Dialog open={open} onClose={handleClose}   maxWidth={'md'}  fullWidth={'fullWidth'}sx={{
                width: '100%' 
            }}>
                <DialogContent>


                    <h3>
                        <b> Nueva actividad</b></h3>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Titulo"
                        name="nombre"
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />




{/* 
                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                        <Typography variant="p" component="div" color="black">
                            <StyledParagraph>
                                Dato seleccionar
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

                    </NativeSelect> */}
                    <br />
                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                        <Typography variant="p" component="div" color="black">
                            <StyledParagraph>
                                Detalle
                            </StyledParagraph>
                        </Typography>
                    </InputLabel>
                    <TextField
                        multiline
                        rows={4}  // Ajusta el número de filas según sea necesario
                        label=""
                        variant="outlined"
                        onChange={handleChange}
                        name="detalle"
                        fullWidth
                    />

                    <DialogActions>


                        <>
                            <> <Button variant="contained" color="primary" onClick={handleDeterminar}> crear </Button></>
                        </>
                        <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
                    </DialogActions>


                </DialogContent>
            </Dialog>
        </Box >


    );
}
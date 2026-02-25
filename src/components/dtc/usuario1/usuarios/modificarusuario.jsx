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
import servicioAdministracion from '../../../../services/administracion'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Paper } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';


export default function Clasenueva(props) {
   
    const [modifcontra, setModifcontra] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState()



    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleChange2 = (e) => {

        setModifcontra(!modifcontra)
    }

    const handleClickOpen = () => {
        setOpen(true);
        setForm   ({ 
            nivel:props.nivel,
            usuario:props.usuario,
            nombre:props.nombre,
        id:props.id,
        password:'undefined'
    
     })
    };
    const handleDeterminar = async (event) => {
        event.preventDefault();
        try {

            await servicioAdministracion.modificarusuario(form)


        } catch (error) {
            console.error(error);
            console.log('Error algo sucedio')


        }
        props.traer()

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>

<AutoFixHighIcon onClick={handleClickOpen}/>
           
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Modificar </DialogTitle>
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
                           Modificar usuario
                        </DialogContentText>
                        <form >

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="NOMBRE"
                                name="nombre"
                                defaultValue={props.nombre}
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                            />
                               <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="USUARIO"
                                defaultValue={props.usuario}
                                name="usuario"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                            />
 
 
                             <label>Asignar encargado </label>
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                             
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'id_encargado',
                                    id: 'uncontrolled-native',

                                }}
                            >  
                             <option value={'4'}>Asignar</option>
                     
                            
                        
                                       
                                        <option value='2'> Administracion</option>
                                        <option value='3'> Coordinacion</option>
                                        <option value='4'>Encargado</option>

                   
                            
                       
                             <option value={'Pendiente'}>Asignar</option>
                        

                            </NativeSelect>
   
                            
                             <FormControlLabel control={<Checkbox  />}  onChange={handleChange2} label="Cambiar contraseña" />

{modifcontra ? <><TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Contraseña"
                                name="password"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                            />

</> : <></>}


                            <DialogActions>
                                <Button variant="contained" color="primary" onClick={handleDeterminar}>Modificar</Button>
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                            </DialogActions>
                        </form>


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}
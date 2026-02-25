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
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from '@mui/material';
import Tooltip from '@material-ui/core/Tooltip';

import Box from '@mui/material/Box';

export default function Clasenueva(props) {
    let params = useParams()
    let id = params.id

    const [open, setOpen] = React.useState(false);
    const [fechas, setFechas] = useState()
   
    const handleClickOpen = () => {
      
        setOpen(true);
        traer()
    };
    const  traer = async () => {
      

         const respuesta=  await servicioDtc.traerasistenciasdetaller({id_tallerista:props.id_tallerista, id_usuario:props.id_usuario})
         setFechas(respuesta[0])

   

    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>

< Tooltip title="Borrar">
           <button  style={{ width: '80px' }} onClick={handleClickOpen}>Ver fechas </button> 
        
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Fechas de asistencia </DialogTitle>
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
                          {fechas ? <>

                            {fechas.map((row) => (<> {row.fecha} <br/></>))}
                          </>:<>Cargando</>}
                         
                        </DialogContentText>
                      

                            <DialogActions>
                   
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                            </DialogActions>
                      


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}
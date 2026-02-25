import * as React from 'react';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import servicioDtc from '../../../../services/dtc';
import { Paper } from '@mui/material';

export default function Clasenueva(props) {
    let params = useParams();
    let id = params.id;

    const [open, setOpen] = useState(false);
    const [detalle, setDetalle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClickOpen = async () => {
        setOpen(true);
        setLoading(true);
        try {
            const respuesta = await servicioDtc.obtenerdetalle(props.id);
            console.log(respuesta)
            setDetalle(respuesta[0].detalle); // Asume que la respuesta tiene una propiedad 'detalle'
        } catch (error) {
            console.error(error);
            console.log('Error al obtener el detalle');
        }
        setLoading(false);
    };

    const handleDeterminar = async (event) => {
        event.preventDefault();
        try {
           // const respuesta = await servicioDtc.borraractividad({ id: props.id });
            alert('respuesta');
        } catch (error) {
            console.error(error);
            console.log('Error algo sucedió');
        }
        props.traer();
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Ver
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.titulo}</DialogTitle>
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
                            {loading ? "Cargando..." : detalle.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </DialogContentText>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={handleDeterminar}>Ver/borrar</Button>
                            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
                        </DialogActions>
                    </DialogContent>
                </Paper>
            </Dialog>
        </div>
    );
}

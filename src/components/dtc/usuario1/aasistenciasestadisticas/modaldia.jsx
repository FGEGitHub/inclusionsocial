
import Asistencia from '../../usuario2/asistencia/tabla';
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
                ...{id_usuario:props.id_usuario,fecha:props.fecha,id_tallerista:props.id_tallerista}
              };
              console.log(mergedJSON)
            const nov = await servicioDtc.nuevaactividadchico(mergedJSON)
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

<>


     
            < Tooltip title="Nueva Clase">
                <Button variant="outlined" onClick={handleClickOpen}> Ver </Button>

            </Tooltip>
            <Dialog open={open} onClose={handleClose}   fullWidth={'fullWidth'}
        maxWidth={'md'}>
                <DialogContent>


                <Asistencia fecha={props.fecha} idt={236}/>


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
                    

                    <DialogActions>


             
                        <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Ok</Button>
                    </DialogActions>


                </DialogContent>
            </Dialog>
      
            </>

    );
}
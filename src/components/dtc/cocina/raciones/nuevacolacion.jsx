import React, { useState } from 'react';
import { TextField, Button, Input, Card, CardContent, CardMedia } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import servicioDtc from '../../../../services/dtc';
import InputLabel from '@mui/material/InputLabel';
import { useParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';



export default function SelectTextFields(props) {
    let params = useParams()
    let id = params.id
  const [open, setOpen] = React.useState(false);
  const [cargando, setCargando] = React.useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState({
    id:id,
    nombre: '',
    categoria1: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Mostrar una vista previa de la imagen en el frontend
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const enviar = async (e) => {
    e.preventDefault();
    setCargando(true)
    // Guardar la imagen solo si hay un archivo seleccionado
    if (file) {
      // Guardar el nombre de la imagen en el frontend
      const fileName = `${Date.now()}_${file.name}`;

      // Guardar la imagen en el frontend (puedes almacenarla donde sea necesario)
      // En este caso, estoy almacenando la imagen en el estado previewImage
      setPreviewImage(fileName);
    }

    // Enviar datos del formulario al backend
    
      const formData = new FormData();
      formData.append('cantidad', form.cantidad);
      formData.append('fecha', form.fecha);
  
      formData.append('imagen', file);
      const nov = await servicioDtc.enviarconsumocolacion(formData)
   
alert(nov)
setCargando(false)

props.traer()
    setOpen(false);
  }


  return (

<>


<Button onClick={handleClickOpen} variant='containded' >Agregar consumo COLACION </Button>





      {/* <  Tooltip title="Nueva Clase">
        <Button variant="outlined" onClick={handleClickOpen}> Nueva Clase  </Button>

      </Tooltip> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>


          <h3>
            <b> Nueva foto</b></h3>


      <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cantidad"
            name="cantidad"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

            <TextField
                   onChange={handleChange}
                   name="fecha"
                   id="date"
                   label="Fecha"
                   type="date"
                   defaultValue={"07-02-2025"}
                   sx={{ width: 220 }}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 />
         
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
           {previewImage && (
        <Card>
          <CardMedia component="img" alt="Preview" height="140" image={previewImage} />
          <CardContent>
            <p>Imagen de vista previa</p>
          </CardContent>
        </Card>
      )}
          <DialogActions>


            <>
              <Button variant="contained" color="primary" onClick={enviar}> {cargando ? <> <CircularProgress /></>:<>Agregar</>} </Button>
            </>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>


        </DialogContent>
      </Dialog>
    </>


  );
}
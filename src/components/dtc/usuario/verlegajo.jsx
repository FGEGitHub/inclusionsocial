import React, { useState } from 'react';
import { TextField, Button, Input, Card, CardContent, CardMedia } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';







export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  const [ver, setVer] = React.useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = React.useState(false);

  const mostrar = (e) => {
   setVer(true)
  
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
  };

  const handleClickOpen = () => {
    setOpen(true); 
    setForm({id_usuario:props.id_usuario})
  };

  const handleClose = () => {
    setVer(false)
    setOpen(false);
  };

  const enviar = async (e) => {
    e.preventDefault();

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
      formData.append('nombre', form.nombre);
      formData.append('categoria1', form.categoria1);
      formData.append('descripcion', form.descripcion);
      formData.append('precio', form.precio);
      formData.append('stock', form.stock);
      formData.append('id_usuario', props.id_usuario);
      formData.append('imagen', file);
     // const nov = await serviciovendedoras.nuevoprpducto(formData)

        props.traer()

  
    setFile(null);
    setPreviewImage(null);

    setOpen(false);
  }


  return (

<>
<  Tooltip title="ver"> 
<VisibilityIcon onClick={handleClickOpen} variant='contained'/>
</Tooltip>




      {/* <  Tooltip title="Nueva Clase"> <img src={`data:image/jpeg;base64,${props.imagenBase64}`} alt="Mi Imagen" />
        <Button variant="outlined" onClick={handleClickOpen}> Nueva Clase  </Button>

      </Tooltip> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
       
        <Card sx={{ maxWidth: 345 }}>
  
      <CardMedia
        component="img"
        height="194"
        src={`data:image/jpeg;base64,${props.imagenBase64}`}
        alt="La imagen es PDF, descargar pata ver"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {props.descripcion} <br/>
       
        </Typography>
      </CardContent>
 
     
     
    </Card>
        
          <DialogActions>


            <>
           {/* {!ver &&
       <Button variant="contained" color="primary" onClick={mostrar}> Contactar </Button>}         */}
            
            </>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cerrar</Button>
          </DialogActions>


        </DialogContent>
      </Dialog>
    </>


  );
}
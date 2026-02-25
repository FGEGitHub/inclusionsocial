import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import servicioLogin from "../../services/login"
const RegisterDialog = () => {
  const [form, setForm] = useState({})
  const [open, setOpen] = React.useState(false);


  const handleChange = (e) => {

    setForm({...form,[e.target.name]: e.target.value});
  };


  const handleRegister = async () => {
    // Add your registration logic here
   const rta= await servicioLogin.registrar(form)
   alert(rta)
 
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (   <>
      <Button variant="outlined" onClick={handleClickOpen}>
       Registrar
      </Button>
    <Dialog open={open} handleClose={handleClose} aria-labelledby="form-dialog-title">
   
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
      <TextField
          autoFocus
          margin="dense"
         
          label="DNI"
          name="dni"
          type="text"
          fullWidth
         
          onChange={handleChange}
        />
           <TextField
          autoFocus
          margin="dense"
         
          label="Usuario"
          name="usuario"
          type="text"
          fullWidth
         
          onChange={handleChange}
        />
        <TextField
          name="nombre"
          margin="dense"
          
          label="Nombre"
          type="text"
          fullWidth
         
          onChange={handleChange}
        />
        <TextField
          margin="dense"
       
          label="Email Address"
          type="email"
          name="mail"
          fullWidth
        
          onChange={handleChange}
        />
        <TextField
          margin="dense"
        
          name="password"
          label="Password"
        
          fullWidth
         
          onChange={handleChange}
        />
          <TextField
          margin="dense"
        
          name="nivel"
          label="Nivel"
         
          fullWidth
         
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
      <Button onClick={handleRegister} color="primary">
          Registrar
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      
      </DialogActions>
    </Dialog>
 </>   );
};

export default RegisterDialog;

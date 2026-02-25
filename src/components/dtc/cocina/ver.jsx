import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../services/dtc'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';


export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  const [form, setForm] = useState()
  const [datos, setDatos] = useState()
  const [activo, setActivo] = useState(false)


  const handleClickOpen = () => {

    setOpen(true);

    
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (


    
    
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       < Tooltip title="Ver">
      <button variant="outlined" onClick={handleClickOpen} disabled >Ver</button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
dsa
        </DialogContent>
      </Dialog>
    </Box >

   
  );
}
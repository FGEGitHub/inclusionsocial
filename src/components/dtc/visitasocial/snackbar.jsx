import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(true); // Abre el Snackbar al cargar la página
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
         Ahora puedes buscar un detalle/nombre/fecha en la tabla haciendo click en la lupa
        </Alert>
      </Snackbar>
    </div>
  );
}

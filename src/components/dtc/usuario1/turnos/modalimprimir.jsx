import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import logo from "../../../../Assets/dtcletra.png";
const convertImageToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


const ModalConstanciaTurno = ({ nombrepersona, nombrepsic, fecha, detalle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const printRef = useRef(null);
  

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePrint = async () => {
    const logoBase64 = await convertImageToBase64(logo);
    
    if (printRef.current) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
     <html>
  <head>
    <title>Constancia de Turno</title>
    <style>
      body { 
        font-family: Arial, sans-serif; 
        text-align: center; 
        padding: 20px; 
      }

      img { 
        width: 80px; 
        height: 80px; 
        margin-bottom: 10px; 
      }

      .container { 
        border: 1px solid #000; 
        padding: 20px; 
        display: inline-block; 
        text-align: left; 
        width: 95%; /* Mantiene un buen ancho sin cortar */
        box-sizing: border-box;
      }

      @media print {
        body { visibility: hidden; }
        .container { 
          visibility: visible; 
          position: absolute; 
          top: 0; 
          left: 0; 
          right: 0; 
          margin: auto;
          width: 90%;
        }
      }
    </style>
  </head>
  <body>
  
    <div class="container">
        <img src="${logoBase64}" alt="Logo 1" />
      <h2>CONSTANCIA DE TURNO</h2>
      <p>Se deja constancia de que el/la Sr./Sra. <strong>${nombrepersona}</strong> 
      tiene turno con el/la Lic. <strong>${nombrepsic}</strong> el día <strong>${fecha}</strong> 
      a las <strong>${detalle}</strong>, en el Dispositivo Territorial Comunitario ubicado en 
      <strong>Calle 658 Nº 2100</strong>.</p>
      <p>Se extiende la presente a pedido del interesado/a, para los fines que estime corresponder.</p>
      <br />
      <p><strong>Firma y Sello</strong></p>
      <p>Dispositivo Territorial Comunitario</p>
    </div>
  </body>
</html>


      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <>
      <Button variant="outlined" sx={{ color: "#37474f", borderColor: "black", fontSize: "0.65rem" }}color="success" onClick={handleOpen}>
        Constancia
      </Button>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent style={{ textAlign: "center", padding: "24px" }}>
          <div ref={printRef} id="print-section">
            <img src={logo} alt="Logo" style={{ width: "64px", height: "64px", margin: "0 auto 16px" }} />
            <DialogTitle>CONSTANCIA DE TURNO</DialogTitle>
            <p>
              Se deja constancia de que el/la Sr./Sra. <strong>{nombrepersona}</strong> tiene turno con el/la Lic. <strong>{nombrepsic}</strong> el día <strong>{fecha}</strong> a las <strong>{detalle}</strong>, en el Dispositivo Territorial Comunitario ubicado en <strong>Calle 658 Nº 2100</strong>.
            </p>
            <p>Se extiende la presente a pedido del interesado/a, para los fines que estime corresponder.</p>
            <br />
            <p><strong>Firma y Sello</strong></p>
            <p>Dispositivo Territorial Comunitario</p>
          </div>
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Imprimir
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalConstanciaTurno;
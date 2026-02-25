import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox,
  Card, CardContent, Typography, Button, Modal, TextField, Box,CardMedia,Input
} from "@mui/material";
import serviciodtc from "../../../services/dtc";
import { useParams } from "react-router-dom";

const ClassDataTable = () => {
  let params = useParams();
  let hora = params.id;

  const [tableData, setTableData] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [file, setFile] = useState(null);
   const [foto, setfoto] = useState()
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    if (!isFetched) {
      traer();
      setIsFetched(true);
    }
  }, [hora]);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      const requestData = { hora, id_taller: usuario.id };

      try {
        const response = await serviciodtc.traerdatosdeclasehorausuario(requestData);
        console.log(response)
        if (Array.isArray(response)) {
          setTableData(response[0] || []);
          setClassDetails(response[1] || []);
          setfoto(response[2])
        }
      } catch (error) {
        console.error("Error al traer los datos:", error);
      }
    }
  };

  const handleCheckboxChange = async (id_chico, checked) => {
    if (tableData.length === 0) return;

    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      await serviciodtc.ponerpresenteclase({ hora, id_usuario: id_chico, id_tallerista: JSON.parse(loggedUserJSON).id });

      setClassDetails(prevDetails =>
        prevDetails.map(row =>
          row.id_chico === id_chico ? { ...row, presente: checked ? "Presente" : "Ausente" } : row
        )
      );
    } catch (error) {
      console.error("Error al actualizar la asistencia:", error);
    }
  };

  const handleOpenModal = () => {
    if (tableData.length > 0) {
      setEditedTitle(tableData[0].titulo || "");
      setEditedDescription(tableData[0].descripcion || "");
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = async () => {
    if (tableData.length === 0) return;

    try {
      if (file) {
        // Guardar el nombre de la imagen en el frontend
        const fileName = `${Date.now()}_${file.name}`;
  
        // Guardar la imagen en el frontend (puedes almacenarla donde sea necesario)
        // En este caso, estoy almacenando la imagen en el estado previewImage
        setPreviewImage(fileName);
      }
  
      // Enviar datos del formulario al backend
      
        const formData = new FormData();
        formData.append('id', tableData[0].id);
        formData.append('titulo', editedTitle);
        formData.append('descripcion', editedDescription);
        formData.append('imagen', file);
      await serviciodtc.modificarclase(formData);

      // Actualizar estado local para reflejar cambios
      setTableData(prevData => [
        { ...prevData[0], titulo: editedTitle, descripcion: editedDescription }
      ]);

      setOpenModal(false);
    } catch (error) {
      console.error("Error al modificar la clase:", error);
    }
  };
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
  return (
    <div>
      {tableData.length > 0 && (
        <Card variant="outlined" style={{ marginBottom: "20px", padding: "10px" }}>
          <CardContent>
            <Typography variant="h6">{tableData[0].titulo || "Clase sin título"}</Typography>
            <Typography variant="h6">{tableData[0].descripcion || " sin descripcion"}</Typography>
            <Typography variant="body1">Fecha: {tableData[0].fecha}</Typography>
            <Typography variant="body1">Día: {tableData[0].dia}</Typography>
            <Typography variant="body1">Hora: {tableData[0].hora}</Typography>
            {foto ? (
  <img src={`data:image/jpeg;base64,${foto}`} width="170" height="200" />
) : (
  <>Sin foto</>
)}
            <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ marginTop: "10px" }}>
              Editar Clase
            </Button>
          </CardContent>
        </Card>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Apellido</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Presente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classDetails.length > 0 &&
              classDetails.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.apellido}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={row.presente === "Presente"}
                      onChange={(e) => handleCheckboxChange(row.id_chico, e.target.checked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para editar título y descripción */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        > 
          <Typography variant="h6" gutterBottom>ModificarClase</Typography>
          <TextField
            label="Título"
            fullWidth
            variant="outlined"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="Descripción"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          subir foto(opcional)
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
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ClassDataTable;

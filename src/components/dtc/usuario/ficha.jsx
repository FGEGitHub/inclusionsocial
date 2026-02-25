import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import servicioDtc from '../../../services/dtc'
import Modificar from './modificar'//boton dialogo
import Modalperfil from './modaldeperfil'//boton dialogo
import Borrarusuaio from "./modalborrarusuario"//boton dialogo
import Vinculos from './modalvinculos'//componente, tabl
import Borrarhorarios from './eliminarhorairos'
import Avatar from "@mui/material/Avatar";
import Agregarcurso from './modalinscribir'//boton dialogo
import { useEffect, useState, Fragment } from "react";
import TextField from "@mui/material/TextField";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
const FichaPersona = (props) => {
  let params = useParams()
  let id = params.id
  const [chico, setchico] = useState()
  const [horario, setHorario] = useState()
  const [vinculos, setVinculos] = useState()
  const [usuario, setUsuario] = useState()
  const [showAllData, setShowAllData] = useState(false);
  const [foto, setfoto] = useState()
  // La función para alternar entre "Ver más" y "Ver menos"
  const [orden, setOrden] = useState({ columna: null, asc: true });
const [turnos, setTurnos] = useState();
  const ordenarPor = (columna) => {
    const esAsc = orden.columna === columna ? !orden.asc : true;
    setOrden({ columna, asc: esAsc });
  };
  const diasOrdenados = ["lunes", "martes", "miércoles", "jueves", "viernes"];
  const ordenarDatos = (a, b) => {
    const indiceA = diasOrdenados.indexOf(a.dia);
    const indiceB = diasOrdenados.indexOf(b.dia);
    return indiceA - indiceB;
  };

  const toggleShowAllData = () => {
    setShowAllData(!showAllData);
  };
  useEffect(() => {
    traer()



  }, [])

  const traer = async () => {
  try {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON)
      setUsuario(usuario)

      const novedades_aux = await servicioDtc.datosdechique(
        id == undefined ? props.id : id
      )

      setfoto(novedades_aux[1])
      setchico(novedades_aux[0][0])
      setVinculos(novedades_aux[2])
      setHorario(novedades_aux[3])
      setTurnos(novedades_aux[4]) // 👈 ACA
    }
  } catch (error) {}
}
  
  const eliminarHorario = async (ido) => {
    try {
  
      const novedades_aux = await servicioDtc.eliminarhorario({id:ido})
      alert(novedades_aux)
traer()
    } catch (error) {

    }

  }
  return (
    <>
      {chico ? <>
        <Card variant="outlined" sx={{
          cursor: 'pointer',
          backgroundColor: '#e0e0e0'
        }}>
          {chico && (
            <Fragment>
              {usuario ? <>

                <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
                  <Avatar sx={{ width: 170, height: 200 }}>{foto ? <> <img src={`data:image/jpeg;base64,${foto}`} width="170" height="200" /></> : <>Subir foto</>} </Avatar>
                </Grid>
                {usuario.nivel == 20 || usuario.nivel == 21 || usuario.nivel == 25 ? <>
                  <Modalperfil
                    id={chico.id}
                    traer={async () => {
                      try {
                        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                        if (loggedUserJSON) {
                          const usuario = JSON.parse(loggedUserJSON)


                          const novedades_aux = await servicioDtc.datosdechique(id == undefined ? props.id : id)
                          setfoto(novedades_aux[1])
                          setchico(novedades_aux[0][0])
                          setVinculos(novedades_aux[2])
                        }

                      } catch (error) {

                      }

                    }} />
                </> : <></>}
              </> : <></>}
              {/* Agrega más campos adicionales aquí */}
            </Fragment>
          )}

          <CardContent>
            <Typography variant="h5" component="div">
              Información de {chico.apellido} {chico.nombre}  {chico.kid == "Sin determinar?" ? <></> : <>({chico.kid})</>}
            </Typography>


            <Grid container spacing={2} sx={{ marginTop:"30px" }} >
                  <Grid item xs={2}>
                    <TextField
                      label="Autorizadoa  retirar:"
                      name="Nombre"
                      defaultValue={chico.aut_retirar || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                    <Grid item xs={2}>
                    <TextField
                      label="Autorizacion de imagen:"
                      name="Nombre"
                      defaultValue={chico.autorizacion_imagen || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                   <Grid item xs={2}>
                    <TextField
                      label="DNI"
                      name="Nombre"
                      defaultValue={chico.dni || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                   <Grid item xs={2}>
                    <TextField
                      label="Telefono:"
                      name="Nombre"
                      defaultValue={chico.telefono || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
     <Grid item xs={2}>
                    <TextField
                      label="Telefono Responsable:"
                      name="Nombre"
                      defaultValue={chico.tel_responsable || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
    
                  <Grid item xs={2}>
                    <TextField
                      label="Fotocopia de dni:"
                      name="Nombre"
                      defaultValue={chico.fotoc_dni || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                    <Grid item xs={2}>
                    <TextField
                      label="Fotocopia Responsable:"
                      name="Nombre"
                      defaultValue={chico.fotoc_responsable || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                   <Grid item xs={2}>
                    <TextField
                      label="Visita social:"
                      name="Nombre"
                      defaultValue={chico.visita_social || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                   <Grid item xs={2}>
                    <TextField
                      label="Egreso:"
                      name="Nombre"
                      defaultValue={chico.egreso || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                      <Grid item xs={2}>
                    <TextField
                      label="Escuela:"
                      name="Nombre"
                      defaultValue={chico.escuela || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                      <Grid item xs={2}>
                    <TextField
                      label="Grado:"
                      name="Nombre"
                      defaultValue={chico.grado || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                      <Grid item xs={2}>
                    <TextField
                      label="Fines:"
                      name="Nombre"
                      defaultValue={chico.fines || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  
     <Grid item xs={2}>
                    <TextField
                      label="Primer contacto:"
                      name="Nombre"
                      defaultValue={chico.primer_contacto || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                      <Grid item xs={2}>
                    <TextField
                      label="Admision:"
                      name="Nombre"
                      defaultValue={chico.admision || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                      <Grid item xs={2}>
                    <TextField
                      label="Dato escolar:"
                      name="Nombre"
                      defaultValue={chico.dato_escolar || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                      <Grid item xs={2}>
                    <TextField
                      label="Hora de la merienda:"
                      name="Nombre"
                      defaultValue={chico.hora_merienda || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                         <Grid item xs={2}>
                    <TextField
                      label="Fecha de Nacimiento:"
                      name="Nombre"
                      defaultValue={chico.fecha_nacimiento || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                         <Grid item xs={2}>
                    <TextField
                      label="Domicilio:"
                      name="Nombre"
                      defaultValue={chico.domicilio || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                         <Grid item xs={2}>
                    <TextField
                      label="Obra social:"
                      name="Nombre"
                      defaultValue={chico.obra_social || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                         <Grid item xs={2}>
                    <TextField
                      label="Cual :"
                      name="Nombre"
                      defaultValue={chico.obra_social_cual || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                     <Grid item xs={2}>
                    <TextField
                      label="Sexo :"
                      name="Sexo"
                      defaultValue={chico.sexo || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                     <Grid item xs={2}>
                    <TextField
                      label="hijos :"
                      name="hijos"
                      defaultValue={chico.hijos || ""}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                 </Grid> 
            <Grid container spacing={2}>


           
           

            </Grid>
          </CardContent>
        </Card>
        {chico && (
          <Fragment>
            {usuario ? <>
              {(usuario.nivel == 20 ||usuario.nivel == 28  ) ? <>

                <div style={{ display: 'flex', gap: '10px' }}>
  <Agregarcurso 
    traer={ async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)
          setUsuario(usuario)
          const novedades_aux = await servicioDtc.datosdechique(id == undefined ? props.id : id)
          setfoto(novedades_aux[1])
          setchico(novedades_aux[0][0])
          setVinculos(novedades_aux[2])
          setHorario(novedades_aux[3])
        }
      } catch (error) {}
    }}
  /> 
  <Borrarusuaio id={chico.id} /> 
  <Modificar
    id={chico.id}
    nombre={chico.nombre}
    apellido={chico.apellido}
    fecha_nacimiento={chico.fecha_nacimiento}
    observaciones={chico.observaciones}
    primer_contacto={chico.primer_contacto}
    primer_ingreso={chico.primer_ingreso}
    admision={chico.admision}
    dni={chico.dni}
    domicilio={chico.domicilio}
    telefono={chico.telefono}
    autorizacion_imagen={chico.autorizacion_imagen}
    fotoc_dni={chico.fotoc_dni}
    fotoc_responsable={chico.fotoc_responsable}
    tel_responsable={chico.tel_responsable}
    visita_social={chico.visita_social}
    egreso={chico.egreso}
    aut_retirar={chico.aut_retirar}
    dato_escolar={chico.dato_escolar}
    kid={chico.kid}
     obra_social={chico.obra_social}
      obra_social_cual={chico.obra_social_cual}
    escuela={chico.escuela}
    grado={chico.grado}
    fines={chico.fines}
        sexo={chico.sexo}
    hijos={chico.hijos}
    hora_merienda={chico.hora_merienda}
    traer={ async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)
          setUsuario(usuario)
          const novedades_aux = await servicioDtc.datosdechique(id == undefined ? props.id : id)
          setfoto(novedades_aux[1])
          setchico(novedades_aux[0][0])
          setVinculos(novedades_aux[2])
          setHorario(novedades_aux[3])
        }
      } catch (error) {}
    }}
  />
</div>

              </> : <></>}
            </> : <></>}
            {/* Agrega más campos adicionales aquí */}
          </Fragment>
        )}

      </> : <>Cargando</>}
      <Vinculos />

      {vinculos ? <>  {vinculos.length > 0 ? <>  {vinculos.map((ob) => <>
        {ob.nombre}, {ob.apellido} -- {ob.vinculoo}  -- {ob.nombree}, {ob.apellidoo} <br />
      </>)}  </> : <>Sin vinculos</>}     </> : <></>}
      {horario ? (
  <>
  <Borrarhorarios id={id}
  traer={async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON)

        setUsuario(usuario)
        const novedades_aux = await servicioDtc.datosdechique(id == undefined ? props.id : id)
        setfoto(novedades_aux[1])
        setchico(novedades_aux[0][0])
        setVinculos(novedades_aux[2])
        setHorario(novedades_aux[3])
      }

    } catch (error) {

    }

  }}/>
    {horario.length > 0 ? (
     <table>
     <thead>
       <tr>
         <th onClick={() => ordenarPor('taller')}>Taller</th>
         <th onClick={() => ordenarPor('dia')}>Día</th>
         <th onClick={() => ordenarPor('hora')}>Hora</th>
         <th>Acción</th>
       </tr>
     </thead>
     <tbody>
       {horario.sort(ordenarDatos).map((ob, index) => (
         <tr key={index}>
              <td>{ob.mail}</td>
           <td>{ob.dia}</td>
           <td>{ob.hora}</td>
           <td>
             <button onClick={() => eliminarHorario(ob.id)}>Eliminar</button>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
    ) : (
      <><h1>No esta inscripto a talleres</h1></>
    )}
  </>
) : (
  <></>
)}{turnos && turnos.length > 0 && (

  <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Fecha</TableCell>
          <TableCell>Otorgado</TableCell>
          <TableCell>Agendado por</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Presente</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {turnos.map((ob, index) => (
          <TableRow key={index}>
            <TableCell>
              {ob.fecha} {ob.detalle ? `- ${ob.detalle}` : ""}
            </TableCell>
            <TableCell>{ob.hora}</TableCell>
            <TableCell>{ob.agendadopor}</TableCell>
            <TableCell>{ob.estado}</TableCell>
            <TableCell>{ob.presente}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

)}
      
    </>
  );
};

export default FichaPersona;

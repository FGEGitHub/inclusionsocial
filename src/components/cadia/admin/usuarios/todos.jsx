import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioAdministracion from '../../../../services/administracion'
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Skeleton from '@mui/material/Skeleton';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Nuevo from './AgregarUsuario';
import Borrar from './borrarusuario';
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import Modificar from './modificarusuario';
import {

    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';



//////
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function Ingresos(props) {
    let params = useParams()
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));



    const [usuarios, setUsuarios] = useState([]);





    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {
        console.log('Historial')
        const historial = await servicioAdministracion.todoscadia()


        setUsuarios(historial)
        // 

    };



    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <Modificar
                    id={usuarios[dataIndex].id}
                    nivel={usuarios[dataIndex].nivel}
                    usuario={usuarios[dataIndex].usuario}
                    nombre={usuarios[dataIndex].nombre}
                    traer={async () => {

                        const historial = await servicioAdministracion.todoscadia()

                        setUsuarios(historial)
                        // 

                    }}
                />
                <Borrar
                    id={usuarios[dataIndex].id}
                    usuario={usuarios[dataIndex].usuario}
                    nombre={usuarios[dataIndex].nombre}
                    traer={async () => {
                        console.log('Historial')
                        const historial = await servicioAdministracion.todos()


                        setUsuarios(historial)
                        // 

                    }}
                />

            </>
        );
    }
    function Nivel(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                {usuarios[dataIndex].nivel === 1 ? <> Alumna  </> : <>  {usuarios[dataIndex].nivel === 2 ? <> Administracion</> : <> {usuarios[dataIndex].nivel === 3 ? <>Coordinador </> : <>  {usuarios[dataIndex].nivel === 4 ? <> Encargad</> : <></>}</>}  </>}     </>}

            </>
        );
    }



    const columns = [
        {
            name: "id",
            label: "id",
        },

        {
            name: "nombre",
            label: "nombre",
        },
        {
            name: "usuario",
            label: "usuario",

        },
        {
            name: "nivel",
            label: "nivel",

        },
   


        {
            name: "Actions",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },


    ];



    return (
        <div>
            <Paper
                sx={{
                    cursor: 'pointer',
                    background: '#eeeeee',
                    color: '#eeeeee',
                    border: '1px dashed #ccc',
                    '&:hover': { border: '1px solid #ccc' },
                }}
            >
                <Nuevo 
                traer={ async () => {
                    console.log('Historial')
                    const historial = await servicioAdministracion.todoscadia()
            
            
                    setUsuarios(historial)
                    // 
            
                }
            }
                />

                {isMatch ? <>
                    <TableContainer>
                        {!usuarios ? <Skeleton /> : <>
                            <h1>CUOTAS</h1>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>usuario</b></TableCell>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Nivel</b></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>



                                    {usuarios.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">{row.nombre} </StyledTableCell>
                                            <StyledTableCell component="th" scope="row"> <b>{row.usuario} </b> </StyledTableCell>
                                            <StyledTableCell component="th" scope="row"> <b>{row.nivel}</b></StyledTableCell>
                                            <StyledTableCell component="th" scope="row">{row.ICC} </StyledTableCell>


                                        </StyledTableRow>
                                    ))}




                                </TableBody>
                            </Table>
                        </>}

                    </TableContainer>

                </> : <>
                    <MUIDataTable

                        title={"Lista de usuarios"}
                        data={usuarios}
                        columns={columns}
                        actions={[
                            {
                                icon: 'save',
                                tooltip: 'Save User',
                                onClick: (event, rowData) => alert("You saved " + rowData.name)
                            }
                        ]}



                    /></>}



            </Paper>




        </div>
    );
}

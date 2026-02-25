import React, { useEffect, useState, useRef } from "react";
import servicioDtc from '../../../../services/dtc';


import { Paper, Button, useMediaQuery, useTheme, Alert } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate, useParams } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Calendario from '../calendario/calendario';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const useStyles = makeStyles({
    table: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    bodyCell: {
        color: 'blue',
    },
    selectCell: {
        headerCell: {
            backgroundColor: '#880e4f',
        },
        checkboxRoot: {
            color: 'green',
        },
    },
});

const TablaNotificaciones = (props) => {
    const theme = useTheme();
    const [chicos, setchicos] = useState(['']);
    const [usuario, setUsuario] = useState(['']);
    const [datos, setDatos] = useState();
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();
    const calendarRef = useRef(null); // Crear una referencia para el calendario

    let params = useParams();
    let id = params.id;

    useEffect(() => {
        traer();
    }, []);

    const options = {
        setTableProps: () => {
            return {
                style: {
                    backgroundColor: "#e3f2fd",
                },
            };
        },
        customHeadRender: (columnMeta, handleToggleColumn) => ({
            TableCell: {
                style: {
                    backgroundColor: '#1565c0',
                    color: 'white',
                },
            },
        }),
        selectableRows: false,
        stickyHeader: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: true,
        responsive: 'scroll',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
        print: true,
        filter: true,
        viewColumns: true,
        pagination: true,
        textLabels: {
            body: {
                noMatch: "No se encontraron registros",
                toolTip: "Ordenar",
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Filas por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver columnas",
                filterTable: "Filtrar tabla",
            },
            filter: {
                all: "Todos",
                title: "FILTROS",
                reset: "RESETEAR",
            },
            viewColumns: {
                title: "Mostrar columnas",
                titleAria: "Mostrar/ocultar columnas de la tabla",
            },
            selectedRows: {
                text: "fila(s) seleccionada(s)",
                delete: "Eliminar",
                deleteAria: "Eliminar filas seleccionadas",
            },
        },
    };

    const theme2 = createTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    color: '#1e88e5',
                },
            },
            MUIDataTableSelectCell: {
                headerCell: {
                    backgroundColor: '#3f51b5',
                },
                checkboxRoot: {
                    color: '#3f51b5',
                },
            },
        },
    });

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON);
                setUsuario(usuario);
                const novedades_aux = await servicioDtc.listachicoscadiaespera();
                setchicos(novedades_aux[0]);
                setDatos(novedades_aux[1]);
            }
        } catch (error) {
            console.error("Error al traer datos:", error);
        }
    };

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <div onClick={() => navigate('/cadia/usuario/chico/' + chicos[dataIndex]['id'])}>
                <Tooltip title="Ver">
                    <Button onClick={() => navigate('/cadia/usuario/chico/' + chicos[dataIndex]['id'])} variant="contained">
                        Ver
                    </Button>
                </Tooltip>
            </div>
        );
    }

    const columns = [
        { name: "apellido_nombre", label: "nombre" },

        { name: "dni", label: "dni" },
        { name: "fecha_espera_evaluacion", label: "fecha_espera_evaluacion" },
        {
            name: "fecha_espera",
            label: "Lista de espera",
            options: {
                customBodyRender: (value) => {
                    return (
                        <div style={{ color: value !== "No" ? "green" : "inherit" }}>
                            {value}
                        </div>
                    );
                },
            },
        },
        { name: "fecha_espera_evaluacion", label: "fecha_espera_evaluacion" },
        {
            name: "Ver",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer(dataIndex, rowIndex),
            },
        },
        { name: "turno", label: "turno" },
    ];
    

    const handleScrollToCalendar = () => {
        calendarRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div sx={{
            cursor: 'pointer',
            backgroundColor: '#E09FBB',
            color: '#bdbdbd',
        }}>
            {datos ? <Alert variant="filled"><b> Actualmente {datos.total} </b></Alert> : null}
            <h2>Lista de chicos</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button variant="outlined" color="primary" onClick={handleScrollToCalendar} style={{ color: 'black' }}>
           <b>Ver Calendario</b> 
        </Button>
       
    </div>
            {chicos.length > 0 ? (
                <>
                   
                    {isMatch ? (
                        <TableContainer>
                            <h1>Lista de usuarios</h1>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Nombre</b></TableCell>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Dni</b></TableCell>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Ver</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {chicos.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">{row.apellido} {row.nombre}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row"> <b>{row.dni} </b> </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">  <AccountBoxIcon onClick={() => navigate('/dtc/usuario1/usuario/' + row.id)} /> </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <MuiThemeProvider theme={theme2}>
                            <MUIDataTable
                                title={"Lista de chicos"}
                                data={chicos}
                                columns={columns}
                                options={options}
                                className={classes.table}
                                classes={{
                                    bodyCell: classes.bodyCell,
                                    selectCell: classes.selectCell,
                                }}
                            />
                        </MuiThemeProvider>
                    )}
                </>
            ) : (
                <h2>Sin datos</h2>
            )}
        
        </div>
    );
}

export default TablaNotificaciones;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import servicioDtc from "../../../../services/dtc";
import ModaNueva from "./nuevo";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    Button,
    TextField,
    InputAdornment
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@material-ui/core";

import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${TableCell.head}`]: {
        backgroundColor: "#2b6777",
        color: "#fff",
        fontWeight: "bold",
    },
    [`&.${TableCell.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#f3f8ff",
    },
    "&:hover": {
        backgroundColor: "#e3f2fd",
    },
}));

const useStyles = makeStyles({
    searchField: {
        marginBottom: "16px",
        backgroundColor: "white",
        borderRadius: "4px",
    },
    buttonBar: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginBottom: "16px",
    },
    button: {
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "8px",
    },
});

const TablaNotificaciones = () => {
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const [chicos, setChicos] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [datos, setDatos] = useState(null);
    const [porcentajeObraSocial, setPorcentajeObraSocial] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [openNuevo, setOpenNuevo] = useState(false);

    useEffect(() => {
        traer();
    }, []);

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON);
                setUsuario(usuario);

                const novedades_aux = await servicioDtc.listachiquesmomentaneo();
                const listaChicos = novedades_aux[0];
                setChicos(listaChicos);
                setDatos(novedades_aux[1]);

                if (listaChicos && listaChicos.length > 0) {
                    const total = listaChicos.length;
                    const conObra = listaChicos.filter(
                        (c) =>
                            c.obra_social &&
                            c.obra_social.toLowerCase() !== "no" &&
                            c.obra_social.toLowerCase() !== "sin determinar"
                    ).length;
                    const porcentaje = ((conObra / total) * 100).toFixed(1);
                    setPorcentajeObraSocial(porcentaje);
                }
            }
        } catch (error) {
            console.error("Error al traer datos:", error);
        }
    };

    const filteredChicos = chicos.filter((persona) => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            (persona.dni && persona.dni.toString().toLowerCase().includes(searchLower)) ||
            (persona.nombre && persona.nombre.toLowerCase().includes(searchLower)) ||
            (persona.apellido && persona.apellido.toLowerCase().includes(searchLower))
        );
    });

    const columns = [
        { name: "id", label: "ID" },
        { name: "apellido", label: "Apellido" },
        { name: "nombre", label: "Nombre" },
        { name: "dni", label: "DNI" },
        { name: "cantidadturnos", label: "Turnos" },
        { name: "observaciones", label: "Observaciones" },
        {
            name: "Ver",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const persona = chicos[dataIndex];
                    return (
                        <Tooltip title="Ver">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => {
                                    if (usuario.nivel === 20) {
                                        navigate("/dtc/usuario1/personapsiq/" + persona.id);
                                    } else if (usuario.nivel === 24) {
                                        navigate("/dtc/psicologa/usuario/" + persona.id);
                                    } else {
                                        navigate("/dtc/visitasocial/personatratamieto/" + persona.id);
                                    }
                                }}
                            >
                                Ver
                            </Button>
                        </Tooltip>
                    );
                },
            },
        },
    ];

    const options = {
        selectableRows: false,
        stickyHeader: true,
        responsive: "scroll",
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        downloadOptions: { filename: "personas.csv", separator: "," },
        textLabels: {
            body: { noMatch: "No se encontraron registros" },
        },
    };

    const MobileSearchField = () => (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar por DNI, nombre o apellido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.searchField}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );

    return (
        <div
            style={{
                cursor: "pointer",
                backgroundImage: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
                color: "#212121",
                padding: 20,
                borderRadius: "12px",
            }}
        >
            {datos && (
                <Alert variant="filled" severity="success" sx={{ mb: 2 }}>
                    Datos importantes para rellenar
                </Alert>
            )}

            {porcentajeObraSocial && (
                <Alert
                    variant="filled"
                    severity="info"
                    sx={{
                        mb: 2,
                        fontSize: "16px",
                        backgroundColor: "#0288d1",
                    }}
                >
                    <b>Porcentaje con obra social:</b> {porcentajeObraSocial}%
                </Alert>
            )}

            <div className={classes.buttonBar}>
                <ModaNueva onClose={() => setOpenNuevo(false)} onSave={traer} />

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshIcon />}
                    onClick={traer}
                    className={classes.button}
                >
                    Actualizar
                </Button>
            </div>

            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Lista de Personas Asistiendo</h2>

            {chicos.length > 0 ? (
                isMatch ? (
                    <>
                        <MobileSearchField />
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell><b>DNI</b></StyledTableCell>
                                        <StyledTableCell><b>Nombre Completo</b></StyledTableCell>
                                        <StyledTableCell><b>Ver</b></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredChicos.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell>{row.dni}</StyledTableCell>
                                            <StyledTableCell>
                                                {row.apellido}, {row.nombre}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <AccountBoxIcon
                                                    onClick={() => {
                                                        if (usuario.nivel === 20) {
                                                            navigate("/dtc/usuario1/personapsiq/" + row.id);
                                                        } else if (usuario.nivel === 24) {
                                                            navigate("/dtc/psicologa/usuario/" + row.id);
                                                        } else {
                                                            navigate("/dtc/visitasocial/personatratamieto/" + row.id);
                                                        }
                                                    }}
                                                    style={{ cursor: "pointer", color: "#1565c0" }}
                                                />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <MUIDataTable
                        title={"Lista de personas"}
                        data={filteredChicos}
                        columns={columns}
                        options={options}
                    />
                )
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default TablaNotificaciones;

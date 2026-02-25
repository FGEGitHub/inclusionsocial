import React, { useEffect, useState } from "react";
import { Paper, Tooltip } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styled } from '@mui/material/styles';
import servicioDtc from '../../../services/dtc';
import ModaNueva from './ModalNuevaclase';
import Button from '@mui/material/Button';
import Modificar from './modificar'
import ModalBorrar from './borrarclase';
const StyledTableCell = styled('td')(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
}));

const StyledTableRow = styled('tr')(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const TablaNotificaciones = (props) => {
    const [clases, setClases] = useState([]);
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const traer = async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON);
                setUsuario(usuario);
                const novedades_aux = await servicioDtc.traerclasestaller(usuario.id);
                setClases(novedades_aux);
            }
        };
        traer();
    }, []);

    const CutomButtonsRenderer = (dataIndex) => {
        return (
            <><ModalBorrar

            id={clases[dataIndex]['id']}
            traer={async () => {
                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                if (loggedUserJSON) {
                    const usuario = JSON.parse(loggedUserJSON);
                    setUsuario(usuario);
                    const novedades_aux = await servicioDtc.traerclasestaller(usuario.id);
                    setClases(novedades_aux);
                }
            }}
             />
             <Tooltip title="ASISTENCIA">
                <button variant="contained" onClick={() => navigate('/dtc/tallerasistencia/' + clases[dataIndex]['id'])} >Asistencia </button>
            </Tooltip>
            <Modificar
             id={clases[dataIndex]['id']}
             titulo={clases[dataIndex]['titulo']}
             descripcion={clases[dataIndex]['descripcion']}
             fecha={clases[dataIndex]['fecha']}
             traer={async () => {
                 const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                 if (loggedUserJSON) {
                     const usuario = JSON.parse(loggedUserJSON);
                     setUsuario(usuario);
                     const novedades_aux = await servicioDtc.traerclasestaller(usuario.id);
                     setClases(novedades_aux);
                 }
             }}
              />
            </>
           
        );
    };

    const columns = [
        {
            name: "fecha",
            label: "Fecha",
        },
        {
            name: "titulo",
            label: "Título",
        },
        {
            name: "Asistencia",
            options: {
                customBodyRenderLite: (dataIndex) => CutomButtonsRenderer(dataIndex),
            },
        },
        
    ];

    const options = {
        responsive: "standard",
        selectableRows: 'none',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        elevation: 0,
        textLabels: {
            body: {
                noMatch: "No se encontraron clases",
            },
        },
    };

    return (
        <div>
            <h2>Clases del Taller</h2>
            <ModaNueva
                id_tallerista={usuario.id}
                traer={async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                        const usuario = JSON.parse(loggedUserJSON);
                        setUsuario(usuario);
                        const novedades_aux = await servicioDtc.traerclasestaller(usuario.id);
                        setClases(novedades_aux);
                    }
                }}
            />
            <Paper>
                <MUIDataTable
                    title={"Clase del Taller"}
                    data={clases}
                    columns={columns}
                    options={options}
                />
            </Paper>
        </div>
    );
};

export default TablaNotificaciones;

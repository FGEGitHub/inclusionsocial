import servicioDtc from '../../../services/dtc'

import ModaNueva from './Modallegajo'
import React, { useEffect, useState, Fragment } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import TableRow from '@mui/material/TableRow';
import {

    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import Ver from './verlegajo';
import Borrarlegajo from './Modalborrar'
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


const TablaNotificaciones = (props) => {
    const theme = useTheme();
    const [foto, setfoto] = useState()
    const [usuario, setUsuario] = useState([''])
    const [formato, setFormato] = useState()
    // const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));


    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                const novedades_aux = await servicioDtc.traerfoto(id)
                console.log(typeof(novedades_aux))

               
                if (Array.isArray(novedades_aux) ) {
                    setfoto(novedades_aux[0])
                    setFormato("otro")
                  
                } /* else {
                window.open(`http://localhost:4000/dtc/traerfoto/${id}`)
                    const blob = new Blob([novedades_aux[0]], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    setfoto(novedades_aux[0]);
                } */
            }

        } catch (error) {

        }

    }



    // renderiza la data table
    return (
        <div>
            {foto ? <>
                {formato ? <>
                    {formato === "otro" ? <>
                   
                    <img src={`data:image/jpeg;base64,${foto}`} width="600" height="400"/>
                        

                    </> : <> </>}</> : <>Archivos PDF, seleccionar boton VER PDF para ver
                   
                        
                    </>}


            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones
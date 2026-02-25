import React from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function EstadisticasFuero({ oficios = [] }) {

  const resumenFuero = React.useMemo(() => {
    if (!Array.isArray(oficios)) return [];

    const conteo = oficios.reduce((acc, o) => {
      let fuero = o.fuero || "Sin Fuero";

      // Normalizar texto (SQL TRIM + UPPER)
      fuero = fuero.trim();
      fuero = fuero.charAt(0).toUpperCase() + fuero.slice(1).toLowerCase();

      acc[fuero] = (acc[fuero] || 0) + 1;
      return acc;
    }, {});

    // ORDER BY cantidad DESC
    return Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .map(([fuero, cantidad]) => ({ fuero, cantidad }));
  }, [oficios]);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">📊 Estadísticas por Fuero</Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Fuero</b></TableCell>
            <TableCell><b>Cantidad</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {resumenFuero.map((row) => (
            <TableRow key={row.fuero}>
              <TableCell>{row.fuero}</TableCell>
              <TableCell>{row.cantidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
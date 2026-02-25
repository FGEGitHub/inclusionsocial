import React, { useState } from "react";
import { Paper, Button } from "@mui/material";

const EstadisticasMujeres = ({ datos, cantidad  }) => {
  const [mostrar, setMostrar] = useState(true);
  if (!datos) return null;

  const mujeres = datos.cantidad_mujeres || 0;
  const mujeresMenores = datos.mujeres_menores_16 || 0;
  const mujeresMayores = datos.mujeres_mayores_16 || 0;
  const totalMenores = datos.total_menores_16 || 0;
  const totalMayores = datos.total_mayores_16 || 0;

  const porcMujeres = (mujeres / cantidad) * 100;
  const porcMujeresMenores = (mujeresMenores / mujeres) * 100 || 0;
  const porcMujeresMayores = (mujeresMayores / mujeres) * 100 || 0;

  return (
    <Paper
      style={{
        padding: 16,
        marginTop: 20,
        background: "#fff3f7",
        maxWidth: 420,
        width: "100%",
        margin: "20px auto",
        borderRadius: 18,
        boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
      }}
    >
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={() => setMostrar(!mostrar)}
        style={{ marginBottom: 10 }}
      >
        {mostrar ? "Ocultar estadísticas" : "Mostrar estadísticas"}
      </Button>

      {mostrar && (
        <>
          <h3>👩 Estadísticas Mujeres</h3>

          {/* TOTAL MUJERES */}
          <p>👩 Total Mujeres: <b>{mujeres}</b> de {cantidad}</p>
          <div style={{ background: "#f8bbd0", borderRadius: 10, height: 14 }}>
            <div style={{
              width: `${porcMujeres}%`,
              background: "#e91e63",
              height: 14,
              borderRadius: 10
            }} />
          </div>

          {/* MUJERES MENORES */}
          <p style={{ marginTop: 12 }}>🧒 Mujeres menores de 16: {mujeresMenores}</p>
          <div style={{ background: "#e1bee7", borderRadius: 10, height: 14 }}>
            <div style={{
              width: `${porcMujeresMenores}%`,
              background: "#8e24aa",
              height: 14,
              borderRadius: 10
            }} />
          </div>

          {/* MUJERES MAYORES */}
          <p style={{ marginTop: 12 }}>👩 Mujeres mayores de 16: {mujeresMayores}</p>
          <div style={{ background: "#c5cae9", borderRadius: 10, height: 14 }}>
            <div style={{
              width: `${porcMujeresMayores}%`,
              background: "#3949ab",
              height: 14,
              borderRadius: 10
            }} />
          </div>

          {/* TOTALES EDAD */}
          <div style={{ marginTop: 15, fontSize: 13 }}>
            <p>👶 Total menores de 16 (todos): {totalMenores}</p>
            <p>🧑 Total mayores de 16 (todos): {totalMayores}</p>
          </div>
        </>
      )}
    </Paper>
  );
};

export default EstadisticasMujeres;

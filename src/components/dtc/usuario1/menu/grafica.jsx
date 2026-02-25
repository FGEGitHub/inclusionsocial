import React, { useRef, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

function LineChartWithCheckboxes(props) {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes','Sabado'],
    datasets: [
      {
        label: 'semana actual',
        data: props.semana,
        color: 'red',
        visible: true, // Inicialmente visible
      },
      {
        label: 'Semana pasada',
        data: props.semanapasada,
        color: 'blue',
        visible: true, // Inicialmente visible
      },
     
    ],
  });

  useEffect(() => {
    // Función para dibujar el gráfico en el canvas
    const drawChart = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { labels, datasets } = chartData;
      const yInterval = 10;
      // Limpia el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Configura los límites del gráfico
      const marginLeft = 50;
      const marginBottom = 30;
      const width = canvas.width - marginLeft;
      const height = canvas.height - marginBottom;

      // Dibuja las líneas
      datasets.forEach((dataset, index) => {
        if (dataset.visible) {
          ctx.beginPath();
          ctx.strokeStyle = dataset.color;
          ctx.lineWidth = 2;

          // Calcula la posición de cada punto y dibuja la línea
          dataset.data.forEach((value, i) => {
            const x = marginLeft + (width / (labels.length - 1)) * i;
            const y = canvas.height - marginBottom - (value / 70) * height;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

          ctx.stroke();
        }
      });

      // Dibuja el eje X
      ctx.beginPath();
      ctx.moveTo(marginLeft, canvas.height - marginBottom);
      ctx.lineTo(canvas.width, canvas.height - marginBottom);
      ctx.stroke();

      // Dibuja las etiquetas del eje X
      labels.forEach((label, i) => {
        const x = marginLeft + (width / (labels.length - 1)) * i;
        const y = canvas.height - marginBottom + 20; // Posición de la etiqueta debajo del eje X
        ctx.fillText(label, x, y);
      });

      // Dibuja el eje Y
      ctx.beginPath();
      ctx.moveTo(marginLeft, 0);
      ctx.lineTo(marginLeft, canvas.height - marginBottom);
      ctx.stroke();

      // Dibuja las etiquetas del eje Y
      for (let i = 0; i <= 70; i += yInterval) {
        const y = canvas.height - marginBottom - (i / 70) * height;
        ctx.fillText(i, 30, y);
    }}

    // Llama a la función de dibujo
    drawChart();
  }, [chartData]);

  // Función para manejar el cambio en los checkboxes
  const handleCheckboxChange = (index) => {
    const newChartData = { ...chartData };

    // Cambia la propiedad `visible` del dataset correspondiente
    newChartData.datasets[index].visible = !newChartData.datasets[index].visible;

    // Actualiza los datos del gráfico
    setChartData(newChartData);
  };

  return (
    <div>
        <h3>Dia a dia con semana pasada</h3>
      <canvas
        ref={canvasRef}
        width="800"
        height="400"
        style={{ border: '1px solid black' }}
      />

      {/* Casillas de verificación para habilitar/deshabilitar cada línea */}
      {chartData.datasets.map((dataset, index) => (
        <FormControlLabel
          key={dataset.label}
          control={
            <Checkbox
              checked={dataset.visible}
              onChange={() => handleCheckboxChange(index)}
              color="primary"
            />
          }
          label={dataset.label}
        />
      ))}
    </div>
  );
}

export default LineChartWithCheckboxes;

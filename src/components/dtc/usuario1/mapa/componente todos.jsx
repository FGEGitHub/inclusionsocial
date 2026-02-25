import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import omnivore from '@mapbox/leaflet-omnivore';
import serviciodtc from '../../../../services/dtc'; // Servicio para obtener el mapa

// Configuración del icono
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

// Carga del archivo KML y permite marcar un punto
const LoadKML = ({ kmlData, selectedPoint, setMarkedPoint, markers, setMarkers }) => {
  const map = useMap();
  const [kmlLayer, setKmlLayer] = useState(null);

  useEffect(() => {
    const layer = omnivore.kml.parse(kmlData)
      .on('ready', function () {
        map.fitBounds(this.getBounds());
        this.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const { name, description } = layer.feature.properties;
            layer.bindPopup(`<strong>${name || 'Sin nombre'}</strong><br>${description || 'Sin descripción'}`);
          }
        });
      })
      .addTo(map);

    setKmlLayer(layer);

    return () => {
      if (layer) map.removeLayer(layer);
    };
  }, [kmlData, map]);

  // Centrar el mapa en el punto seleccionado si cambia
  useEffect(() => {
    if (selectedPoint && kmlLayer) {
      kmlLayer.eachLayer((layer) => {
        if (
          layer instanceof L.Marker &&
          layer.feature.properties.name === selectedPoint.name
        ) {
          map.setView(layer.getLatLng(), 15);
          layer.openPopup();
        }
      });
    }
  }, [selectedPoint, kmlLayer, map]);

  // Agregar nuevo marcador al hacer doble clic en el mapa
  const handleMapDoubleClick = (e) => {
    const { lat, lng } = e.latlng;
    const newMarker = L.marker([lat, lng])
      .bindPopup('Nuevo punto')
      .addTo(map);

    // Guardar el marcador en el estado
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { latlng: L.latLng(lat, lng), marker: newMarker }
    ]);

    // Actualizar el punto marcado en el estado
    setMarkedPoint({ name: 'Nuevo punto', latlng: L.latLng(lat, lng) });
  };

  useEffect(() => {
    map.on('dblclick', handleMapDoubleClick);

    return () => {
      map.off('dblclick', handleMapDoubleClick);
    };
  }, [map]);

  return null;
};

// Componente principal
const MapComponent = () => {
  const [kmlData, setKmlData] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [markedPoint, setMarkedPoint] = useState(null);
  const [availablePoints, setAvailablePoints] = useState([]);
  const [newPointName, setNewPointName] = useState(''); // Estado para el nombre del nuevo punto
  const [markers, setMarkers] = useState([]); // Estado para guardar los marcadores

  // Obtener el KML desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await serviciodtc.traermapa();
        setKmlData(data);

        // Extraer puntos del KML
        const layer = omnivore.kml.parse(data);
        const points = [];
        layer.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const { name } = layer.feature.properties || {};
            if (name) {
              points.push({
                name,
                latlng: layer.getLatLng(),
              });
            }
          }
        });
        setAvailablePoints(points);
      } catch (error) {
        console.error('Error al cargar el mapa:', error);
      }
    };
    fetchData();
  }, []);

  // Guardar el punto marcado
  const handleSavePoint = async () => {
    if (markedPoint && newPointName) {
      try {
        const kmlString = `
          <kml xmlns="http://www.opengis.net/kml/2.2">
            <Document>
              <Placemark>
                <name>${newPointName}</name> <!-- Nombre del nuevo punto -->
                <Point>
                  <coordinates>${markedPoint.latlng.lng},${markedPoint.latlng.lat}</coordinates>
                </Point>
              </Placemark>
            </Document>
          </kml>
        `;
        await serviciodtc.guardarMapa(kmlString);
        alert('Punto guardado exitosamente.');
      } catch (error) {
        console.error('Error al guardar el punto:', error);
        alert('Error al guardar el punto.');
      }
    } else {
      alert('Por favor ingresa un nombre para el punto.');
    }
  };

  // Borrar un punto seleccionado
  const handleDeletePoint = async () => {
    if (selectedPoint) {
      try {
        // Eliminar el marcador en el mapa
        const pointToDelete = markers.find((marker) => marker.latlng.lat === selectedPoint.latlng.lat && marker.latlng.lng === selectedPoint.latlng.lng);
        if (pointToDelete) {
          pointToDelete.marker.remove();
          setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker !== pointToDelete));
        }

        // Llamar al servicio para borrar el punto en el backend
        await serviciodtc.borrarpuntoenmapa(selectedPoint);
        alert('Punto borrado exitosamente.');
      } catch (error) {
        console.error('Error al borrar el punto:', error);
        alert('Error al borrar el punto.');
      }
    } else {
      alert('Selecciona un punto para borrar.');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="pointSelector">Seleccionar un punto: </label>
        <select
          id="pointSelector"
          onChange={(e) => {
            const selectedName = e.target.value;
            const point = availablePoints.find((p) => p.name === selectedName);
            if (point) {
              setSelectedPoint(point);
            }
          }}
        >
          <option value="">-- Seleccionar --</option>
          {availablePoints.map((point) => (
            <option key={point.name} value={point.name}>
              {point.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="newPointName">Nombre del nuevo punto: </label>
        <input
          type="text"
          id="newPointName"
          value={newPointName}
          onChange={(e) => setNewPointName(e.target.value)} // Actualizar el nombre del nuevo punto
          placeholder="Ingrese el nombre del punto"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleSavePoint} disabled={!markedPoint || !newPointName}>
          Guardar Punto
        </button>
        <button onClick={handleDeletePoint} disabled={!selectedPoint}>
          Borrar Punto
        </button>
      </div>
      <MapContainer center={[0, 0]} zoom={15} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {kmlData && (
          <LoadKML
            kmlData={kmlData}
            selectedPoint={selectedPoint}
            setMarkedPoint={setMarkedPoint}
            markers={markers}
            setMarkers={setMarkers}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

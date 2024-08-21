import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { FeatureGroup, MapContainer, TileLayer, useMap } from 'react-leaflet';

import { EditControl } from 'react-leaflet-draw';

import { Grid, Paper } from '@mui/material';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';
import 'leaflet/dist/leaflet.css';

// // adapt leaflet to react ----
// pnpm add leaflet react-leaflet
// pnpm add -D @types/leaflet

// @ts-expect-error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export type CoordenadasType = {
  lat: number;
  lng: number;
};

export type CustomMapPolygonProps = {
  coordenadas: CoordenadasType;
  // setLatLng: (coordenadas: CoordenadasType) => void;

  canDrawPolygon?: boolean;

  zoomMap?: number;

  size?: GridSizeType;
};

const CustomMapPolygon: React.FC<CustomMapPolygonProps> = ({
  coordenadas,
  size = gridSize,
  zoomMap = 12,

  canDrawPolygon = false,
}) => {
  const center = [coordenadas.lat, coordenadas.lng];

  ///* recenter
  const RecenterAutomatically = ({ lat, lng }: CoordenadasType) => {
    const map = useMap();
    const animateRef = useRef(true);
    useEffect(() => {
      map.setView([lat, lng], map.getZoom(), {
        animate: animateRef.current || false,
        duration: 1,
      });
    }, [lat, lng, map]);

    return null;
  };

  return (
    <Grid
      item
      {...size}
      sx={{
        pb: 4,
      }}
    >
      <Paper elevation={3} style={{ height: '600px', width: '100%' }}>
        <MapContainer
          center={center as L.LatLngExpression}
          zoom={zoomMap}
          // scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <FeatureGroup>
            <EditControl
              position="topright"
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,

                polygon: canDrawPolygon,
              }}
              edit={{
                remove: canDrawPolygon,
                ...(canDrawPolygon === false && { edit: false }),
              }}
              onCreated={e => {
                console.log('onCreated', e);
              }}
              onEdited={e => {
                console.log('onEdited', e);
              }}
              onDeleted={e => {
                console.log('onDeleted', e);
              }}
            />
          </FeatureGroup>

          <TileLayer url={url} attribution={attribution} />

          <RecenterAutomatically lat={center[0]} lng={center[1]} />
        </MapContainer>
      </Paper>
    </Grid>
  );
};

export default CustomMapPolygon;

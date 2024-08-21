import L from 'leaflet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';

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
export type MultiPolygonType = number[][][];

export type MapProps = {
  coordenadas: CoordenadasType;
  setLatLng: (coordenadas: CoordenadasType) => void;

  canDragMarker?: boolean;
  zoomMap?: number;

  size?: GridSizeType;

  showCoverage?: boolean;
  coverage?: MultiPolygonType;
};

// polygon
const greenOptions = { color: 'green' };

const CustomMap: React.FC<MapProps> = ({
  coordenadas,
  setLatLng,
  size = gridSize,
  canDragMarker = true,
  zoomMap = 15,

  showCoverage = false,
  coverage = [],
}) => {
  const center = [coordenadas.lat, coordenadas.lng];

  ///* draggable
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setLatLng((marker as any).getLatLng());
        }
      },
    }),
    [setLatLng],
  );
  const toggleDraggable = useCallback(() => {
    setDraggable(d => !d);
  }, []);

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
          <TileLayer url={url} attribution={attribution} />

          {center && (
            <Marker
              position={center as L.LatLngExpression}
              draggable={canDragMarker ?? draggable} // custom draggable
              ref={markerRef}
              eventHandlers={eventHandlers}
            >
              <Popup minWidth={90}>
                {canDragMarker ? (
                  <span
                    onClick={toggleDraggable}
                    style={{
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {draggable
                      ? 'Ya puede arrastrar y soltar el Marker'
                      : 'Click aquí para activar el Marker'}
                  </span>
                ) : (
                  'Ubicación del Cliente'
                )}
              </Popup>
            </Marker>
          )}

          <RecenterAutomatically lat={center[0]} lng={center[1]} />

          {/* -------- polygon -------- */}
          {showCoverage && !!coverage.length && (
            <>
              {coverage.map((polygon, index) => (
                <Polygon
                  key={index}
                  pathOptions={greenOptions}
                  positions={polygon as unknown as L.LatLngExpression[][]}
                >
                  <Popup>
                    {/* Contenido personalizado del popup */}
                    <div>
                      <h4>Polígono {index + 1}</h4>
                      <p>
                        Este es un popup personalizado para el polígono{' '}
                        {index + 1}.
                      </p>
                    </div>
                  </Popup>
                </Polygon>
              ))}
            </>
            // <Polygon
            //   pathOptions={greenOptions}
            //   positions={coverage as unknown as L.LatLngExpression[][][]}
            // />
          )}
        </MapContainer>
      </Paper>
    </Grid>
  );
};

export default CustomMap;

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Polygon, Popup, TileLayer } from 'react-leaflet';

import { Grid, Paper, Typography } from '@mui/material';

import { gridSize } from '@/shared/constants/ui';
import { Flota, GridSizeType, Zona } from '@/shared/interfaces';
import { ToastWrapper } from '@/shared/wrappers';
import { useFlotasStore } from '@/store/app';
import { CustomSingleButton } from '../../CustomButtons';

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

type CoordenadasType = {
  lat: number;
  lng: number;
};
export type MultiPolygonType = number[][][];

export type FlotaZonesMapProps = {
  coordenadas: CoordenadasType;
  zones: Zona[];
  flota?: Flota;

  zoomMap?: number;

  size?: GridSizeType;

  showCoverage?: boolean;
};

// polygon
const greenOptions = { color: 'green' };

const FlotaZonesMap: React.FC<FlotaZonesMapProps> = ({
  coordenadas,
  size = gridSize,
  zoomMap = 15,
  zones,

  showCoverage = true,
}) => {
  const center = [coordenadas.lat, coordenadas.lng];

  const coords = zones.map(zona => zona.coordenadas);

  ///* global state -------------------
  const addZoneObj = useFlotasStore(s => s.addZoneObj);

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

          {/* -------- polygon -------- */}
          {showCoverage && !!coords.length && (
            <>
              {zones.map((zone, index) => {
                const { coordenadas: zoneCoords } = zone;

                return (
                  <Polygon
                    key={index}
                    pathOptions={greenOptions}
                    positions={zoneCoords as unknown as L.LatLngExpression[][]}
                  >
                    <Popup>
                      <Typography variant="h5">Zona: {zone?.name}</Typography>

                      <CustomSingleButton
                        label="Asignar Zona"
                        variant="text"
                        onClick={() => {
                          const currentZones =
                            useFlotasStore.getState().zonesObj;
                          if (
                            currentZones.some(
                              currentZone => currentZone.id === zone.id,
                            )
                          ) {
                            ToastWrapper.error(
                              `La zona ${zone?.name} ya ha sido asignada`,
                            );
                            return;
                          }

                          addZoneObj(zone);
                          ToastWrapper.info(
                            `Zona ${zone?.name} asignada correctamente`,
                          );
                        }}
                        sxGrid={{ pt: 1 }}
                        gridSizeBtn={gridSize}
                        justifyContent="center"
                      />
                    </Popup>
                  </Polygon>
                );
              })}
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

export default FlotaZonesMap;

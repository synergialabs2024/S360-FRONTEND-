import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Polygon, Popup, TileLayer } from 'react-leaflet';

import { Box, Grid, Paper, Typography } from '@mui/material';

import { gridSize } from '@/shared/constants/ui';
import { Flota, GridSizeType, Zona } from '@/shared/interfaces';
import { ToastWrapper } from '@/shared/wrappers';
import { useFlotasStore } from '@/store/app';
import { CustomSingleButton } from '../../CustomButtons';

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
  savedZones: number[];
  flota?: Flota;
  zoomMap?: number;
  size?: GridSizeType;
  showCoverage?: boolean;
};

// polygon options
const greenOptions = { color: 'green' };

const FlotaZonesMap: React.FC<FlotaZonesMapProps> = ({
  coordenadas,
  size = gridSize,
  zoomMap = 15,
  zones,
  savedZones = [],
  showCoverage = true,
}) => {
  const center = [coordenadas.lat, coordenadas.lng];

  const coords = zones.map(zona => zona.coordenadas);
  const thereAreSavedZones = savedZones.length > 0;
  const restCoverage = thereAreSavedZones
    ? zones.filter(zone => !savedZones.includes(zone.id!))
    : zones;

  // global state handler
  const addZoneObj = useFlotasStore(s => s.addZoneObj);

  const handleAssignZone = (zone: Zona) => {
    const currentZones = useFlotasStore.getState().zonesObj;

    if (currentZones.some(currentZone => currentZone.id === zone.id)) {
      ToastWrapper.error(`La zona ${zone.name} ya ha sido asignada`);
      return;
    }

    addZoneObj(zone);
    ToastWrapper.info(`Zona ${zone.name} asignada correctamente`);
  };

  return (
    <Grid item {...size} sx={{ pb: 4 }}>
      <Paper elevation={3} style={{ height: '600px', width: '100%' }}>
        <MapContainer
          center={center as L.LatLngExpression}
          zoom={zoomMap}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url={url} attribution={attribution} />

          {/* -------- polygon -------- */}
          {showCoverage && coords.length > 0 && (
            <>
              {restCoverage.map((zone, index) => (
                <Polygon
                  key={index}
                  pathOptions={greenOptions}
                  positions={
                    zone.coordenadas as unknown as L.LatLngExpression[][]
                  }
                >
                  <Popup>
                    <Typography variant="h5">Zona: {zone.name}</Typography>

                    <CustomSingleButton
                      label="Asignar Zona"
                      variant="text"
                      onClick={() => handleAssignZone(zone)}
                      sxGrid={{ pt: 1 }}
                      gridSizeBtn={gridSize}
                      justifyContent="center"
                    />
                  </Popup>
                </Polygon>
              ))}
            </>
          )}
        </MapContainer>
      </Paper>

      {/* =============== legend =============== */}
      <>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="10px"
          marginTop="10px"
        >
          <Box display="flex" alignItems="center" marginRight="20px"></Box>

          <Box display="flex" alignItems="center">
            <Box
              width="40px"
              height="5px"
              bgcolor="green"
              marginRight="5px"
            ></Box>
            <Typography variant="body2">Área disponibles</Typography>
          </Box>
        </Box>
      </>
    </Grid>
  );
};

export default FlotaZonesMap;

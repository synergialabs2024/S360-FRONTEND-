import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { MapContainer, Polygon, Popup, TileLayer } from 'react-leaflet';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { useRef } from 'react';
import { MdAddLocationAlt, MdOutlineWrongLocation } from 'react-icons/md';

import { gridSize } from '@/shared/constants/ui';
import { Flota, GridSizeType, Zona } from '@/shared/interfaces';
import { ToastWrapper } from '@/shared/wrappers';
import { useFlotasStore } from '@/store/app';
import { CustomSingleButton } from '../../CustomButtons';

// @ts-expect-error
delete L.Icon.Default.prototype._getIconUrl;
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
const purpleOptions = { color: 'purple' };

const FlotaZonesMap: React.FC<FlotaZonesMapProps> = ({
  coordenadas,
  size = gridSize,
  zoomMap = 15,
  showCoverage = true,
}) => {
  const center = [coordenadas.lat, coordenadas.lng];
  const mapRef = useRef<L.Map>(null);

  // global state handler
  const zonesObj = useFlotasStore(s => s.zonesObj);
  const savedZonesObj = useFlotasStore(s => s.savedZonesObj);
  const addSavedZoneObj = useFlotasStore(s => s.addSavedZoneObj);
  const removeSavedZoneObj = useFlotasStore(s => s.removeSavedZoneObj);

  const handleAssignZone = (zone: Zona) => {
    if (savedZonesObj.some(savedZone => savedZone.id === zone.id)) {
      ToastWrapper.error(`La zona ${zone.name} ya ha sido asignada`);
      return;
    }

    addSavedZoneObj(zone);
    ToastWrapper.info(`Zona ${zone.name} asignada correctamente`);

    // Close all popups
    if (mapRef.current) {
      mapRef.current.closePopup();
    }
  };

  const handleRemoveZone = (zone: Zona) => {
    removeSavedZoneObj(zone.id!);
    ToastWrapper.info(`Zona ${zone.name} removida correctamente`);

    // Close all popups
    if (mapRef.current) {
      mapRef.current.closePopup();
    }
  };

  return (
    <Grid item {...size} sx={{ pb: 4 }}>
      <Paper elevation={3} style={{ height: '600px', width: '100%' }}>
        <MapContainer
          center={center as L.LatLngExpression}
          zoom={zoomMap}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer url={url} attribution={attribution} />

          {/* -------- polygon for zonesObj -------- */}
          {showCoverage && zonesObj.length > 0 && (
            <>
              {zonesObj.map((zone, index) => (
                <Polygon
                  key={index}
                  pathOptions={greenOptions}
                  positions={
                    zone.coordenadas as unknown as L.LatLngExpression[][]
                  }
                >
                  <Popup>
                    <Typography variant="h5" align="center">
                      Zona: {zone.name}
                    </Typography>

                    <CustomSingleButton
                      label="Asignar Zona"
                      variant="outlined"
                      startIcon={<MdAddLocationAlt />}
                      onClick={() => handleAssignZone(zone)}
                      sxGrid={{ pt: 3 }}
                      gridSizeBtn={gridSize}
                      justifyContent="center"
                    />
                  </Popup>
                </Polygon>
              ))}
            </>
          )}

          {/* -------- polygon for savedZonesObj -------- */}
          {savedZonesObj.map((zone, index) => (
            <Polygon
              key={index}
              pathOptions={purpleOptions}
              positions={zone.coordenadas as unknown as L.LatLngExpression[][]}
            >
              <Popup>
                <Typography variant="h5" align="center">
                  Zona: {zone.name}
                </Typography>

                <CustomSingleButton
                  label="Remover Zona"
                  variant="outlined"
                  color="error"
                  startIcon={<MdOutlineWrongLocation />}
                  onClick={() => handleRemoveZone(zone)}
                  sxGrid={{ pt: 3 }}
                  gridSizeBtn={gridSize}
                  justifyContent="center"
                />
              </Popup>
            </Polygon>
          ))}
        </MapContainer>
      </Paper>

      {/* =============== legend =============== */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
        marginTop="10px"
      >
        <Box display="flex" alignItems="center">
          <Box width="40px" height="5px" bgcolor="green" marginRight="5px" />
          <Typography variant="body2">Área disponibles</Typography>
        </Box>

        <Box display="flex" alignItems="center" marginRight="20px">
          <Box width="40px" height="5px" bgcolor="purple" marginRight="5px" />
          <Typography variant="body2">Zonas seleccionadas</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default FlotaZonesMap;

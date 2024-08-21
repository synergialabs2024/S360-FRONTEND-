import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { MdCancel, MdSaveAs } from 'react-icons/md';
import { PiPolygonBold } from 'react-icons/pi';
import { FeatureGroup, MapContainer, TileLayer, useMap } from 'react-leaflet';

// polygon
import { EditControl } from 'react-leaflet-draw';

import { Grid, Paper } from '@mui/material';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { useMapPolygonComponent } from '@/shared';
import { gridSize, gridSizeMdLg6 } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';
import { CustomSingleButton } from '..';

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
  zoomMap?: number;
  size?: GridSizeType;

  onCancel?: () => void;
  onSave?: (arrayCoords: CoordenadasType[]) => void;
};

const CustomMapPolygon: React.FC<CustomMapPolygonProps> = ({
  coordenadas,
  size = gridSize,
  zoomMap = 12,

  onCancel,
  onSave,
}) => {
  const center = [coordenadas.lat, coordenadas.lng];
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  ///* Function to clear all polygons
  const clearPolygons = () => {
    const featureGroup = featureGroupRef.current;
    if (featureGroup) {
      featureGroup.clearLayers();
    }
  };

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

  // hooks
  const { canDrawPolygon, coordsArray, setCanDrawPolygon, setCoordsArray } =
    useMapPolygonComponent({});

  return (
    <Grid item {...size} sx={{ pb: 4 }}>
      <>
        {!canDrawPolygon ? (
          <CustomSingleButton
            label="Dibujar área"
            startIcon={<PiPolygonBold />}
            variant="contained"
            onClick={() => setCanDrawPolygon(true)}
            sxGrid={{ pb: 3 }}
          />
        ) : (
          <Grid item container xs={12}>
            <Grid item {...gridSizeMdLg6}>
              <CustomSingleButton
                label="Guardar área"
                startIcon={<MdSaveAs />}
                variant="contained"
                onClick={() => {
                  setCanDrawPolygon(false);
                  onSave && onSave(coordsArray);
                }}
                sxGrid={{ pb: 3 }}
              />
            </Grid>

            <Grid item {...gridSizeMdLg6} container justifyContent="flex-end">
              <CustomSingleButton
                label="Cancelar"
                startIcon={<MdCancel />}
                variant="text"
                color="error"
                onClick={() => {
                  setCanDrawPolygon(false);
                  clearPolygons();
                  onCancel && onCancel();
                }}
                sxGrid={{ pb: 3 }}
                justifyContent="flex-end"
              />
            </Grid>
          </Grid>
        )}
      </>

      <Paper elevation={3} style={{ height: '600px', width: '100%' }}>
        <MapContainer
          center={center as L.LatLngExpression}
          zoom={zoomMap}
          style={{ height: '100%', width: '100%' }}
        >
          <FeatureGroup ref={featureGroupRef}>
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
                const { layerType, layer } = e;
                const latlngs = layer.getLatLngs();

                if (layerType === 'polygon') {
                  setCoordsArray(latlngs[0]);
                }
              }}
              onEdited={e => {
                const { layers } = e;
                const latlngs = layers.getLayers()[0].getLatLngs();

                setCoordsArray(latlngs[0]);
              }}
              onDeleted={e => {
                const { layers } = e;
                const latlngs = layers.getLayers()[0].getLatLngs();

                setCoordsArray(latlngs[0]);
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

import L from 'leaflet';
import 'leaflet-geosearch/dist/geosearch.css'; // search
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { MdCancel, MdSaveAs } from 'react-icons/md';
import { PiPolygonBold } from 'react-icons/pi';
import {
  FeatureGroup,
  MapContainer,
  Polygon,
  TileLayer,
  useMap,
} from 'react-leaflet';

import { Box, Grid, Paper, Typography } from '@mui/material';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// polygon
import { EditControl } from 'react-leaflet-draw';

// search
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import { ToastWrapper, useMapPolygonComponent } from '@/shared';
import { gridSize, gridSizeMdLg6 } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';
import { CustomSingleButton } from '..';

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

// Helper function to calculate polygon center
function calculatePolygonCenter(polygon: CoordenadasType[]): CoordenadasType {
  const latlngs = polygon.map(coord => new L.LatLng(coord.lat, coord.lng));
  const polygonBounds = L.latLngBounds(latlngs);
  const center = polygonBounds.getCenter();

  return { lat: center.lat, lng: center.lng };
}

export type CustomMapPolygonProps = {
  coordenadas: CoordenadasType;
  zoomMap?: number;
  size?: GridSizeType;
  limitOnePolygon?: boolean;

  polygon?: CoordenadasType[];
  otherZones?: CoordenadasType[];

  onCancel?: () => void;
  onSave?: (arrayCoords: CoordenadasType[]) => void;
};

const CustomMapPolygon: React.FC<CustomMapPolygonProps> = ({
  coordenadas,
  size = gridSize,
  zoomMap = 15,
  limitOnePolygon = true,

  polygon = [],
  otherZones = [], // multiPolygon

  onCancel,
  onSave,
}) => {
  // Calculate the center of the polygon if available, otherwise use provided coordinates
  const center = polygon?.length
    ? calculatePolygonCenter(polygon)
    : { lat: coordenadas.lat, lng: coordenadas.lng };

  const featureGroupRef = useRef<L.FeatureGroup>(null);

  ///* local state --------------------
  const [isEdittingAlredySavedPolygon, setIsEdittingAlredySavedPolygon] =
    useState<boolean>(!!polygon?.length);

  const savedPolygonArray = !isEdittingAlredySavedPolygon ? [] : polygon;
  const savedMultiPolygonArray = !isEdittingAlredySavedPolygon
    ? otherZones
    : [];

  ///* Function to clear all polygons
  const clearPolygons = () => {
    const featureGroup = featureGroupRef.current;
    if (featureGroup) {
      featureGroup.clearLayers();
    }
  };

  // hooks
  const { canDrawPolygon, coordsArray, setCanDrawPolygon, setCoordsArray } =
    useMapPolygonComponent({});

  // polygon view --------------------
  const purpleOptions = { color: 'purple' };
  const greenOptions = { color: 'green' };

  ///* search --------------------
  const Search = (props: any) => {
    const map = useMap();
    const { provider } = props;

    useEffect(() => {
      const searchControl = new (GeoSearchControl as any)({
        provider,
      });

      map.addControl(searchControl);

      return () => map.removeControl(searchControl) as any;
    }, [map, props, provider]);

    return null;
  };

  return (
    <Grid item {...size} sx={{ pb: 4 }}>
      <>
        {!canDrawPolygon ? (
          <CustomSingleButton
            label="Dibujar área"
            startIcon={<PiPolygonBold />}
            variant="contained"
            onClick={() => {
              setCanDrawPolygon(true);
              if (isEdittingAlredySavedPolygon) {
                setIsEdittingAlredySavedPolygon(false);
              }
            }}
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
                  // validate if there is a polygon
                  if (!coordsArray.length) {
                    ToastWrapper.warning('Debe trazar un área de cobertura');
                    return;
                  }

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

                  // si cancela mostrar de nuevo el savedPolygonArray
                  if (polygon?.length) {
                    setIsEdittingAlredySavedPolygon(true);
                  }
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
          {/* -------------- Draw Polygon -------------- */}
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
                const featureGroup = featureGroupRef.current;
                const { layerType, layer } = e;

                if (layerType === 'polygon') {
                  // length = 1 by default
                  if (
                    featureGroup &&
                    featureGroup.getLayers().length > 1 &&
                    limitOnePolygon
                  ) {
                    // Ya hay un polígono, no permitir crear otro
                    featureGroup.removeLayer(layer); // Remover el nuevo polígono creado
                    ToastWrapper.warning(
                      'Solo se permite crear un área de cobertura para cada zona',
                    );
                  } else {
                    const latlngs = layer.getLatLngs();
                    setCoordsArray(latlngs[0]);
                  }
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

          {/* -------- polygon -------- */}
          <Polygon pathOptions={purpleOptions} positions={savedPolygonArray} />
          <Polygon
            pathOptions={greenOptions}
            positions={savedMultiPolygonArray}
          />

          {/* -------- search -------- */}
          <Search
            provider={
              new OpenStreetMapProvider({
                params: {
                  countrycodes: 'ec',
                  'accept-language': 'es-ES',
                },
              })
            }
          />
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
          <Box display="flex" alignItems="center" marginRight="20px">
            <Box
              width="40px"
              height="5px"
              bgcolor="green"
              marginRight="5px"
            ></Box>
            <Typography variant="body2">Zonas con cobertura</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              width="40px"
              height="5px"
              bgcolor="purple"
              marginRight="5px"
            ></Box>
            <Typography variant="body2">Área Asignada</Typography>
          </Box>
        </Box>
      </>
    </Grid>
  );
};

export default CustomMapPolygon;

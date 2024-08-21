/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useState } from 'react';

import { CustomMapPolygon } from '@/shared/components';

type CoordenadasType = {
  lat: number;
  lng: number;
};
export type CoordenadasTypeString = {
  lat: string;
  lng: string;
};

export type UseMapComponentProps = {
  initialCoords?: string;
  initialCenter?: CoordenadasType;
  longitudFormKey?: string;
  latitudFormKey?: string;
};

export const useMapPolygonComponent = ({
  initialCenter,
  initialCoords,
}: UseMapComponentProps) => {
  // -2.0617178,-79.9083988 nexus coords
  // -2.1438074,-79.9106348 city office coords
  const [latLng, setLatLng] = useState<CoordenadasType>({
    lat:
      +(initialCoords?.split(',')?.at(0) || 0) ||
      initialCenter?.lat ||
      -2.1438074,
    lng:
      +(initialCoords?.split(',')?.at(1) || 0) ||
      initialCenter?.lng ||
      -79.9106348,
  });

  const MapPolygon = useMemo(() => CustomMapPolygon, [latLng.lat, latLng.lng]);
  const [coordsArray, setCoordsArray] = useState<CoordenadasType[]>([]);
  const [canDrawPolygon, setCanDrawPolygon] = useState<boolean>(false);

  const setLatLngCb = useCallback(
    (value: CoordenadasType) => {
      setLatLng(value);
    },
    [setLatLng],
  );

  //////* effects -------------------

  return {
    MapPolygon,
    latLng,
    setLatLng: setLatLngCb,

    coordsArray,
    setCoordsArray,
    canDrawPolygon,
    setCanDrawPolygon,
  };
};

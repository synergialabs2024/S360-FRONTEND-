/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CustomMap } from '@/shared/components/CustomMaps';

export type CoordenadasType = {
  lat: number;
  lng: number;
};

export type UseMapComponentProps = {
  initialCoords: string;
  initialCenter?: CoordenadasType;
  longitudFormKey?: string;
  latitudFormKey?: string;
  form: any;
};

export const useMapComponent = ({
  initialCenter,
  initialCoords,
  latitudFormKey = 'latitud',
  longitudFormKey = 'longitud',
  form,
}: UseMapComponentProps) => {
  // -2.0617178,-79.9083988 nexus coords
  const [latLng, setLatLng] = useState<CoordenadasType>({
    lat: +(initialCoords?.split(',')?.at(0) || 0) || initialCenter?.lat || -0.0,
    lng: +(initialCoords?.split(',')?.at(1) || 0) || initialCenter?.lng || -0.0,
  });
  const Map = useMemo(() => CustomMap, [latLng.lat, latLng.lng]);

  const setLatLngCb = useCallback(
    (value: CoordenadasType) => {
      setLatLng(value);
      form.setValue(latitudFormKey, value.lat.toString());
      form.setValue(longitudFormKey, value.lng.toString());
    },
    [setLatLng],
  );

  //////* effects -------------------
  ///* update coordenadas in form
  useEffect(() => {
    form.reset({
      ...form.getValues(),
      coordenadas: `${latLng.lat},${latLng.lng}`,
    });
  }, [latLng]);

  return {
    Map,
    latLng,
    setLatLng: setLatLngCb,
  };
};

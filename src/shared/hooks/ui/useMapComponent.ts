import { useCallback, useEffect, useMemo, useState } from 'react';

import { useFetchNaps } from '@/actions/app';
import { CustomMap } from '@/shared/components/CustomMaps';

type CoordenadasType = {
  lat: number;
  lng: number;
};

export type UseMapComponentProps = {
  initialCoords: string;
  form: any;
  coordsFormKey?: string;
  enableFetchNaps?: boolean;
};

export const useMapComponent = ({
  initialCoords,
  coordsFormKey = 'coordenadas',
  form,
  enableFetchNaps = false,
}: UseMapComponentProps) => {
  // Parse initial coordinates only once
  const initialLatLng = useMemo<CoordenadasType>(() => {
    const [lat, lng] = initialCoords.split(',').map(Number);
    return {
      lat: lat || 0,
      lng: lng || 0,
    };
  }, [initialCoords]);

  const [latLng, setLatLng] = useState<CoordenadasType>(initialLatLng);

  // Memoized Map component to avoid unnecessary re-renders
  const Map = useMemo(() => CustomMap, []);

  // Callback to update latLng
  const setLatLngCb = useCallback((value: CoordenadasType) => {
    setLatLng(value);
  }, []);

  const {
    data: napsByCoordsPagingRes,
    isLoading: isLoadingNaps,
    isRefetching: isRefetchingNaps,
  } = useFetchNaps({
    enabled: !!latLng?.lat && !!latLng?.lng && !!enableFetchNaps,
    params: {
      page_size: 900,
      coordenadas_radio: `${latLng.lat},${latLng.lng}`,
    },
  });

  // Sync latLng with form field
  useEffect(() => {
    if (latLng.lat && latLng.lng) {
      form.setValue(coordsFormKey, `${latLng.lat},${latLng.lng}`);
    }
  }, [latLng, coordsFormKey, form]);

  return {
    Map,
    latLng,
    setLatLng: setLatLngCb,

    napsByCoords: napsByCoordsPagingRes?.data?.items,
    isLoadingNaps,
    isRefetchingNaps,
  };
};

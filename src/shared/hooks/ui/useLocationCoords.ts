import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { CoordenadasType } from '@/shared/components/CustomMaps/CustomMap';
import { ToastWrapper } from '@/shared/wrappers';

type UseLocationCoordsProps = {
  form?: UseFormReturn<any, any, undefined>;
  setLatLng: (value: CoordenadasType) => void;
  isEditting?: boolean;
};

export const useLocationCoords = ({
  form,
  setLatLng,
  isEditting = false,
}: UseLocationCoordsProps) => {
  // get current location
  useEffect(() => {
    // if is editting, do not get current location
    if (isEditting) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          form && form.setValue('coordenadas', `${latitude},${longitude}`);

          setLatLng({
            lat: latitude,
            lng: longitude,
          });
        },
        error => {
          ToastWrapper.error('Error al obtener la geolocalización');
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } else {
      ToastWrapper.error(
        'La geolocalización no está disponible en este navegador',
      );
    }
  }, [form, isEditting, setLatLng]);
};

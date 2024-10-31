import { useEffect } from 'react';

import { useFetchUbicacionProductos } from '@/actions/app';
import {
  InventarioEnumUUID,
  OrdenTrabajo,
  TipoProductoEnumChoice,
  ToastWrapper,
} from '@/shared';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';

type UseONTInstallAsignadaOTParams = {
  ordenTrabajo: OrdenTrabajo;
};
export const useONTInstallAsignadaOT = ({
  ordenTrabajo,
}: UseONTInstallAsignadaOTParams) => {
  ///* global state --------------------
  const addSelectedItem = useInstalacionesStore(s => s.addSelectedItem);

  ///* fetch data ---------------------
  const {
    data: ontsDisponiblesPaging,
    isLoading: isLoadingONTsDisponibles,
    isRefetching: isRefetchingOntsDisponibles,
  } = useFetchUbicacionProductos({
    enabled: !!ordenTrabajo?.id,
    params: {
      page_size: 10,

      producto__tipo: TipoProductoEnumChoice.ONT,

      ubicacion: ordenTrabajo?.flota_data?.ubicacion_data?.id,
      producto__categoria__uuid: InventarioEnumUUID.CATEGORIA_PRODUCTO_EQUIPOS,
    },
  });

  ///* effects ---------------------
  useEffect(() => {
    if (
      !ordenTrabajo?.id ||
      isLoadingONTsDisponibles ||
      isRefetchingOntsDisponibles
    )
      return;

    const items = ontsDisponiblesPaging?.data?.items || [];
    if (!items?.length) {
      ToastWrapper.error(
        `La flota ${ordenTrabajo?.flota_data?.name} no tiene ONT disponibles`,
      );
      return;
    }

    const firstONT = items.at(0);
    if (firstONT && !!ordenTrabajo?.serie_ont) {
      addSelectedItem({
        keyStore: InstalacionesStoreKey.equiposUtilizados,
        item: {
          ...firstONT,

          usedQuantity: 1,
          selectedSeries: [],
          savedSeries: [ordenTrabajo?.serie_ont],
          containsSeries: !!firstONT?.series?.length,
        },
        showToast: false,
      });
    }
  }, [
    ordenTrabajo,
    ontsDisponiblesPaging,
    isLoadingONTsDisponibles,
    isRefetchingOntsDisponibles,
    addSelectedItem,
  ]);
};

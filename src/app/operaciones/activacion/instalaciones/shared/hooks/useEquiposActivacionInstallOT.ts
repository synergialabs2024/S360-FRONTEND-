import { useFetchUbicacionProductos } from '@/actions/app';
import {
  InventarioEnumUUID,
  OrdenTrabajo,
  TipoProductoEnumChoice,
  ToastWrapper,
} from '@/shared';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';
import { useEffect } from 'react';

type UseEquiposActivacionInstallOTParams = {
  ordenTrabajo: OrdenTrabajo;
};

export const useEquiposActivacionInstallOT = ({
  ordenTrabajo,
}: UseEquiposActivacionInstallOTParams) => {
  ///* global state --------------------
  const addSelectedItem = useInstalacionesStore(s => s.addSelectedItem);

  ///* fetch data ---------------------
  const {
    data: equiposDisponiblesPaging,
    isLoading: isLoadingItemsDisponibles,
    isRefetching: isRefetchingItemsDisponibles,
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
      isLoadingItemsDisponibles ||
      isRefetchingItemsDisponibles
    )
      return;

    const items = equiposDisponiblesPaging?.data?.items || [];
    if (!items?.length) {
      ToastWrapper.error(
        `La flota ${ordenTrabajo?.flota_data?.name} no tiene ONT disponibles`,
      );
      return;
    }

    const firstONT = items.at(0);
    if (firstONT) {
      addSelectedItem({
        keyStore: InstalacionesStoreKey.equiposUtilizados,
        item: {
          ...firstONT,

          usedQuantity: 1,
          selectedSeries: [],
          savedSeries: [],
          containsSeries: !!firstONT?.series?.length,
        },
        showToast: false,
      });
    }
  }, [
    ordenTrabajo,
    equiposDisponiblesPaging,
    isLoadingItemsDisponibles,
    isRefetchingItemsDisponibles,
    addSelectedItem,
  ]);
};

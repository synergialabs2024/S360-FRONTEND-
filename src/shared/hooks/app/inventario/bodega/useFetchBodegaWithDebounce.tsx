import { useState } from 'react';

import { useFetchBodegas } from '@/actions/app';
import { useDebouncer } from '@/shared/hooks/common';
import { Bodega } from '@/shared/interfaces';

export type UseFetchBodegaWithDebounceParams = {
  onBodegaSelected: (bodega: Bodega | null) => void;
};

export const useFetchBodegaWithDebounce = (
  { onBodegaSelected }: UseFetchBodegaWithDebounceParams = {} as any,
) => {
  ///* Estado local para el término de búsqueda
  const [searchBodegaTerm, setSearchBodegaTerm] = useState('');

  ///* Estado local para el usuario seleccionado
  const [selectedBodega, setSelectedBodega] = useState<Bodega | null>(null);

  ///* Debouncer para el término de búsqueda
  const {
    onChangeFilter: onChangeFilterBodega,
    searchTerm: debouncedSearchTerm,
  } = useDebouncer({
    searchTerm: searchBodegaTerm,
    setSearchTerm: setSearchBodegaTerm,
  });

  ///* Llamada a la API para obtener los usuarios del sistema
  const {
    data: BodegasPagingRes,
    isLoading: isLoadingBodegas,
    isRefetching: isRefetchingBodegas,
  } = useFetchBodegas({
    params: {
      nombre: debouncedSearchTerm,
      page_size: 60,
    },
  });

  ///* Manejador para cuando se selecciona un usuario
  const onChangeBodega = (bodegaId: string) => {
    const bodega =
      BodegasPagingRes?.data?.items.find(
        u => (u as any)?.id === parseInt(bodegaId, 10),
      ) || null;
    setSelectedBodega(bodega as any);
    onBodegaSelected(bodega as any);
  };

  return {
    bodegas: BodegasPagingRes?.data?.items || [],
    isLoadingBodega: isLoadingBodegas || isRefetchingBodegas,
    selectedBodega,
    onChangeBodega,
    onChangeFilterBodega,
    searchBodegaTerm,
    setSearchBodegaTerm,

    setSelectedBodega,
  };
};

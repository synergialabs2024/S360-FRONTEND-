import { useState } from 'react';

import { useFetchTraficos } from '@/actions/app';
import { Trafico, useDebouncer } from '@/shared';

export type UseFetchTraficosWithDebounceParamsParams = {
  onTraficoSelected: (username: Trafico | null) => void;
};

export const UseFetchTraficosWithDebounceParams = (
  { onTraficoSelected }: UseFetchTraficosWithDebounceParamsParams = {} as any,
) => {
  ///* Estado local para el término de búsqueda
  const [searchTraficoTerm, setsearchTraficoTerm] = useState('');

  ///* Estado local para el usuario seleccionado
  const [selectedTrafico, setSelectedTrafico] = useState<Trafico | null>(null);

  ///* Debouncer para el término de búsqueda
  const {
    onChangeFilter: onChangeFilterTrafico,
    searchTerm: debouncedSearchTerm,
  } = useDebouncer({
    searchTerm: searchTraficoTerm,
    setSearchTerm: setsearchTraficoTerm,
  });

  ///* Llamada a la API para obtener los usuarios del sistema
  const {
    data: TraficosPagingRes,
    isLoading: isLoadingTraficos,
    isRefetching: isRefetchingTraficos,
  } = useFetchTraficos({
    params: {
      username: debouncedSearchTerm,
      page_size: 60,
    },
  });

  ///* Manejador para cuando se selecciona un usuario
  const onChangeTrafico = (id: string) => {
    const user =
      TraficosPagingRes?.data?.items.find(
        (u: any) => u?.id === parseInt(id, 10),
      ) || null;
    setSelectedTrafico(user as any);
    onTraficoSelected(user as any);
  };

  return {
    traficos: TraficosPagingRes?.data?.items || [],
    isLoadingTraficos: isLoadingTraficos || isRefetchingTraficos,
    selectedTrafico,
    onChangeTrafico,
    onChangeFilterTrafico,
    searchTraficoTerm,
    setsearchTraficoTerm,

    setSelectedTrafico,
  };
};

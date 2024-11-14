import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

export enum AuditoriaConsumosONUTSQEnum {
  CLIENTESUSPENDIDOSCONSUMOS = 'cliente-suspendidos-consumos',
  CLIENTEACTIVOSALTOCONSUMOS = 'cliente-activos-alto-consumos',
  CLIENTEACTIVOSMOROSOS = 'cliente-activos-morosos',
  CLIENTESUSPENDIDOSCONSUMOSMK = 'cliente-suspendidos-consumos-mks',
}

const API_DATA_CLIENTES_SUSPENDIDOS_CONSUMO = '';
const API_DATA_CLIENTES_ACTIVOS_ALTO_CONSUMO = '';
const API_DATA_CLIENTES_ACTIVOS_MOROSO = '';
const API_DATA_CLIENTES_SUSPENDIDOS_CONSUMO_MK = '';

export const fetchCombinedDataClientesSuspendidosConsumo = async (
  params?: any,
) => {
  try {
    const response = await axios.get(API_DATA_CLIENTES_SUSPENDIDOS_CONSUMO, {
      params,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const fetchCombinedDataClientesActivosAltoConsumo = async (
  params?: any,
) => {
  try {
    const response = await axios.get(API_DATA_CLIENTES_ACTIVOS_ALTO_CONSUMO, {
      params,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const fetchCombinedDataClientesActivosMoroso = async (params?: any) => {
  try {
    const response = await axios.get(API_DATA_CLIENTES_SUSPENDIDOS_CONSUMO_MK, {
      params,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const fetchCombinedDataClientesSuspendidosConsumoMK = async (
  params?: any,
) => {
  try {
    const response = await axios.get(API_DATA_CLIENTES_ACTIVOS_MOROSO, {
      params,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

///* tanStack query ---------------
export const useFetchClientesSuspendidosConsumo = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [
      AuditoriaConsumosONUTSQEnum.CLIENTESUSPENDIDOSCONSUMOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => fetchCombinedDataClientesSuspendidosConsumo(params),
    enabled: enabled,
  });
};

export const useFetchClientesActivosAltoConsumo = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [
      AuditoriaConsumosONUTSQEnum.CLIENTEACTIVOSALTOCONSUMOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => fetchCombinedDataClientesActivosAltoConsumo(params),
    enabled: enabled,
  });
};

export const useFetchClientesActivosMoroso = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [
      AuditoriaConsumosONUTSQEnum.CLIENTEACTIVOSMOROSOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => fetchCombinedDataClientesActivosMoroso(params),
    enabled: enabled,
  });
};

export const useFetchClientesSuspendidosConsumoMK = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [
      AuditoriaConsumosONUTSQEnum.CLIENTESUSPENDIDOSCONSUMOSMK,
      ...Object.values(params || {}),
    ],
    queryFn: () => fetchCombinedDataClientesSuspendidosConsumoMK(params),
    enabled: enabled,
  });
};

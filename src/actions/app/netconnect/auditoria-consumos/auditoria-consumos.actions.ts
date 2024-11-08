import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

export enum AuditoriaConsumosONUTSQEnum {
  AUDITORIACONSUMOS = 'auditoria-consumos',
  AUDITORIACONSUMO = 'auditoria-consumo',
}

const API_DATA = '';

export const fetchCombinedDataAuditoriaConsumo = async (params?: any) => {
  try {
    const response = await axios.get(API_DATA, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

///* tanStack query ---------------
export const useFetchAuditoriaConsumos = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [
      AuditoriaConsumosONUTSQEnum.AUDITORIACONSUMOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => fetchCombinedDataAuditoriaConsumo(params),
    enabled: enabled,
  });
};

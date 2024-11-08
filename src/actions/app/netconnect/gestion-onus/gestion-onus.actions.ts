import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

export enum GestionONUTSQEnum {
  GESTIONONUS = 'gestion-onus',
  GESTIONONU = 'gestion-onu',
}

const API_DATA = '';

export const fetchCombinedDataGestionOnus = async (params?: any) => {
  try {
    const response = await axios.get(API_DATA, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

///* tanStack query ---------------
export const useFetchGestionOnus = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [GestionONUTSQEnum.GESTIONONUS, ...Object.values(params || {})],
    queryFn: () => fetchCombinedDataGestionOnus(params),
    enabled: enabled,
  });
};

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

export enum onusConfiguradaTSQEnum {
  ONUSCONFIGURADAS = 'onus-configuradas',
  ONUSCONFIGURADA = 'onus-configurada',
}

const API_DATA = '';

export const fetchCombinedDataOnusConfigurada = async (params?: any) => {
  try {
    const response = await axios.get(API_DATA, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

///* tanStack query ---------------
export const useFetchOnusConfiguradas = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [
      onusConfiguradaTSQEnum.ONUSCONFIGURADAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => fetchCombinedDataOnusConfigurada(params),
    enabled: enabled,
  });
};

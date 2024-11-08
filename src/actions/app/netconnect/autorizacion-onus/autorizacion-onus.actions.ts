import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

export enum AutorizacionONUTSQEnum {
  AUTORIZACIONONUS = 'autorizacion-onus',
  AUTORIZACIONONU = 'autorizacion-onu',
}

const API_DATA = '';

export const fetchCombinedDataAuthOnus = async (params?: any) => {
  try {
    const response = await axios.get(API_DATA, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

///* tanStack query ---------------
export const useFetchAutorizacionOnus = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [
      AutorizacionONUTSQEnum.AUTORIZACIONONUS,
      ...Object.values(params || {}),
    ],
    queryFn: () => fetchCombinedDataAuthOnus(params),
    enabled: enabled,
  });
};

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

export enum AuthClienteTSQEnum {
  AUTHCLIENTES = 'autenticacion-clientes',
  AUTHCLIENTE = 'autenticacion-cliente',
}

const API_DATA =
  'https://radiusapi.intercommerce.com.ec/api/pag-consultUserAutenticated';

export const fetchCombinedDataBras = async (params?: any) => {
  try {
    const response = await axios.get(API_DATA, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

///* tanStack query ---------------
export const useFetchAutenticacionClientes = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [AuthClienteTSQEnum.AUTHCLIENTES, ...Object.values(params || {})],
    queryFn: () => fetchCombinedDataBras(params),
    enabled: enabled,
  });
};

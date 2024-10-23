import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { handleAxiosError } from '@/shared/axios/axios.utils';

export enum TraficoTSQEnum {
  TRAFICOS = 'traficos',
  TRAFICO = 'trafico',
}

const API_DATA =
  'https://radiusapi.intercommerce.com.ec/api/pag-combined-data/';
const CONSULTA_API = 'https://radiusapi.intercommerce.com.ec/api/radacct/';
const TRACE_API = 'https://serverapiolt.intercommerce.com.ec/api/traceroute';
const PING_API = 'https://serverapiolt.intercommerce.com.ec/api/makePing';

export const fetchCombinedData = async (params?: any) => {
  try {
    const response = await axios.get(API_DATA, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

///* tanStack query ---------------
export const useFetchTraficos = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [TraficoTSQEnum.TRAFICOS, ...Object.values(params || {})],
    queryFn: () => fetchCombinedData(params),
    enabled: enabled,
  });
};

export const useGetTraficoConsulta = (username: string) => {
  return useQuery({
    queryKey: [TraficoTSQEnum.TRAFICO, username],
    queryFn: () => getTraficoConsulta(username),
    retry: false,
  });
};

///* axios
export const getTraficoConsulta = async (username: string) => {
  try {
    const response = await axios.get(`${CONSULTA_API}${username}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getTraficoTrace = async (ipConsult: string) => {
  try {
    const myHeaders = {
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
      TRACE_API,
      {
        ipConsult: ipConsult,
      },
      {
        headers: myHeaders,
      },
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getTraficoPing = async (ipConsult: string, packages: number) => {
  try {
    const myHeaders = {
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
      PING_API,
      {
        ipConsult: ipConsult,
        packages: packages,
      },
      {
        headers: myHeaders,
      },
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

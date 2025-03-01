import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getEnvs, ToastWrapper } from '@/shared';

export enum RadiusTSQEnum {
  RADIUSS = 'radiuss',
  RADIUS = 'radius',
}

const {
  VITE_YIGA5_RADIUS_USER,
  VITE_YIGA5_RADIUS_PASS,
  VITE_YIGA5_URL_RADIUS,
} = getEnvs();

const API_URL = `${VITE_YIGA5_URL_RADIUS}/radius/pag-combined-data/`;
const API_URL_TOKEN = `${VITE_YIGA5_URL_RADIUS}/login/token/`;

export const fetchCombinedDataRadius = async (token: { token: string }) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    return response.data;
  } catch (error) {
    ToastWrapper.error('Error al obtener los datos');
    throw error;
  }
};

export const fetchCombinedDataRadiusToken = async () => {
  try {
    const response = await axios.post(API_URL_TOKEN, {
      username: VITE_YIGA5_RADIUS_USER,
      password: VITE_YIGA5_RADIUS_PASS,
    });
    return response.data;
  } catch (error) {
    ToastWrapper.error('Error al obtener el Token');
    throw error;
  }
};

///* tanStack query ---------------
export const useFetchRadiuss = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: any;
}) => {
  return useQuery({
    queryKey: [RadiusTSQEnum.RADIUSS, ...Object.values(params || {})],
    queryFn: () => fetchCombinedDataRadius(params),
    enabled: enabled,
  });
};

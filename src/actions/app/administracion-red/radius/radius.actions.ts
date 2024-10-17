import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export enum RadiusTSQEnum {
  RADIUSS = 'radiuss',
  RADIUS = 'radius',
}

const API_URL = 'https://radiusapi.intercommerce.com.ec/api/pag-combined-data/';
export const fetchCombinedData = async (params?: any) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
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
    queryFn: () => fetchCombinedData(params),
    enabled: enabled,
  });
};

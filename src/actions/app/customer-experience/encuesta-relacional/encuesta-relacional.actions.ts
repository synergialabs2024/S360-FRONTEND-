import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  UseFetchEnabledParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import {
  EncuestaRelacional,
  EncuestaRelacionalPaginatedRes,
} from '@/shared/interfaces/app/customer-experience';

const { get } = erpAPI();

export enum EncuestaRelacionalTSQEnum {
  ENCUESTARELACIONALES = 'encuesta-relacionales',
  ENCUESTARELACIONAL = 'encuesta-relacional',
}
///* tanStack query ---------------
export const useFetchEncuestaRelacionales = ({
  enabled = true,
  params,
  refetchInterval,
}: UseFetchEnabledParams<GetEncuestaRelacionalesParams>) => {
  return useQuery({
    queryKey: [
      EncuestaRelacionalTSQEnum.ENCUESTARELACIONALES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getEncuestaRelacionales(params),
    enabled: enabled,
    ...(refetchInterval && { refetchInterval }),
  });
};

export const useGetEncuestaRelacional = (
  uuid: string,
  refetchOnWindowFocus = false,
) => {
  return useQuery({
    queryKey: [EncuestaRelacionalTSQEnum.ENCUESTARELACIONAL, uuid],
    queryFn: () => getEncuestaRelacional(uuid),
    retry: false,
    refetchOnWindowFocus,
  });
};

///* axios ---------------
export type GetEncuestaRelacionalesParams = Partial<EncuestaRelacional> &
  PagingPartialParams;

export const getEncuestaRelacionales = async (
  params?: GetEncuestaRelacionalesParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<EncuestaRelacionalPaginatedRes>(
    `/survey-response/?${queryParams}`,
    true,
  );
};

export const getEncuestaRelacional = async (uuid: string) => {
  try {
    return await get<EncuestaRelacional>(`/survey-response/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

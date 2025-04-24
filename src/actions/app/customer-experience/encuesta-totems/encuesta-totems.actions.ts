import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  EncuestaTotems,
  EncuestaTotemsPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';

const { get } = erpAPI();

export enum EncuestaTotemsTSQEnum {
  ENCUESTATOTEMS = 'encuesta-totems',
  ENCUESTATOTEM = 'encuesta-totem',
}
///* tanStack query ---------------
export const useFetchEncuestaTotems = ({
  enabled = true,
  params,
  refetchInterval,
}: UseFetchEnabledParams<GetEncuestaTotemsParams>) => {
  return useQuery({
    queryKey: [
      EncuestaTotemsTSQEnum.ENCUESTATOTEMS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getEncuestaTotems(params),
    enabled: enabled,
    ...(refetchInterval && { refetchInterval }),
  });
};

export const useGetEncuestaTotem = (
  uuid: string,
  refetchOnWindowFocus = false,
) => {
  return useQuery({
    queryKey: [EncuestaTotemsTSQEnum.ENCUESTATOTEM, uuid],
    queryFn: () => getEncuestaTotem(uuid),
    retry: false,
    refetchOnWindowFocus,
  });
};

///* axios ---------------
export type GetEncuestaTotemsParams = Partial<EncuestaTotems> &
  PagingPartialParams & {
    correcciones_aceptacion_pendientes?: boolean;
    por_agendar?: boolean;
  };

export const getEncuestaTotems = async (params?: GetEncuestaTotemsParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<EncuestaTotemsPaginatedRes>(`/preventa/?${queryParams}`, true);
};

export const getEncuestaTotem = async (uuid: string) => {
  try {
    return await get<EncuestaTotems>(`/preventa/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

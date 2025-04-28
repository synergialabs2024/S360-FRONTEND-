import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  UseFetchEnabledParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import {
  EncuestaAsesores,
  EncuestaAsesoresPaginatedRes,
} from '@/shared/interfaces/app/customer-experience';

const { get } = erpAPI();

export enum EncuestaAsesoresTSQEnum {
  ENCUESTAASESORES = 'encuesta-asesores',
  ENCUESTAASESOR = 'encuesta-asesor',
}
///* tanStack query ---------------
export const useFetchEncuestaAsesores = ({
  enabled = true,
  params,
  refetchInterval,
}: UseFetchEnabledParams<GetEncuestaAsesoresParams>) => {
  return useQuery({
    queryKey: [
      EncuestaAsesoresTSQEnum.ENCUESTAASESORES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getEncuestaAsesores(params),
    enabled: enabled,
    ...(refetchInterval && { refetchInterval }),
  });
};

export const useGetEncuestaAsesor = (
  uuid: string,
  refetchOnWindowFocus = false,
) => {
  return useQuery({
    queryKey: [EncuestaAsesoresTSQEnum.ENCUESTAASESOR, uuid],
    queryFn: () => getEncuestaAsesor(uuid),
    retry: false,
    refetchOnWindowFocus,
  });
};

///* axios ---------------
export type GetEncuestaAsesoresParams = Partial<EncuestaAsesores> &
  PagingPartialParams & {
    correcciones_aceptacion_pendientes?: boolean;
    por_agendar?: boolean;
  };

export const getEncuestaAsesores = async (
  params?: GetEncuestaAsesoresParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<EncuestaAsesoresPaginatedRes>(`/preventa/?${queryParams}`, true);
};

export const getEncuestaAsesor = async (uuid: string) => {
  try {
    return await get<EncuestaAsesores>(`/preventa/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

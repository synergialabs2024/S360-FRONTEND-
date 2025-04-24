import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  EncuestaPlantillas,
  EncuestaPlantillasPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import { ToastWrapper } from '@/shared';

const { get, post, patch } = erpAPI();

export enum EncuestaPlantillasTSQEnum {
  ENCUESTAPLANTILLAS = 'encuesta-plantillas',
  ENCUESTAPLANTILLA = 'encuesta-plantilla',
}
///* tanStack query ---------------
export const useFetchEncuestaPlantillas = ({
  enabled = true,
  params,
  refetchInterval,
}: UseFetchEnabledParams<GetEncuestaPlantillasParams>) => {
  return useQuery({
    queryKey: [
      EncuestaPlantillasTSQEnum.ENCUESTAPLANTILLAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getEncuestaPlantillas(params),
    enabled: enabled,
    ...(refetchInterval && { refetchInterval }),
  });
};

export const useGetEncuestaPlantilla = (
  uuid: string,
  refetchOnWindowFocus = false,
) => {
  return useQuery({
    queryKey: [EncuestaPlantillasTSQEnum.ENCUESTAPLANTILLA, uuid],
    queryFn: () => getEncuestaPlantilla(uuid),
    retry: false,
    refetchOnWindowFocus,
  });
};

export const useCreateEncuestaPlantilla = ({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: createEncuestaPlantilla,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plantillas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Plantilla creada correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const useUpdateEncuestaPlantilla = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: UpdateEncuestaPlantillaParams<T>) =>
      updateEncuestaPlantilla(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plantillas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Plantilla actualizada correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

///* axios ---------------
export type GetEncuestaPlantillasParams = Partial<EncuestaPlantillas> &
  PagingPartialParams & {
    correcciones_aceptacion_pendientes?: boolean;
    por_agendar?: boolean;
  };

export type CreateEncuestaPlantillaParams = Omit<EncuestaPlantillas, 'id'>;
export interface UpdateEncuestaPlantillaParams<T> {
  id: number;
  data: T;
}

export const getEncuestaPlantillas = async (
  params?: GetEncuestaPlantillasParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<EncuestaPlantillasPaginatedRes>(
    `/survey-template/?${queryParams}`,
    true,
  );
};

export const getEncuestaPlantilla = async (uuid: string) => {
  try {
    return await get<EncuestaPlantillas>(`/survey-template/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createEncuestaPlantilla = async (
  data: CreateEncuestaPlantillaParams,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<EncuestaPlantillas>('/survey-template/', data, true);
};

export const updateEncuestaPlantilla = async <T>({
  id,
  data,
}: UpdateEncuestaPlantillaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<EncuestaPlantillas>(`/survey-template/${id}/`, data, true);
};

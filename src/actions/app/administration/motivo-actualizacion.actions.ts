import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  MotivoActualizacion,
  MotivosActualizacionPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum MotivoActualizacionTSQEnum {
  MOTIVOACTUALIZACIONS = 'motivo-actualizacions',
  MOTIVOACTUALIZACION = 'motivo-actualizacion',
}
///* tanStack query ---------------
export const useFetchMotivoActualizacions = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMotivoActualizacionsParams>) => {
  return useQuery({
    queryKey: [
      MotivoActualizacionTSQEnum.MOTIVOACTUALIZACIONS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMotivoActualizacions(params),
    enabled: enabled,
  });
};

export const useGetMotivoActualizacion = (uuid: string) => {
  return useQuery({
    queryKey: [MotivoActualizacionTSQEnum.MOTIVOACTUALIZACION, uuid],
    queryFn: () => getMotivoActualizacion(uuid),
    retry: false,
  });
};

export const useCreateMotivoActualizacion = <T>({
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
    mutationFn: (params: CreateMotivoActualizacionParams<T>) =>
      createMotivoActualizacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoActualizacionTSQEnum.MOTIVOACTUALIZACIONS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'MotivoActualizacion creado correctamente',
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

export const useUpdateMotivoActualizacion = <T>({
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
    mutationFn: (params: UpdateMotivoActualizacionParams<T>) =>
      updateMotivoActualizacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoActualizacionTSQEnum.MOTIVOACTUALIZACIONS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'MotivoActualizacion actualizado correctamente',
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
export type GetMotivoActualizacionsParams = Partial<MotivoActualizacion> &
  PagingPartialParams;
export type CreateMotivoActualizacionParams<T> = T;
export type CreateMotivoActualizacionParamsBase = Omit<
  MotivoActualizacion,
  'id'
>;
export interface UpdateMotivoActualizacionParams<T> {
  id: number;
  data: T;
}

export const getMotivoActualizacions = async (
  params?: GetMotivoActualizacionsParams,
) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<MotivosActualizacionPaginatedRes>(
    `/motivo-actualizacion/?${queryParams}`,
    true,
  );
};

export const getMotivoActualizacion = async (uuid: string) => {
  try {
    return await get<MotivoActualizacion>(
      `/motivo-actualizacion/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMotivoActualizacion = async <T>(
  data: CreateMotivoActualizacionParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MotivoActualizacion>('/motivo-actualizacion/', data, true);
};

export const updateMotivoActualizacion = async <T>({
  id,
  data,
}: UpdateMotivoActualizacionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MotivoActualizacion>(`/motivo-actualizacion/${id}/`, data, true);
};

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/shared/axios/erp-api';

import {
  getUrlParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
  MotivoEgreso,
  PagingPartialParams,
  MotivoEgresoPaginatedRes,
} from '@/shared';

const { get, post, patch } = erpAPI();

export enum MotivoEgresoTSQEnum {
  MOTIVOEGRESOS = 'motivo-egresos',
  MOTIVOEGRESO = 'motivo-egreso',
}

///* tanStack query
export const useFetchMotivoEgreso = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMotivoEgresosParams>) => {
  return useQuery({
    queryKey: [
      MotivoEgresoTSQEnum.MOTIVOEGRESOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMotivoEgresos(params),
    enabled: enabled,
  });
};

export const useGetMotivoEgreso = (uuid: string) => {
  return useQuery({
    queryKey: [MotivoEgresoTSQEnum.MOTIVOEGRESO, uuid],
    queryFn: () => getMotivoEgreso(uuid),
    retry: false,
  });
};

export const useCreateMotivoEgreso = <T>({
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
    mutationFn: (params: CreateMotivoEgresoParams<T>) =>
      createMotivoEgreso(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoEgresoTSQEnum.MOTIVOEGRESOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Motivo Egreso creado correctamente',
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

export const useUpdateMotivoEgreso = <T>({
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
    mutationFn: (params: UpdateMotivoEgresoParams<T>) =>
      updateMotivoEgreso(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoEgresoTSQEnum.MOTIVOEGRESOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Motivo Egreso actualizado correctamente',
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
///* axios
export type GetMotivoEgresosParams = Partial<MotivoEgreso> &
  PagingPartialParams;
export type CreateMotivoEgresoParams<T> = T;
export type CreateMotivoEgresoParamsBase = Omit<MotivoEgreso, 'id'>;
export interface UpdateMotivoEgresoParams<T> {
  id: number;
  data: T;
}

export const getMotivoEgresos = async (params?: GetMotivoEgresosParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<MotivoEgresoPaginatedRes>(`/motivo_egreso/?${queryParams}`, true);
};

export const getMotivoEgreso = async (uuid: string) => {
  try {
    return await get<MotivoEgreso>(`/motivo_egreso/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMotivoEgreso = async <T>(
  data: CreateMotivoEgresoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MotivoEgreso>('/motivo_egreso/', data, true);
};

export const updateMotivoEgreso = async <T>({
  id,
  data,
}: UpdateMotivoEgresoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MotivoEgreso>(`/motivo_egreso/${id}/`, data, true);
};

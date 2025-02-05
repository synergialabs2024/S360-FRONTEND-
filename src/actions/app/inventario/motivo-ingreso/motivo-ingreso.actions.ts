import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/shared/axios/erp-api';

import {
  getUrlParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
  MotivoIngreso,
  PagingPartialParams,
  MotivoIngresoPaginatedRes,
} from '@/shared';

const { get, post, patch } = erpAPI();

export enum MotivoIngresoTSQEnum {
  MOTIVOINGRESOS = 'motivo-ingresos',
  MOTIVOINGRESO = 'motivo-ingreso',
}

///* tanStack query
export const useFetchMotivoIngreso = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMotivoIngresosParams>) => {
  return useQuery({
    queryKey: [
      MotivoIngresoTSQEnum.MOTIVOINGRESOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMotivoIngresos(params),
    enabled: enabled,
  });
};

export const useGetMotivoIngreso = (uuid: string) => {
  return useQuery({
    queryKey: [MotivoIngresoTSQEnum.MOTIVOINGRESO, uuid],
    queryFn: () => getMotivoIngreso(uuid),
    retry: false,
  });
};

export const useCreateMotivoIngreso = <T>({
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
    mutationFn: (params: CreateMotivoIngresoParams<T>) =>
      createMotivoIngreso(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoIngresoTSQEnum.MOTIVOINGRESOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Motivo Ingreso creado correctamente',
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

export const useUpdateMotivoIngreso = <T>({
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
    mutationFn: (params: UpdateMotivoIngresoParams<T>) =>
      updateMotivoIngreso(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoIngresoTSQEnum.MOTIVOINGRESOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Motivo Ingreso actualizado correctamente',
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
export type GetMotivoIngresosParams = Partial<MotivoIngreso> &
  PagingPartialParams;
export type CreateMotivoIngresoParams<T> = T;
export type CreateMotivoIngresoParamsBase = Omit<MotivoIngreso, 'id'>;
export interface UpdateMotivoIngresoParams<T> {
  id: number;
  data: T;
}

export const getMotivoIngresos = async (params?: GetMotivoIngresosParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<MotivoIngresoPaginatedRes>(
    `/motivo_ingreso/?${queryParams}`,
    true,
  );
};

export const getMotivoIngreso = async (uuid: string) => {
  try {
    return await get<MotivoIngreso>(`/motivo_ingreso/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMotivoIngreso = async <T>(
  data: CreateMotivoIngresoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MotivoIngreso>('/motivo_ingreso/', data, true);
};

export const updateMotivoIngreso = async <T>({
  id,
  data,
}: UpdateMotivoIngresoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MotivoIngreso>(`/motivo_ingreso/${id}/`, data, true);
};

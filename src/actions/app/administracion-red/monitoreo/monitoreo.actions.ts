import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  Monitoreo,
  MonitoreosPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum MonitoreoTSQEnum {
  MONITOREOS = 'monitoreos',
  MONITOREO = 'monitoreo',
}
///* tanStack query ---------------
export const useFetchMonitoreos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMonitoreosParams>) => {
  return useQuery({
    queryKey: [MonitoreoTSQEnum.MONITOREOS, ...Object.values(params || {})],
    queryFn: () => getMonitoreos(params),
    enabled: enabled,
  });
};

export const useGetMonitoreo = (uuid: string) => {
  return useQuery({
    queryKey: [MonitoreoTSQEnum.MONITOREO, uuid],
    queryFn: () => getMonitoreo(uuid),
    retry: false,
  });
};

export const useCreateMonitoreo = <T>({
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
    mutationFn: (params: CreateMonitoreoParams<T>) => createMonitoreo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MonitoreoTSQEnum.MONITOREO] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Monitoreo creado correctamente',
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

export const useUpdateMonitoreo = <T>({
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
    mutationFn: (params: UpdateMonitoreoParams<T>) => updateMonitoreo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonitoreoTSQEnum.MONITOREOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Monitoreo actualizado correctamente',
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
export type GetMonitoreosParams = Partial<Monitoreo> & PagingPartialParams;
export type CreateMonitoreoParams<T> = T;
export type CreateMonitoreoParamsBase = Omit<Monitoreo, 'id'>;
export interface UpdateMonitoreoParams<T> {
  id: number;
  data: T;
}

export const getMonitoreos = async (params?: GetMonitoreosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<MonitoreosPaginatedRes>(`/monitoreo/?${queryParams}`, true);
};

export const getMonitoreo = async (uuid: string) => {
  try {
    return await get<Monitoreo>(`/monitoreo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMonitoreo = async <T>(data: CreateMonitoreoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Monitoreo>('/monitoreo/', data, true);
};

export const updateMonitoreo = async <T>({
  id,
  data,
}: UpdateMonitoreoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Monitoreo>(`/monitoreo/${id}/`, data, true);
};

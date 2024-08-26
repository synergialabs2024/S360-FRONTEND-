import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Tarjeta,
  TarjetasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum TarjetaTSQEnum {
  TARJETAS = 'tarjetas',
  TARJETA = 'tarjeta',
}
///* tanStack query ---------------
export const useFetchTarjetas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTarjetasParams>) => {
  return useQuery({
    queryKey: [TarjetaTSQEnum.TARJETAS, ...Object.values(params || {})],
    queryFn: () => getTarjetas(params),
    enabled: enabled,
  });
};

export const useGetTarjeta = (uuid: string) => {
  return useQuery({
    queryKey: [TarjetaTSQEnum.TARJETA, uuid],
    queryFn: () => getTarjeta(uuid),
    retry: false,
  });
};

export const useCreateTarjeta = <T>({
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
    mutationFn: (params: CreateTarjetaParams<T>) => createTarjeta(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TarjetaTSQEnum.TARJETAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Tarjeta creada correctamente',
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

export const useUpdateTarjeta = <T>({
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
    mutationFn: (params: UpdateTarjetaParams<T>) => updateTarjeta(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TarjetaTSQEnum.TARJETAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Tarjeta actualizada correctamente',
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
export type GetTarjetasParams = Partial<Tarjeta> & PagingPartialParams;
export type CreateTarjetaParams<T> = T;
export type CreateTarjetaParamsBase = Omit<Tarjeta, 'id'>;
export interface UpdateTarjetaParams<T> {
  id: number;
  data: T;
}

export const getTarjetas = async (params?: GetTarjetasParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<TarjetasPaginatedRes>(`/tarjeta/?${queryParams}`, true);
};

export const getTarjeta = async (uuid: string) => {
  try {
    return await get<Tarjeta>(`/tarjeta/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTarjeta = async <T>(data: CreateTarjetaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Tarjeta>('/tarjeta/', data, true);
};

export const updateTarjeta = async <T>({
  id,
  data,
}: UpdateTarjetaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Tarjeta>(`/tarjeta/${id}/`, data, true);
};

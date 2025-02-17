import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Alquiler,
  UseFetchEnabledParams,
  UseMutationParams,
  AlquileresPaginatedRes,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum AlquilerTSQEnum {
  ALQUILERES = 'alquileres',
  ALQUILER = 'alquiler',
}
///* tanStack query ---------------
export const useFetchAlquileres = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetAlquileresParams>) => {
  return useQuery({
    queryKey: [AlquilerTSQEnum.ALQUILERES, ...Object.values(params || {})],
    queryFn: () => getAlquileres(params),
    enabled: enabled,
  });
};

export const useGetAlquiler = (uuid: string) => {
  return useQuery({
    queryKey: [AlquilerTSQEnum.ALQUILER, uuid],
    queryFn: () => getAlquiler(uuid),
    retry: false,
  });
};

export const useCreateAlquiler = <T>({
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
    mutationFn: (params: CreateAlquilerParams<T>) => createAlquiler(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AlquilerTSQEnum.ALQUILERES] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Alquiler creada correctamente',
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

export const useUpdateAlquiler = <T>({
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
    mutationFn: (params: UpdateAlquilerParams<T>) => updateAlquiler(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AlquilerTSQEnum.ALQUILERES] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Alquiler actualizada correctamente',
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

export const useUpdateAlquilerCancel = ({
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
    mutationFn: (params: UpdateAlquilerCancelParams) =>
      updateAlquilerCancel(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AlquilerTSQEnum.ALQUILERES] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Alquiler cancelado correctamente',
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
export type GetAlquileresParams = Partial<Alquiler> & PagingPartialParams;
export type CreateAlquilerParams<T> = T;
export type CreateAlquilerParamsBase = Omit<Alquiler, 'id'>;
export interface UpdateAlquilerParams<T> {
  id: number;
  data: T;
}
export interface UpdateAlquilerCancelParams {
  id: number;
}

export const getAlquileres = async (params?: GetAlquileresParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<AlquileresPaginatedRes>(
    `/alquileres-rubro-servicio/?${queryParams}`,
    true,
  );
};

export const getAlquiler = async (uuid: string) => {
  try {
    return await get<Alquiler>(`/alquileres-rubro-servicio/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createAlquiler = async <T>(data: CreateAlquilerParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Alquiler>('/alquileres-rubro-servicio/', data, true);
};

export const updateAlquiler = async <T>({
  id,
  data,
}: UpdateAlquilerParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Alquiler>(`/alquileres-rubro-servicio/${id}/`, data, true);
};

export const updateAlquilerCancel = async ({
  id,
}: UpdateAlquilerCancelParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Alquiler>(
    `/alquileres-rubro-servicio/cancel/${id}/`,
    { id },
    true,
  );
};

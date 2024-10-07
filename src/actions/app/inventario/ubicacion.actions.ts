import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Ubicacion,
  UbicacionesPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum UbicacionTSQEnum {
  UBICACIONS = 'ubicacions',
  UBICACION = 'ubicacion',
}
///* tanStack query ---------------
export const useFetchUbicacions = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetUbicacionsParams>) => {
  return useQuery({
    queryKey: [UbicacionTSQEnum.UBICACIONS, ...Object.values(params || {})],
    queryFn: () => getUbicacions(params),
    enabled: enabled,
  });
};

export const useGetUbicacion = (uuid: string) => {
  return useQuery({
    queryKey: [UbicacionTSQEnum.UBICACION, uuid],
    queryFn: () => getUbicacion(uuid),
    retry: false,
  });
};

export const useCreateUbicacion = <T>({
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
    mutationFn: (params: CreateUbicacionParams<T>) => createUbicacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [UbicacionTSQEnum.UBICACIONS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Ubicacion creado correctamente',
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

export const useUpdateUbicacion = <T>({
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
    mutationFn: (params: UpdateUbicacionParams<T>) => updateUbicacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [UbicacionTSQEnum.UBICACIONS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Ubicacion actualizado correctamente',
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
export type GetUbicacionsParams = Partial<Ubicacion> & PagingPartialParams;
export type CreateUbicacionParams<T> = T;
export type CreateUbicacionParamsBase = Omit<Ubicacion, 'id'>;
export interface UpdateUbicacionParams<T> {
  id: number;
  data: T;
}

export const getUbicacions = async (params?: GetUbicacionsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<UbicacionesPaginatedRes>(`/ubicacion/?${queryParams}`, true);
};

export const getUbicacion = async (uuid: string) => {
  try {
    return await get<Ubicacion>(`/ubicacion/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createUbicacion = async <T>(data: CreateUbicacionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Ubicacion>('/ubicacion/', data, true);
};

export const updateUbicacion = async <T>({
  id,
  data,
}: UpdateUbicacionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Ubicacion>(`/ubicacion/${id}/`, data, true);
};

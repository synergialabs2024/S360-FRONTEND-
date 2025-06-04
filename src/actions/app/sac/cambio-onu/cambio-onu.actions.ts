import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  CambioOnu,
  CambioOnuPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum CambioOnuTSQEnum {
  CAMBIOONUS = 'cambio-onus',
  CAMBIOONU = 'cambio-onu',
}
///* tanStack query ---------------
export const useFetchCambioOnus = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCambioOnusParams>) => {
  return useQuery({
    queryKey: [CambioOnuTSQEnum.CAMBIOONUS, ...Object.values(params || {})],
    queryFn: () => getCambioOnus(params),
    enabled: enabled,
  });
};

export const useGetCambioOnu = (uuid: string) => {
  return useQuery({
    queryKey: [CambioOnuTSQEnum.CAMBIOONU, uuid],
    queryFn: () => getCambioOnu(uuid),
    retry: false,
  });
};

export const useCreateCambioOnu = <T>({
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
    mutationFn: (params: CreateCambioOnuParams<T>) => createCambioOnu(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CambioOnuTSQEnum.CAMBIOONUS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cambio Onu creada correctamente',
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

export const useUpdateCambioOnu = <T>({
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
    mutationFn: (params: UpdateCambioOnuParams<T>) => updateCambioOnu(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CambioOnuTSQEnum.CAMBIOONUS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cambio Onu actualizada correctamente',
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
export type GetCambioOnusParams = Partial<CambioOnu> & PagingPartialParams;
export type CreateCambioOnuParams<T> = T;
export type CreateCambioOnuParamsBase = Omit<CambioOnu, 'id'>;
export interface UpdateCambioOnuParams<T> {
  id: number;
  data: T;
}

export const getCambioOnus = async (params?: GetCambioOnusParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CambioOnuPaginatedRes>(`/cambio-onu/?${queryParams}`, true);
};

export const getCambioOnu = async (uuid: string) => {
  try {
    return await get<CambioOnu>(`/cambio-onu/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCambioOnu = async <T>(data: CreateCambioOnuParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CambioOnu>('/cambio-onu/', data, true);
};

export const updateCambioOnu = async <T>({
  id,
  data,
}: UpdateCambioOnuParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CambioOnu>(`/cambio-onu/${id}/`, data, true);
};

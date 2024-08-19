import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Preventa,
  PreventasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum PreventaTSQEnum {
  PREVENTAS = 'preventas',
  PREVENTA = 'preventa',
}
///* tanStack query ---------------
export const useFetchPreventas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPreventasParams>) => {
  return useQuery({
    queryKey: [PreventaTSQEnum.PREVENTAS, ...Object.values(params || {})],
    queryFn: () => getPreventas(params),
    enabled: enabled,
  });
};

export const useGetPreventa = (uuid: string) => {
  return useQuery({
    queryKey: [PreventaTSQEnum.PREVENTA, uuid],
    queryFn: () => getPreventa(uuid),
    retry: false,
  });
};

export const useCreatePreventa = <T>({
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
    mutationFn: (params: CreatePreventaParams<T>) => createPreventa(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PreventaTSQEnum.PREVENTAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Preventa creada correctamente',
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

export const useUpdatePreventa = <T>({
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
    mutationFn: (params: UpdatePreventaParams<T>) => updatePreventa(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PreventaTSQEnum.PREVENTAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Preventa actualizada correctamente',
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
export type GetPreventasParams = Partial<Preventa> & PagingPartialParams;
export type CreatePreventaParams<T> = T;
export type CreatePreventaParamsBase = Omit<Preventa, 'id'>;
export interface UpdatePreventaParams<T> {
  id: number;
  data: T;
}

export const getPreventas = async (params?: GetPreventasParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<PreventasPaginatedRes>(`/preventa/?${queryParams}`, true);
};

export const getPreventa = async (uuid: string) => {
  try {
    return await get<Preventa>(`/preventa/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPreventa = async <T>(data: CreatePreventaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Preventa>('/preventa/', data, true);
};

export const updatePreventa = async <T>({
  id,
  data,
}: UpdatePreventaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Preventa>(`/preventa/${id}/`, data, true);
};

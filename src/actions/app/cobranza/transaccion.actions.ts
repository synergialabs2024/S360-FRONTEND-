import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Transaccion,
  TransaccionesPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum TransaccionTSQEnum {
  TRANSACCIONS = 'transaccions',
  TRANSACCION = 'transaccion',
}
///* tanStack query ---------------
export const useFetchTransaccions = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTransaccionsParams>) => {
  return useQuery({
    queryKey: [TransaccionTSQEnum.TRANSACCIONS, ...Object.values(params || {})],
    queryFn: () => getTransaccions(params),
    enabled: enabled,
  });
};

export const useGetTransaccion = (uuid: string) => {
  return useQuery({
    queryKey: [TransaccionTSQEnum.TRANSACCION, uuid],
    queryFn: () => getTransaccion(uuid),
    retry: false,
  });
};

export const useCreateTransaccion = <T>({
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
    mutationFn: (params: CreateTransaccionParams<T>) =>
      createTransaccion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TransaccionTSQEnum.TRANSACCIONS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Transaccion creado correctamente',
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

export const useUpdateTransaccion = <T>({
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
    mutationFn: (params: UpdateTransaccionParams<T>) =>
      updateTransaccion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TransaccionTSQEnum.TRANSACCIONS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Transaccion actualizado correctamente',
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
export type GetTransaccionsParams = Partial<Transaccion> & PagingPartialParams;
export type CreateTransaccionParams<T> = T;
export type CreateTransaccionParamsBase = Omit<Transaccion, 'id'>;
export interface UpdateTransaccionParams<T> {
  id: number;
  data: T;
}

export const getTransaccions = async (params?: GetTransaccionsParams) => {
  const stateParams = { ...params };

  // filter by state
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<TransaccionesPaginatedRes>(`/transaccion/?${queryParams}`, true);
};

export const getTransaccion = async (uuid: string) => {
  try {
    return await get<Transaccion>(`/transaccion/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTransaccion = async <T>(
  data: CreateTransaccionParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Transaccion>('/transaccion/', data, true);
};

export const updateTransaccion = async <T>({
  id,
  data,
}: UpdateTransaccionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Transaccion>(`/transaccion/${id}/`, data, true);
};

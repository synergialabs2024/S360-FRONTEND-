import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  Cliente,
  ClientesPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ClienteTSQEnum {
  CLIENTES = 'clientes',
  CLIENTE = 'cliente',
}
///* tanStack query ---------------
export const useFetchClientes = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetClientesParams>) => {
  return useQuery({
    queryKey: [ClienteTSQEnum.CLIENTES, ...Object.values(params || {})],
    queryFn: () => getClientes(params),
    enabled: enabled,
  });
};

export const useGetCliente = (uuid: string) => {
  return useQuery({
    queryKey: [ClienteTSQEnum.CLIENTE, uuid],
    queryFn: () => getCliente(uuid),
    retry: false,
  });
};

export const useCreateCliente = <T>({
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
    mutationFn: (params: CreateClienteParams<T>) => createCliente(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ClienteTSQEnum.CLIENTES] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cliente creado correctamente',
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

export const useUpdateCliente = <T>({
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
    mutationFn: (params: UpdateClienteParams<T>) => updateCliente(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ClienteTSQEnum.CLIENTES] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cliente actualizado correctamente',
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
export type GetClientesParams = Partial<Cliente> & PagingPartialParams;
export type CreateClienteParams<T> = T;
export type CreateClienteParamsBase = Omit<Cliente, 'id'>;
export interface UpdateClienteParams<T> {
  id: number;
  data: T;
}

export const getClientes = async (params?: GetClientesParams) => {
  const stateParams = { ...params };
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ClientesPaginatedRes>(`/cliente/?${queryParams}`, true);
};

export const getCliente = async (uuid: string) => {
  try {
    return await get<Cliente>(`/cliente/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCliente = async <T>(data: CreateClienteParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Cliente>('/cliente/', data, true);
};

export const updateCliente = async <T>({
  id,
  data,
}: UpdateClienteParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Cliente>(`/cliente/${id}/`, data, true);
};

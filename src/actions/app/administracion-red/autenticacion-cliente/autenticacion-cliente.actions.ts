import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import {
  AutenticacionCliente,
  AutenticacionClientesPaginatedRes,
} from '@/shared/interfaces/app/administracion-red/autenticacion-cliente';

const { get, post, patch } = erpAPI();

export enum AuthClienteTSQEnum {
  AUTHCLIENTES = 'autenticacion-clientes',
  AUTHCLIENTE = 'autenticacion-cliente',
}
///* tanStack query ---------------
export const useFetchAutenticacionClientes = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetAutenticacionClientesParams>) => {
  return useQuery({
    queryKey: [AuthClienteTSQEnum.AUTHCLIENTES, ...Object.values(params || {})],
    queryFn: () => getAutenticacionClientes(params),
    enabled: enabled,
  });
};

export const useGetAutenticacionCliente = (uuid: string) => {
  return useQuery({
    queryKey: [AuthClienteTSQEnum.AUTHCLIENTE, uuid],
    queryFn: () => getAutenticacionCliente(uuid),
    retry: false,
  });
};

export const useCreateAutenticacionCliente = <T>({
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
    mutationFn: (params: CreateAutenticacionClienteParams<T>) =>
      createAutenticacionCliente(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AuthClienteTSQEnum.AUTHCLIENTE],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'AutenticacionCliente creado correctamente',
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

export const useUpdateAutenticacionCliente = <T>({
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
    mutationFn: (params: UpdateAutenticacionClienteParams<T>) =>
      updateAutenticacionCliente(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AuthClienteTSQEnum.AUTHCLIENTES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'AutenticacionCliente actualizado correctamente',
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
export type GetAutenticacionClientesParams = Partial<AutenticacionCliente> &
  PagingPartialParams;
export type CreateAutenticacionClienteParams<T> = T;
export type CreateAutenticacionClienteParamsBase = Omit<
  AutenticacionCliente,
  'id'
>;
export interface UpdateAutenticacionClienteParams<T> {
  id: number;
  data: T;
}

export const getAutenticacionClientes = async (
  params?: GetAutenticacionClientesParams,
) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<AutenticacionClientesPaginatedRes>(
    `/autenticacion-cliente/?${queryParams}`,
    true,
  );
};

export const getAutenticacionCliente = async (uuid: string) => {
  try {
    return await get<AutenticacionCliente>(
      `/autenticacion-cliente/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createAutenticacionCliente = async <T>(
  data: CreateAutenticacionClienteParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<AutenticacionCliente>('/autenticacion-cliente/', data, true);
};

export const updateAutenticacionCliente = async <T>({
  id,
  data,
}: UpdateAutenticacionClienteParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<AutenticacionCliente>(
    `/autenticacion-cliente/${id}/`,
    data,
    true,
  );
};

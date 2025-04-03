import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  getUrlParams,
  ToastWrapper,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  ClientePendienteDevolucion,
  ClientePendienteDevolucionPaginatedRes,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';

const { get, post, patch } = erpAPI();

export enum ClientePendienteDevolucionTSQEnum {
  CLIENTEPENDIENTEDEVOLUCIONES = 'cliente-pendiente-devoluciones',
  CLIENTEPENDIENTEDEVOLUCION = 'cliente-pendiente-devolucion',
}

///* tanStack query ---------------
export const useFetchClientePendienteDevoluciones = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetClientePendienteDevolucionesParams>) => {
  return useQuery({
    queryKey: [
      ClientePendienteDevolucionTSQEnum.CLIENTEPENDIENTEDEVOLUCIONES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getClientePendienteDevoluciones(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetClientePendienteDevolucion = (uuid: string) => {
  return useQuery({
    queryKey: [
      ClientePendienteDevolucionTSQEnum.CLIENTEPENDIENTEDEVOLUCION,
      uuid,
    ],
    queryFn: () => getClientePendienteDevolucion(uuid),
    retry: false,
  });
};

export const useCreateClientePendienteDevolucion = <T>({
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
    mutationFn: (params: CreateClientePendienteDevolucionParams<T>) =>
      createClientePendienteDevolucion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ClientePendienteDevolucionTSQEnum.CLIENTEPENDIENTEDEVOLUCIONES,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Cliente Pendiente Devolucion creado correctamente',
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

export const useUpdateClientePendienteDevolucion = <T>({
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
    mutationFn: (params: UpdateClientePendienteDevolucionParams<T>) =>
      updateClientePendienteDevolucion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ClientePendienteDevolucionTSQEnum.CLIENTEPENDIENTEDEVOLUCIONES,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Cliente Pendiente Devolucion actualizado correctamente',
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
export type GetClientePendienteDevolucionesParams =
  Partial<ClientePendienteDevolucion> & PagingPartialParams;
export type CreateClientePendienteDevolucionParams<T> = T;
export type CreateClientePendienteDevolucionParamsBase = Omit<
  ClientePendienteDevolucion,
  'id'
>;
export interface UpdateClientePendienteDevolucionParams<T> {
  id: number;
  data: T;
}

export const getClientePendienteDevoluciones = async (
  params?: GetClientePendienteDevolucionesParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<ClientePendienteDevolucionPaginatedRes>(
    `/cliente-pendiente-devolucion/?${queryParams}`,
    true,
  );
};

export const getClientePendienteDevolucion = async (uuid: string) => {
  try {
    return await get<ClientePendienteDevolucion>(
      `/cliente-pendiente-devolucion/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createClientePendienteDevolucion = async <T>(
  data: CreateClientePendienteDevolucionParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<ClientePendienteDevolucion>(
    '/cliente-pendiente-devolucion/',
    data,
    true,
  );
};

export const updateClientePendienteDevolucion = async <T>({
  id,
  data,
}: UpdateClientePendienteDevolucionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ClientePendienteDevolucion>(
    `/cliente-pendiente-devolucion/${id}/`,
    data,
    true,
  );
};

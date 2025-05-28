import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { useUiStore } from '@/store/ui';

import {
  getUrlParams,
  ToastWrapper,
  SolicitudCompra,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  SolicitudCompraPaginatedRes,
} from '@/shared';

const { get, post, patch } = erpAPI();

export enum solicitudCompraTSQEnum {
  SOLICITUDCOMPRAS = 'solicitud-compras',
  SOLICITUDCOMPRA = 'solicitud-compra',
}

///* tanStack query
export const useFetchSolicitudCompra = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudCompraParams>) => {
  return useQuery({
    queryKey: [
      solicitudCompraTSQEnum.SOLICITUDCOMPRAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudCompra(params),
    enabled: enabled,
  });
};

export const useGetsolicitudCompra = (uuid: string) => {
  return useQuery({
    queryKey: [solicitudCompraTSQEnum.SOLICITUDCOMPRA, uuid],
    queryFn: () => getsolicitudCompra(uuid),
    retry: false,
  });
};

export const useGetsolicitudCompra_Ingreso = (
  uuid: string,
  p0: { enabled: boolean },
) => {
  return useQuery({
    queryKey: [solicitudCompraTSQEnum.SOLICITUDCOMPRA, uuid],
    queryFn: () => getsolicitudCompra_Ingreso(uuid),
    retry: false,
    enabled: p0.enabled,
  });
};

export const useCreateSolicitudCompra = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnSuccess,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateSolicitudCompraParams<T>) =>
      createsolicitudCompra(params),
    onSuccess: resp => {
      queryClient.invalidateQueries({
        queryKey: [solicitudCompraTSQEnum.SOLICITUDCOMPRA],
      });
      customOnSuccess && customOnSuccess(resp.data);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Solicitud de Compra creado correctamente',
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

export const useUpdatesolicitudCompra = <T>({
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
    mutationFn: (params: UpdatesolicitudCompraParams<T>) =>
      updatesolicitudCompra(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [solicitudCompraTSQEnum.SOLICITUDCOMPRAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Solicitud de Compra actualizado correctamente',
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
///* axios
export type GetSolicitudCompraParams = Partial<SolicitudCompra> &
  PagingPartialParams;

export type CreateSolicitudCompraParams<T> = T;
export type CreateSolicitudCompraParamsBase = Omit<SolicitudCompra, 'id'> & {
  id?: number;
};
export interface UpdatesolicitudCompraParams<T> {
  id: number;
  data: T;
}

export const getSolicitudCompra = async (params?: GetSolicitudCompraParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<SolicitudCompraPaginatedRes>(
    `/solicitud-compra/?${queryParams}`,
    true,
  );
};

export const getsolicitudCompra = async (uuid: string) => {
  try {
    return await get<SolicitudCompra>(`/solicitud-compra/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};
export const getsolicitudCompra_Ingreso = async (uuid: string) => {
  return await get<SolicitudCompra>(`/solicitud-compra/${uuid}`, true);
};

export const createsolicitudCompra = async <T>(
  data: CreateSolicitudCompraParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolicitudCompra>('/solicitud-compra/', data, true);
};

export const updatesolicitudCompra = async <T>({
  id,
  data,
}: UpdatesolicitudCompraParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolicitudCompra>(`/solicitud-compra/${id}/`, data, true);
};

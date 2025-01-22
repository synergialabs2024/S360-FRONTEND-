import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  Factura,
  FacturasPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum FacturaTSQEnum {
  FACTURAS = 'facturas',
  FACTURA = 'factura',
}
///* tanStack query ---------------
export const useFetchFacturas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetFacturasParams>) => {
  return useQuery({
    queryKey: [FacturaTSQEnum.FACTURAS, ...Object.values(params || {})],
    queryFn: () => getFacturas(params),
    enabled: enabled,
  });
};

export const useGetFactura = (uuid: string) => {
  return useQuery({
    queryKey: [FacturaTSQEnum.FACTURA, uuid],
    queryFn: () => getFactura(uuid),
    retry: false,
  });
};

export const useCreateFactura = <T>({
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
    mutationFn: (params: CreateFacturaParams<T>) => createFactura(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FacturaTSQEnum.FACTURAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Factura creado correctamente',
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

export const useUpdateFactura = <T>({
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
    mutationFn: (params: UpdateFacturaParams<T>) => updateFactura(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FacturaTSQEnum.FACTURAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Factura actualizado correctamente',
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
export type GetFacturasParams = Partial<Factura> & PagingPartialParams;
export type CreateFacturaParams<T> = T;
export type CreateFacturaParamsBase = Omit<Factura, 'id'>;
export interface UpdateFacturaParams<T> {
  id: number;
  data: T;
}

export const getFacturas = async (params?: GetFacturasParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<FacturasPaginatedRes>(`/factura/?${queryParams}`, true);
};

export const getFactura = async (uuid: string) => {
  try {
    return await get<Factura>(`/factura/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createFactura = async <T>(data: CreateFacturaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Factura>('/factura/', data, true);
};

export const updateFactura = async <T>({
  id,
  data,
}: UpdateFacturaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Factura>(`/factura/${id}/`, data, true);
};

import {
  getUrlParams,
  handleAxiosError,
  MetodoPago,
  MetodoPagosPaginatedRes,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { erpAPI } from '@/shared/axios/erp-api';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum MetodoPagoTSQEnum {
  METODOPAGOS = 'metodos-pago',
  METODOPAGO = 'metodo-pago',
}
///* tanStack query ---------------
export const useFetchMetodoPagos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMetodoPagosParams>) => {
  return useQuery({
    queryKey: [MetodoPagoTSQEnum.METODOPAGOS, ...Object.values(params || {})],
    queryFn: () => getMetodoPagos(params),
    enabled: enabled,
  });
};

export const useGetMetodoPago = (uuid: string) => {
  return useQuery({
    queryKey: ['metodo-pago', uuid],
    queryFn: () => getMetodoPago(uuid),
    retry: false,
  });
};

export const useCreateMetodoPago = <T>({
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
    mutationFn: (params: CreateMetodoPagoParams<T>) => createMetodoPago(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metodos-pago'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Metodo Pago creado correctamente',
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

export const useUpdateMetodoPago = <T>({
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
    mutationFn: (params: UpdateMetodoPagoParams<T>) => updateMetodoPago(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metodos-pago'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Metodo Pago actualizado correctamente',
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
export type GetMetodoPagosParams = Partial<MetodoPago> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateMetodoPagoParams<T> = T;
export type CreateMetodoPagoParamsBase = Omit<MetodoPago, 'id'>;
export interface UpdateMetodoPagoParams<T> {
  id: number;
  data: T;
}

export const getMetodoPagos = async (params?: GetMetodoPagosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<MetodoPagosPaginatedRes>(`/metodopago/?${queryParams}`, true);
};

export const getMetodoPago = async (uuid: string) => {
  try {
    return await get<MetodoPago>(`/metodopago/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMetodoPago = async <T>(data: CreateMetodoPagoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MetodoPago>('/metodopago/', data, true);
};

export const updateMetodoPago = async <T>({
  id,
  data,
}: UpdateMetodoPagoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MetodoPago>(`/metodopago/${id}/`, data, true);
};

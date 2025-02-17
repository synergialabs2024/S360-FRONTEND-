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
  PromesaPago,
  PromesaPagoPaginatedRes,
} from '@/shared/interfaces/app/cartera/promesa-pago/promesa-pago.interface';

const { get, post, patch } = erpAPI();

export enum PromesaPagoTSQEnum {
  PROMESASPAGO = 'promesas-pago',
  PROMESAPAGO = 'promesa-pago',
}
///* tanStack query ---------------
export const useFetchPromesasPago = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPromesasPagoParams>) => {
  return useQuery({
    queryKey: [PromesaPagoTSQEnum.PROMESASPAGO, ...Object.values(params || {})],
    queryFn: () => getPromesasPago(params),
    enabled: enabled,
  });
};

export const useGetPromesaPago = (uuid: string) => {
  return useQuery({
    queryKey: [PromesaPagoTSQEnum.PROMESAPAGO, uuid],
    queryFn: () => getPromesaPago(uuid),
    retry: false,
  });
};

export const useCreatePromesaPago = <T>({
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
    mutationFn: (params: CreatePromesaPagoParams<T>) =>
      createPromesaPago(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PromesaPagoTSQEnum.PROMESASPAGO],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Promesa Pago creada correctamente',
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

export const useUpdatePromesaPago = <T>({
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
    mutationFn: (params: UpdatePromesaPagoParams<T>) =>
      updatePromesaPago(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PromesaPagoTSQEnum.PROMESAPAGO],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Tarea actualizada correctamente',
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
export type GetPromesasPagoParams = Partial<PromesaPago> & PagingPartialParams;
export type CreatePromesaPagoParams<T> = T;
export type CreatePromesaPagoParamsBase = Omit<PromesaPago, 'id'>;
export interface UpdatePromesaPagoParams<T> {
  id: number;
  data: T;
}

export const getPromesasPago = async (params?: GetPromesasPagoParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<PromesaPagoPaginatedRes>(`/promesa-pago/?${queryParams}`, true);
};

export const getPromesaPago = async (uuid: string) => {
  try {
    return await get<PromesaPago>(`/promesa-pago/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPromesaPago = async <T>(
  data: CreatePromesaPagoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<PromesaPago>('/promesa-pago/', data, true);
};

export const updatePromesaPago = async <T>({
  id,
  data,
}: UpdatePromesaPagoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<PromesaPago>(`/promesa-pago/${id}/`, data, true);
};

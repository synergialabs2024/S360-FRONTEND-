import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getUrlParams,
  ToastWrapper,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  TransaccionPichinchaPago,
  TransaccionPichinchaPagosPaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/shared/axios/erp-api';
import { handleAxiosError } from '@/shared/axios/axios.utils';

const { get, post, patch } = erpAPI();

export enum TransaccionPichinchaPagoTSQEnum {
  TRANSACCIONPICHINCHAPAGOS = 'transaccion-pichincha-pagos',
  TRANSACCIONPICHINCHAPAGO = 'transaccion-pichincha-pago',
}

///* tanStack query ---------------
export const useFetchTransaccionPichinchaPagos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTransaccionPichinchaPagosParams>) => {
  return useQuery({
    queryKey: [
      TransaccionPichinchaPagoTSQEnum.TRANSACCIONPICHINCHAPAGOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getTransaccionPichinchaPagos(params),
    enabled: enabled,
  });
};
export const useGetTransaccionPichinchaPago = (uuid: string) => {
  return useQuery({
    queryKey: [TransaccionPichinchaPagoTSQEnum.TRANSACCIONPICHINCHAPAGOS, uuid],
    queryFn: () => getTransaccionPichinchaPago(uuid),
    retry: false,
  });
};
export const useCreateTransaccionPichinchaPago = <T>({
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
    mutationFn: (params: CreateTransaccionPichinchaPagoParams<T>) =>
      createTransaccionPichinchaPago(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TransaccionPichinchaPagoTSQEnum.TRANSACCIONPICHINCHAPAGOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Transaccion Pichincha Pago creada correctamente',
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
export const useUpdateTransaccionPichinchaPago = <T>({
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
    mutationFn: (params: UpdateTransaccionPichinchaPagoParams<T>) =>
      updateTransaccionPichinchaPago(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TransaccionPichinchaPagoTSQEnum.TRANSACCIONPICHINCHAPAGOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Transaccion Pichincha Pago actualizada correctamente',
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
export type GetTransaccionPichinchaPagosParams =
  Partial<TransaccionPichinchaPago> & PagingPartialParams;
export type CreateTransaccionPichinchaPagoParams<T> = T;
export type CreateTransaccionPichinchaPagoParamsBase = Omit<
  TransaccionPichinchaPago,
  'id'
>;
export interface UpdateTransaccionPichinchaPagoParams<T> {
  id: number;
  data: T;
}

export const getTransaccionPichinchaPagos = async (
  params?: GetTransaccionPichinchaPagosParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<TransaccionPichinchaPagosPaginatedRes>(
    `/transaccion-pichincha-pago/?${queryParams}`,
    true,
  );
};
export const getTransaccionPichinchaPago = async (uuid: string) => {
  try {
    return await get<TransaccionPichinchaPago>(
      `/transaccion-pichincha-pago/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};
export const createTransaccionPichinchaPago = async <T>(
  data: CreateTransaccionPichinchaPagoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<TransaccionPichinchaPago>(
    '/transaccion-pichincha-pago/',
    data,
    true,
  );
};
export const updateTransaccionPichinchaPago = async <T>({
  id,
  data,
}: UpdateTransaccionPichinchaPagoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<TransaccionPichinchaPago>(
    `/transaccion-pichincha-pago/${id}/`,
    data,
    true,
  );
};

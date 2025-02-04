import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Saldo,
  SaldosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum SaldoTSQEnum {
  SALDOS = 'saldos',
  SALDO = 'saldo',
}
///* tanStack query ---------------
export const useFetchSaldos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSaldosParams>) => {
  return useQuery({
    queryKey: [SaldoTSQEnum.SALDOS, ...Object.values(params || {})],
    queryFn: () => getSaldos(params),
    enabled: enabled,
  });
};

export const useGetSaldo = (uuid: string) => {
  return useQuery({
    queryKey: [SaldoTSQEnum.SALDO, uuid],
    queryFn: () => getSaldo(uuid),
    retry: false,
  });
};

export const useCreateSaldo = <T>({
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
    mutationFn: (params: CreateSaldoParams<T>) => createSaldo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SaldoTSQEnum.SALDOS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Saldo creado correctamente',
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

export const useUpdateSaldo = <T>({
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
    mutationFn: (params: UpdateSaldoParams<T>) => updateSaldo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SaldoTSQEnum.SALDOS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Saldo actualizado correctamente',
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
export type GetSaldosParams = Partial<Saldo> & PagingPartialParams;
export type CreateSaldoParams<T> = T;
export type CreateSaldoParamsBase = Omit<Saldo, 'id'>;
export interface UpdateSaldoParams<T> {
  id: number;
  data: T;
}

export const getSaldos = async (params?: GetSaldosParams) => {
  const stateParams = { ...params };

  // filter by state
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<SaldosPaginatedRes>(`/saldo/?${queryParams}`, true);
};

export const getSaldo = async (uuid: string) => {
  try {
    return await get<Saldo>(`/saldo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSaldo = async <T>(data: CreateSaldoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Saldo>('/saldo/', data, true);
};

export const updateSaldo = async <T>({ id, data }: UpdateSaldoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Saldo>(`/saldo/${id}/`, data, true);
};

// custom tipes --------------
export type CreateSaldoClientePart = Pick<
  Saldo,
  'cliente' | 'monto' | 'linea_servicio' | 'descripcion'
>;

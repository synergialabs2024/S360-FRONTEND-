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
import { getEnvs, getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

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

// export const getExcelTransaccions = async (params?: GetTransaccionsParams) => {
//   const stateParams = { ...params };

//   // filter by state
//   delete stateParams.filterByState;

//   const queryParams = getUrlParams(stateParams);
//   return get<TransaccionesPaginatedRes>(`/transaccion/report/excel/?${queryParams}`, true);
// };

///*  Reporte
const { VITE_ERPAPI_URL } = getEnvs();

export const getExcelTransaccions = async (params?: GetTransaccionsParams) => {
  try {
    const storedToken = useAuthStore.getState().token;

    const stateParams = { ...params };
    // filter by state
    delete stateParams.filterByState;

    const response = await axios.get(
      `${VITE_ERPAPI_URL}/transaccion/report/excel/`,
      {
        params,
        responseType: 'blob',
        headers: {
          Authorization: 'Token ' + storedToken,
        },
      },
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Transacciones.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error descargando el Excel:', error);
    handleAxiosError(error);
  }
};

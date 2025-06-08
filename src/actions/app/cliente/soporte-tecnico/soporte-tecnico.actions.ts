import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getUrlParams,
  ToastWrapper,
  SoporteTecnico,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  SoporteTecnicoPaginatedRes,
  SoporteTecnicoCliente,
  getEnvs,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/shared/axios/erp-api';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import axios from 'axios';

const { get, post, patch } = erpAPI();
const { VITE_SOEI_URL } = getEnvs();

export enum SoporteTecnicoTSQEnum {
  SOPORTETECNICOS = 'soporte-tecnicos',
  SOPORTETECNICO = 'soporte-tecnico',
}

///* tanStack query ---------------
export const useFetchSoporteTecnicos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSoporteTecnicosParams>) => {
  return useQuery({
    queryKey: [
      SoporteTecnicoTSQEnum.SOPORTETECNICOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSoporteTecnicos(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetSoporteTecnico = (uuid: string) => {
  return useQuery({
    queryKey: [SoporteTecnicoTSQEnum.SOPORTETECNICO, uuid],
    queryFn: () => getSoporteTecnico(uuid),
    retry: false,
  });
};

export const useCreateSoporteTecnico = <T>({
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
    mutationFn: (params: CreateSoporteTecnicoParams<T>) =>
      createSoporteTecnico(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SoporteTecnicoTSQEnum.SOPORTETECNICOS],
      });
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

export const useUpdateSoporteTecnico = <T>({
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
    mutationFn: (params: UpdateSoporteTecnicoParams<T>) =>
      updateSoporteTecnico(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SoporteTecnicoTSQEnum.SOPORTETECNICOS],
      });
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

export const useUpdateSoporteTecnicoCliente = <T>({
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
    mutationFn: (params: SoporteTecnicoClienteParams<T>) =>
      updateSoporteTecnicoCliente(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SoporteTecnicoTSQEnum.SOPORTETECNICOS],
      });
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
export type GetSoporteTecnicosParams = Partial<SoporteTecnico> &
  PagingPartialParams;
export type CreateSoporteTecnicoParams<T> = T;
export type CreateSoporteTecnicoParamsBase = Omit<SoporteTecnico, 'id'>;
export interface UpdateSoporteTecnicoParams<T> {
  id: number;
  data: T;
}
export type SoporteTecnicoClienteParamsBase = Omit<SoporteTecnicoCliente, 'id'>;
export interface SoporteTecnicoClienteParams<T> {
  id: number;
  data: T;
}

export const getSoporteTecnicos = async (params?: GetSoporteTecnicosParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<SoporteTecnicoPaginatedRes>(
    `/soportetecnicos/?${queryParams}`,
    true,
  );
};

export const getSoporteTecnico = async (uuid: string) => {
  try {
    return await get<SoporteTecnico>(`/soportetecnicos/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSoporteTecnico = async <T>(
  data: CreateSoporteTecnicoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SoporteTecnico>('/soportetecnicos/', data, true);
};

export const updateSoporteTecnico = async <T>({
  id,
  data,
}: UpdateSoporteTecnicoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SoporteTecnico>(`/soportetecnicos/${id}/`, data, true);
};

export const updateSoporteTecnicoCliente = async <T>({
  id,
  data,
}: SoporteTecnicoClienteParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SoporteTecnicoCliente>(
    `/contrato/tech-support/${id}/`,
    data,
    true,
  );
};

export const getTicketsCRMHistorial = async (params?: string) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);
  try {
    const response = await axios.post(`${VITE_SOEI_URL}/getTicketsCRM`, {
      cedula: params,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  } finally {
    setIsGlobalLoading(false);
  }
};

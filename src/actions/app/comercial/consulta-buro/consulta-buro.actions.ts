import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  ConsultaBuro,
  ConsultasBuroPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ConsultaBuroTSQEnum {
  CONSULTAS_BURO = 'consultas-buro',
  CONSULTA_BURO = 'consulta-buro',
}

///* tanStack query ---------------
export const useFetchConsultasBuro = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetConsultasBuroParams>) => {
  return useQuery({
    queryKey: [
      ConsultaBuroTSQEnum.CONSULTAS_BURO,
      ...Object.values(params || {}),
    ],
    queryFn: () => getConsultasBuro(params),
    enabled: enabled,
  });
};

export const useGetConsultaBuro = (uuid: string) => {
  return useQuery({
    queryKey: [ConsultaBuroTSQEnum.CONSULTA_BURO, uuid],
    queryFn: () => getConsultaBuro(uuid),
    retry: false,
  });
};

export const useCreateConsultaBuro = ({
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
    mutationFn: createConsultaBuro,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ConsultaBuroTSQEnum.CONSULTAS_BURO],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Consulta Buro creada correctamente',
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

export const useUpdateConsultaBuro = <T>({
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
    mutationFn: (params: UpdateConsultaBuroParams<T>) =>
      updateConsultaBuro(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ConsultaBuroTSQEnum.CONSULTAS_BURO],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Consulta Buro actualizada correctamente',
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
export type GetConsultasBuroParams = Partial<ConsultaBuro> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateConsultaBuroParams = Omit<ConsultaBuro, 'id'>;
export interface UpdateConsultaBuroParams<T> {
  id: number;
  data: T;
}

export const getConsultasBuro = async (params?: GetConsultasBuroParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ConsultasBuroPaginatedRes>(`/consultaburo/?${queryParams}`, true);
};

export const getConsultaBuro = async (uuid: string) => {
  try {
    return await get<ConsultaBuro>(`/consultaburo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createConsultaBuro = async (data: CreateConsultaBuroParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<ConsultaBuro>('/consultaburo/', data, true);
};

export const updateConsultaBuro = async <T>({
  id,
  data,
}: UpdateConsultaBuroParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ConsultaBuro>(`/consultaburo/${id}/`, data, true);
};

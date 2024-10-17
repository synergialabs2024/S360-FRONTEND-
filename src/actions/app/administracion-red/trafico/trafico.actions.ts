import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Trafico,
  TraficosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum TraficoTSQEnum {
  TRAFICOS = 'traficos',
  TRAFICO = 'trafico',
}
///* tanStack query ---------------
export const useFetchTraficos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTraficosParams>) => {
  return useQuery({
    queryKey: [TraficoTSQEnum.TRAFICOS, ...Object.values(params || {})],
    queryFn: () => getTraficos(params),
    enabled: enabled,
  });
};

export const useGetTrafico = (uuid: string) => {
  return useQuery({
    queryKey: [TraficoTSQEnum.TRAFICO, uuid],
    queryFn: () => getTrafico(uuid),
    retry: false,
  });
};

export const useCreateTrafico = <T>({
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
    mutationFn: (params: CreateTraficoParams<T>) => createTrafico(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TraficoTSQEnum.TRAFICO] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Trafico creado correctamente',
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

export const useUpdateTrafico = <T>({
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
    mutationFn: (params: UpdateTraficoParams<T>) => updateTrafico(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TraficoTSQEnum.TRAFICOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Trafico actualizado correctamente',
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
export type GetTraficosParams = Partial<Trafico> & PagingPartialParams;
export type CreateTraficoParams<T> = T;
export type CreateTraficoParamsBase = Omit<Trafico, 'id'>;
export interface UpdateTraficoParams<T> {
  id: number;
  data: T;
}

export const getTraficos = async (params?: GetTraficosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<TraficosPaginatedRes>(`/trafico/?${queryParams}`, true);
};

export const getTrafico = async (uuid: string) => {
  try {
    return await get<Trafico>(`/trafico/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTrafico = async <T>(data: CreateTraficoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Trafico>('/trafico/', data, true);
};

export const updateTrafico = async <T>({
  id,
  data,
}: UpdateTraficoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Trafico>(`/trafico/${id}/`, data, true);
};

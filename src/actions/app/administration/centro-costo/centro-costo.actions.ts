import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  CentroCosto,
  CentroCostosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum CentroCostoTSQEnum {
  CENTROCOSTOS = 'centro-costos',
  CENTROCOSTO = 'centro-costo',
}

///* tanStack query
export const useFetchCentroCostos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCentroCostosParams>) => {
  return useQuery({
    queryKey: [CentroCostoTSQEnum.CENTROCOSTOS, ...Object.values(params || {})],
    queryFn: () => getCentroCostos(params),
    enabled: enabled,
  });
};

export const useGetCentroCosto = (uuid: string) => {
  return useQuery({
    queryKey: [CentroCostoTSQEnum.CENTROCOSTO, uuid],
    queryFn: () => getCentroCosto(uuid),
    retry: false,
  });
};

export const useCreateCentroCosto = <T>({
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
    mutationFn: (params: CreateCentroCostoParams<T>) =>
      createCentroCosto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CentroCostoTSQEnum.CENTROCOSTOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Centro Costo creado correctamente',
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

export const useUpdateCentroCosto = <T>({
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
    mutationFn: (params: UpdateCentroCostoParams<T>) =>
      updateCentroCosto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CentroCostoTSQEnum.CENTROCOSTOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Centro Costo actualizado correctamente',
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
export type GetCentroCostosParams = Partial<CentroCosto> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateCentroCostoParams<T> = T;
export type CreateCentroCostoParamsBase = Omit<CentroCosto, 'id'>;
export interface UpdateCentroCostoParams<T> {
  id: number;
  data: T;
}

export const getCentroCostos = async (params?: GetCentroCostosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CentroCostosPaginatedRes>(`/centro-costo/?${queryParams}`, true);
};

export const getCentroCosto = async (uuid: string) => {
  try {
    return await get<CentroCosto>(`/centro-costo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCentroCosto = async <T>(
  data: CreateCentroCostoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CentroCosto>('/centro-costo/', data, true);
};

export const updateCentroCosto = async <T>({
  id,
  data,
}: UpdateCentroCostoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CentroCosto>(`/centro-costo/${id}/`, data, true);
};

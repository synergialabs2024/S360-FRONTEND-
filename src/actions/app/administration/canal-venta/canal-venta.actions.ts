import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  CanalVenta,
  CanalVentasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum CanalVentaTSQEnum {
  CANALVENTAS = 'canal-ventas',
  CANALVENTA = 'canal-venta',
}
///* tanStack query ---------------
export const useFetchCanalVentas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCanalVentasParams>) => {
  return useQuery({
    queryKey: [CanalVentaTSQEnum.CANALVENTAS, ...Object.values(params || {})],
    queryFn: () => getCanalVentas(params),
    enabled: enabled,
  });
};

export const useGetCanalVenta = (uuid: string) => {
  return useQuery({
    queryKey: ['canal-venta', uuid],
    queryFn: () => getCanalVenta(uuid),
    retry: false,
  });
};

export const useCreateCanalVenta = <T>({
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
    mutationFn: (params: CreateCanalVentaParams<T>) => createCanalVenta(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canal-ventas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'CanalVenta creado correctamente',
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

export const useUpdateCanalVenta = <T>({
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
    mutationFn: (params: UpdateCanalVentaParams<T>) => updateCanalVenta(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canal-ventas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'CanalVenta actualizado correctamente',
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
export type GetCanalVentasParams = Partial<CanalVenta> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateCanalVentaParams<T> = T;
export type CreateCanalVentaParamsBase = Omit<CanalVenta, 'id'>;
export interface UpdateCanalVentaParams<T> {
  id: number;
  data: T;
}

export const getCanalVentas = async (params?: GetCanalVentasParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CanalVentasPaginatedRes>(`/canalventa/?${queryParams}`, true);
};

export const getCanalVenta = async (uuid: string) => {
  try {
    return await get<CanalVenta>(`/canalventa/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCanalVenta = async <T>(data: CreateCanalVentaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CanalVenta>('/canalventa/', data, true);
};

export const updateCanalVenta = async <T>({
  id,
  data,
}: UpdateCanalVentaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CanalVenta>(`/canalventa/${id}/`, data, true);
};

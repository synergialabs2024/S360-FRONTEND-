import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  Bodega,
  BodegasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum BodegaTSQEnum {
  BODEGAS = 'bodegas',
  BODEGA = 'bodega',
}

///* tanStack query
export const useFetchBodegas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetBodegasParams>) => {
  return useQuery({
    queryKey: [BodegaTSQEnum.BODEGAS, ...Object.values(params || {})],
    queryFn: () => getBodegas(params),
    enabled: enabled,
  });
};

export const useGetBodega = (uuid: string) => {
  return useQuery({
    queryKey: [BodegaTSQEnum.BODEGA, uuid],
    queryFn: () => getBodega(uuid),
    retry: false,
  });
};

export const useCreateBodega = ({
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
    mutationFn: createBodega,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BodegaTSQEnum.BODEGAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Bodega creado correctamente',
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

export const useUpdateBodega = <T>({
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
    mutationFn: (params: UpdateBodegaParams<T>) => updateBodega(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BodegaTSQEnum.BODEGAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Bodega actualizado correctamente',
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
export type GetBodegasParams = Partial<Bodega> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateBodegaParams = Omit<Bodega, 'id'>;
export interface UpdateBodegaParams<T> {
  id: number;
  data: T;
}

export const getBodegas = async (params?: GetBodegasParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<BodegasPaginatedRes>(`/bodega/?${queryParams}`, true);
};

export const getBodega = async (uuid: string) => {
  try {
    return await get<Bodega>(`/bodega/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createBodega = async (data: CreateBodegaParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Bodega>('/bodega/', data, true);
};

export const updateBodega = async <T>({ id, data }: UpdateBodegaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Bodega>(`/bodega/${id}/`, data, true);
};

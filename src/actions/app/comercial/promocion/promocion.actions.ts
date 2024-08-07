import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Promocion,
  PromocionesPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum PromocionTSQEnum {
  PROMOCIONS = 'promocions',
  PROMOCION = 'promocion',
}
///* tanStack query ---------------
export const useFetchPromocions = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPromocionsParams>) => {
  return useQuery({
    queryKey: [PromocionTSQEnum.PROMOCIONS, ...Object.values(params || {})],
    queryFn: () => getPromocions(params),
    enabled: enabled,
  });
};

export const useGetPromocion = (uuid: string) => {
  return useQuery({
    queryKey: [PromocionTSQEnum.PROMOCION, uuid],
    queryFn: () => getPromocion(uuid),
    retry: false,
  });
};

export const useCreatePromocion = <T>({
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
    mutationFn: (params: CreatePromocionParams<T>) => createPromocion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PromocionTSQEnum.PROMOCIONS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Promocion creado correctamente',
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

export const useUpdatePromocion = <T>({
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
    mutationFn: (params: UpdatePromocionParams<T>) => updatePromocion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PromocionTSQEnum.PROMOCIONS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Promocion actualizado correctamente',
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
export type GetPromocionsParams = Partial<Promocion> & PagingPartialParams;
export type CreatePromocionParams<T> = T;
export type CreatePromocionParamsBase = Omit<Promocion, 'id'>;
export interface UpdatePromocionParams<T> {
  id: number;
  data: T;
}

export const getPromocions = async (params?: GetPromocionsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<PromocionesPaginatedRes>(`/promocion/?${queryParams}`, true);
};

export const getPromocion = async (uuid: string) => {
  try {
    return await get<Promocion>(`/promocion/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPromocion = async <T>(data: CreatePromocionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Promocion>('/promocion/', data, true);
};

export const updatePromocion = async <T>({
  id,
  data,
}: UpdatePromocionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Promocion>(`/promocion/${id}/`, data, true);
};

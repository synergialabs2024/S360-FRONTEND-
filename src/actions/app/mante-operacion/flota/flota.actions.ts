import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  Flota,
  FlotasPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum FlotaTSQEnum {
  FLOTAS = 'flotas',
  FLOTA = 'flota',
}
///* tanStack query ---------------
export const useFetchFlotas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetFlotasParams>) => {
  return useQuery({
    queryKey: [FlotaTSQEnum.FLOTAS, ...Object.values(params || {})],
    queryFn: () => getFlotas(params),
    enabled: enabled,
  });
};

export const useGetFlota = (uuid: string) => {
  return useQuery({
    queryKey: [FlotaTSQEnum.FLOTA, uuid],
    queryFn: () => getFlota(uuid),
    retry: false,
  });
};

export const useCreateFlota = <T>({
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
    mutationFn: (params: CreateFlotaParams<T>) => createFlota(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FlotaTSQEnum.FLOTAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Flota creado correctamente',
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

export const useUpdateFlota = <T>({
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
    mutationFn: (params: UpdateFlotaParams<T>) => updateFlota(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FlotaTSQEnum.FLOTAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Flota actualizado correctamente',
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
export type GetFlotasParams = Partial<Flota> & PagingPartialParams;
export type CreateFlotaParams<T> = T;
export type CreateFlotaParamsBase = Omit<Flota, 'id'>;
export interface UpdateFlotaParams<T> {
  id: number;
  data: T;
}

export const getFlotas = async (params?: GetFlotasParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<FlotasPaginatedRes>(`/flota/?${queryParams}`, true);
};

export const getFlota = async (uuid: string) => {
  try {
    return await get<Flota>(`/flota/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createFlota = async <T>(data: CreateFlotaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Flota>('/flota/', data, true);
};

export const updateFlota = async <T>({ id, data }: UpdateFlotaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Flota>(`/flota/${id}/`, data, true);
};

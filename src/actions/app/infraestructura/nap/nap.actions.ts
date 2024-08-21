import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  Nap,
  NapsPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum NapTSQEnum {
  NAPS = 'naps',
  NAP = 'nap',
}
///* tanStack query ---------------
export const useFetchNaps = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetNapsParams>) => {
  return useQuery({
    queryKey: [NapTSQEnum.NAPS, ...Object.values(params || {})],
    queryFn: () => getNaps(params),
    enabled: enabled,
  });
};

export const useGetNap = (uuid: string) => {
  return useQuery({
    queryKey: [NapTSQEnum.NAP, uuid],
    queryFn: () => getNap(uuid),
    retry: false,
  });
};

export const useCreateNap = <T>({
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
    mutationFn: (params: CreateNapParams<T>) => createNap(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NapTSQEnum.NAPS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(customMessageToast || 'Nap creado correctamente');
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

export const useUpdateNap = <T>({
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
    mutationFn: (params: UpdateNapParams<T>) => updateNap(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NapTSQEnum.NAPS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Nap actualizado correctamente',
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
export type GetNapsParams = Partial<Nap> & PagingPartialParams;
export type CreateNapParams<T> = T;
export type CreateNapParamsBase = Omit<Nap, 'id'>;
export interface UpdateNapParams<T> {
  id: number;
  data: T;
}

export const getNaps = async (params?: GetNapsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<NapsPaginatedRes>(`/nap/?${queryParams}`, true);
};

export const getNap = async (uuid: string) => {
  try {
    return await get<Nap>(`/nap/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createNap = async <T>(data: CreateNapParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Nap>('/nap/', data, true);
};

export const updateNap = async <T>({ id, data }: UpdateNapParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Nap>(`/nap/${id}/`, data, true);
};

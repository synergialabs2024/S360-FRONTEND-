import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  Brass,
  BrassPaginatedRes,
  getUrlParams,
  PagingPartialParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum BrasTSQEnum {
  BRASS = 'brass',
  BRAS = 'bras',
}

///* tanStack query ---------------
export const useFetchBrass = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetBrassParams>) => {
  return useQuery({
    queryKey: [BrasTSQEnum.BRASS, ...Object.values(params || {})],
    queryFn: () => getBrass(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetBras = (uuid: string) => {
  return useQuery({
    queryKey: [BrasTSQEnum.BRAS, uuid],
    queryFn: () => getBras(uuid),
    retry: false,
  });
};

export const useCreateBras = <T>({
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
    mutationFn: (params: CreateBrasParams<T>) => createBras(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BrasTSQEnum.BRASS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Brass creado correctamente',
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

export const useUpdateBras = <T>({
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
    mutationFn: (params: UpdateBrasParams<T>) => updateBras(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BrasTSQEnum.BRASS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Brass actualizado correctamente',
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
export type GetBrassParams = Partial<Brass> & PagingPartialParams;
export type CreateBrasParams<T> = T;
export type CreateBrasParamsBase = Omit<Brass, 'id'>;
export interface UpdateBrasParams<T> {
  id: number;
  data: T;
}

export const getBrass = async (params?: GetBrassParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<BrassPaginatedRes>(`/brass/?${queryParams}`, true);
};

export const getBras = async (uuid: string) => {
  try {
    return await get<Brass>(`/brass/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createBras = async <T>(data: CreateBrasParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Brass>('/brass/', data, true);
};

export const updateBras = async <T>({ id, data }: UpdateBrasParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Brass>(`/brass/${id}/`, data, true);
};

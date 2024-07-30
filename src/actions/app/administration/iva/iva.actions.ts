import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  IVA,
  IVAPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum IVATSQEnum {
  IVAS = 'i-vas',
  IVA = 'i-va',
}
///* tanStack query ---------------
export const useFetchIVAs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetIVAsParams>) => {
  return useQuery({
    queryKey: [IVATSQEnum.IVAS, ...Object.values(params || {})],
    queryFn: () => getIVAs(params),
    enabled: enabled,
  });
};

export const useGetIVA = (uuid: string) => {
  return useQuery({
    queryKey: ['i-va', uuid],
    queryFn: () => getIVA(uuid),
    retry: false,
  });
};

export const useCreateIVA = <T>({
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
    mutationFn: (params: CreateIVAParams<T>) => createIVA(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['i-vas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(customMessageToast || 'IVA creado correctamente');
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

export const useUpdateIVA = <T>({
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
    mutationFn: (params: UpdateIVAParams<T>) => updateIVA(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['i-vas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'IVA actualizado correctamente',
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
export type GetIVAsParams = Partial<IVA> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateIVAParams<T> = T;
export type CreateIVAParamsBase = Omit<IVA, 'id'>;
export interface UpdateIVAParams<T> {
  id: number;
  data: T;
}

export const getIVAs = async (params?: GetIVAsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<IVAPaginatedRes>(`/iva/?${queryParams}`, true);
};

export const getIVA = async (uuid: string) => {
  try {
    return await get<IVA>(`/iva/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createIVA = async <T>(data: CreateIVAParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<IVA>('/iva/', data, true);
};

export const updateIVA = async <T>({ id, data }: UpdateIVAParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<IVA>(`/iva/${id}/`, data, true);
};

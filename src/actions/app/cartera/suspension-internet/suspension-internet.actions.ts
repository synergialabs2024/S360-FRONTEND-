import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastWrapper } from '@/shared/wrappers';

import {
  UseMutationParams,
  SuspensionInternet,
  PagingPartialParams,
  UseFetchEnabledParams,
  SuspensionInternetPaginatedRes,
} from '@/shared/interfaces';
import { useUiStore } from '@/store/ui';
import { getUrlParams } from '@/shared/utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { handleAxiosError } from '@/shared/axios/axios.utils';

const { get, post, patch } = erpAPI();

export enum SuspensionInternetTSQEnum {
  SUSPENSIONINTERNETS = 'suspensiones-internet',
  SUSPENSIONINTERNET = 'suspension-internet',
}
///* tanStack query ---------------
export const useFetchSuspensionInternets = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSuspensionInternetsParams>) => {
  return useQuery({
    queryKey: [
      SuspensionInternetTSQEnum.SUSPENSIONINTERNETS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSuspensionInternets(params),
    enabled: enabled,
  });
};

export const useGetSuspensionInternet = (uuid: string) => {
  return useQuery({
    queryKey: [SuspensionInternetTSQEnum.SUSPENSIONINTERNET, uuid],
    queryFn: () => getSuspensionInternet(uuid),
    retry: false,
  });
};

export const useCreateSuspensionInternet = <T>({
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
    mutationFn: (params: CreateSuspensionInternetParams<T>) =>
      createSuspensionInternet(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SuspensionInternetTSQEnum.SUSPENSIONINTERNETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Suspension Internet creada correctamente',
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

export const useUpdateSuspensionInternet = <T>({
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
    mutationFn: (params: UpdateSuspensionInternetParams<T>) =>
      updateSuspensionInternet(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SuspensionInternetTSQEnum.SUSPENSIONINTERNETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Suspension Internet actualizada correctamente',
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
export type GetSuspensionInternetsParams = Partial<SuspensionInternet> &
  PagingPartialParams;
export type CreateSuspensionInternetParams<T> = T;
export type CreateSuspensionInternetParamsBase = Omit<SuspensionInternet, 'id'>;
export interface UpdateSuspensionInternetParams<T> {
  id: number;
  data: T;
}

export const getSuspensionInternets = async (
  params?: GetSuspensionInternetsParams,
) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<SuspensionInternetPaginatedRes>(
    `/suspension-internet/?${queryParams}`,
    true,
  );
};

export const getSuspensionInternet = async (uuid: string) => {
  try {
    return await get<SuspensionInternet>(`/suspension-internet/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSuspensionInternet = async <T>(
  data: CreateSuspensionInternetParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SuspensionInternet>('/suspension-internet/', data, true);
};

export const updateSuspensionInternet = async <T>({
  id,
  data,
}: UpdateSuspensionInternetParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SuspensionInternet>(`/suspension-internet/${id}/`, data, true);
};

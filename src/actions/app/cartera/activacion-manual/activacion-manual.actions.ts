import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  ActivacionManual,
  ActivacionManualPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ActivacionesManualesTSQEnum {
  ACTIVACIONMANUALES = 'mantenedor-suspensiones',
  ACTIVACIONMANUAL = 'mantenedor-suspension',
}
///* tanStack query ---------------
export const useFetchActivacionesManuales = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetActivacionesManualesParams>) => {
  return useQuery({
    queryKey: [
      ActivacionesManualesTSQEnum.ACTIVACIONMANUALES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getActivacionesManuales(params),
    enabled: enabled,
  });
};

export const useGetActivacionManual = (uuid: string) => {
  return useQuery({
    queryKey: [ActivacionesManualesTSQEnum.ACTIVACIONMANUAL, uuid],
    queryFn: () => getActivacionManual(uuid),
    retry: false,
  });
};

export const useCreateActivacionManual = <T>({
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
    mutationFn: (params: CreateActivacionManualParams<T>) =>
      createActivacionManual(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ActivacionesManualesTSQEnum.ACTIVACIONMANUAL],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Activacion Manual creada correctamente',
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

export const useUpdateActivacionManual = <T>({
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
    mutationFn: (params: UpdateActivacionManualParams<T>) =>
      updateActivacionManual(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ActivacionesManualesTSQEnum.ACTIVACIONMANUALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Activacion Manual actualizada correctamente',
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
export type GetActivacionesManualesParams = Partial<ActivacionManual> &
  PagingPartialParams;
export type CreateActivacionManualParams<T> = T;
export type CreateActivacionManualParamsBase = Omit<ActivacionManual, 'id'>;
export interface UpdateActivacionManualParams<T> {
  id: number;
  data: T;
}

export const getActivacionesManuales = async (
  params?: GetActivacionesManualesParams,
) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ActivacionManualPaginatedRes>(
    `/suspension-internet/?${queryParams}`,
    true,
  );
};

export const getActivacionManual = async (uuid: string) => {
  try {
    return await get<ActivacionManual>(`/suspension-internet/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createActivacionManual = async <T>(
  data: CreateActivacionManualParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<ActivacionManual>('/suspension-internet/', data, true);
};

export const updateActivacionManual = async <T>({
  id,
  data,
}: UpdateActivacionManualParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ActivacionManual>(`/suspension-internet/${id}/`, data, true);
};

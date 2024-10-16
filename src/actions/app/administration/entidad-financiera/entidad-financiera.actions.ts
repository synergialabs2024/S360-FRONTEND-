import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  EntidadFinanciera,
  EntidadFinancierasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum EntidadFinancieraTSQEnum {
  ENTIDADFINANCIERAS = 'entidades-financiera',
  ENTIDADFINANCIERA = 'entidad-financiera',
}
///* tanStack query ---------------
export const useFetchEntidadFinancieras = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetEntidadFinancierasParams>) => {
  return useQuery({
    queryKey: [
      EntidadFinancieraTSQEnum.ENTIDADFINANCIERAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getEntidadFinancieras(params),
    enabled: enabled,
  });
};

export const useGetEntidadFinanciera = (uuid: string) => {
  return useQuery({
    queryKey: ['entidad-financiera', uuid],
    queryFn: () => getEntidadFinanciera(uuid),
    retry: false,
  });
};

export const useCreateEntidadFinanciera = <T>({
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
    mutationFn: (params: CreateEntidadFinancieraParams<T>) =>
      createEntidadFinanciera(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entidades-financiera'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Entidad Financiera creado correctamente',
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

export const useUpdateEntidadFinanciera = <T>({
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
    mutationFn: (params: UpdateEntidadFinancieraParams<T>) =>
      updateEntidadFinanciera(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entidades-financiera'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Entidad Financiera actualizado correctamente',
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
export type GetEntidadFinancierasParams = Partial<EntidadFinanciera> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateEntidadFinancieraParams<T> = T;
export type CreateEntidadFinancieraParamsBase = Omit<EntidadFinanciera, 'id'>;
export interface UpdateEntidadFinancieraParams<T> {
  id: number;
  data: T;
}

export const getEntidadFinancieras = async (
  params?: GetEntidadFinancierasParams,
) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<EntidadFinancierasPaginatedRes>(
    `/entidadfinanciera/?${queryParams}`,
    true,
  );
};

export const getEntidadFinanciera = async (uuid: string) => {
  try {
    return await get<EntidadFinanciera>(`/entidadfinanciera/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createEntidadFinanciera = async <T>(
  data: CreateEntidadFinancieraParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<EntidadFinanciera>('/entidadfinanciera/', data, true);
};

export const updateEntidadFinanciera = async <T>({
  id,
  data,
}: UpdateEntidadFinancieraParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<EntidadFinanciera>(`/entidadfinanciera/${id}/`, data, true);
};

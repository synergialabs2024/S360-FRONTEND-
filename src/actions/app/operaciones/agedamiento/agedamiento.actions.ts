import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  Agendamiento,
  AgendamientosPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum AgendamientoTSQEnum {
  AGENDAMIENTOS = 'agendamientos',
  AGENDAMIENTO = 'agendamiento',
}
///* tanStack query ---------------
export const useFetchAgendamientos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetAgendamientosParams>) => {
  return useQuery({
    queryKey: [
      AgendamientoTSQEnum.AGENDAMIENTOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getAgendamientos(params),
    enabled: enabled,
  });
};

export const useGetAgendamiento = (uuid: string) => {
  return useQuery({
    queryKey: [AgendamientoTSQEnum.AGENDAMIENTO, uuid],
    queryFn: () => getAgendamiento(uuid),
    retry: false,
  });
};

export const useCreateAgendamiento = <T>({
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
    mutationFn: (params: CreateAgendamientoParams<T>) =>
      createAgendamiento(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AgendamientoTSQEnum.AGENDAMIENTOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Agendamiento creado correctamente',
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

export const useUpdateAgendamiento = <T>({
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
    mutationFn: (params: UpdateAgendamientoParams<T>) =>
      updateAgendamiento(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AgendamientoTSQEnum.AGENDAMIENTOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Agendamiento actualizado correctamente',
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
export type GetAgendamientosParams = Partial<Agendamiento> &
  PagingPartialParams;
export type CreateAgendamientoParams<T> = T;
export type CreateAgendamientoParamsBase = Omit<Agendamiento, 'id'>;
export interface UpdateAgendamientoParams<T> {
  id: number;
  data: T;
}

export const getAgendamientos = async (params?: GetAgendamientosParams) => {
  const stateParams = { ...params };

  // filter by state
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<AgendamientosPaginatedRes>(`/agendamiento/?${queryParams}`, true);
};

export const getAgendamiento = async (uuid: string) => {
  try {
    return await get<Agendamiento>(`/agendamiento/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createAgendamiento = async <T>(
  data: CreateAgendamientoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Agendamiento>('/agendamiento/', data, true);
};

export const updateAgendamiento = async <T>({
  id,
  data,
}: UpdateAgendamientoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Agendamiento>(`/agendamiento/${id}/`, data, true);
};

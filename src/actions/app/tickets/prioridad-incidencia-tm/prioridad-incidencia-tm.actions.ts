import { erpAPI } from '@/axios/erp-api';

import {
  getUrlParams,
  ToastWrapper,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  PrioridadIncidenciaTM,
  PrioridadIncidenciaTMPaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum PrioridadIncidenciaTMTSQEnum {
  PRIORIDADINCIDENCIATMS = 'prioridad-incidencia-ticket-masivos',
  PRIORIDADINCIDENCIATM = 'prioridad-incidencia-ticket-masivo',
}

///* tanStack query ---------------
export const useFetchPrioridadIncidenciaTMs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPrioridadIncidenciaTMsParams>) => {
  return useQuery({
    queryKey: [
      PrioridadIncidenciaTMTSQEnum.PRIORIDADINCIDENCIATMS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getPrioridadIncidenciaTMs(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetPrioridadIncidenciaTM = (uuid: string) => {
  return useQuery({
    queryKey: [PrioridadIncidenciaTMTSQEnum.PRIORIDADINCIDENCIATM, uuid],
    queryFn: () => getPrioridadIncidenciaTM(uuid),
    retry: false,
  });
};

export const useCreatePrioridadIncidenciaTM = <T>({
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
    mutationFn: (params: CreatePrioridadIncidenciaTMParams<T>) =>
      createPrioridadIncidenciaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PrioridadIncidenciaTMTSQEnum.PRIORIDADINCIDENCIATMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Prioridad Incidencia Ticket Masivos creado correctamente',
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

export const useUpdatePrioridadIncidenciaTM = <T>({
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
    mutationFn: (params: UpdatePrioridadIncidenciaTMParams<T>) =>
      updatePrioridadIncidenciaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PrioridadIncidenciaTMTSQEnum.PRIORIDADINCIDENCIATMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Prioridad Incidencia Ticket Masivos actualizado correctamente',
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
export type GetPrioridadIncidenciaTMsParams = Partial<PrioridadIncidenciaTM> &
  PagingPartialParams;
export type CreatePrioridadIncidenciaTMParams<T> = T;
export type CreatePrioridadIncidenciaTMParamsBase = Omit<
  PrioridadIncidenciaTM,
  'id'
>;
export interface UpdatePrioridadIncidenciaTMParams<T> {
  id: number;
  data: T;
}

export const getPrioridadIncidenciaTMs = async (
  params?: GetPrioridadIncidenciaTMsParams,
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
  return get<PrioridadIncidenciaTMPaginatedRes>(
    `/prioridad-incidencia-ticket-masivo/?${queryParams}`,
    true,
  );
};

export const getPrioridadIncidenciaTM = async (uuid: string) => {
  try {
    return await get<PrioridadIncidenciaTM>(
      `/prioridad-incidencia-ticket-masivo/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPrioridadIncidenciaTM = async <T>(
  data: CreatePrioridadIncidenciaTMParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<PrioridadIncidenciaTM>(
    '/prioridad-incidencia-ticket-masivo/',
    data,
    true,
  );
};

export const updatePrioridadIncidenciaTM = async <T>({
  id,
  data,
}: UpdatePrioridadIncidenciaTMParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<PrioridadIncidenciaTM>(
    `/prioridad-incidencia-ticket-masivo/${id}/`,
    data,
    true,
  );
};

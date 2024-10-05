import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { SlotAgendamientoEstadosEnumChoice } from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Planificador,
  PlanificadorPaginatedRes,
  TimeMapPlanificador,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum PlanificadorTSQEnum {
  PLANIFICADORS = 'planificadors',
  PLANIFICADOR = 'planificador',
}
///* tanStack query ---------------
export const useFetchPlanificadors = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPlanificadorsParams>) => {
  return useQuery({
    queryKey: [
      PlanificadorTSQEnum.PLANIFICADORS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getPlanificadors(params),
    enabled: enabled,
  });
};

export const useGetPlanificador = (uuid: string) => {
  return useQuery({
    queryKey: [PlanificadorTSQEnum.PLANIFICADOR, uuid],
    queryFn: () => getPlanificador(uuid),
    retry: false,
  });
};

export const usePostPlanificador = <T>(
  {
    navigate,
    returnUrl,
    returnErrorUrl,
    customMessageToast,
    customMessageErrorToast,
    enableNavigate = true,
    enableErrorNavigate = false,
    enableToast = true,
    customOnSuccess,
    customOnError,
  }: UseMutationParams,
  url?: string,
) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (data: CreatePlanificadorParams<T>) =>
      postPlanificador(data, url),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [PlanificadorTSQEnum.PLANIFICADORS],
      });
      customOnSuccess && customOnSuccess(res);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Planificador creado correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      if (customOnError) {
        customOnError(error);
        return;
      }
      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const useUpdatePlanificador = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnSuccess,
  customOnError,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: UpdatePlanificadorParams<T>) =>
      updatePlanificador(params),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [PlanificadorTSQEnum.PLANIFICADORS],
      });
      customOnSuccess && customOnSuccess(res);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Planificador actualizado correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      if (customOnError) {
        customOnError(error);
        return;
      }

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

///* axios ---------------
export type GetPlanificadorsParams = Partial<Planificador> &
  PagingPartialParams & {
    initial_date?: string; // YYYY-MM-DD <- monday to filter by week
    initial_date_month?: string; // YYYY-MM-DD <- monday to filter by month
    flota_uuid?: string;
  };
export type CreatePlanificadorParams<T> = T;
export type CreatePlanificadorParamsBase = Omit<Planificador, 'id'>;
export interface UpdatePlanificadorParams<T> {
  id: number;
  data: T;
}

export const getPlanificadors = async (params?: GetPlanificadorsParams) => {
  const stateParams = { ...params };
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<PlanificadorPaginatedRes>(`/planificador/?${queryParams}`, true);
};

export const getPlanificador = async (uuid: string) => {
  try {
    return await get<Planificador>(`/planificador/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const postPlanificador = async <T>(
  data: CreatePlanificadorParams<T>,
  url: string = '/',
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Planificador>(`/planificador${url}`, data, true);
};

export const updatePlanificador = async <T>({
  id,
  data,
}: UpdatePlanificadorParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Planificador>(`/planificador/${id}/`, data, true);
};

///* Action Types ===============================
export type TempBlockPlanificadorData = {
  fecha: string; // YYYY-MM-DD
  time_map: Pick<
    TimeMapPlanificador,
    'hora' | 'user' | 'preventa' | 'motivo'
  >[];
  flota: number;
};

export interface BlockManyHours {
  estado: SlotAgendamientoEstadosEnumChoice;
  flota: number;
  fecha: string; // YYYY-MM-DD
  hours: string[]; //"09:30:00"
}

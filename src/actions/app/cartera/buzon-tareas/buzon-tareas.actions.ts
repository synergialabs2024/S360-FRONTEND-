import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import {
  BuzonTarea,
  BuzonTareaPaginatedRes,
} from '@/shared/interfaces/app/cartera/buzon-tareas';

const { get, post, patch } = erpAPI();

export enum BuzonTareasTSQEnum {
  BUZONTAREAS = 'buzon-tareas',
  BUZONTAREA = 'buzon-tarea',
}
///* tanStack query ---------------
export const useFetchBuzonTareas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetBuzonTareasParams>) => {
  return useQuery({
    queryKey: [BuzonTareasTSQEnum.BUZONTAREAS, ...Object.values(params || {})],
    queryFn: () => getBuzonTareas(params),
    enabled: enabled,
  });
};

export const useGetBuzonTarea = (uuid: string) => {
  return useQuery({
    queryKey: [BuzonTareasTSQEnum.BUZONTAREA, uuid],
    queryFn: () => getBuzonTarea(uuid),
    retry: false,
  });
};

export const useCreateBuzonTarea = <T>({
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
    mutationFn: (params: CreateBuzonTareaParams<T>) => createBuzonTarea(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BuzonTareasTSQEnum.BUZONTAREAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Tarea creada correctamente',
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

export const useUpdateBuzonTarea = <T>({
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
    mutationFn: (params: UpdateBuzonTareaParams<T>) => updateBuzonTarea(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BuzonTareasTSQEnum.BUZONTAREAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Tarea actualizada correctamente',
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
export type GetBuzonTareasParams = Partial<BuzonTarea> & PagingPartialParams;
export type CreateBuzonTareaParams<T> = T;
export type CreateBuzonTareaParamsBase = Omit<BuzonTarea, 'id'>;
export interface UpdateBuzonTareaParams<T> {
  id: number;
  data: T;
}

export const getBuzonTareas = async (params?: GetBuzonTareasParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<BuzonTareaPaginatedRes>(
    `/buzon-tarea-mantenedor/?${queryParams}`,
    true,
  );
};

export const getBuzonTarea = async (uuid: string) => {
  try {
    return await get<BuzonTarea>(`/buzon-tarea-mantenedor/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createBuzonTarea = async <T>(data: CreateBuzonTareaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<BuzonTarea>('/buzon-tarea-mantenedor/', data, true);
};

export const updateBuzonTarea = async <T>({
  id,
  data,
}: UpdateBuzonTareaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<BuzonTarea>(`/buzon-tarea-mantenedor/${id}/`, data, true);
};

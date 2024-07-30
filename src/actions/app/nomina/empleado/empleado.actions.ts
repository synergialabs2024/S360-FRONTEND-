import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  Empleado,
  EmpleadosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum EmpleadoTSQEnum {
  EMPLEADOS = 'empleados',
  EMPLEADO = 'empleado',
}
///* tanStack query ---------------
export const useFetchEmpleados = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetEmpleadosParams>) => {
  return useQuery({
    queryKey: [EmpleadoTSQEnum.EMPLEADOS, ...Object.values(params || {})],
    queryFn: () => getEmpleados(params),
    enabled: enabled,
  });
};

export const useGetEmpleado = (uuid: string) => {
  return useQuery({
    queryKey: [EmpleadoTSQEnum.EMPLEADO, uuid],
    queryFn: () => getEmpleado(uuid),
    retry: false,
  });
};

export const useCreateEmpleado = <T>({
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
    mutationFn: (params: CreateEmpleadoParams<T>) => createEmpleado(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EmpleadoTSQEnum.EMPLEADOS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Empleado creado correctamente',
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

export const useUpdateEmpleado = <T>({
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
    mutationFn: (params: UpdateEmpleadoParams<T>) => updateEmpleado(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EmpleadoTSQEnum.EMPLEADOS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Empleado actualizado correctamente',
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
export type GetEmpleadosParams = Partial<Empleado> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateEmpleadoParams<T> = T;
export type CreateEmpleadoParamsBase = Omit<Empleado, 'id'>;
export interface UpdateEmpleadoParams<T> {
  id: number;
  data: T;
}

export const getEmpleados = async (params?: GetEmpleadosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<EmpleadosPaginatedRes>(`/empleado/?${queryParams}`, true);
};

export const getEmpleado = async (uuid: string) => {
  try {
    return await get<Empleado>(`/empleado/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createEmpleado = async <T>(data: CreateEmpleadoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Empleado>('/empleado/', data, true);
};

export const updateEmpleado = async <T>({
  id,
  data,
}: UpdateEmpleadoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Empleado>(`/empleado/${id}/`, data, true);
};

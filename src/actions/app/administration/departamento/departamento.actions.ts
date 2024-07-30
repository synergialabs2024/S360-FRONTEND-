import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  Departamento,
  DepartamentosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum DepartamentoTSQEnum {
  DEPARTAMENTOS = 'departamentos',
  DEPARTAMENTO = 'departamento',
}
///* tanStack query ---------------
export const useFetchDepartamentos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetDepartamentosParams>) => {
  return useQuery({
    queryKey: [
      DepartamentoTSQEnum.DEPARTAMENTOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getDepartamentos(params),
    enabled: enabled,
  });
};

export const useGetDepartamento = (uuid: string) => {
  return useQuery({
    queryKey: ['departamento', uuid],
    queryFn: () => getDepartamento(uuid),
    retry: false,
  });
};

export const useCreateDepartamento = <T>({
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
    mutationFn: (params: CreateDepartamentoParams<T>) =>
      createDepartamento(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departamentos'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Departamento creado correctamente',
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

export const useUpdateDepartamento = <T>({
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
    mutationFn: (params: UpdateDepartamentoParams<T>) =>
      updateDepartamento(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departamentos'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Departamento actualizado correctamente',
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
export type GetDepartamentosParams = Partial<Departamento> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateDepartamentoParams<T> = T;
export type CreateDepartamentoParamsBase = Omit<Departamento, 'id'>;
export interface UpdateDepartamentoParams<T> {
  id: number;
  data: T;
}

export const getDepartamentos = async (params?: GetDepartamentosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<DepartamentosPaginatedRes>(`/departamento/?${queryParams}`, true);
};

export const getDepartamento = async (uuid: string) => {
  try {
    return await get<Departamento>(`/departamento/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createDepartamento = async <T>(
  data: CreateDepartamentoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Departamento>('/departamento/', data, true);
};

export const updateDepartamento = async <T>({
  id,
  data,
}: UpdateDepartamentoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Departamento>(`/departamento/${id}/`, data, true);
};

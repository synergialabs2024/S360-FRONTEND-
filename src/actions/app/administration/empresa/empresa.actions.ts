import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  Empresa,
  EmpresasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum EmpresaTSQEnum {
  EMPRESAS = 'empresas',
  EMPRESA = 'empresa',
}
///* tanStack query ---------------
export const useFetchEmpresas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetEmpresasParams>) => {
  return useQuery({
    queryKey: [EmpresaTSQEnum.EMPRESAS, ...Object.values(params || {})],
    queryFn: () => getEmpresas(params),
    enabled: enabled,
  });
};

export const useGetEmpresa = (uuid: string) => {
  return useQuery({
    queryKey: ['empresa', uuid],
    queryFn: () => getEmpresa(uuid),
    retry: false,
  });
};

export const useCreateEmpresa = <T>({
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
    mutationFn: (params: CreateEmpresaParams<T>) => createEmpresa(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Empresa creado correctamente',
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

export const useUpdateEmpresa = <T>({
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
    mutationFn: (params: UpdateEmpresaParams<T>) => updateEmpresa(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Empresa actualizado correctamente',
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
export type GetEmpresasParams = Partial<Empresa> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateEmpresaParams<T> = T;
export type CreateEmpresaParamsBase = Omit<Empresa, 'id'>;
export interface UpdateEmpresaParams<T> {
  id: number;
  data: T;
}

export const getEmpresas = async (params?: GetEmpresasParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<EmpresasPaginatedRes>(`/empresa/?${queryParams}`, true);
};

export const getEmpresa = async (uuid: string) => {
  try {
    return await get<Empresa>(`/empresa/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createEmpresa = async <T>(data: CreateEmpresaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Empresa>('/empresa/', data, true);
};

export const updateEmpresa = async <T>({
  id,
  data,
}: UpdateEmpresaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Empresa>(`/empresa/${id}/`, data, true);
};

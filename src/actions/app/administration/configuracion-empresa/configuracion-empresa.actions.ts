import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastWrapper } from '@/shared/wrappers';

import {
  UseMutationParams,
  PagingPartialParams,
  ConfiguracionEmpresa,
  UseFetchEnabledParams,
} from '@/shared/interfaces';
import { useUiStore } from '@/store/ui';
import { getUrlParams } from '@/shared/utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { handleAxiosError } from '@/shared/axios/axios.utils';

const { get, patch } = erpAPI();

export enum ConfiguracionEmpresaTSQEnum {
  CONFEMPRESAS = 'configuracion-empresas',
  CONFEMPRESA = 'configuracion-empresa',
}
///* tanStack query ---------------
export const useFetchConfiguracionEmpresas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetConfiguracionEmpresasParams>) => {
  return useQuery({
    queryKey: [
      ConfiguracionEmpresaTSQEnum.CONFEMPRESAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getConfiguracionEmpresas(params),
    enabled: enabled,
  });
};

export const useUpdateConfiguracionEmpresa = <T>({
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
    mutationFn: (params: UpdateConfiguracionEmpresaParams<T>) =>
      updateConfiguracionEmpresa(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ConfiguracionEmpresaTSQEnum.CONFEMPRESAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'ConfiguraciÓn Empresa actualizada correctamente',
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
export type GetConfiguracionEmpresasParams = Partial<ConfiguracionEmpresa> &
  PagingPartialParams;
export type CreateConfiguracionEmpresaParams<T> = T;
export type CreateConfiguracionEmpresaParamsBase = Omit<
  ConfiguracionEmpresa,
  'id'
>;
export interface UpdateConfiguracionEmpresaParams<T> {
  id: number;
  data: T;
}

export const getConfiguracionEmpresas = async (
  params?: GetConfiguracionEmpresasParams,
) => {
  const stateParams = { ...params };
  const queryParams = getUrlParams(stateParams);
  return get<ConfiguracionEmpresa>(`/company/my?${queryParams}`, true);
};

export const updateConfiguracionEmpresa = async <T>({
  data,
}: UpdateConfiguracionEmpresaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ConfiguracionEmpresa>('/company/my/update/', data, true);
};

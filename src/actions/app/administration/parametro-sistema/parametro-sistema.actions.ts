import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  ParametroSistema,
  ParametrosSistemasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ParametroSistemaTSQEnum {
  PARAMETROS_SISTEMAS = 'parametros-sistemas',
  PARAMETRO_SISTEMA = 'parametrosistema',
}
///* tanStack query ---------------
export const useFetchParametrosSistemas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetParametrosSistemasParams>) => {
  return useQuery({
    queryKey: [
      ParametroSistemaTSQEnum.PARAMETROS_SISTEMAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getParametrosSistemas(params),
    enabled: enabled,
  });
};

export const useGetParametroSistema = (uuid: string) => {
  return useQuery({
    queryKey: [ParametroSistemaTSQEnum.PARAMETRO_SISTEMA, uuid],
    queryFn: () => getParametroSistema(uuid),
    retry: false,
  });
};

export const useCreateParametroSistema = <T>({
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
    mutationFn: (params: CreateParametroSistemaParams<T>) =>
      createParametroSistema(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ParametroSistemaTSQEnum.PARAMETROS_SISTEMAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Parametro Sistema creado correctamente',
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

export const useUpdateParametroSistema = <T>({
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
    mutationFn: (params: UpdateParametroSistemaParams<T>) =>
      updateParametroSistema(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ParametroSistemaTSQEnum.PARAMETROS_SISTEMAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Parametro Sistema actualizado correctamente',
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
export type GetParametrosSistemasParams = Partial<ParametroSistema> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateParametroSistemaParams<T> = T;
export type CreateParametroSistemaParamsBase = Omit<ParametroSistema, 'id'>;
export interface UpdateParametroSistemaParams<T> {
  id: number;
  data: T;
}

export const getParametrosSistemas = async (
  params?: GetParametrosSistemasParams,
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
  return get<ParametrosSistemasPaginatedRes>(
    `/parametrosistema/?${queryParams}`,
    true,
  );
};

export const getParametroSistema = async (uuid: string) => {
  try {
    return await get<ParametroSistema>(`/parametrosistema/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createParametroSistema = async <T>(
  data: CreateParametroSistemaParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<ParametroSistema>('/parametrosistema/', data, true);
};

export const updateParametroSistema = async <T>({
  id,
  data,
}: UpdateParametroSistemaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ParametroSistema>(`/parametrosistema/${id}/`, data, true);
};

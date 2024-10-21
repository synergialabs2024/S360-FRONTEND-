import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  GrupoIPv4,
  GruposIPv4PaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum GrupoIPv4TSQEnum {
  GRUPOIPV4S = 'grupo-ipv4s',
  GRUPOIPV4 = 'grupo-ipv4',
}
///* tanStack query ---------------
export const useFetchGrupoIPv4s = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetGrupoIPv4sParams>) => {
  return useQuery({
    queryKey: [GrupoIPv4TSQEnum.GRUPOIPV4S, ...Object.values(params || {})],
    queryFn: () => getGrupoIPv4s(params),
    enabled: enabled,
  });
};

export const useGetGrupoIPv4 = (uuid: string) => {
  return useQuery({
    queryKey: [GrupoIPv4TSQEnum.GRUPOIPV4, uuid],
    queryFn: () => getGrupoIPv4(uuid),
    retry: false,
  });
};

export const useCreateGrupoIPv4 = <T>({
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
    mutationFn: (params: CreateGrupoIPv4Params<T>) => createGrupoIPv4(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GrupoIPv4TSQEnum.GRUPOIPV4S],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'GrupoIPv4 creado correctamente',
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

export const useUpdateGrupoIPv4 = <T>({
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
    mutationFn: (params: UpdateGrupoIPv4Params<T>) => updateGrupoIPv4(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GrupoIPv4TSQEnum.GRUPOIPV4S],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'GrupoIPv4 actualizado correctamente',
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
export type GetGrupoIPv4sParams = Partial<GrupoIPv4> & PagingPartialParams;
export type CreateGrupoIPv4Params<T> = T;
export type CreateGrupoIPv4ParamsBase = Omit<GrupoIPv4, 'id'> & {
  routers?: any[];
};
export interface UpdateGrupoIPv4Params<T> {
  id: number;
  data: T;
}

export const getGrupoIPv4s = async (params?: GetGrupoIPv4sParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<GruposIPv4PaginatedRes>(`/grupoipv4/?${queryParams}`, true);
};

export const getGrupoIPv4 = async (uuid: string) => {
  try {
    return await get<GrupoIPv4>(`/grupoipv4/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createGrupoIPv4 = async <T>(data: CreateGrupoIPv4Params<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<GrupoIPv4>('/grupoipv4/', data, true);
};

export const updateGrupoIPv4 = async <T>({
  id,
  data,
}: UpdateGrupoIPv4Params<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<GrupoIPv4>(`/grupoipv4/${id}/`, data, true);
};

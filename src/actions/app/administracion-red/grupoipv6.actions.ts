import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  GrupoIPv6,
  GruposIPv6PaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum GrupoIPv6TSQEnum {
  GRUPOIPV6S = 'grupos-ipv6',
  GRUPOIPV6 = 'grupo-ipv6',
}
///* tanStack query ---------------
export const useFetchGrupoIPv6s = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetGrupoIPv6sParams>) => {
  return useQuery({
    queryKey: [GrupoIPv6TSQEnum.GRUPOIPV6S, ...Object.values(params || {})],
    queryFn: () => getGrupoIPv6s(params),
    enabled: enabled,
  });
};

export const useGetGrupoIPv6 = (uuid: string) => {
  return useQuery({
    queryKey: [GrupoIPv6TSQEnum.GRUPOIPV6, uuid],
    queryFn: () => getGrupoIPv6(uuid),
    retry: false,
  });
};

export const useCreateGrupoIPv6 = <T>({
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
    mutationFn: (params: CreateGrupoIPv6Params<T>) => createGrupoIPv6(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GrupoIPv6TSQEnum.GRUPOIPV6S],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'GrupoIPv6 creado correctamente',
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

export const useUpdateGrupoIPv6 = <T>({
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
    mutationFn: (params: UpdateGrupoIPv6Params<T>) => updateGrupoIPv6(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GrupoIPv6TSQEnum.GRUPOIPV6S],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'GrupoIPv6 actualizado correctamente',
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
export type GetGrupoIPv6sParams = Partial<GrupoIPv6> & PagingPartialParams;
export type CreateGrupoIPv6Params<T> = T;
export type CreateGrupoIPv6ParamsBase = Omit<GrupoIPv6, 'id'> & {
  routers: any[];
};
export interface UpdateGrupoIPv6Params<T> {
  id: number;
  data: T;
}

export const getGrupoIPv6s = async (params?: GetGrupoIPv6sParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<GruposIPv6PaginatedRes>(`/grupoipv6/?${queryParams}`, true);
};

export const getGrupoIPv6 = async (uuid: string) => {
  try {
    return await get<GrupoIPv6>(`/grupoipv6/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createGrupoIPv6 = async <T>(data: CreateGrupoIPv6Params<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<GrupoIPv6>('/grupoipv6/', data, true);
};

export const updateGrupoIPv6 = async <T>({
  id,
  data,
}: UpdateGrupoIPv6Params<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<GrupoIPv6>(`/grupoipv6/${id}/`, data, true);
};

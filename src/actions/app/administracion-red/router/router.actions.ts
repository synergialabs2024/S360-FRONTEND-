import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Router,
  RoutersPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum RouterTSQEnum {
  ROUTERS = 'routers',
  ROUTER = 'router',
}
///* tanStack query ---------------
export const useFetchRouters = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetRoutersParams>) => {
  return useQuery({
    queryKey: [RouterTSQEnum.ROUTERS, ...Object.values(params || {})],
    queryFn: () => getRouters(params),
    enabled: enabled,
  });
};

export const useGetRouter = (uuid: string) => {
  return useQuery({
    queryKey: [RouterTSQEnum.ROUTER, uuid],
    queryFn: () => getRouter(uuid),
    retry: false,
  });
};

export const useCreateRouter = <T>({
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
    mutationFn: (params: CreateRouterParams<T>) => createRouter(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RouterTSQEnum.ROUTERS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Router creado correctamente',
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

export const useUpdateRouter = <T>({
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
    mutationFn: (params: UpdateRouterParams<T>) => updateRouter(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RouterTSQEnum.ROUTERS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Router actualizado correctamente',
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
export type GetRoutersParams = Partial<Router> & PagingPartialParams;
export type CreateRouterParams<T> = T;
export type CreateRouterParamsBase = Omit<Router, 'id'>;
export interface UpdateRouterParams<T> {
  id: number;
  data: T;
}

export const getRouters = async (params?: GetRoutersParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<RoutersPaginatedRes>(`/router/?${queryParams}`, true);
};

export const getRouter = async (uuid: string) => {
  try {
    return await get<Router>(`/router/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createRouter = async <T>(data: CreateRouterParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Router>('/router/', data, true);
};

export const updateRouter = async <T>({ id, data }: UpdateRouterParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Router>(`/router/${id}/`, data, true);
};

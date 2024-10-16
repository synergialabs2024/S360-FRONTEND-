import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  PlanesInternetPaginatedRes,
  PlanInternet,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum PlanInternetTSQEnum {
  PLANINTERNETS = 'planinternets',
  PLANINTERNET = 'planinternet',
}
///* tanStack query ---------------
export const useFetchPlanInternets = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPlanInternetsParams>) => {
  return useQuery({
    queryKey: [
      PlanInternetTSQEnum.PLANINTERNETS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getPlanInternets(params),
    enabled: enabled,
  });
};

export const useGetPlanInternet = (uuid: string) => {
  return useQuery({
    queryKey: [PlanInternetTSQEnum.PLANINTERNET, uuid],
    queryFn: () => getPlanInternet(uuid),
    retry: false,
  });
};

export const useCreatePlanInternet = <T>({
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
    mutationFn: (params: CreatePlanInternetParams<T>) =>
      createPlanInternet(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PlanInternetTSQEnum.PLANINTERNETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(customMessageToast || 'Plan creado correctamente');
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

export const useUpdatePlanInternet = <T>({
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
    mutationFn: (params: UpdatePlanInternetParams<T>) =>
      updatePlanInternet(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PlanInternetTSQEnum.PLANINTERNETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Plan actualizado correctamente',
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
export type GetPlanInternetsParams = Partial<PlanInternet> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreatePlanInternetParams<T> = T;
export type CreatePlanInternetParamsBase = Omit<PlanInternet, 'id'>;
export interface UpdatePlanInternetParams<T> {
  id: number;
  data: T;
}

export const getPlanInternets = async (params?: GetPlanInternetsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<PlanesInternetPaginatedRes>(`/planinternet/?${queryParams}`, true);
};

export const getPlanInternet = async (uuid: string) => {
  try {
    return await get<PlanInternet>(`/planinternet/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPlanInternet = async <T>(
  data: CreatePlanInternetParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<PlanInternet>('/planinternet/', data, true);
};

export const updatePlanInternet = async <T>({
  id,
  data,
}: UpdatePlanInternetParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<PlanInternet>(`/planinternet/${id}/`, data, true);
};

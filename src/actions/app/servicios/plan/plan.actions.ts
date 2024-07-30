import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  Plan,
  PlanesPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum PlanTSQEnum {
  PLANS = 'plans',
  PLAN = 'plan',
}
///* tanStack query ---------------
export const useFetchPlans = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPlansParams>) => {
  return useQuery({
    queryKey: [PlanTSQEnum.PLANS, ...Object.values(params || {})],
    queryFn: () => getPlans(params),
    enabled: enabled,
  });
};

export const useGetPlan = (uuid: string) => {
  return useQuery({
    queryKey: [PlanTSQEnum.PLAN, uuid],
    queryFn: () => getPlan(uuid),
    retry: false,
  });
};

export const useCreatePlan = <T>({
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
    mutationFn: (params: CreatePlanParams<T>) => createPlan(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PlanTSQEnum.PLANS] });
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

export const useUpdatePlan = <T>({
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
    mutationFn: (params: UpdatePlanParams<T>) => updatePlan(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PlanTSQEnum.PLANS] });
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
export type GetPlansParams = Partial<Plan> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreatePlanParams<T> = T;
export type CreatePlanParamsBase = Omit<Plan, 'id'>;
export interface UpdatePlanParams<T> {
  id: number;
  data: T;
}

export const getPlans = async (params?: GetPlansParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<PlanesPaginatedRes>(`/plan/?${queryParams}`, true);
};

export const getPlan = async (uuid: string) => {
  try {
    return await get<Plan>(`/plan/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPlan = async <T>(data: CreatePlanParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Plan>('/plan/', data, true);
};

export const updatePlan = async <T>({ id, data }: UpdatePlanParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Plan>(`/plan/${id}/`, data, true);
};

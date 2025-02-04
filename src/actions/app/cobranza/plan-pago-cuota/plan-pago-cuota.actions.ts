import { erpAPI } from '@/axios/erp-api';
import {
  getUrlParams,
  PagingPartialParams,
  PlanPagoCuota,
  PlanPagoCuotaPaginatedRes,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum PlanPagoCuotaTSQEnum {
  PLANPAGOCUOTAS = 'plan-pago-cuotas',
  PLANPAGOCUOTA = 'plan-pago-cuota',
}

///* tanStack query
export const useFetchPlanPagoCuota = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPlanPagoCuotasParams>) => {
  return useQuery({
    queryKey: [
      PlanPagoCuotaTSQEnum.PLANPAGOCUOTAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getPlanPagoCuotas(params),
    enabled: enabled,
  });
};

export const useGetPlanPagoCuota = (uuid: string) => {
  return useQuery({
    queryKey: [PlanPagoCuotaTSQEnum.PLANPAGOCUOTA, uuid],
    queryFn: () => getPlanPagoCuota(uuid),
    retry: false,
  });
};

export const useCreatePlanPagoCuota = <T>({
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
    mutationFn: (params: CreatePlanPagoCuotaParams<T>) =>
      createPlanPagoCuota(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PlanPagoCuotaTSQEnum.PLANPAGOCUOTAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Plan Pago Cuota creado correctamente',
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
export const useUpdatePlanPagoCuota = <T>({
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
    mutationFn: (params: UpdatePlanPagoCuotaParams<T>) =>
      updatePlanPagoCuota(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PlanPagoCuotaTSQEnum.PLANPAGOCUOTAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Plan Pago Cuota actualizado correctamente',
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
export type GetPlanPagoCuotasParams = Partial<PlanPagoCuota> &
  PagingPartialParams;
export type CreatePlanPagoCuotaParams<T> = T;
export type CreatePlanPagoCuotaParamsBase = Omit<PlanPagoCuota, 'id'>;
export interface UpdatePlanPagoCuotaParams<T> {
  id: number;
  data: T;
}

export const getPlanPagoCuotas = async (params?: GetPlanPagoCuotasParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<PlanPagoCuotaPaginatedRes>(
    `/plan-pago-cuota/?${queryParams}`,
    true,
  );
};

export const getPlanPagoCuota = async (uuid: string) => {
  try {
    return await get<PlanPagoCuota>(`/plan-pago-cuota/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPlanPagoCuota = async <T>(
  data: CreatePlanPagoCuotaParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<PlanPagoCuota>('/plan-pago-cuota/', data, true);
};

export const updatePlanPagoCuota = async <T>({
  id,
  data,
}: UpdatePlanPagoCuotaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<PlanPagoCuota>(`/plan-pago-cuota/${id}/`, data, true);
};

import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  ScoreMonthlyUsageVentas,
  ScoreMonthlyUsageVentasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ScoreMonthlyUsageVentasTSQEnum {
  SCOREMONTHLYUSAGEVENTASS = 'score-monthly-usage-ventass',
  SCOREMONTHLYUSAGEVENTAS = 'score-monthly-usage-ventas',
}
///* tanStack query ---------------
export const useFetchScoreMonthlyUsageVentass = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetScoreMonthlyUsageVentassParams>) => {
  return useQuery({
    queryKey: [
      ScoreMonthlyUsageVentasTSQEnum.SCOREMONTHLYUSAGEVENTASS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getScoreMonthlyUsageVentass(params),
    enabled: enabled,
  });
};

export const useGetScoreMonthlyUsageVentas = (uuid: string) => {
  return useQuery({
    queryKey: [ScoreMonthlyUsageVentasTSQEnum.SCOREMONTHLYUSAGEVENTAS, uuid],
    queryFn: () => getScoreMonthlyUsageVentas(uuid),
    retry: false,
  });
};

export const useCreateScoreMonthlyUsageVentas = <T>({
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
    mutationFn: (params: CreateScoreMonthlyUsageVentasParams<T>) =>
      createScoreMonthlyUsageVentas(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ScoreMonthlyUsageVentasTSQEnum.SCOREMONTHLYUSAGEVENTASS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'ScoreMonthlyUsageVentas creado correctamente',
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

export const useUpdateScoreMonthlyUsageVentas = <T>({
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
    mutationFn: (params: UpdateScoreMonthlyUsageVentasParams<T>) =>
      updateScoreMonthlyUsageVentas(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ScoreMonthlyUsageVentasTSQEnum.SCOREMONTHLYUSAGEVENTASS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'ScoreMonthlyUsageVentas actualizado correctamente',
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
export type GetScoreMonthlyUsageVentassParams =
  Partial<ScoreMonthlyUsageVentas> & PagingPartialParams;
export type CreateScoreMonthlyUsageVentasParams<T> = T;
export type CreateScoreMonthlyUsageVentasParamsBase = Omit<
  ScoreMonthlyUsageVentas,
  'id'
>;
export interface UpdateScoreMonthlyUsageVentasParams<T> {
  id: number;
  data: T;
}

export const getScoreMonthlyUsageVentass = async (
  params?: GetScoreMonthlyUsageVentassParams,
) => {
  const stateParams = { ...params };

  // filter by state
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ScoreMonthlyUsageVentasPaginatedRes>(
    `/score-monthly-usage-ventas/?${queryParams}`,
    true,
  );
};

export const getScoreMonthlyUsageVentas = async (uuid: string) => {
  try {
    return await get<ScoreMonthlyUsageVentas>(
      `/score-monthly-usage-ventas/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createScoreMonthlyUsageVentas = async <T>(
  data: CreateScoreMonthlyUsageVentasParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<ScoreMonthlyUsageVentas>(
    '/score-monthly-usage-ventas/',
    data,
    true,
  );
};

export const updateScoreMonthlyUsageVentas = async <T>({
  id,
  data,
}: UpdateScoreMonthlyUsageVentasParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ScoreMonthlyUsageVentas>(
    `/score-monthly-usage-ventas/${id}/`,
    data,
    true,
  );
};

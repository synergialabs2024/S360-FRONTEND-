import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  ScoreLimitVentas,
  ScoreLimitVentasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ScoreLimitVentasTSQEnum {
  SCORELIMITVENTASS = 'score-limit-ventass',
  SCORELIMITVENTAS = 'score-limit-ventas',
}
///* tanStack query ---------------
export const useFetchScoreLimitVentass = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetScoreLimitVentassParams>) => {
  return useQuery({
    queryKey: [
      ScoreLimitVentasTSQEnum.SCORELIMITVENTASS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getScoreLimitVentass(params),
    enabled: enabled,
  });
};

export const useGetScoreLimitVentas = (uuid: string) => {
  return useQuery({
    queryKey: [ScoreLimitVentasTSQEnum.SCORELIMITVENTAS, uuid],
    queryFn: () => getScoreLimitVentas(uuid),
    retry: false,
  });
};

export const useCreateScoreLimitVentas = <T>({
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
    mutationFn: (params: CreateScoreLimitVentasParams<T>) =>
      createScoreLimitVentas(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ScoreLimitVentasTSQEnum.SCORELIMITVENTASS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Score Límite de Ventas creado correctamente',
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

export const useUpdateScoreLimitVentas = <T>({
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
    mutationFn: (params: UpdateScoreLimitVentasParams<T>) =>
      updateScoreLimitVentas(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ScoreLimitVentasTSQEnum.SCORELIMITVENTASS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Score Límite de Ventas actualizado correctamente',
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
export type GetScoreLimitVentassParams = Partial<ScoreLimitVentas> &
  PagingPartialParams;
export type CreateScoreLimitVentasParams<T> = T;
export type CreateScoreLimitVentasParamsBase = Omit<ScoreLimitVentas, 'id'>;
export interface UpdateScoreLimitVentasParams<T> {
  id: number;
  data: T;
}

export const getScoreLimitVentass = async (
  params?: GetScoreLimitVentassParams,
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
  return get<ScoreLimitVentasPaginatedRes>(
    `/score-limit-ventas/?${queryParams}`,
    true,
  );
};

export const getScoreLimitVentas = async (uuid: string) => {
  try {
    return await get<ScoreLimitVentas>(`/score-limit-ventas/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createScoreLimitVentas = async <T>(
  data: CreateScoreLimitVentasParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<ScoreLimitVentas>('/score-limit-ventas/', data, true);
};

export const updateScoreLimitVentas = async <T>({
  id,
  data,
}: UpdateScoreLimitVentasParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ScoreLimitVentas>(`/score-limit-ventas/${id}/`, data, true);
};

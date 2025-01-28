import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import {
  CambioPlan,
  CambioPlanPaginatedRes,
} from '@/shared/interfaces/app/cartera';

const { get, post, patch } = erpAPI();

export enum CambioPlanTSQEnum {
  CAMBIOPLANES = 'cambio-planes',
  CAMBIOPLAN = 'cambio-plan',
}
///* tanStack query ---------------
export const useFetchCambioPlanes = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCambioPlanesParams>) => {
  return useQuery({
    queryKey: [CambioPlanTSQEnum.CAMBIOPLANES, ...Object.values(params || {})],
    queryFn: () => getCambioPlanes(params),
    enabled: enabled,
  });
};

export const useGetCambioPlan = (uuid: string) => {
  return useQuery({
    queryKey: [CambioPlanTSQEnum.CAMBIOPLAN, uuid],
    queryFn: () => getCambioPlan(uuid),
    retry: false,
  });
};

export const useCreateCambioPlan = <T>({
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
    mutationFn: (params: CreateCambioPlanParams<T>) => createCambioPlan(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CambioPlanTSQEnum.CAMBIOPLANES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cambio plan creado correctamente',
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

export const useGetCambioPlanComputeValores = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnSuccess,
  customOnError,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateCambioPlanParams<T>) =>
      getCambioPlanComputeValores(params),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [CambioPlanTSQEnum.CAMBIOPLANES],
      });
      customOnSuccess && customOnSuccess(res);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Valores de cambio de plan obtenidos correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      customOnError && customOnError(error);

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const useUpdateCambioPlan = <T>({
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
    mutationFn: (params: UpdateCambioPlanParams<T>) => updateCambioPlan(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CambioPlanTSQEnum.CAMBIOPLANES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cambio plan actualizado correctamente',
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
export type GetCambioPlanesParams = Partial<CambioPlan> & PagingPartialParams;
export type CreateCambioPlanParams<T> = T;
export type CreateCambioPlanParamsBase = Omit<CambioPlan, 'id'>;
export interface UpdateCambioPlanParams<T> {
  id: number;
  data: T;
}

export const getCambioPlanes = async (params?: GetCambioPlanesParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CambioPlanPaginatedRes>(`/cambio-plan/?${queryParams}`, true);
};

export const getCambioPlan = async (uuid: string) => {
  try {
    return await get<CambioPlan>(`/cambio-plan/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCambioPlan = async <T>(data: CreateCambioPlanParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CambioPlan>('/cambio-plan/', data, true);
};

export const getCambioPlanComputeValores = async <T>(
  data: CreateCambioPlanParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CambioPlan>('/cambio-plan/compute-valores/', data, true);
};

export const updateCambioPlan = async <T>({
  id,
  data,
}: UpdateCambioPlanParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CambioPlan>(`/cambio-plan/${id}/`, data, true);
};

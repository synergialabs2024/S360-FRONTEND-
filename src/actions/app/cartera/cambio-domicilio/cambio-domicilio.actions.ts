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
  CambioDomicilio,
  CambioDomicilioPaginatedRes,
} from '@/shared/interfaces/app/cartera';

const { get, post, patch } = erpAPI();

export enum CambioDomicilioTSQEnum {
  CAMBIODOMICILIOS = 'cambio-domicilios',
  CAMBIODOMICILIO = 'cambio-domicilio',
}
///* tanStack query ---------------
export const useFetchCambioDomicilios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCambioDomiciliosParams>) => {
  return useQuery({
    queryKey: [
      CambioDomicilioTSQEnum.CAMBIODOMICILIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getCambioDomicilios(params),
    enabled: enabled,
  });
};

export const useGetCambioDomicilio = (uuid: string) => {
  return useQuery({
    queryKey: [CambioDomicilioTSQEnum.CAMBIODOMICILIO, uuid],
    queryFn: () => getCambioDomicilio(uuid),
    retry: false,
  });
};

export const useCreateCambioDomicilio = <T>({
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
    mutationFn: (params: CreateCambioDomicilioParams<T>) =>
      createCambioDomicilio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CambioDomicilioTSQEnum.CAMBIODOMICILIO],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cambio domicilio creado correctamente',
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

export const useGetCambioDomicilioComputeValores = <T>({
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
    mutationFn: (params: CreateCambioDomicilioParams<T>) =>
      getCambioDomicilioComputeValores(params),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [CambioDomicilioTSQEnum.CAMBIODOMICILIOS],
      });
      customOnSuccess && customOnSuccess(res);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Valores de cambio de domicilio obtenidos correctamente',
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

export const useUpdateCambioDomicilio = <T>({
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
    mutationFn: (params: UpdateCambioDomicilioParams<T>) =>
      updateCambioDomicilio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CambioDomicilioTSQEnum.CAMBIODOMICILIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cambio domicilio actualizado correctamente',
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
export type GetCambioDomiciliosParams = Partial<CambioDomicilio> &
  PagingPartialParams;
export type CreateCambioDomicilioParams<T> = T;
export type CreateCambioDomicilioParamsBase = Omit<CambioDomicilio, 'id'>;
export interface UpdateCambioDomicilioParams<T> {
  id: number;
  data: T;
}

export const getCambioDomicilios = async (
  params?: GetCambioDomiciliosParams,
) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CambioDomicilioPaginatedRes>(
    `/cambio-domicilio/?${queryParams}`,
    true,
  );
};

export const getCambioDomicilio = async (uuid: string) => {
  try {
    return await get<CambioDomicilio>(`/cambio-domicilio/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCambioDomicilio = async <T>(
  data: CreateCambioDomicilioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CambioDomicilio>('/cambio-domicilio/', data, true);
};

export const getCambioDomicilioComputeValores = async <T>(
  data: CreateCambioDomicilioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CambioDomicilio>(
    '/cambio-domicilio/compute-valores/',
    data,
    true,
  );
};

export const updateCambioDomicilio = async <T>({
  id,
  data,
}: UpdateCambioDomicilioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CambioDomicilio>(`/cambio-domicilio/${id}/`, data, true);
};

///* action data types ---------------
// export type CreateCambioDomicilio = Pick<
//   CambioDomicilio,
//   | 'linea_servicio'
//   | 'modelo'
//   | 'modelo_id'
//   | 'modelo_estado'
//   | 'solicitud_desbloqueo_estado' // first state created
//   | 'tipo'
// > & {};

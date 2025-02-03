import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  SolicitudAprobacionIAPreventa,
  SolicitudesAprobacionIAPreventaPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum SolicitudAprobacionIAPreventaTSQEnum {
  SOLICITUDAPROBACIONIAPREVENTAS = 'solicitud-aprobacion-ia-preventas',
  SOLICITUDAPROBACIONIAPREVENTA = 'solicitud-aprobacion-ia-preventa',
}
///* tanStack query ---------------
export const useFetchSolicitudAprobacionIAPreventas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudAprobacionIAPreventasParams>) => {
  return useQuery({
    queryKey: [
      SolicitudAprobacionIAPreventaTSQEnum.SOLICITUDAPROBACIONIAPREVENTAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudAprobacionIAPreventas(params),
    enabled: enabled,
  });
};

export const useGetSolicitudAprobacionIAPreventa = (uuid: string) => {
  return useQuery({
    queryKey: [
      SolicitudAprobacionIAPreventaTSQEnum.SOLICITUDAPROBACIONIAPREVENTA,
      uuid,
    ],
    queryFn: () => getSolicitudAprobacionIAPreventa(uuid),
    retry: false,
  });
};

export const useCreateSolicitudAprobacionIAPreventa = <T>({
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
    mutationFn: (params: CreateSolicitudAprobacionIAPreventaParams<T>) =>
      createSolicitudAprobacionIAPreventa(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          SolicitudAprobacionIAPreventaTSQEnum.SOLICITUDAPROBACIONIAPREVENTAS,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'SolicitudAprobacionIAPreventa creado correctamente',
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

export const useUpdateSolicitudAprobacionIAPreventa = <T>({
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
    mutationFn: (params: UpdateSolicitudAprobacionIAPreventaParams<T>) =>
      updateSolicitudAprobacionIAPreventa(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          SolicitudAprobacionIAPreventaTSQEnum.SOLICITUDAPROBACIONIAPREVENTAS,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'SolicitudAprobacionIAPreventa actualizado correctamente',
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
export type GetSolicitudAprobacionIAPreventasParams =
  Partial<SolicitudAprobacionIAPreventa> & PagingPartialParams;
export type CreateSolicitudAprobacionIAPreventaParams<T> = T;
export type CreateSolicitudAprobacionIAPreventaParamsBase = Omit<
  SolicitudAprobacionIAPreventa,
  'id'
>;
export interface UpdateSolicitudAprobacionIAPreventaParams<T> {
  id: number;
  data: T;
}

export const getSolicitudAprobacionIAPreventas = async (
  params?: GetSolicitudAprobacionIAPreventasParams,
) => {
  const stateParams = { ...params };

  // filter by state
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<SolicitudesAprobacionIAPreventaPaginatedRes>(
    `/solicitud-aprobacion-ia-preventa/?${queryParams}`,
    true,
  );
};

export const getSolicitudAprobacionIAPreventa = async (uuid: string) => {
  try {
    return await get<SolicitudAprobacionIAPreventa>(
      `/solicitud-aprobacion-ia-preventa/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSolicitudAprobacionIAPreventa = async <T>(
  data: CreateSolicitudAprobacionIAPreventaParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolicitudAprobacionIAPreventa>(
    '/solicitud-aprobacion-ia-preventa/',
    data,
    true,
  );
};

export const updateSolicitudAprobacionIAPreventa = async <T>({
  id,
  data,
}: UpdateSolicitudAprobacionIAPreventaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolicitudAprobacionIAPreventa>(
    `/solicitud-aprobacion-ia-preventa/${id}/`,
    data,
    true,
  );
};

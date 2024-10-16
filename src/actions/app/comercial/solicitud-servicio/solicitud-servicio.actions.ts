import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  PagingPartialParamsOnly,
  SolicitudServicio,
  SolicitudServiciosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum SolicitudServicioTSQEnum {
  SOLICITUDSERVICIOS = 'solicitud-servicios',
  SOLICITUDSERVICIO = 'solicitud-servicio',
}
///* tanStack query ---------------
export const useFetchSolicitudServicios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudServiciosParams>) => {
  return useQuery({
    queryKey: [
      SolicitudServicioTSQEnum.SOLICITUDSERVICIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudServicios(params),
    enabled: enabled,
  });
};

export const useGetSolicitudServicio = (uuid: string) => {
  return useQuery({
    queryKey: [SolicitudServicioTSQEnum.SOLICITUDSERVICIO, uuid],
    queryFn: () => getSolicitudServicio(uuid),
    retry: false,
  });
};

export const useCreateSolicitudServicio = <T>({
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
    mutationFn: (params: CreateSolicitudServicioParams<T>) =>
      createSolicitudServicio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SolicitudServicioTSQEnum.SOLICITUDSERVICIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'SolicitudServicio creado correctamente',
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

export const useUpdateSolicitudServicio = <T>({
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
    mutationFn: (params: UpdateSolicitudServicioParams<T>) =>
      updateSolicitudServicio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SolicitudServicioTSQEnum.SOLICITUDSERVICIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'SolicitudServicio actualizado correctamente',
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
export type GetSolicitudServiciosParams = Partial<SolicitudServicio> &
  PagingPartialParamsOnly;
export type CreateSolicitudServicioParams<T> = T;
export type CreateSolicitudServicioParamsBase = Omit<SolicitudServicio, 'id'>;
export interface UpdateSolicitudServicioParams<T> {
  id: number;
  data: T;
}

export const getSolicitudServicios = async (
  params?: GetSolicitudServiciosParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<SolicitudServiciosPaginatedRes>(
    `/solicitudservicio/?${queryParams}`,
    true,
  );
};

export const getSolicitudServicio = async (uuid: string) => {
  try {
    return await get<SolicitudServicio>(`/solicitudservicio/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSolicitudServicio = async <T>(
  data: CreateSolicitudServicioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolicitudServicio>('/solicitudservicio/', data, true);
};

export const updateSolicitudServicio = async <T>({
  id,
  data,
}: UpdateSolicitudServicioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolicitudServicio>(`/solicitudservicio/${id}/`, data, true);
};

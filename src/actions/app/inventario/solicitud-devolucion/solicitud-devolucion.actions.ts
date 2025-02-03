import { erpAPI } from '@/axios/erp-api';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getUrlParams,
  PagingPartialParams,
  SolicitudDevolucion,
  SolicitudDevolucionPaginatedRes,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';

const { get, post, patch } = erpAPI();

export enum solicitudDevolucionTSQEnum {
  SOLICITUDDEVOLUCIONES = 'solicitud-devoluciones',
  SOLICITUDDEVOLUCION = 'solicitud-devolucion',
}

///* tanStack query
export const useFetchSolicitudDevolucion = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudDevolucionParams>) => {
  return useQuery({
    queryKey: [
      solicitudDevolucionTSQEnum.SOLICITUDDEVOLUCIONES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudDevolucion(params),
    enabled: enabled,
  });
};

export const useGetsolicitudDevolucion = (uuid: string) => {
  return useQuery({
    queryKey: [solicitudDevolucionTSQEnum.SOLICITUDDEVOLUCION, uuid],
    queryFn: () => getsolicitudDevolucion(uuid),
    retry: false,
  });
};

export const useCreateSolicitudDevolucion = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnSuccess,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateSolicitudDevolucionParams<T>) =>
      createsolicitudDevolucion(params),
    onSuccess: resp => {
      queryClient.invalidateQueries({
        queryKey: [solicitudDevolucionTSQEnum.SOLICITUDDEVOLUCION],
      });
      customOnSuccess && customOnSuccess(resp.data);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Solicitud de Devolucion creado correctamente',
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

export const useUpdatesolicitudDevolucion = <T>({
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
    mutationFn: (params: UpdatesolicitudDevolucionParams<T>) =>
      updatesolicitudDevolucion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [solicitudDevolucionTSQEnum.SOLICITUDDEVOLUCION],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Solicitud de Devolucion actualizado correctamente',
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
///* axios
export type GetSolicitudDevolucionParams = Partial<SolicitudDevolucion> &
  PagingPartialParams;

export type CreateSolicitudDevolucionParams<T> = T;
export type CreateSolicitudDevolucionParamsBase = Omit<
  SolicitudDevolucion,
  'id'
>;
export interface UpdatesolicitudDevolucionParams<T> {
  id: number;
  data: T;
}

export const getSolicitudDevolucion = async (
  params?: GetSolicitudDevolucionParams,
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
  return get<SolicitudDevolucionPaginatedRes>(
    `/solicitud_devolicion/?${queryParams}`,
    true,
  );
};

export const getsolicitudDevolucion = async (uuid: string) => {
  try {
    return await get<SolicitudDevolucion>(
      `/solicitud_devolicion/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createsolicitudDevolucion = async <T>(
  data: CreateSolicitudDevolucionParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolicitudDevolucion>('/solicitud_devolicion/', data, true);
};

export const updatesolicitudDevolucion = async <T>({
  id,
  data,
}: UpdatesolicitudDevolucionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolicitudDevolucion>(`/solicitud_devolicion/${id}/`, data, true);
};

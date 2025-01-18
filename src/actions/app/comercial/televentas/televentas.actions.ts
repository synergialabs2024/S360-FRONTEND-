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
  Televentas,
  TeleventasPaginatedRes,
} from '@/shared/interfaces/app/comercial/televentas';

const { get, post, patch } = erpAPI();

export enum TeleventasTSQEnum {
  TELEVENTAS = 'leed-televenta',
  TELEVENTA = 'leed-televentas',
}
///* tanStack query ---------------
export const useFetchTeleventas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTeleventasParams>) => {
  return useQuery({
    queryKey: [TeleventasTSQEnum.TELEVENTAS, ...Object.values(params || {})],
    queryFn: () => getTeleventas(params),
    enabled: enabled,
  });
};

export const useGetTeleventas = (
  uuid: string,
  refetchOnWindowFocus = false,
) => {
  return useQuery({
    queryKey: [TeleventasTSQEnum.TELEVENTA, uuid],
    queryFn: () => getTeleventa(uuid),
    retry: false,
    refetchOnWindowFocus,
  });
};

export const useGetCorreccionTeleventas = (
  uuid: string,
  refetchOnWindowFocus = false,
) => {
  return useQuery({
    queryKey: [TeleventasTSQEnum.TELEVENTA, uuid],
    queryFn: () => getCorreccionTeleventas(uuid),
    retry: false,
    refetchOnWindowFocus,
  });
};

export const useCreateTeleventas = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnError,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateTeleventasParams<T>) => createTeleventas(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TeleventasTSQEnum.TELEVENTAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Televentas creada correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      if (customOnError) {
        customOnError(error);
        return;
      }
      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const useUpdateTeleventas = <T>({
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
    mutationFn: (params: UpdateTeleventasParams<T>) => updateTeleventas(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TeleventasTSQEnum.TELEVENTAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Televentas actualizada correctamente',
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
export type GetTeleventasParams = Partial<Televentas> &
  PagingPartialParams & {
    correcciones_aceptacion_pendientes?: boolean;
    por_agendar?: boolean;
  };
export type CreateTeleventasParams<T> = T;
export type CreateTeleventasParamsBase = Omit<Televentas, 'id'>;
export interface UpdateTeleventasParams<T> {
  id: number;
  data: T;
}

export const getTeleventas = async (params?: GetTeleventasParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<TeleventasPaginatedRes>(`/leed-televenta/?${queryParams}`, true);
};

export const getTeleventa = async (uuid: string) => {
  try {
    return await get<Televentas>(`/leed-televenta/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getCorreccionTeleventas = async (uuid: string) => {
  try {
    return await get<Televentas>(
      `/leed-televenta/pending-correction/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTeleventas = async <T>(data: CreateTeleventasParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Televentas>('/leed-televenta/', data, true);
};

export const updateTeleventas = async <T>({
  id,
  data,
}: UpdateTeleventasParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Televentas>(`/leed-televenta/${id}/`, data, true);
};

// request unlock OT

export type CancelAgendaTeleventasData = Pick<
  Televentas,
  'motivo_rechazo' | 'observacion_cancelacion'
>;

export type CorreccionDocumentsTeleventasData = Pick<
  Televentas,
  'url_foto_cedula_frontal_corregida' | 'url_foto_aceptacion_corregida'
>;

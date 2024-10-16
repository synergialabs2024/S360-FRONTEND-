import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  TipoInstalacion,
  TipoInstalacionesPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum TipoInstalacionTSQEnum {
  TIPOINSTALACIONES = 'tipo-instalaciones',
  TIPOINSTALACION = 'tipo-instalacion',
}

///* tanStack query
export const useFetchTipoInstalaciones = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTipoInstalacionesParams>) => {
  return useQuery({
    queryKey: [
      TipoInstalacionTSQEnum.TIPOINSTALACIONES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getTipoInstalaciones(params),
    enabled: enabled,
  });
};

export const useGetTipoInstalacion = (uuid: string) => {
  return useQuery({
    queryKey: [TipoInstalacionTSQEnum.TIPOINSTALACION, uuid],
    queryFn: () => getTipoInstalacion(uuid),
    retry: false,
  });
};

export const useCreateTipoInstalacion = ({
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
    mutationFn: createTipoInstalacion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TipoInstalacionTSQEnum.TIPOINSTALACIONES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Tipo Instalacion creado correctamente',
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

export const useUpdateTipoInstalacion = <T>({
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
    mutationFn: (params: UpdateTipoInstalacionParams<T>) =>
      updateTipoInstalacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TipoInstalacionTSQEnum.TIPOINSTALACIONES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Tipo Instalacion actualizado correctamente',
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
export type GetTipoInstalacionesParams = Partial<TipoInstalacion> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateTipoInstalacionParams = Omit<TipoInstalacion, 'id'>;
export interface UpdateTipoInstalacionParams<T> {
  id: number;
  data: T;
}

export const getTipoInstalaciones = async (
  params?: GetTipoInstalacionesParams,
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
  return get<TipoInstalacionesPaginatedRes>(
    `/tipo-instalacion/?${queryParams}`,
    true,
  );
};

export const getTipoInstalacion = async (uuid: string) => {
  try {
    return await get<TipoInstalacion>(`/tipo-instalacion/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTipoInstalacion = async (
  data: CreateTipoInstalacionParams,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<TipoInstalacion>('/tipo-instalacion/', data, true);
};

export const updateTipoInstalacion = async <T>({
  id,
  data,
}: UpdateTipoInstalacionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<TipoInstalacion>(`/tipo-instalacion/${id}/`, data, true);
};

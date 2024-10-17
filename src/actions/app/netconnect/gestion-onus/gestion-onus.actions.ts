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
  GestionOnu,
  GestionOnusPaginatedRes,
} from '@/shared/interfaces/app/netconnect';

const { get, post, patch } = erpAPI();

export enum GestionONUTSQEnum {
  GESTIONONUS = 'gestion-onus',
  GESTIONONU = 'gestion-onu',
}
///* tanStack query ---------------
export const useFetchGestionOnus = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetGestionOnusParams>) => {
  return useQuery({
    queryKey: [GestionONUTSQEnum.GESTIONONUS, ...Object.values(params || {})],
    queryFn: () => getGestionOnus(params),
    enabled: enabled,
  });
};

export const useGetGestionOnu = (uuid: string) => {
  return useQuery({
    queryKey: [GestionONUTSQEnum.GESTIONONU, uuid],
    queryFn: () => getGestionOnu(uuid),
    retry: false,
  });
};

export const useCreateGestionOnu = <T>({
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
    mutationFn: (params: CreateGestionOnuParams<T>) => createGestionOnu(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GestionONUTSQEnum.GESTIONONU],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Gestion de ONUs creado correctamente',
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

export const useUpdateGestionOnu = <T>({
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
    mutationFn: (params: UpdateGestionOnuParams<T>) => updateGestionOnu(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GestionONUTSQEnum.GESTIONONUS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Gestion de ONUs actualizado correctamente',
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
export type GetGestionOnusParams = Partial<GestionOnu> & PagingPartialParams;
export type CreateGestionOnuParams<T> = T;
export type CreateGestionOnuParamsBase = Omit<GestionOnu, 'id'>;
export interface UpdateGestionOnuParams<T> {
  id: number;
  data: T;
}

export const getGestionOnus = async (params?: GetGestionOnusParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<GestionOnusPaginatedRes>(`/gestion-onu/?${queryParams}`, true);
};

export const getGestionOnu = async (uuid: string) => {
  try {
    return await get<GestionOnu>(`/gestion-onu/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createGestionOnu = async <T>(data: CreateGestionOnuParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<GestionOnu>('/gestion-onu/', data, true);
};

export const updateGestionOnu = async <T>({
  id,
  data,
}: UpdateGestionOnuParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<GestionOnu>(`/gestion-onu/${id}/`, data, true);
};

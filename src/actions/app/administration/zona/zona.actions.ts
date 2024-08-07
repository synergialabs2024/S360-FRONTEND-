import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  UseFetchEnabledParams,
  UseMutationParams,
  Zona,
  ZonasPaginatedRes,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ZonaTSQEnum {
  ZONAS = 'zonas',
  ZONA = 'zona',
}
///* tanStack query ---------------
export const useFetchZonas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetZonasParams>) => {
  return useQuery({
    queryKey: [ZonaTSQEnum.ZONAS, ...Object.values(params || {})],
    queryFn: () => getZonas(params),
    enabled: enabled,
  });
};

export const useGetZona = (uuid: string) => {
  return useQuery({
    queryKey: ['zona', uuid],
    queryFn: () => getZona(uuid),
    retry: false,
  });
};

export const useCreateZona = ({
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
    mutationFn: createZona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zonas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(customMessageToast || 'Zona creado correctamente');
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

export const useUpdateZona = <T>({
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
    mutationFn: (params: UpdateZonaParams<T>) => updateZona(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zonas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Zona actualizado correctamente',
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
export type GetZonasParams = Partial<Zona> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateZonaParams = Omit<Zona, 'id'>;
export interface UpdateZonaParams<T> {
  id: number;
  data: T;
}

export const getZonas = async (params?: GetZonasParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ZonasPaginatedRes>(`/zona/?${queryParams}`, true);
};

export const getZona = async (uuid: string) => {
  try {
    return await get<Zona>(`/zona/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createZona = async (data: CreateZonaParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Zona>('/zona/', data, true);
};

export const updateZona = async <T>({ id, data }: UpdateZonaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Zona>(`/zona/${id}/`, data, true);
};

import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import { UseFetchEnabledParams, UseMutationParams } from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import {
  VentaConvenio,
  VentaConvenioPaginatedRes,
} from '@/shared/interfaces/app/cartera';

const { get, post, patch } = erpAPI();

export enum VentaConvenioTSQEnum {
  AREAS = 'ventaconvenios',
  AREA = 'ventaconvenio',
}

///* tanStack query ---------------
export const useFetchVentaConvenios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetVentaConvenioParams>) => {
  return useQuery({
    queryKey: [VentaConvenioTSQEnum.AREAS, ...Object.values(params || {})],
    queryFn: () => getVentaConvenios(params),
    enabled: enabled,
  });
};

export const useGetVentaConvenio = (uuid: string) => {
  return useQuery({
    queryKey: ['ventaconvenio', uuid],
    queryFn: () => getVentaConvenio(uuid),
    retry: false,
  });
};

export const useCreateVentaConvenio = ({
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
    mutationFn: createVentaConvenio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ventaconvenios'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'VentaConvenio creado correctamente',
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

export const useUpdateVentaConvenio = <T>({
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
    mutationFn: (params: UpdateVentaConvenioParams<T>) =>
      updateVentaConvenio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ventaconvenios'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'VentaConvenio actualizado correctamente',
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
export type GetVentaConvenioParams = Partial<VentaConvenio> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateVentaConvenioParams = Omit<VentaConvenio, 'id'>;
export interface UpdateVentaConvenioParams<T> {
  id: number;
  data: T;
}

export const getVentaConvenios = async (params?: GetVentaConvenioParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<VentaConvenioPaginatedRes>(
    `/solicitud-servicio-convenio/?${queryParams}`,
    true,
  );
};

export const getVentaConvenio = async (uuid: string) => {
  try {
    return await get<VentaConvenio>(
      `/solicitud-servicio-convenio/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createVentaConvenio = async (data: CreateVentaConvenioParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<VentaConvenio>('/solicitud-servicio-convenio/', data, true);
};

export const updateVentaConvenio = async <T>({
  id,
  data,
}: UpdateVentaConvenioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<VentaConvenio>(
    `/solicitud-servicio-convenio/${id}/`,
    data,
    true,
  );
};

import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  OrdenTrabajo,
  OrdenesTrabajoPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum OrdenTrabajoTSQEnum {
  ORDENTRABAJOS = 'orden-trabajos',
  ORDENTRABAJO = 'orden-trabajo',
}
///* tanStack query ---------------
export const useFetchOrdenTrabajos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetOrdenTrabajosParams>) => {
  return useQuery({
    queryKey: [
      OrdenTrabajoTSQEnum.ORDENTRABAJOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getOrdenTrabajos(params),
    enabled: enabled,
  });
};

export const useGetOrdenTrabajo = (uuid: string) => {
  return useQuery({
    queryKey: [OrdenTrabajoTSQEnum.ORDENTRABAJO, uuid],
    queryFn: () => getOrdenTrabajo(uuid),
    retry: false,
  });
};

export const useCreateOrdenTrabajo = <T>({
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
    mutationFn: (params: CreateOrdenTrabajoParams<T>) =>
      createOrdenTrabajo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OrdenTrabajoTSQEnum.ORDENTRABAJOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'OrdenTrabajo creado correctamente',
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

export const useUpdateOrdenTrabajo = <T>({
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
    mutationFn: (params: UpdateOrdenTrabajoParams<T>) =>
      updateOrdenTrabajo(params),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [OrdenTrabajoTSQEnum.ORDENTRABAJOS],
      });
      customOnSuccess && customOnSuccess(res?.data);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'OrdenTrabajo actualizado correctamente',
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
export type GetOrdenTrabajosParams = Partial<OrdenTrabajo> &
  PagingPartialParams & {
    // helpers
    is_recoordinada?: boolean;
    identificacion?: string;

    // filter tecnico (only for tecnico)
    oneAtTime?: boolean;
  };
export type CreateOrdenTrabajoParams<T> = T;
export type CreateOrdenTrabajoParamsBase = Omit<OrdenTrabajo, 'id'>;
export type UpdateSerieOnt = Partial<OrdenTrabajo> & {
  new_serie_ont: string;
};
export interface UpdateOrdenTrabajoParams<T> {
  id: number;
  data: T;
}

export const getOrdenTrabajos = async (params?: GetOrdenTrabajosParams) => {
  const stateParams = { ...params };

  // filter by state
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<OrdenesTrabajoPaginatedRes>(
    `/orden-trabajo/?${queryParams}`,
    true,
  );
};

export const getOrdenTrabajo = async (uuid: string) => {
  try {
    return await get<OrdenTrabajo>(`/orden-trabajo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createOrdenTrabajo = async <T>(
  data: CreateOrdenTrabajoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<OrdenTrabajo>('/orden-trabajo/', data, true);
};

export const updateOrdenTrabajo = async <T>({
  id,
  data,
}: UpdateOrdenTrabajoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<OrdenTrabajo>(`/orden-trabajo/${id}/`, data, true);
};

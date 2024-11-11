import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  LineaServicio,
  LineasServicioPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum LineaServicioTSQEnum {
  LINEASERVICIOS = 'linea-servicios',
  LINEASERVICIO = 'linea-servicio',
}
///* tanStack query ---------------
export const useFetchLineaServicios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetLineaServiciosParams>) => {
  return useQuery({
    queryKey: [
      LineaServicioTSQEnum.LINEASERVICIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getLineaServicios(params),
    enabled: enabled,
  });
};

export const useGetLineaServicio = (uuid: string) => {
  return useQuery({
    queryKey: [LineaServicioTSQEnum.LINEASERVICIO, uuid],
    queryFn: () => getLineaServicio(uuid),
    retry: false,
  });
};

export const useCreateLineaServicio = <T>({
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
    mutationFn: (params: CreateLineaServicioParams<T>) =>
      createLineaServicio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LineaServicioTSQEnum.LINEASERVICIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'LineaServicio creado correctamente',
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

export const useUpdateLineaServicio = <T>({
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
    mutationFn: (params: UpdateLineaServicioParams<T>) =>
      updateLineaServicio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LineaServicioTSQEnum.LINEASERVICIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'LineaServicio actualizado correctamente',
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
export type GetLineaServiciosParams = Partial<LineaServicio> &
  PagingPartialParams;
export type CreateLineaServicioParams<T> = T;
export type CreateLineaServicioParamsBase = Omit<LineaServicio, 'id'>;
export interface UpdateLineaServicioParams<T> {
  id: number;
  data: T;
}

export const getLineaServicios = async (params?: GetLineaServiciosParams) => {
  const stateParams = { ...params };

  // filter by state
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<LineasServicioPaginatedRes>(
    `/linea-servicio/?${queryParams}`,
    true,
  );
};

export const getLineaServicio = async (uuid: string) => {
  try {
    return await get<LineaServicio>(`/linea-servicio/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createLineaServicio = async <T>(
  data: CreateLineaServicioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<LineaServicio>('/linea-servicio/', data, true);
};

export const updateLineaServicio = async <T>({
  id,
  data,
}: UpdateLineaServicioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<LineaServicio>(`/linea-servicio/${id}/`, data, true);
};

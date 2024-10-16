import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  UbicacionProducto,
  UbicacionProductoPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum UbicacionProductoTSQEnum {
  UBICACIONPRODUCTOS = 'ubicacion-productos',
  UBICACIONPRODUCTO = 'ubicacion-producto',
}
///* tanStack query ---------------
export const useFetchUbicacionProductos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetUbicacionProductosParams>) => {
  return useQuery({
    queryKey: [
      UbicacionProductoTSQEnum.UBICACIONPRODUCTOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getUbicacionProductos(params),
    enabled: enabled,
  });
};

export const useGetUbicacionProducto = (uuid: string) => {
  return useQuery({
    queryKey: [UbicacionProductoTSQEnum.UBICACIONPRODUCTO, uuid],
    queryFn: () => getUbicacionProducto(uuid),
    retry: false,
  });
};

export const useCreateUbicacionProducto = <T>({
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
    mutationFn: (params: CreateUbicacionProductoParams<T>) =>
      createUbicacionProducto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [UbicacionProductoTSQEnum.UBICACIONPRODUCTOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'UbicacionProducto creado correctamente',
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

export const useUpdateUbicacionProducto = <T>({
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
    mutationFn: (params: UpdateUbicacionProductoParams<T>) =>
      updateUbicacionProducto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [UbicacionProductoTSQEnum.UBICACIONPRODUCTOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'UbicacionProducto actualizado correctamente',
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
export type GetUbicacionProductosParams = Partial<UbicacionProducto> &
  PagingPartialParams & {
    producto__nombre?: string;
    producto__codigo?: string;
    producto__es_para_venta?: boolean;
    producto__categoria__uuid?: string;
    bodega__nombre?: string;
    bodega__codigo?: string;
    bodega__centro_costo__pk?: number;
    bodega__centro_costo__nombre?: string;
  };
export type CreateUbicacionProductoParams<T> = T;
export type CreateUbicacionProductoParamsBase = Omit<UbicacionProducto, 'id'>;
export interface UpdateUbicacionProductoParams<T> {
  id: number;
  data: T;
}

export const getUbicacionProductos = async (
  params?: GetUbicacionProductosParams,
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
  return get<UbicacionProductoPaginatedRes>(
    `/ubicacion-producto/?${queryParams}`,
    true,
  );
};

export const getUbicacionProducto = async (uuid: string) => {
  try {
    return await get<UbicacionProducto>(`/ubicacion-producto/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createUbicacionProducto = async <T>(
  data: CreateUbicacionProductoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<UbicacionProducto>('/ubicacion-producto/', data, true);
};

export const updateUbicacionProducto = async <T>({
  id,
  data,
}: UpdateUbicacionProductoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<UbicacionProducto>(`/ubicacion-producto/${id}/`, data, true);
};

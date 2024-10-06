import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Producto,
  ProductosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ProductoTSQEnum {
  PRODUCTOS = 'productos',
  PRODUCTO = 'producto',
}
///* tanStack query ---------------
export const useFetchProductos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetProductosParams>) => {
  return useQuery({
    queryKey: [ProductoTSQEnum.PRODUCTOS, ...Object.values(params || {})],
    queryFn: () => getProductos(params),
    enabled: enabled,
  });
};

export const useGetProducto = (uuid: string) => {
  return useQuery({
    queryKey: [ProductoTSQEnum.PRODUCTO, uuid],
    queryFn: () => getProducto(uuid),
    retry: false,
  });
};

export const useCreateProducto = <T>({
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
    mutationFn: (params: CreateProductoParams<T>) => createProducto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductoTSQEnum.PRODUCTOS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Producto creado correctamente',
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

export const useUpdateProducto = <T>({
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
    mutationFn: (params: UpdateProductoParams<T>) => updateProducto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductoTSQEnum.PRODUCTOS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Producto actualizado correctamente',
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
export type GetProductosParams = Partial<Producto> & PagingPartialParams;
export type CreateProductoParams<T> = T;
export type CreateProductoParamsBase = Omit<Producto, 'id'>;
export interface UpdateProductoParams<T> {
  id: number;
  data: T;
}

export const getProductos = async (params?: GetProductosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ProductosPaginatedRes>(`/producto/?${queryParams}`, true);
};

export const getProducto = async (uuid: string) => {
  try {
    return await get<Producto>(`/producto/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createProducto = async <T>(data: CreateProductoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Producto>('/producto/', data, true);
};

export const updateProducto = async <T>({
  id,
  data,
}: UpdateProductoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Producto>(`/producto/${id}/`, data, true);
};

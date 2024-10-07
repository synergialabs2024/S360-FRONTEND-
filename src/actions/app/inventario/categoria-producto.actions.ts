import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  CategoriaProducto,
  CategoriasProductoPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum CategoriaProductoTSQEnum {
  CATEGORIAPRODUCTOS = 'categoria-productos',
  CATEGORIAPRODUCTO = 'categoria-producto',
}
///* tanStack query ---------------
export const useFetchCategoriaProductos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCategoriaProductosParams>) => {
  return useQuery({
    queryKey: [
      CategoriaProductoTSQEnum.CATEGORIAPRODUCTOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getCategoriaProductos(params),
    enabled: enabled,
  });
};

export const useGetCategoriaProducto = (uuid: string) => {
  return useQuery({
    queryKey: [CategoriaProductoTSQEnum.CATEGORIAPRODUCTO, uuid],
    queryFn: () => getCategoriaProducto(uuid),
    retry: false,
  });
};

export const useCreateCategoriaProducto = <T>({
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
    mutationFn: (params: CreateCategoriaProductoParams<T>) =>
      createCategoriaProducto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CategoriaProductoTSQEnum.CATEGORIAPRODUCTOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Categoría de Producto creado correctamente',
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

export const useUpdateCategoriaProducto = <T>({
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
    mutationFn: (params: UpdateCategoriaProductoParams<T>) =>
      updateCategoriaProducto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CategoriaProductoTSQEnum.CATEGORIAPRODUCTOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Categoría de Producto actualizado correctamente',
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
export type GetCategoriaProductosParams = Partial<CategoriaProducto> &
  PagingPartialParams;
export type CreateCategoriaProductoParams<T> = T;
export type CreateCategoriaProductoParamsBase = Omit<CategoriaProducto, 'id'>;
export interface UpdateCategoriaProductoParams<T> {
  id: number;
  data: T;
}

export const getCategoriaProductos = async (
  params?: GetCategoriaProductosParams,
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
  return get<CategoriasProductoPaginatedRes>(
    `/categoria-producto/?${queryParams}`,
    true,
  );
};

export const getCategoriaProducto = async (uuid: string) => {
  try {
    return await get<CategoriaProducto>(`/categoria-producto/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCategoriaProducto = async <T>(
  data: CreateCategoriaProductoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CategoriaProducto>('/categoria-producto/', data, true);
};

export const updateCategoriaProducto = async <T>({
  id,
  data,
}: UpdateCategoriaProductoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CategoriaProducto>(`/categoria-producto/${id}/`, data, true);
};

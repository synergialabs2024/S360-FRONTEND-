import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  getUrlParams,
  ModeloInventario,
  ModelosInventarioPaginatedRes,
  PagingPartialParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ModeloInventarioTSQEnum {
  MODELOINVENTARIOS = 'modelo-inventarios',
  MODELOINVENTARIO = 'modelo-inventario',
}

///* tanStack query ---------------
export const useFetchModeloInventarios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetModeloInventarioParams>) => {
  return useQuery({
    queryKey: [
      ModeloInventarioTSQEnum.MODELOINVENTARIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getModeloInventarios(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetModeloInventario = (uuid: string) => {
  return useQuery({
    queryKey: [ModeloInventarioTSQEnum.MODELOINVENTARIO, uuid],
    queryFn: () => getModeloInventario(uuid),
    retry: false,
  });
};

export const useCreateModeloInventario = <T>({
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
    mutationFn: (params: CreateModeloInventarioParams<T>) =>
      createModeloInventario(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ModeloInventarioTSQEnum.MODELOINVENTARIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Modelo Inventario creado correctamente',
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

export const useUpdateModeloInventario = <T>({
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
    mutationFn: (params: UpdateModeloInventarioParams<T>) =>
      updateModeloInventario(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ModeloInventarioTSQEnum.MODELOINVENTARIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Modelo Inventario actualizado correctamente',
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
export type GetModeloInventarioParams = Partial<ModeloInventario> &
  PagingPartialParams;
export type CreateModeloInventarioParams<T> = T;
export type CreateModeloInventarioParamsBase = Omit<ModeloInventario, 'id'>;
export interface UpdateModeloInventarioParams<T> {
  id: number;
  data: T;
}

export const getModeloInventarios = async (
  params?: GetModeloInventarioParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<ModelosInventarioPaginatedRes>(
    `/modelo_inventario/?${queryParams}`,
    true,
  );
};

export const getModeloInventario = async (uuid: string) => {
  try {
    return await get<ModeloInventario>(`/modelo_inventario/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createModeloInventario = async <T>(
  data: CreateModeloInventarioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<ModeloInventario>('/modelo_inventario/', data, true);
};

export const updateModeloInventario = async <T>({
  id,
  data,
}: UpdateModeloInventarioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ModeloInventario>(`/modelo_inventario/${id}/`, data, true);
};

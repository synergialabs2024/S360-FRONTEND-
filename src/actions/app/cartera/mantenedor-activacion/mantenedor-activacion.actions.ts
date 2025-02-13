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
  MantenedorActivacion,
  MantenedorActivacionPaginatedRes,
} from '@/shared/interfaces/app/cartera/mantenedor-activaciones/mantenedor-activacion.interface';

const { get, post, patch } = erpAPI();

export enum MantenedorActivacionesTSQEnum {
  MANTENEDORACTIVACIONES = 'mantenedor-activaciones',
  MANTENEDORACTIVACION = 'mantenedor-activacion',
}
///* tanStack query ---------------
export const useFetchMantenedorActivaciones = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMantenedorActivacionesParams>) => {
  return useQuery({
    queryKey: [
      MantenedorActivacionesTSQEnum.MANTENEDORACTIVACIONES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMantenedorActivaciones(params),
    enabled: enabled,
  });
};

export const useGetMantenedorActivacion = (uuid: string) => {
  return useQuery({
    queryKey: [MantenedorActivacionesTSQEnum.MANTENEDORACTIVACION, uuid],
    queryFn: () => getMantenedorActivacion(uuid),
    retry: false,
  });
};

export const useCreateMantenedorActivacion = <T>({
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
    mutationFn: (params: CreateMantenedorActivacionParams<T>) =>
      createMantenedorActivacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MantenedorActivacionesTSQEnum.MANTENEDORACTIVACIONES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Activacion creada correctamente',
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

export const useUpdateMantenedorActivacion = <T>({
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
    mutationFn: (params: UpdateMantenedorActivacionParams<T>) =>
      updateMantenedorActivacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MantenedorActivacionesTSQEnum.MANTENEDORACTIVACIONES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Activacion actualizada correctamente',
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
export type GetMantenedorActivacionesParams = Partial<MantenedorActivacion> &
  PagingPartialParams;
export type CreateMantenedorActivacionParams<T> = T;
export type CreateMantenedorActivacionParamsBase = Omit<
  MantenedorActivacion,
  'id'
>;
export interface UpdateMantenedorActivacionParams<T> {
  id: number;
  data: T;
}

export const getMantenedorActivaciones = async (
  params?: GetMantenedorActivacionesParams,
) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<MantenedorActivacionPaginatedRes>(
    `/mantenedor-activacion/?${queryParams}`,
    true,
  );
};

export const getMantenedorActivacion = async (uuid: string) => {
  try {
    return await get<MantenedorActivacion>(
      `/mantenedor-activacion/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMantenedorActivacion = async <T>(
  data: CreateMantenedorActivacionParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MantenedorActivacion>('/mantenedor-activacion/', data, true);
};

export const updateMantenedorActivacion = async <T>({
  id,
  data,
}: UpdateMantenedorActivacionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MantenedorActivacion>(
    `/mantenedor-activacion/${id}/`,
    data,
    true,
  );
};

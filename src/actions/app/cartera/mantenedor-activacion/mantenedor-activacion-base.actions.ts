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
  MantenedorActivacionBase,
  MantenedorActivacionBasePaginatedRes,
} from '@/shared/interfaces/app/cartera/mantenedor-activaciones';

const { get, post, patch } = erpAPI();

export enum MantenedorActivacionesTSQEnum {
  MANTENEDORACTIVACIONESBASE = 'mantenedor-activaciones-base',
  MANTENEDORACTIVACIONBASE = 'mantenedor-activacion-base',
}
///* tanStack query ---------------
export const useFetchMantenedorActivacionesBase = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMantenedorActivacionesBaseParams>) => {
  return useQuery({
    queryKey: [
      MantenedorActivacionesTSQEnum.MANTENEDORACTIVACIONESBASE,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMantenedorActivacionesBase(params),
    enabled: enabled,
  });
};

export const useGetMantenedorActivacionBase = (uuid: string) => {
  return useQuery({
    queryKey: [MantenedorActivacionesTSQEnum.MANTENEDORACTIVACIONBASE, uuid],
    queryFn: () => getMantenedorActivacionBase(uuid),
    retry: false,
  });
};

export const useCreateMantenedorActivacionBase = <T>({
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
    mutationFn: (params: CreateMantenedorActivacionBaseParams<T>) =>
      createMantenedorActivacionBase(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MantenedorActivacionesTSQEnum.MANTENEDORACTIVACIONESBASE],
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

export const useUpdateMantenedorActivacionBase = <T>({
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
    mutationFn: (params: UpdateMantenedorActivacionBaseParams<T>) =>
      updateMantenedorActivacionBase(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MantenedorActivacionesTSQEnum.MANTENEDORACTIVACIONESBASE],
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
export type GetMantenedorActivacionesBaseParams =
  Partial<MantenedorActivacionBase> & PagingPartialParams;
export type CreateMantenedorActivacionBaseParams<T> = T;
export type CreateMantenedorActivacionBaseParamsBase = Omit<
  MantenedorActivacionBase,
  'id'
>;
export interface UpdateMantenedorActivacionBaseParams<T> {
  id: number;
  data: T;
}

export const getMantenedorActivacionesBase = async (
  params?: GetMantenedorActivacionesBaseParams,
) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<MantenedorActivacionBasePaginatedRes>(
    `/mantenedor-activacion-base/?${queryParams}`,
    true,
  );
};

export const getMantenedorActivacionBase = async (uuid: string) => {
  try {
    return await get<MantenedorActivacionBase>(
      `/mantenedor-activacion-base/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMantenedorActivacionBase = async <T>(
  data: CreateMantenedorActivacionBaseParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MantenedorActivacionBase>(
    '/mantenedor-activacion-base/',
    data,
    true,
  );
};

export const updateMantenedorActivacionBase = async <T>({
  id,
  data,
}: UpdateMantenedorActivacionBaseParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MantenedorActivacionBase>(
    `/mantenedor-activacion-base/${id}/`,
    data,
    true,
  );
};

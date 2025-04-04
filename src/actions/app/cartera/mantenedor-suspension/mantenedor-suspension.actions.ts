import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  MantenedorSuspension,
  MantenedorSuspensionPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum MantenedorSuspensionesTSQEnum {
  MANTENEDORSUSPENSIONES = 'mantenedor-suspensiones',
  MANTENEDORSUSPENSION = 'mantenedor-suspension',
}
///* tanStack query ---------------
export const useFetchMantenedorSuspensiones = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMantenedorSuspensionesParams>) => {
  return useQuery({
    queryKey: [
      MantenedorSuspensionesTSQEnum.MANTENEDORSUSPENSIONES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMantenedorSuspensiones(params),
    enabled: enabled,
  });
};

export const useGetMantenedorSuspension = (uuid: string) => {
  return useQuery({
    queryKey: [MantenedorSuspensionesTSQEnum.MANTENEDORSUSPENSION, uuid],
    queryFn: () => getMantenedorSuspension(uuid),
    retry: false,
  });
};

export const useCreateMantenedorSuspension = <T>({
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
    mutationFn: (params: CreateMantenedorSuspensionParams<T>) =>
      createMantenedorSuspension(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MantenedorSuspensionesTSQEnum.MANTENEDORSUSPENSIONES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Suspension creada correctamente',
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

export const useUpdateMantenedorSuspension = <T>({
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
    mutationFn: (params: UpdateMantenedorSuspensionParams<T>) =>
      updateMantenedorSuspension(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MantenedorSuspensionesTSQEnum.MANTENEDORSUSPENSIONES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Suspension actualizada correctamente',
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
export type GetMantenedorSuspensionesParams = Partial<MantenedorSuspension> &
  PagingPartialParams;
export type CreateMantenedorSuspensionParams<T> = T;
export type CreateMantenedorSuspensionParamsBase = Omit<
  MantenedorSuspension,
  'id'
>;
export interface UpdateMantenedorSuspensionParams<T> {
  id: number;
  data: T;
}

export const getMantenedorSuspensiones = async (
  params?: GetMantenedorSuspensionesParams,
) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<MantenedorSuspensionPaginatedRes>(
    `/mantenedor-suspension/?${queryParams}`,
    true,
  );
};

export const getMantenedorSuspension = async (uuid: string) => {
  try {
    return await get<MantenedorSuspension>(
      `/mantenedor-suspension/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMantenedorSuspension = async <T>(
  data: CreateMantenedorSuspensionParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MantenedorSuspension>('/mantenedor-suspension/', data, true);
};

export const updateMantenedorSuspension = async <T>({
  id,
  data,
}: UpdateMantenedorSuspensionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MantenedorSuspension>(
    `/mantenedor-suspension/${id}/`,
    data,
    true,
  );
};

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getUrlParams,
  ToastWrapper,
  LeedTeleventa,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  LeedTeleventaPaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/shared/axios/erp-api';
import { handleAxiosError } from '@/shared/axios/axios.utils';

const { get, post, patch } = erpAPI();

export enum LeedteleventaTSQEnum {
  LEEDTELEVENTAS = 'leed-televentas',
  LEEDTELEVENTA = 'leed-televenta',
}

///* tanStack query ---------------
export const useFetchLeedteleventas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetLeedTeleventasParams>) => {
  return useQuery({
    queryKey: [
      LeedteleventaTSQEnum.LEEDTELEVENTAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getLeedTeleventas(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetLeedteleventa = (uuid: string) => {
  return useQuery({
    queryKey: [LeedteleventaTSQEnum.LEEDTELEVENTA, uuid],
    queryFn: () => getLeedteleventa(uuid),
    retry: false,
  });
};

export const useCreateLeedteleventa = <T>({
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
    mutationFn: (params: CreateLeedTeleventaParams<T>) =>
      createLeedTeleventa(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LeedteleventaTSQEnum.LEEDTELEVENTAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Leedteleventas creado correctamente',
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

export const useUpdateLeedteleventa = <T>({
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
    mutationFn: (params: UpdateLeedTeleventaParams<T>) =>
      updateLeedteleventa(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LeedteleventaTSQEnum.LEEDTELEVENTAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Leedteleventas actualizado correctamente',
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

export const useUpdateLeedteleventaTakeOne = ({
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
    mutationFn: (params: UpdateLeedTeleventaTakeOneParams) =>
      updateLeedteleventaTakeOne(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LeedteleventaTSQEnum.LEEDTELEVENTAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Alquiler cancelado correctamente',
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
export type GetLeedTeleventasParams = Partial<LeedTeleventa> &
  PagingPartialParams;
export type CreateLeedTeleventaParams<T> = T;
export type CreateLeedTeleventaParamsBase = Omit<LeedTeleventa, 'id'>;
export interface UpdateLeedTeleventaParams<T> {
  id: number;
  data: T;
}
export interface UpdateLeedTeleventaTakeOneParams {
  id: number;
}

export const getLeedTeleventas = async (params?: GetLeedTeleventasParams) => {
  const stateParams = { ...params };
  const queryParams = getUrlParams(stateParams);
  return get<LeedTeleventaPaginatedRes>(
    `/leed-televenta/?${queryParams}`,
    true,
  );
};

export const getLeedteleventa = async (uuid: string) => {
  try {
    return await get<LeedTeleventa>(`/leed-televenta/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createLeedTeleventa = async <T>(
  data: CreateLeedTeleventaParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<LeedTeleventa>('/leed-televenta/', data, true);
};

export const updateLeedteleventa = async <T>({
  id,
  data,
}: UpdateLeedTeleventaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<LeedTeleventa>(`/leed-televenta/${id}/`, data, true);
};

export const updateLeedteleventaTakeOne = async ({
  id,
}: UpdateLeedTeleventaTakeOneParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<LeedTeleventa>(`/leed-televenta/take-one/${id}/`, { id }, true);
};

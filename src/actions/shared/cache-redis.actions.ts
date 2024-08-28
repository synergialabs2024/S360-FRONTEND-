import { useMutation, useQuery } from '@tanstack/react-query';

import {
  CacheResponse,
  handleAxiosError,
  ToastWrapper,
  UseMutationParams,
} from '@/shared';
import { erpAPI } from '@/shared/axios/erp-api';
import { ToastSeverityEnum } from '@/shared/interfaces/ui/alerts.interface';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

///* tanStack query
export const useGetCacheRedis = ({ key }: GetCacheRedisParams) => {
  return useQuery({
    queryKey: ['cache-redis', key],
    queryFn: () => getCacheRedis({ key }),
  });
};

export const useSetCacheRedis = <T>({
  customMessageToast,
  enableToast = true,
  customOnSuccess,
  customMessageSuccessSeverityToast = ToastSeverityEnum.success,

  customMessageErrorToast,
  customMessageErrorSeverityToast,
  customOnError,
}: UseMutationParams = {}) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: SetCacheRedisValue<T>) => setCacheRedis(params),
    onSuccess: res => {
      enableToast &&
        ToastWrapper[customMessageSuccessSeverityToast](
          customMessageToast || 'Cache guardado correctamente',
        );

      customOnSuccess && customOnSuccess(res);
    },
    onError: err => {
      customOnError && customOnError(err);
      handleAxiosError(
        err,
        customMessageErrorToast,
        customMessageErrorSeverityToast,
      );
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const useUpdateCacheRedis = <T>({
  customMessageToast,
  enableToast = true,
  customOnSuccess,
  customMessageSuccessSeverityToast = ToastSeverityEnum.success,

  customMessageErrorToast,
  customMessageErrorSeverityToast,
  customOnError,
}: UseMutationParams = {}) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: SetCacheRedisValue<T>) => updateCacheRedis(params),
    onSuccess: res => {
      enableToast &&
        ToastWrapper[customMessageSuccessSeverityToast](
          customMessageToast || 'Cache actualizado correctamente',
        );

      customOnSuccess && customOnSuccess(res);
    },
    onError: err => {
      customOnError && customOnError(err);
      handleAxiosError(
        err,
        customMessageErrorToast,
        customMessageErrorSeverityToast,
      );
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

///* axios
export type GetCacheRedisParams = {
  key: string;
  showErrorToast?: boolean;
};

export type SetCacheRedisValue<T> = {
  key: string;
  value: T;
};

export const getCacheRedis = async <T>({
  key,
  showErrorToast = true,
}: GetCacheRedisParams): Promise<CacheResponse<T> | null> => {
  try {
    return (await get<CacheResponse<T>>(`/cache/?key=${key}`, true)) as any;
  } catch (error) {
    showErrorToast && handleAxiosError(error);
    return null;
  }
};

export const setCacheRedis = async <T>({
  key,
  value,
}: SetCacheRedisValue<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CacheResponse<T>>(
    '/cache/',
    { data: value, key }, // it can overwrite the value if the key already exists
    true,
  );
};

// /cache/{key}/
export const updateCacheRedis = async <T>({
  key,
  value,
}: SetCacheRedisValue<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CacheResponse<T>>(`/cache/${key}/`, { data: value }, true);
};

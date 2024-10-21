import { useMutation, useQueryClient } from '@tanstack/react-query';

import { erpAPI } from '@/axios/erp-api';
import { ToastWrapper, UseMutationParams } from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useUiStore } from '@/store/ui';

const { post, patch } = erpAPI();

///* tanStack query ---------------
export const useGenericPOST = <T, R>(
  url: string,
  tSQKeyToInvalidate: string,
  {
    navigate,
    returnUrl,
    returnErrorUrl,
    customMessageToast,
    customMessageErrorToast,
    enableNavigate = true,
    enableErrorNavigate = false,
    enableToast = true,
    customOnSuccess,
    customOnError,
  }: UseMutationParams,
) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (data: T) => genericPOST<T, R>(url, data),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [tSQKeyToInvalidate],
      });
      customOnSuccess && customOnSuccess(res);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Recurso creado correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      if (customOnError) {
        customOnError(error);
        return;
      }
      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const useGenericPATCH = <T, R>(
  url: string,
  tSQKeyToInvalidate: string,
  {
    navigate,
    returnUrl,
    returnErrorUrl,
    customMessageToast,
    customMessageErrorToast,
    enableNavigate = true,
    enableErrorNavigate = false,
    enableToast = true,
    customOnSuccess,
    customOnError,
  }: UseMutationParams,
) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (data: T) => genericPATCH<T, R>({ url, data }),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [tSQKeyToInvalidate],
      });
      customOnSuccess && customOnSuccess(res);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Recurso actualizado correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      if (customOnError) {
        customOnError(error);
        return;
      }
      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

///* axios ---------------
export const genericPOST = async <T, R>(url: string, data: T) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<R>(url, data, true);
};

export type GenericPATCHProps<T> = {
  url: string;
  data: T;
};
export const genericPATCH = async <T, R>({
  url,
  data,
}: GenericPATCHProps<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<R>(url, data, true);
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError, ToastWrapper, UseMutationParams } from '@/shared';
import { erpAPI } from '@/shared/axios/erp-api';
import { useUiStore } from '@/store/ui';

///* tanStack query ---------------
export const useCreateTemporaryUploadLink = ({
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
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: createTemporaryUploadLink,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      customOnSuccess && customOnSuccess(res);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Enlace de carga temporal creado correctamente',
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
export type CreateTemporaryUploadLinkParams = {
  file_name: string;
  expiration: number; // in seconds
};

export const createTemporaryUploadLink = async (
  params: CreateTemporaryUploadLinkParams,
) => {
  const { post } = erpAPI();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  // Construir la URL de la query
  let url = `auth/generate-temporary-upload-link/?file_name=${params?.file_name}`;
  if (params?.expiration) {
    url += `&expiration=${params.expiration}`;
  }

  return post<string>(url, true, true);
};

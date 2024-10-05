import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastWrapper, UseMutationParams } from '@/shared';
import { erpAPI } from '@/shared/axios/erp-api';

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
  });
};

///* axios ---------------
export type CreateTemporaryUploadLinkParams = {
  file_name: string; // no extension is required for minios
  expiration?: number; // in seconds
};

export const createTemporaryUploadLink = async (
  params: CreateTemporaryUploadLinkParams,
) => {
  const { get } = erpAPI();

  // Construir la URL de la query
  let url = `/auth/generate-temporary-upload-link/?file_name=${params?.file_name}`;
  if (params?.expiration) {
    url += `&expiration=${params.expiration}`;
  }

  return get<string>(url);
};

import { handleAxiosError } from '@/shared/axios/axios.utils';
import axios, { AxiosRequestConfig } from 'axios';

export type FileDataFormBucket = {
  file: File;
  bucketTempLink: string;
};
export const putFileBucket = async ({
  file,
  bucketTempLink,
}: FileDataFormBucket) => {
  const contentType = file.type;

  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: bucketTempLink,
    data: file,
    headers: {
      'Content-Type': contentType,
    },
  };

  const res = await axios(config);
  return res;
};

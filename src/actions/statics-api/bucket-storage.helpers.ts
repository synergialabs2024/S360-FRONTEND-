import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import {
  handleAxiosError,
  HTTPResStatusCodeEnum,
  ToastWrapper,
  UseMutationParams,
} from '@/shared';
import {
  createTemporaryUploadLink,
  CreateTemporaryUploadLinkParams,
} from './bucket.actions';

///* tanStack query ---------------
export const useUploadFileToBucket = ({
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
  return useMutation({
    mutationFn: uploadFileToBucket,
    onSuccess: res => {
      customOnSuccess && customOnSuccess(res);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Documento cargado correctamente',
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

export type UploadFileToBucketParams = CreateTemporaryUploadLinkParams & {
  file: File;
};

export const uploadFileToBucket = async (params: UploadFileToBucketParams) => {
  const { file_name, expiration } = params;
  const fileNameKey = file_name + '_' + uuidv4();

  const tempLinkRes = await createTemporaryUploadLink({
    file_name: fileNameKey,
    expiration,
  });

  if (tempLinkRes.code !== HTTPResStatusCodeEnum.OK) {
    throw new Error('Error al obtener el enlace temporal de carga');
  }

  console.log('---------------- tempLink ----------------', tempLinkRes);

  return {
    fileNameKey,
  };
};

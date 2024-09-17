import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import {
  BucketTypeEnumChoice,
  getEnvs,
  handleAxiosError,
  HTTPResStatusCodeEnum,
  ToastWrapper,
  UseMutationParams,
} from '@/shared';
import {
  createTemporaryUploadLink,
  CreateTemporaryUploadLinkParams,
  putFileBucket,
} from './bucket.actions';

const { VITE_MINIO_ENDPOINT } = getEnvs();

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
  bucketDir: BucketTypeEnumChoice;
};

export const uploadFileToBucket = async (params: UploadFileToBucketParams) => {
  const { file_name, expiration, bucketDir } = params;
  const bucketBase = BucketTypeEnumChoice.BUCKET_BASE;
  // no requiere bucketBase xq el back lo controla, solo lo uso para formar el stream url
  const fileNameKey = bucketDir + '/' + file_name + '_' + uuidv4();

  const tempLinkRes = await createTemporaryUploadLink({
    file_name: fileNameKey,
    expiration,
  });

  if (tempLinkRes.code !== HTTPResStatusCodeEnum.OK) {
    throw new Error('Error al obtener el enlace temporal de carga');
  }

  const { data: tempUrlBucket } = tempLinkRes;

  const res = await putFileBucket({
    bucketTempLink: tempUrlBucket,
    file: params.file,
  });

  if (res.status !== HTTPResStatusCodeEnum.OK) {
    return {
      streamUlr: '',
    };
  }

  return {
    fileNameKey: VITE_MINIO_ENDPOINT + '/' + bucketBase + '/' + fileNameKey,
  };
};

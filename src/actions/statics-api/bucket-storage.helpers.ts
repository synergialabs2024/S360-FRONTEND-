import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import {
  BucketTypeEnumChoice,
  getEnvs,
  HTTPResStatusCodeEnum,
  ToastWrapper,
  UseMutationParams,
} from '@/shared';
import {
  createTemporaryUploadLink,
  CreateTemporaryUploadLinkParams,
  putFileBucket,
} from './bucket.actions';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useAuthStore } from '@/store/auth';

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

export type UploadFileToBucketReturn = {
  streamUlr: string;
};
export const uploadFileToBucket = async (
  params: UploadFileToBucketParams,
): Promise<UploadFileToBucketReturn> => {
  const schemaName = useAuthStore.getState().user?.company_data?.schema_name;
  if (!schemaName) {
    throw new Error('No se pudo obtener el schema_name del usuario');
  }

  const { file_name, expiration, bucketDir } = params;
  const bucketBase = BucketTypeEnumChoice.BUCKET_BASE;
  const fileNameKey =
    schemaName + '/' + bucketDir + '/' + file_name + '_' + uuidv4();

  const tempLinkRes = await createTemporaryUploadLink({
    file_name: fileNameKey,
    expiration,
  });

  if (tempLinkRes.code !== HTTPResStatusCodeEnum.OK || !tempLinkRes.data) {
    throw new Error('No se pudo obtener el enlace temporal de subida');
  }

  const res = await putFileBucket({
    bucketTempLink: tempLinkRes.data,
    file: params.file,
  });

  if (res.status !== HTTPResStatusCodeEnum.OK) {
    throw new Error('Falló la subida del archivo al bucket');
  }

  return {
    streamUlr: `${VITE_MINIO_ENDPOINT}/${bucketBase}/${fileNameKey}`,
  };
};

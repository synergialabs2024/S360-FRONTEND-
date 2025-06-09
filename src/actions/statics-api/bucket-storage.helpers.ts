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
  try {
    const schemaName = useAuthStore.getState().user?.company_data?.schema_name;
    if (!schemaName) {
      throw new Error('No se pudo obtener el schema_name del usuario');
    }

    const { file_name, expiration, bucketDir, file } = params;

    // Validación básica del archivo
    if (!file) {
      throw new Error('No se proporcionó un archivo válido');
    }

    const bucketBase = BucketTypeEnumChoice.BUCKET_BASE;
    const fileNameKey = `${schemaName}/${bucketDir}/${file_name}_${uuidv4()}`;

    // 1. Obtener enlace temporal
    const tempLinkRes = await createTemporaryUploadLink({
      file_name: fileNameKey,
      expiration,
    });

    if (tempLinkRes.code !== HTTPResStatusCodeEnum.OK || !tempLinkRes.data) {
      throw new Error(
        'No se pudo generar el enlace temporal para subir el archivo',
      );
    }

    const { data: tempUrlBucket } = tempLinkRes;

    // 2. Subir el archivo
    const uploadRes = await putFileBucket({
      bucketTempLink: tempUrlBucket,
      file: file,
    });

    if (uploadRes.status !== HTTPResStatusCodeEnum.OK) {
      throw new Error('Falló la subida del archivo al bucket');
    }

    // 3. Construir URL final
    const streamUrl = `${VITE_MINIO_ENDPOINT}/${bucketBase}/${fileNameKey}`;

    if (!streamUrl) {
      throw new Error('No se pudo generar la URL del archivo');
    }

    return {
      streamUlr: streamUrl,
    };
  } catch (error) {
    // Convertimos cualquier error en una excepción controlada
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error desconocido al subir el archivo';
    ToastWrapper.error(`Error al subir archivo: ${errorMessage}`);
    throw new Error(errorMessage); // Relanzamos el error para que onSave lo capture
  }
};

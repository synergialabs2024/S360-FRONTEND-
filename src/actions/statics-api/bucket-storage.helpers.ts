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
      ToastWrapper.error('Error de autenticación: schema_name no encontrado');
      return { streamUlr: '' };
    }

    const { file_name, expiration, bucketDir, file } = params;

    // Validación del archivo
    if (!file) {
      ToastWrapper.error('No se proporcionó un archivo válido para subir');
      return { streamUlr: '' };
    }

    const bucketBase = BucketTypeEnumChoice.BUCKET_BASE;
    const fileNameKey = `${schemaName}/${bucketDir}/${file_name}_${uuidv4()}`;

    // 1. Obtener enlace temporal
    const tempLinkRes = await createTemporaryUploadLink({
      file_name: fileNameKey,
      expiration,
    });

    if (tempLinkRes.code !== HTTPResStatusCodeEnum.OK || !tempLinkRes.data) {
      ToastWrapper.error('Error al generar enlace temporal para subir archivo');
      return { streamUlr: '' };
    }

    const { data: tempUrlBucket } = tempLinkRes;

    // 2. Subir el archivo
    const uploadRes = await putFileBucket({
      bucketTempLink: tempUrlBucket,
      file: file,
    });

    if (uploadRes.status !== HTTPResStatusCodeEnum.OK) {
      ToastWrapper.error('Error al subir el archivo al servidor');
      return { streamUlr: '' };
    }

    // 3. Construir URL final
    const streamUrl = `${VITE_MINIO_ENDPOINT}/${bucketBase}/${fileNameKey}`;

    if (!streamUrl) {
      ToastWrapper.error('Error al generar la URL final del archivo');
      return { streamUlr: '' };
    }

    // Validación final del string
    if (typeof streamUrl !== 'string' || streamUrl.trim().length === 0) {
      ToastWrapper.error('La URL generada no es válida');
      return { streamUlr: '' };
    }

    return {
      streamUlr: streamUrl,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
    ToastWrapper.error(`Error al subir archivo: ${errorMessage}`);
    return {
      streamUlr: '',
    };
  }
};

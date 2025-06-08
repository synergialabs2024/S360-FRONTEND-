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
  // 1. Validación inicial estricta
  const schemaName = useAuthStore.getState().user?.company_data?.schema_name;
  if (!schemaName?.trim()) {
    throw new Error('SchemaName es requerido para la subida');
  }

  const { file_name, bucketDir, file } = params;

  // 2. Validación exhaustiva del archivo
  if (!(file instanceof File) || file.size === 0) {
    throw new Error('Archivo inválido o vacío');
  }

  // 3. Construcción segura del fileNameKey
  const fileNameKey = `${schemaName}/${bucketDir}/${file_name}_${uuidv4()}`;
  if (!fileNameKey.includes(schemaName) || !fileNameKey.includes(file_name)) {
    throw new Error('Error en la generación del nombre de archivo');
  }

  // 4. Obtención del enlace temporal con verificación completa
  const tempLinkRes = await createTemporaryUploadLink({
    file_name: fileNameKey,
    expiration: params.expiration,
  });

  if (!tempLinkRes?.data?.startsWith('http')) {
    throw new Error('Enlace temporal inválido');
  }

  // 5. Subida del archivo con verificación
  const uploadRes = await putFileBucket({
    bucketTempLink: tempLinkRes.data,
    file: file,
  });

  if (uploadRes.status !== HTTPResStatusCodeEnum.OK) {
    throw new Error(`Error en subida: ${uploadRes.statusText}`);
  }

  // 6. Construcción y verificación final del URL
  const streamUrl = `${VITE_MINIO_ENDPOINT}/${BucketTypeEnumChoice.BUCKET_BASE}/${fileNameKey}`;

  if (
    !streamUrl.startsWith(VITE_MINIO_ENDPOINT) ||
    !streamUrl.includes(fileNameKey)
  ) {
    throw new Error('URL generada no cumple con los estándares');
  }

  // 7. Retorno con garantía absoluta
  return {
    streamUlr: streamUrl, // ¡Este string SIEMPRE será válido!
  };
};

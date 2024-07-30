import { createFileDocument } from '@/actions/statics-api';
import { handleAxiosError } from '@/shared/axios';
import { FileDocument, Nullable } from '@/shared/interfaces';
import { useUiStore } from '@/store/ui';

export type UploadFileParams = {
  imageFile: File;
  fileName: string;
  fileFolder?: string;
};

export const uploadFileUtils = async ({
  imageFile,
  fileName,
  fileFolder,
}: UploadFileParams): Promise<Nullable<FileDocument>> => {
  if (!imageFile) return null;
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  try {
    const res = await createFileDocument({
      file: imageFile,
      name: fileName,
      directory: fileFolder,
    });
    if (!res) return null;

    return {
      ...res.data,
    };
  } catch (error) {
    handleAxiosError(error);
    return null;
  } finally {
    setIsGlobalLoading(false);
  }
};

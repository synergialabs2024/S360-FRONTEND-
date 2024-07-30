import { useMutation, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  FileDocument,
  FileDocumentsPaginatedRes,
  PagingPartialParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { useUiStore } from '@/store/ui';

const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

///* tanStack query ---------------
export const useCreateFileDocument = ({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
}: UseMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFileDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
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

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

///* axios ---------------
export type GetFilesParams = Partial<FileDocument> & PagingPartialParams & {};
export type FileDataForm = {
  file: File;
  name: string;
  directory?: string;
};
export type UpdateFileDocumentParams = FileDocument & {};

export const getFiles = async (params?: GetFilesParams) => {
  const { get } = erpAPI({ isStorageApi: true });
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    stateParams.state = false;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<FileDocumentsPaginatedRes>(`/file/?${queryParams}`, false);
};

export const getFile = async (uuid: string) => {
  const { get } = erpAPI({ isStorageApi: true });
  try {
    return await get<FileDocument>(`/iva/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createFileDocument = async (data: FileDataForm) => {
  const { post } = erpAPI({ isStorageApi: true });
  setIsGlobalLoading(true);

  return post<FileDocument>('/file/', data, false);
};

export const updateFileDocument = async (
  data: UpdateFileDocumentParams,
  uuid: string,
) => {
  const { patch } = erpAPI({ isStorageApi: true });
  setIsGlobalLoading(true);

  return patch<FileDocument>(`/file/${uuid}/`, data, false);
};

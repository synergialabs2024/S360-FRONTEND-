import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { OLT, UseMutationParams } from '@/shared/interfaces';
import { useUiStore } from '@/store/ui';

const { post } = erpAPI();

export enum OLTConectTSQEnum {
  OLTCONECTS = 'olt-conects',
}
///* tanStack query ---------------
export const useCreateOLTConect = <T>({
  customMessageToast,
  customMessageErrorToast,
  enableToast = true,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateOLTConectParams<T>) => createOLTConect(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OLTConectTSQEnum.OLTCONECTS],
      });
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'OLT Conect creado correctamente',
        );
    },
    onError: error => {
      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

///* axios ---------------
export type CreateOLTConectParams<T> = T;
export type CreateOLTConectParamsBase = Omit<OLT, 'uuid'>;

export const createOLTConect = async <T>(data: CreateOLTConectParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<OLT>(
    '/olt-conect/olt/create_update_infraestructure/',
    data,
    true,
  );
};

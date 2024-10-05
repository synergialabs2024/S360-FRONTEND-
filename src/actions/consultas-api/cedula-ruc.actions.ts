import { ToastWrapper } from '@/shared/wrappers';
import { useMutation } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { UseMutationParams } from '@/shared/interfaces';
import { useUiStore } from '@/store/ui';

const { post } = erpAPI({
  isCedulaRucApi: true,
});

export enum CedulaCitizenTSQEnum {
  CEDULACITIZENS = 'cedula-citizens',
  CEDULACITIZEN = 'cedula-citizen',
}

///* tanStack query ---------------
export const useSearchCedula = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnSuccess,
}: UseMutationParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateCedulaCitizenParams<T>) => searchCedula(params),
    onSuccess: res => {
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      customOnSuccess && customOnSuccess(res?.data);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cédula consultada correctamente',
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
export type CreateCedulaCitizenParams<T> = T;
export type UpdateCedulaCitizenParams<T> = {
  id: string;
  data: T;
};
export type SearchCedulaParams = {
  cedula: string;
};

export const searchCedula = async <T>(data: CreateCedulaCitizenParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post('/consultas/cedula', data, true);
};

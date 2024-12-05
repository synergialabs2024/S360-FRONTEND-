import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/axios/erp-api';
import {
  AutorizacionOnu,
  autorizacionOnusPaginatedRes,
  getUrlParams,
  PagingPartialParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { useUiStore } from '@/store/ui';

const { get, post } = erpAPI();

export enum AutorizacionONUTSQEnum {
  AUTORIZACIONONUS = 'autorizacion-onus',
  AUTORIZACIONONU = 'autorizacion-onu',
}
///* tanStack query ---------------
export const useFetchAuthOnu = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetAuthONUsParams>) => {
  return useQuery({
    queryKey: [
      AutorizacionONUTSQEnum.AUTORIZACIONONUS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getAuthONUs(params),
    enabled: enabled,
  });
};

export const useCreateAuthONUs = <T>({
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
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateAuthOnuParams<T>) => createAuthONU(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AutorizacionONUTSQEnum.AUTORIZACIONONU],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Autorizacion ONU creado correctamente',
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
export type GetAuthONUsParams = Partial<AutorizacionOnu> & PagingPartialParams;
export type CreateAuthOnuParams<T> = T;
export type CreateAuthOnuParamsBase = Omit<AutorizacionOnu, 'id'>;

export const getAuthONUs = async (params?: GetAuthONUsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<autorizacionOnusPaginatedRes>(
    `/ont-unauthorized/?${queryParams}`,
    true,
  );
};

export const createAuthONU = async <T>(data: CreateAuthOnuParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<AutorizacionOnu>('/olt-conect/olt/ont_autofind/', data, true);
};

import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import {
  AutorizacionOnu,
  autorizacionOnusPaginatedRes,
} from '@/shared/interfaces/app/netconnect';

const { get, post, patch } = erpAPI();

export enum AutorizacionONUTSQEnum {
  AUTORIZACIONONUS = 'autorizacion-onus',
  AUTORIZACIONONU = 'autorizacion-onu',
}
///* tanStack query ---------------
export const useFetchAutorizacionOnus = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetAutorizacionOnusParams>) => {
  return useQuery({
    queryKey: [
      AutorizacionONUTSQEnum.AUTORIZACIONONUS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getAutorizacionOnus(params),
    enabled: enabled,
  });
};

export const useGetAutorizacionOnu = (uuid: string) => {
  return useQuery({
    queryKey: [AutorizacionONUTSQEnum.AUTORIZACIONONU, uuid],
    queryFn: () => getAutorizacionOnu(uuid),
    retry: false,
  });
};

export const useCreateAutorizacionOnu = <T>({
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
    mutationFn: (params: CreateAutorizacionOnuParams<T>) =>
      createAutorizacionOnu(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AutorizacionONUTSQEnum.AUTORIZACIONONU],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Autorizacion de ONUs creado correctamente',
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

export const useUpdateAutorizacionOnu = <T>({
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
    mutationFn: (params: UpdateAutorizacionOnuParams<T>) =>
      updateAutorizacionOnu(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AutorizacionONUTSQEnum.AUTORIZACIONONUS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Autorizacion de ONUs actualizado correctamente',
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
export type GetAutorizacionOnusParams = Partial<AutorizacionOnu> &
  PagingPartialParams;
export type CreateAutorizacionOnuParams<T> = T;
export type CreateAutorizacionOnuParamsBase = Omit<AutorizacionOnu, 'id'>;
export interface UpdateAutorizacionOnuParams<T> {
  id: number;
  data: T;
}

export const getAutorizacionOnus = async (
  params?: GetAutorizacionOnusParams,
) => {
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
    `/autorizacion-onu/?${queryParams}`,
    true,
  );
};

export const getAutorizacionOnu = async (uuid: string) => {
  try {
    return await get<AutorizacionOnu>(`/autorizacion-onu/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createAutorizacionOnu = async <T>(
  data: CreateAutorizacionOnuParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<AutorizacionOnu>('/autorizacion-onu/', data, true);
};

export const updateAutorizacionOnu = async <T>({
  id,
  data,
}: UpdateAutorizacionOnuParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<AutorizacionOnu>(`/autorizacion-onu/${id}/`, data, true);
};

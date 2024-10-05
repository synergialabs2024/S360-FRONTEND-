import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  CodigoOtp,
  CodigosOtpPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum CodigoOtpTSQEnum {
  CODIGOS_OTP = 'codigo-otps',
  CODIGO_OTP = 'codigo-otp',
}
///* tanStack query ---------------
export const useFetchCodigoOtps = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCodigoOtpsParams>) => {
  return useQuery({
    queryKey: [CodigoOtpTSQEnum.CODIGOS_OTP, ...Object.values(params || {})],
    queryFn: () => getCodigoOtps(params),
    enabled: enabled,
  });
};

export const useGetCodigoOtp = (uuid: string) => {
  return useQuery({
    queryKey: [CodigoOtpTSQEnum.CODIGO_OTP, uuid],
    queryFn: () => getCodigoOtp(uuid),
    retry: false,
  });
};

export const useCreateCodigoOtp = <T>({
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
    mutationFn: (params: CreateCodigoOtpParams<T>) => createCodigoOtp(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CodigoOtpTSQEnum.CODIGOS_OTP],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'CodigoOtp creado correctamente',
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

export const useUpdateCodigoOtp = <T>({
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
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: UpdateCodigoOtpParams<T>) => updateCodigoOtp(params),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [CodigoOtpTSQEnum.CODIGOS_OTP],
      });
      customOnSuccess && customOnSuccess(res?.data);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'CodigoOtp actualizado correctamente',
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
export type GetCodigoOtpsParams = Partial<CodigoOtp> & PagingPartialParams;
export type CreateCodigoOtpParams<T> = T;
export type CreateCodigoOtpParamsBase = Omit<CodigoOtp, 'id'>;
export interface UpdateCodigoOtpParams<T> {
  id: number;
  data: T;
}

export const getCodigoOtps = async (params?: GetCodigoOtpsParams) => {
  const stateParams = { ...params };
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CodigosOtpPaginatedRes>(`/codigootp/?${queryParams}`, true);
};

export const getCodigoOtp = async (uuid: string) => {
  try {
    return await get<CodigoOtp>(`/codigootp/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCodigoOtp = async <T>(data: CreateCodigoOtpParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CodigoOtp>('/codigootp/', data, true);
};

export const updateCodigoOtp = async <T>({
  id,
  data,
}: UpdateCodigoOtpParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CodigoOtp>(`/codigootp/${id}/`, data, true);
};

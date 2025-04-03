import { erpAPI } from '@/shared/axios/erp-api';
import {
  CausaTM,
  getUrlParams,
  ToastWrapper,
  UseMutationParams,
  PagingPartialParams,
  CausaTMPaginatedRes,
  UseFetchEnabledParams,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum CausaTMTSQEnum {
  CAUSATMS = 'causa-ticket-masivos',
  CAUSATM = 'causa-ticket-masivo',
}

///* tanStack query ---------------
export const useFetchCausaTMs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCausaTMsParams>) => {
  return useQuery({
    queryKey: [CausaTMTSQEnum.CAUSATMS, ...Object.values(params || {})],
    queryFn: () => getCausaTMs(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetCausaTM = (uuid: string) => {
  return useQuery({
    queryKey: [CausaTMTSQEnum.CAUSATM, uuid],
    queryFn: () => getCausaTM(uuid),
    retry: false,
  });
};

export const useCreateCausaTM = <T>({
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
    mutationFn: (params: CreateCausaTMParams<T>) => createCausaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CausaTMTSQEnum.CAUSATMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Causa Ticket Masivos creado correctamente',
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

export const useUpdateCausaTM = <T>({
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
    mutationFn: (params: UpdateCausaTMParams<T>) => updateCausaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CausaTMTSQEnum.CAUSATMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Causa Ticket Masivos actualizado correctamente',
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
export type GetCausaTMsParams = Partial<CausaTM> & PagingPartialParams;
export type CreateCausaTMParams<T> = T;
export type CreateCausaTMParamsBase = Omit<CausaTM, 'id'>;
export interface UpdateCausaTMParams<T> {
  id: number;
  data: T;
}

export const getCausaTMs = async (params?: GetCausaTMsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CausaTMPaginatedRes>(`/causa-ticket-masivo/?${queryParams}`, true);
};

export const getCausaTM = async (uuid: string) => {
  try {
    return await get<CausaTM>(`/causa-ticket-masivo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCausaTM = async <T>(data: CreateCausaTMParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CausaTM>('/causa-ticket-masivo/', data, true);
};

export const updateCausaTM = async <T>({
  id,
  data,
}: UpdateCausaTMParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CausaTM>(`/causa-ticket-masivo/${id}/`, data, true);
};

import { erpAPI } from '@/axios/erp-api';

import {
  getUrlParams,
  ToastWrapper,
  UseMutationParams,
  CausaTicketMasivo,
  PagingPartialParams,
  UseFetchEnabledParams,
  CausaTicketMasivoPaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum CausaTicketMasivoTSQEnum {
  CAUSATICKETMASIVOS = 'causa-ticket-masivos',
  CAUSATICKETMASIVO = 'causa-ticket-masivo',
}

///* tanStack query ---------------
export const useFetchCausaTicketMasivos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCausaTicketMasivosParams>) => {
  return useQuery({
    queryKey: [
      CausaTicketMasivoTSQEnum.CAUSATICKETMASIVOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getCausaTicketMasivos(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetCausaTicketMasivo = (uuid: string) => {
  return useQuery({
    queryKey: [CausaTicketMasivoTSQEnum.CAUSATICKETMASIVO, uuid],
    queryFn: () => getCausaTicketMasivo(uuid),
    retry: false,
  });
};

export const useCreateCausaTicketMasivo = <T>({
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
    mutationFn: (params: CreateCausaTicketMasivoParams<T>) =>
      createCausaTicketMasivo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CausaTicketMasivoTSQEnum.CAUSATICKETMASIVOS],
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

export const useUpdateCausaTicketMasivo = <T>({
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
    mutationFn: (params: UpdateCausaTicketMasivoParams<T>) =>
      updateCausaTicketMasivo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CausaTicketMasivoTSQEnum.CAUSATICKETMASIVOS],
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
export type GetCausaTicketMasivosParams = Partial<CausaTicketMasivo> &
  PagingPartialParams;
export type CreateCausaTicketMasivoParams<T> = T;
export type CreateCausaTicketMasivoParamsBase = Omit<CausaTicketMasivo, 'id'>;
export interface UpdateCausaTicketMasivoParams<T> {
  id: number;
  data: T;
}

export const getCausaTicketMasivos = async (
  params?: GetCausaTicketMasivosParams,
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
  return get<CausaTicketMasivoPaginatedRes>(
    `/causa-ticket-masivo/?${queryParams}`,
    true,
  );
};

export const getCausaTicketMasivo = async (uuid: string) => {
  try {
    return await get<CausaTicketMasivo>(`/causa-ticket-masivo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCausaTicketMasivo = async <T>(
  data: CreateCausaTicketMasivoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CausaTicketMasivo>('/causa-ticket-masivo/', data, true);
};

export const updateCausaTicketMasivo = async <T>({
  id,
  data,
}: UpdateCausaTicketMasivoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CausaTicketMasivo>(`/causa-ticket-masivo/${id}/`, data, true);
};

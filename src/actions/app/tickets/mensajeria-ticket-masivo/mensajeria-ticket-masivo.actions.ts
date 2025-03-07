import { erpAPI } from '@/axios/erp-api';
import {
  getUrlParams,
  MensajeriaTicketMasivo,
  MensajeriaTicketMasivoPaginatedRes,
  PagingPartialParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum MensajeriaTicketMasivoTSQEnum {
  MENSAJERIATICKETMASIVOS = 'mensajeria-ticket-masivos',
  MENSAJERIATICKETMASIVO = 'mensajeria-ticket-masivo',
}

///* tanStack query ---------------
export const useFetchMensajeriaTicketMasivos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMensajeriaTicketMasivosParams>) => {
  return useQuery({
    queryKey: [
      MensajeriaTicketMasivoTSQEnum.MENSAJERIATICKETMASIVOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMensajeriaTicketMasivos(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetMensajeriaTicketMasivo = (uuid: string) => {
  return useQuery({
    queryKey: [MensajeriaTicketMasivoTSQEnum.MENSAJERIATICKETMASIVO, uuid],
    queryFn: () => getMensajeriaTicketMasivo(uuid),
    retry: false,
  });
};

export const useCreateMensajeriaTicketMasivo = <T>({
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
    mutationFn: (params: CreateMensajeriaTicketMasivoParams<T>) =>
      createMensajeriaTicketMasivo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MensajeriaTicketMasivoTSQEnum.MENSAJERIATICKETMASIVOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Mensajeria Ticket Masivos creado correctamente',
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

export const useUpdateMensajeriaTicketMasivo = <T>({
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
    mutationFn: (params: UpdateMensajeriaTicketMasivoParams<T>) =>
      updateMensajeriaTicketMasivo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MensajeriaTicketMasivoTSQEnum.MENSAJERIATICKETMASIVOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Mensajeria Ticket Masivos actualizado correctamente',
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
export type GetMensajeriaTicketMasivosParams = Partial<MensajeriaTicketMasivo> &
  PagingPartialParams;
export type CreateMensajeriaTicketMasivoParams<T> = T;
export type CreateMensajeriaTicketMasivoParamsBase = Omit<
  MensajeriaTicketMasivo,
  'id'
>;
export interface UpdateMensajeriaTicketMasivoParams<T> {
  id: number;
  data: T;
}

export const getMensajeriaTicketMasivos = async (
  params?: GetMensajeriaTicketMasivosParams,
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
  return get<MensajeriaTicketMasivoPaginatedRes>(
    `/mensajeria-ticket-masivo/?${queryParams}`,
    true,
  );
};

export const getMensajeriaTicketMasivo = async (uuid: string) => {
  try {
    return await get<MensajeriaTicketMasivo>(
      `/mensajeria-ticket-masivo/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMensajeriaTicketMasivo = async <T>(
  data: CreateMensajeriaTicketMasivoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MensajeriaTicketMasivo>('/mensajeria-ticket-masivo/', data, true);
};

export const updateMensajeriaTicketMasivo = async <T>({
  id,
  data,
}: UpdateMensajeriaTicketMasivoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MensajeriaTicketMasivo>(
    `/mensajeria-ticket-masivo/${id}/`,
    data,
    true,
  );
};

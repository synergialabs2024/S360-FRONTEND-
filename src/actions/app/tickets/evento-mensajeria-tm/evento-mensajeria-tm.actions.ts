import { erpAPI } from '@/axios/erp-api';

import {
  getUrlParams,
  ToastWrapper,
  UseMutationParams,
  EventoMensajeriaTM,
  PagingPartialParams,
  UseFetchEnabledParams,
  EventoMensajeriaTMPaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum EventoMensajeriaTMTSQEnum {
  EVENTOMENSAJERIATMS = 'eventomensajeria-ticket-masivos',
  EVENTOMENSAJERIATM = 'eventomensajeria-ticket-masivo',
}

///* tanStack query ---------------
export const useFetchEventoMensajeriaTMs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetEventoMensajeriaTMsParams>) => {
  return useQuery({
    queryKey: [
      EventoMensajeriaTMTSQEnum.EVENTOMENSAJERIATMS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getEventoMensajeriaTMs(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetEventoMensajeriaTM = (uuid: string) => {
  return useQuery({
    queryKey: [EventoMensajeriaTMTSQEnum.EVENTOMENSAJERIATM, uuid],
    queryFn: () => getEventoMensajeriaTM(uuid),
    retry: false,
  });
};

export const useCreateEventoMensajeriaTM = <T>({
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
    mutationFn: (params: CreateEventoMensajeriaTMParams<T>) =>
      createEventoMensajeriaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EventoMensajeriaTMTSQEnum.EVENTOMENSAJERIATMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Evento Mensajeria Ticket Masivos creado correctamente',
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

export const useUpdateEventoMensajeriaTM = <T>({
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
    mutationFn: (params: UpdateEventoMensajeriaTMParams<T>) =>
      updateEventoMensajeriaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EventoMensajeriaTMTSQEnum.EVENTOMENSAJERIATMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Evento Mensajeria Ticket Masivos actualizado correctamente',
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
export type GetEventoMensajeriaTMsParams = Partial<EventoMensajeriaTM> &
  PagingPartialParams;
export type CreateEventoMensajeriaTMParams<T> = T;
export type CreateEventoMensajeriaTMParamsBase = Omit<EventoMensajeriaTM, 'id'>;
export interface UpdateEventoMensajeriaTMParams<T> {
  id: number;
  data: T;
}

export const getEventoMensajeriaTMs = async (
  params?: GetEventoMensajeriaTMsParams,
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
  return get<EventoMensajeriaTMPaginatedRes>(
    `/evento-mensajeria-ticket-masivo/?${queryParams}`,
    true,
  );
};

export const getEventoMensajeriaTM = async (uuid: string) => {
  try {
    return await get<EventoMensajeriaTM>(
      `/evento-mensajeria-ticket-masivo/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createEventoMensajeriaTM = async <T>(
  data: CreateEventoMensajeriaTMParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<EventoMensajeriaTM>(
    '/evento-mensajeria-ticket-masivo/',
    data,
    true,
  );
};

export const updateEventoMensajeriaTM = async <T>({
  id,
  data,
}: UpdateEventoMensajeriaTMParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<EventoMensajeriaTM>(
    `/evento-mensajeria-ticket-masivo/${id}/`,
    data,
    true,
  );
};

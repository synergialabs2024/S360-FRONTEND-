import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  FindByIdentification,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import {
  Ticket,
  TicketPaginatedRes,
} from '@/shared/interfaces/app/ticket/ticket.interface';

const { get, post, patch } = erpAPI();

export enum TicketTSQEnum {
  TICKETS = 'tickets',
  TICKET = 'ticket',
}
///* tanStack query ---------------
export const useFetchTickets = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTicketsParams>) => {
  return useQuery({
    queryKey: [TicketTSQEnum.TICKETS, ...Object.values(params || {})],
    queryFn: () => getTickets(params),
    enabled: enabled,
  });
};

export const useGetTicket = (uuid: string) => {
  return useQuery({
    queryKey: [TicketTSQEnum.TICKET, uuid],
    queryFn: () => getTicket(uuid),
    retry: false,
  });
};

export const useSearchCedulaMutation = () => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: async (params: { identificacion: string }) => {
      setIsGlobalLoading(true);
      try {
        return await getClient(params.identificacion);
      } finally {
        setIsGlobalLoading(false);
      }
    },
  });
};

export const useCreateTicket = <T>({
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
    mutationFn: (params: CreateTicketParams<T>) => createTicket(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TicketTSQEnum.TICKETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Ticket creado correctamente',
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

export const useUpdateTicket = <T>({
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
    mutationFn: (params: UpdateTicketParams<T>) => updateTicket(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TicketTSQEnum.TICKETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Ticket actualizado correctamente',
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
export type GetTicketsParams = Partial<Ticket> & PagingPartialParams;
export type CreateTicketParams<T> = T;
export type CreateTicketParamsBase = Omit<Ticket, 'id'>;
export interface UpdateTicketParams<T> {
  id: number;
  data: T;
}

export const getTickets = async (params?: GetTicketsParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<TicketPaginatedRes>(`/ticket-tecnico/?${queryParams}`, true);
};

export const getTicket = async (uuid: string) => {
  try {
    return await get<Ticket>(`/ticket-tecnico/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getClient = async (uuid: string) => {
  try {
    return await get<FindByIdentification>(
      `/cliente/find-by-identification/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTicket = async <T>(data: CreateTicketParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Ticket>('/ticket-tecnico/', data, true);
};

export const updateTicket = async <T>({ id, data }: UpdateTicketParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Ticket>(`/ticket-tecnico/${id}/`, data, true);
};

///* action types ---------------
export type CreateSolTicket = Pick<
  Ticket,
  | 'linea_servicio'
  | 'origen_ticket'
  | 'asunto_ticket'
  | 'detalle_adicional_ticket'
  | 'url_foto_vivienda'
  | 'url_foto_opcional'
  | 'fecha_sugerida_visita'
  | 'turno'
>;

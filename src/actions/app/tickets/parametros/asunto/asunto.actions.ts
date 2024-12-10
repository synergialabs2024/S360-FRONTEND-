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
  Asunto,
  AsuntosPaginatedRes,
} from '@/shared/interfaces/app/ticket/parametros/asunto/asunto.interface';

const { get, post, patch } = erpAPI();

export enum AsuntoTSQEnum {
  TICKETS = 'asuntos',
  TICKET = 'asunto',
}
///* tanStack query ---------------
export const useFetchAsuntos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetAsuntosParams>) => {
  return useQuery({
    queryKey: [AsuntoTSQEnum.TICKETS, ...Object.values(params || {})],
    queryFn: () => getAsuntos(params),
    enabled: enabled,
  });
};

export const useGetAsunto = (uuid: string) => {
  return useQuery({
    queryKey: [AsuntoTSQEnum.TICKET, uuid],
    queryFn: () => getAsunto(uuid),
    retry: false,
  });
};

export const useCreateAsunto = <T>({
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
    mutationFn: (params: CreateAsuntoParams<T>) => createAsunto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AsuntoTSQEnum.TICKETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Asunto creado correctamente',
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

export const useUpdateAsunto = <T>({
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
    mutationFn: (params: UpdateAsuntoParams<T>) => updateAsunto(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AsuntoTSQEnum.TICKETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Asunto actualizado correctamente',
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
export type GetAsuntosParams = Partial<Asunto> & PagingPartialParams;
export type CreateAsuntoParams<T> = T;
export type CreateAsuntoParamsBase = Omit<Asunto, 'id'>;
export interface UpdateAsuntoParams<T> {
  id: number;
  data: T;
}

export const getAsuntos = async (params?: GetAsuntosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<AsuntosPaginatedRes>(`/asunto-ticket/?${queryParams}`, true);
};

export const getAsunto = async (uuid: string) => {
  try {
    return await get<Asunto>(`/asunto-ticket/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createAsunto = async <T>(data: CreateAsuntoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Asunto>('/asunto-ticket/', data, true);
};

export const updateAsunto = async <T>({ id, data }: UpdateAsuntoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Asunto>(`/asunto-ticket/${id}/`, data, true);
};

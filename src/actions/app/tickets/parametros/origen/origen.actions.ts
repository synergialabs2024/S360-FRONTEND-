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
import { Origen, OrigenesPaginatedRes } from '@/shared/interfaces/app/ticket';

const { get, post, patch } = erpAPI();

export enum OrigenTSQEnum {
  TICKETS = 'origenes',
  TICKET = 'origen',
}
///* tanStack query ---------------
export const useFetchOrigenes = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetOrigenesParams>) => {
  return useQuery({
    queryKey: [OrigenTSQEnum.TICKETS, ...Object.values(params || {})],
    queryFn: () => getOrigenes(params),
    enabled: enabled,
  });
};

export const useGetOrigen = (uuid: string) => {
  return useQuery({
    queryKey: [OrigenTSQEnum.TICKET, uuid],
    queryFn: () => getOrigen(uuid),
    retry: false,
  });
};

export const useCreateOrigen = <T>({
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
    mutationFn: (params: CreateOrigenParams<T>) => createOrigen(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OrigenTSQEnum.TICKETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Origen creado correctamente',
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

export const useUpdateOrigen = <T>({
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
    mutationFn: (params: UpdateOrigenParams<T>) => updateOrigen(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OrigenTSQEnum.TICKETS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Origen actualizado correctamente',
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
export type GetOrigenesParams = Partial<Origen> & PagingPartialParams;
export type CreateOrigenParams<T> = T;
export type CreateOrigenParamsBase = Omit<Origen, 'id'>;
export interface UpdateOrigenParams<T> {
  id: number;
  data: T;
}

export const getOrigenes = async (params?: GetOrigenesParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<OrigenesPaginatedRes>(`/origen-ticket/?${queryParams}`, true);
};

export const getOrigen = async (uuid: string) => {
  try {
    return await get<Origen>(`/origen-ticket/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createOrigen = async <T>(data: CreateOrigenParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Origen>('/origen-ticket/', data, true);
};

export const updateOrigen = async <T>({ id, data }: UpdateOrigenParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Origen>(`/origen-ticket/${id}/`, data, true);
};

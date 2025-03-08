import { erpAPI } from '@/axios/erp-api';

import {
  getUrlParams,
  MensajeriaTM,
  ToastWrapper,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  MensajeriaTMPaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum MensajeriaTMTSQEnum {
  MENSAJERIATMS = 'mensajeria-ticket-masivos',
  MENSAJERIATM = 'mensajeria-ticket-masivo',
}

///* tanStack query ---------------
export const useFetchMensajeriaTMs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMensajeriaTMsParams>) => {
  return useQuery({
    queryKey: [
      MensajeriaTMTSQEnum.MENSAJERIATMS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMensajeriaTMs(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetMensajeriaTM = (uuid: string) => {
  return useQuery({
    queryKey: [MensajeriaTMTSQEnum.MENSAJERIATM, uuid],
    queryFn: () => getMensajeriaTM(uuid),
    retry: false,
  });
};

export const useCreateMensajeriaTM = <T>({
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
    mutationFn: (params: CreateMensajeriaTMParams<T>) =>
      createMensajeriaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MensajeriaTMTSQEnum.MENSAJERIATMS],
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

export const useUpdateMensajeriaTM = <T>({
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
    mutationFn: (params: UpdateMensajeriaTMParams<T>) =>
      updateMensajeriaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MensajeriaTMTSQEnum.MENSAJERIATMS],
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
export type GetMensajeriaTMsParams = Partial<MensajeriaTM> &
  PagingPartialParams;
export type CreateMensajeriaTMParams<T> = T;
export type CreateMensajeriaTMParamsBase = Omit<MensajeriaTM, 'id'>;
export interface UpdateMensajeriaTMParams<T> {
  id: number;
  data: T;
}

export const getMensajeriaTMs = async (params?: GetMensajeriaTMsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<MensajeriaTMPaginatedRes>(
    `/mensajeria-ticket-masivo/?${queryParams}`,
    true,
  );
};

export const getMensajeriaTM = async (uuid: string) => {
  try {
    return await get<MensajeriaTM>(`/mensajeria-ticket-masivo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMensajeriaTM = async <T>(
  data: CreateMensajeriaTMParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MensajeriaTM>('/mensajeria-ticket-masivo/', data, true);
};

export const updateMensajeriaTM = async <T>({
  id,
  data,
}: UpdateMensajeriaTMParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MensajeriaTM>(`/mensajeria-ticket-masivo/${id}/`, data, true);
};

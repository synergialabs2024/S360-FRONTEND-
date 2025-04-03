import { erpAPI } from '@/shared/axios/erp-api';
import {
  getUrlParams,
  IncidenciaTM,
  ToastWrapper,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  IncidenciaTMPaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum IncidenciaTMTSQEnum {
  INCIDENCIATMS = 'incidencia-ticket-masivos',
  INCIDENCIATM = 'incidencia-ticket-masivo',
}

///* tanStack query ---------------
export const useFetchIncidenciaTMs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetIncidenciaTMsParams>) => {
  return useQuery({
    queryKey: [
      IncidenciaTMTSQEnum.INCIDENCIATMS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getIncidenciaTMs(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetIncidenciaTM = (uuid: string) => {
  return useQuery({
    queryKey: [IncidenciaTMTSQEnum.INCIDENCIATM, uuid],
    queryFn: () => getIncidenciaTM(uuid),
    retry: false,
  });
};

export const useCreateIncidenciaTM = <T>({
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
    mutationFn: (params: CreateIncidenciaTMParams<T>) =>
      createIncidenciaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [IncidenciaTMTSQEnum.INCIDENCIATMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Incidencia Ticket Masivos creado correctamente',
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

export const useUpdateIncidenciaTM = <T>({
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
    mutationFn: (params: UpdateIncidenciaTMParams<T>) =>
      updateIncidenciaTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [IncidenciaTMTSQEnum.INCIDENCIATMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Incidencia Ticket Masivos actualizado correctamente',
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
export type GetIncidenciaTMsParams = Partial<IncidenciaTM> &
  PagingPartialParams;
export type CreateIncidenciaTMParams<T> = T;
export type CreateIncidenciaTMParamsBase = Omit<IncidenciaTM, 'id'>;
export interface UpdateIncidenciaTMParams<T> {
  id: number;
  data: T;
}

export const getIncidenciaTMs = async (params?: GetIncidenciaTMsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<IncidenciaTMPaginatedRes>(
    `/incidencia-ticket-masivo/?${queryParams}`,
    true,
  );
};

export const getIncidenciaTM = async (uuid: string) => {
  try {
    return await get<IncidenciaTM>(`/incidencia-ticket-masivo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createIncidenciaTM = async <T>(
  data: CreateIncidenciaTMParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<IncidenciaTM>('/incidencia-ticket-masivo/', data, true);
};

export const updateIncidenciaTM = async <T>({
  id,
  data,
}: UpdateIncidenciaTMParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<IncidenciaTM>(`/incidencia-ticket-masivo/${id}/`, data, true);
};

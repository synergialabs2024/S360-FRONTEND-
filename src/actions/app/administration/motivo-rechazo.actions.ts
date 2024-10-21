import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  MotivoRechazo,
  MotivosRechazoPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum MotivoRechazoTSQEnum {
  MOTIVORECHAZOS = 'motivo-rechazos',
  MOTIVORECHAZO = 'motivo-rechazo',
}
///* tanStack query ---------------
export const useFetchMotivoRechazos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMotivoRechazosParams>) => {
  return useQuery({
    queryKey: [
      MotivoRechazoTSQEnum.MOTIVORECHAZOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMotivoRechazos(params),
    enabled: enabled,
  });
};

export const useGetMotivoRechazo = (uuid: string) => {
  return useQuery({
    queryKey: [MotivoRechazoTSQEnum.MOTIVORECHAZO, uuid],
    queryFn: () => getMotivoRechazo(uuid),
    retry: false,
  });
};

export const useCreateMotivoRechazo = <T>({
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
    mutationFn: (params: CreateMotivoRechazoParams<T>) =>
      createMotivoRechazo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoRechazoTSQEnum.MOTIVORECHAZOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'MotivoRechazo creado correctamente',
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

export const useUpdateMotivoRechazo = <T>({
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
    mutationFn: (params: UpdateMotivoRechazoParams<T>) =>
      updateMotivoRechazo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoRechazoTSQEnum.MOTIVORECHAZOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'MotivoRechazo actualizado correctamente',
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
export type GetMotivoRechazosParams = Partial<MotivoRechazo> &
  PagingPartialParams;
export type CreateMotivoRechazoParams<T> = T;
export type CreateMotivoRechazoParamsBase = Omit<MotivoRechazo, 'id'>;
export interface UpdateMotivoRechazoParams<T> {
  id: number;
  data: T;
}

export const getMotivoRechazos = async (params?: GetMotivoRechazosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<MotivosRechazoPaginatedRes>(
    `/motivo-rechazo/?${queryParams}`,
    true,
  );
};

export const getMotivoRechazo = async (uuid: string) => {
  try {
    return await get<MotivoRechazo>(`/motivo-rechazo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMotivoRechazo = async <T>(
  data: CreateMotivoRechazoParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MotivoRechazo>('/motivo-rechazo/', data, true);
};

export const updateMotivoRechazo = async <T>({
  id,
  data,
}: UpdateMotivoRechazoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MotivoRechazo>(`/motivo-rechazo/${id}/`, data, true);
};

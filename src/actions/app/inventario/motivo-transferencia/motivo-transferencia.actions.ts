import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/shared/axios/erp-api';

import {
  getUrlParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
  MotivoTransferencia,
  PagingPartialParams,
  MotivoTransferenciaPaginatedRes,
} from '@/shared';

const { get, post, patch } = erpAPI();

export enum MotivoTransferenciaTSQEnum {
  MOTIVOTRANSFERENCIAS = 'motivo-transferencias',
  MOTIVOTRANSFERENCIA = 'motivo-transferencia',
}

///* tanStack query
export const useFetchMotivoTransferencia = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMotivoTransferenciasParams>) => {
  return useQuery({
    queryKey: [
      MotivoTransferenciaTSQEnum.MOTIVOTRANSFERENCIAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMotivoTransferencias(params),
    enabled: enabled,
  });
};

export const useGetMotivoTransferencia = (uuid: string) => {
  return useQuery({
    queryKey: [MotivoTransferenciaTSQEnum.MOTIVOTRANSFERENCIA, uuid],
    queryFn: () => getMotivoTransferencia(uuid),
    retry: false,
  });
};

export const useCreateMotivoTransferencia = <T>({
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
    mutationFn: (params: CreateMotivoTransferenciaParams<T>) =>
      createMotivoTransferencia(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoTransferenciaTSQEnum.MOTIVOTRANSFERENCIAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Motivo Transferencia creado correctamente',
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

export const useUpdateMotivoTransferencia = <T>({
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
    mutationFn: (params: UpdateMotivoTransferenciaParams<T>) =>
      updateMotivoTransferencia(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoTransferenciaTSQEnum.MOTIVOTRANSFERENCIAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Motivo Transferencia actualizado correctamente',
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
///* axios
export type GetMotivoTransferenciasParams = Partial<MotivoTransferencia> &
  PagingPartialParams;
export type CreateMotivoTransferenciaParams<T> = T;
export type CreateMotivoTransferenciaParamsBase = Omit<
  MotivoTransferencia,
  'id'
>;
export interface UpdateMotivoTransferenciaParams<T> {
  id: number;
  data: T;
}

export const getMotivoTransferencias = async (
  params?: GetMotivoTransferenciasParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<MotivoTransferenciaPaginatedRes>(
    `/motivo_transferencia/?${queryParams}`,
    true,
  );
};

export const getMotivoTransferencia = async (uuid: string) => {
  try {
    return await get<MotivoTransferencia>(
      `/motivo_transferencia/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMotivoTransferencia = async <T>(
  data: CreateMotivoTransferenciaParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MotivoTransferencia>('/motivo_transferencia/', data, true);
};

export const updateMotivoTransferencia = async <T>({
  id,
  data,
}: UpdateMotivoTransferenciaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MotivoTransferencia>(`/motivo_transferencia/${id}/`, data, true);
};

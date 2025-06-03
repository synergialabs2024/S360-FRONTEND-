import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
  AuditLog,
  AuditLogsPaginatedRes,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum AuditLogTSQEnum {
  AUDITLOGS = 'audit-logs',
  AUDITLOG = 'audit-log',
}
///* tanStack query ---------------
export const useFetchAuditLogs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetAuditLogsParams>) => {
  return useQuery({
    queryKey: [AuditLogTSQEnum.AUDITLOGS, ...Object.values(params || {})],
    queryFn: () => getAuditLogs(params),
    enabled: enabled,
  });
};

export const useGetAuditLog = (uuid: string) => {
  return useQuery({
    queryKey: [AuditLogTSQEnum.AUDITLOG, uuid],
    queryFn: () => getAuditLog(uuid),
    retry: false,
  });
};

export const useCreateAuditLog = <T>({
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
    mutationFn: (params: CreateAuditLogParams<T>) => createAuditLog(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AuditLogTSQEnum.AUDITLOGS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'AuditLog creada correctamente',
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

export const useUpdateAuditLog = <T>({
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
    mutationFn: (params: UpdateAuditLogParams<T>) => updateAuditLog(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AuditLogTSQEnum.AUDITLOGS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'AuditLog actualizada correctamente',
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
export type GetAuditLogsParams = Partial<AuditLog> & PagingPartialParams;
export type CreateAuditLogParams<T> = T;
export type CreateAuditLogParamsBase = Omit<AuditLog, 'id'>;
export interface UpdateAuditLogParams<T> {
  id: number;
  data: T;
}
export interface UpdateAuditLogCancelParams {
  id: number;
}

export const getAuditLogs = async (params?: GetAuditLogsParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<AuditLogsPaginatedRes>(`/audit-log/?${queryParams}`, true);
};

export const getAuditLog = async (uuid: string) => {
  try {
    return await get<AuditLog>(`/audit-log/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createAuditLog = async <T>(data: CreateAuditLogParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<AuditLog>('/audit-log/', data, true);
};

export const updateAuditLog = async <T>({
  id,
  data,
}: UpdateAuditLogParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<AuditLog>(`/audit-log/${id}/`, data, true);
};

import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  SystemGroup,
  SystemGroupsPaginatedRes,
  SystemModuleRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch, remove } = erpAPI();

export enum SystemGroupTSQEnum {
  SYSTEMGROUPS = 'system-groups',
  SYSTEMGROUP = 'system-group',
}
///* tanStack query ---------------
export const useFetchSystemGroups = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSystemGroupsParams>) => {
  return useQuery({
    queryKey: [SystemGroupTSQEnum.SYSTEMGROUPS, ...Object.values(params || {})],
    queryFn: () => getSystemGroups(params),
    enabled: enabled,
  });
};

export const useGetSystemGroup = (uuid: string) => {
  return useQuery({
    queryKey: ['system-group', uuid],
    queryFn: () => getSystemGroup(uuid),
    retry: false,
  });
};

export const useCreateSystemGroup = ({
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
    mutationFn: createSystemGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-groups'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Grupo creado correctamente',
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

export const useUpdateSystemGroup = <T>({
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
    mutationFn: (params: UpdateSystemGroupParams<T>) =>
      updateSystemGroup(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-groups'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Grupo actualizado correctamente',
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

export const useDeleteSystemGroup = () => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: deleteSystemGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-groups'] });
      ToastWrapper.success('Grupo eliminado correctamente');
    },
    onError: error => {
      handleAxiosError(error);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

///* axios ---------------
export type GetSystemGroupsParams = Partial<SystemGroup> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateSystemGroupParams = Omit<SystemGroup, 'id'>;
export interface UpdateSystemGroupParams<T> {
  id: number;
  data: T;
}

export const getSystemGroups = async (params?: GetSystemGroupsParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<SystemGroupsPaginatedRes>(`/auth/group/?${queryParams}`, true);
};

export const getSystemGroup = async (uuid: string) => {
  try {
    return await get<SystemGroup>(`/auth/group/uuid/${uuid}/`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSystemGroup = async (data: CreateSystemGroupParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SystemGroup>('/auth/group/', data, true);
};

export const updateSystemGroup = async <T>({
  id,
  data,
}: UpdateSystemGroupParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SystemGroup>(`/auth/group/${id}/`, data, true);
};

export const deleteSystemGroup = async (id: number) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return remove<SystemGroup>(`/auth/group/${id}/`, true);
};

export const useFetchSystemModulesSidenav = (enabled = true) => {
  return useQuery({
    queryKey: ['system-modules-sidenav'],
    queryFn: getSystemModulesSidenav,
    enabled: enabled,
  });
};

export const getSystemModulesSidenav = async (): Promise<SystemModuleRes> => {
  return get<string[]>('/auth/system-modules-sidenav/', true);
};

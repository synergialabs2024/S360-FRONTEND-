import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  SystemUser,
  SystemUserItem,
  SystemUsersPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
  UserProfile,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum SystemUserTSQEnum {
  SYSTEMUSERS = 'system-users',
  SYSTEMUSER = 'system-user',
}

//* TanStack Query ---------------
export const useFetchSystemUsers = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSystemUsersParams>) => {
  return useQuery({
    queryKey: [SystemUserTSQEnum.SYSTEMUSERS, ...Object.values(params || {})],
    queryFn: () => getSystemUsers(params),
    enabled: enabled,
  });
};

export const useGetSystemUser = (uuid: string) => {
  return useQuery({
    queryKey: [SystemUserTSQEnum.SYSTEMUSER, uuid],
    queryFn: () => getSystemUser(uuid),
    retry: false,
  });
};

export const useCreateSystemUser = <T>({
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
    mutationFn: (params: CreateSystemUserParams<T>) => createSystemUser(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SystemUserTSQEnum.SYSTEMUSERS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Usuario creado correctamente',
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

export const useUpdateSystemUser = <T>({
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
    mutationFn: (params: UpdateSystemUserParams<T>) => updateSystemUser(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SystemUserTSQEnum.SYSTEMUSERS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Usuario actualizado correctamente',
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

///* Axios ---------------
export type GetSystemUsersParams = Partial<SystemUser> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateSystemUserParamsBase = Omit<SystemUser, 'id'>;
export type CreateSystemUserParams<T> = T;
export interface UpdateSystemUserParams<T> {
  id: number;
  data: T;
}

export const getSystemUsers = async (params?: GetSystemUsersParams) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<SystemUsersPaginatedRes>(`/users/all/?${queryParams}`, true);
};

export const getSystemUser = async (uuid: string) => {
  try {
    return await get<SystemUserItem>(`/users/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSystemUser = async <T>(data: CreateSystemUserParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SystemUser>('/users/', data, true);
};

export const updateSystemUser = async <T>({
  id,
  data,
}: UpdateSystemUserParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SystemUser>(`/users/${id}/`, data, true);
};

///* action types -----------------
export type CreateUserProfileData = Pick<
  SystemUser,
  'username' | 'email' | 'razon_social' | 'groups'
> & {
  password?: string;
} & Pick<
    UserProfile,
    | 'tipo_identificacion'
    | 'identificacion'
    | 'role'
    | 'empresa'
    | 'area'
    | 'departamento'
    | 'canal_venta'
  > & {
    // helper
    create_employee?: boolean;

    // opt - employee
    address?: string;
    phone_1?: string;
    phone_2?: string;
    phone_3?: string;
    salary?: string;
    cargo?: number;
    tipo_empleado?: string; // choice
    pais?: number;
    provincia?: number;
    ciudad?: number;
    zona?: number;
    sector?: number;
  };

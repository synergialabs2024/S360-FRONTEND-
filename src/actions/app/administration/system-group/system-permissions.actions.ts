import { useQuery } from '@tanstack/react-query';

import { erpAPI } from '@/shared/axios';
import {
  SystemPermission,
  SystemPermissionsPaginatedRes,
  UseFetchEnabledParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';

const { get } = erpAPI();

///* tanStack query ---------------
export const useFetchSystemPermissions = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSystemPermissionsParams> = {}) => {
  return useQuery({
    queryKey: ['system-permissions', ...Object.values(params || {})],
    queryFn: () => getSystemPermissions(params),
    enabled: enabled,
  });
};
export const useFetchSystemPermissionsGroup = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSystemPermissionsGroupParams> = {}) => {
  return useQuery({
    queryKey: ['system-permissions-groups', ...Object.values(params || {})],
    queryFn: () => getSystemPermissionsGroup(params),
    enabled: enabled,
  });
};

///* axios ---------------
export type GetSystemPermissionsParams = Partial<SystemPermission> & {
  page?: number;
  page_size?: number;

  group_id?: number;
  user_id?: number;
};
export type GetSystemPermissionsGroupParams = {
  page?: number;
  page_size?: number;

  id?: number;
};

export const getSystemPermissions = async (
  params?: GetSystemPermissionsParams,
) => {
  const queryParams = getUrlParams(params || {});
  return get<SystemPermissionsPaginatedRes>(
    `/auth/permissions/?${queryParams}`,
    true,
  );
};

export const getSystemPermissionsGroup = async (
  params?: GetSystemPermissionsGroupParams,
) => {
  const queryParams = getUrlParams(params || {});
  return get<SystemPermissionsPaginatedRes>(
    `/auth/permissions/group/${params?.id}/?${queryParams}`,
    true,
  );
};

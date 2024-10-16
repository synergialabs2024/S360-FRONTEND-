import { PermissionsEnum } from '@/shared/interfaces';
import { useUserPermissionsStore } from '@/store/auth';

export const hasPermission = (permission: PermissionsEnum): boolean => {
  const userPermissions = useUserPermissionsStore.getState().permissions;

  return userPermissions.includes(permission);
};

export const hasAllPermissions = (permissions: PermissionsEnum[]): boolean => {
  const userPermissions = useUserPermissionsStore.getState().permissions;

  return permissions.every(permission => userPermissions.includes(permission));
};

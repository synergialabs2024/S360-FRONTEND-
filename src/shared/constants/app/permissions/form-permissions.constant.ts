import { PermissionsEnum } from '@/shared/interfaces';

export const SAVE_CIUDAD_PERMISSIONS = [
  PermissionsEnum.administration_view_pais,
  PermissionsEnum.administration_view_provincia,
];

export const SAVE_USER_PROFILE_PERMISSIONS = [
  PermissionsEnum.users_view_customgroup,
];

export const SAVE_ZONA_PERMISSIONS = [
  PermissionsEnum.administration_view_pais,
  PermissionsEnum.administration_view_provincia,
  PermissionsEnum.administration_view_ciudad,
];

export const SAVE_SECTOR_PERMISSIONS = [
  PermissionsEnum.administration_view_pais,
  PermissionsEnum.administration_view_provincia,
  PermissionsEnum.administration_view_ciudad,
  PermissionsEnum.administration_view_zona,
];

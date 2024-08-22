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

export const SAVE_PROMOCION_PERMISSIONS = [
  PermissionsEnum.administration_view_provincia,
  PermissionsEnum.administration_view_ciudad,
  PermissionsEnum.administration_view_zona,
  PermissionsEnum.administration_view_sector,
  PermissionsEnum.servicios_view_planinternet,
];

export const SAVE_DEPARTAMENTO_PERMISSIONS = [
  PermissionsEnum.administration_view_area,
];

export const SAVE_EMPRESA_PERMISSIONS = [
  PermissionsEnum.administration_view_pais,
  PermissionsEnum.administration_view_provincia,
  PermissionsEnum.administration_view_ciudad,
];

export const SAVE_EMPLEADO_PERMISSIONS = [
  PermissionsEnum.administration_view_area,
  PermissionsEnum.administration_view_departamento,
  PermissionsEnum.administration_view_canalventa,
  PermissionsEnum.nomina_view_cargo,
  PermissionsEnum.administration_view_pais,
  PermissionsEnum.administration_view_provincia,
  PermissionsEnum.administration_view_ciudad,
  PermissionsEnum.administration_view_zona,
  PermissionsEnum.administration_view_sector,
  PermissionsEnum.users_view_user,
];

export const SAVE_NODO_PERMISSIONS = [
  PermissionsEnum.administration_view_pais,
  PermissionsEnum.administration_view_provincia,
  PermissionsEnum.administration_view_ciudad,
  PermissionsEnum.administration_view_zona,
  PermissionsEnum.administration_view_sector,
];

export const SAVE_OLT_PERMISSIONS = [
  PermissionsEnum.administration_view_pais,
  PermissionsEnum.administration_view_provincia,
  PermissionsEnum.administration_view_ciudad,
  PermissionsEnum.administration_view_zona,
  PermissionsEnum.administration_view_sector,
  PermissionsEnum.infraestructura_view_nodo,
];

export const SAVE_NAP_PERMISSIONS = [
  PermissionsEnum.administration_view_ciudad,
  PermissionsEnum.administration_view_sector,
  PermissionsEnum.infraestructura_view_nodo,
  PermissionsEnum.infraestructura_view_olt,
];

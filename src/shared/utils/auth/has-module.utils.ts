import { SidenavModulesEnum } from '@/shared/interfaces';
import { useUserModulesStore } from '@/store/auth';

export const hasSystemModule = (module: SidenavModulesEnum): boolean => {
  const userModules = useUserModulesStore.getState().modules;

  return userModules.includes(module);
};

export const hasAllSystemModules = (modules: SidenavModulesEnum[]): boolean => {
  const userModules = useUserModulesStore.getState().modules;

  return modules.every(module => userModules.includes(module));
};

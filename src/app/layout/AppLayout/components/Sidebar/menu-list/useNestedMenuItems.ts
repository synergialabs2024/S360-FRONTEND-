import { IconDashboard } from '@tabler/icons-react';
import { useCallback, useMemo } from 'react';

import { ROUTER_PATHS } from '@/router/constants';
import { SidenavModulesEnum } from '@/shared';
import { hasSystemModule } from '@/shared/utils/auth';
import { MdAdminPanelSettings } from 'react-icons/md';
import { MenuItemType } from './menu-item.interface';

export type NestedMenuItem = {
  id: string;
  title: string;
  caption?: string;
  type: MenuItemType;
  url?: string;
  icon?: any;
  breadcrumbs?: boolean;
  children?: NestedMenuItem[];
};

export const useNestedMenu = () => {
  const renderByModule = useCallback(
    (
      module: SidenavModulesEnum,
      item: NestedMenuItem
    ): NestedMenuItem | null => {
      return hasSystemModule(module) ? item : null;
    },
    []
  );

  const cleanEmptyItems = useCallback(
    (menu: NestedMenuItem[]): NestedMenuItem[] => {
      return menu
        .map(item => {
          if (item?.children && item?.children.length > 0) {
            item.children = cleanEmptyItems(item?.children);

            // if the item has no children, remove it (actual object)
            if (item?.children?.length === 0) {
              return null;
            }
          }

          // Si el item no tiene 'children' o tiene children válidos, es un item válido
          if (!item?.children || item?.children?.length > 0) {
            return item;
          }

          return null;
        })
        .filter((item): item is NestedMenuItem => item !== null);
    },
    []
  );

  // ==============================|| MENU ITEMS ||============================== //
  const menuItems: NestedMenuItem[] = useMemo(() => {
    const dashboard = {
      id: 'dashboard',
      title: 'Dashboard',
      type: MenuItemType.GROUP,
      children: [
        {
          id: 'default',
          title: 'Dashboard',
          type: MenuItemType.ITEM,
          url: ROUTER_PATHS.home,
          icon: IconDashboard,
          breadcrumbs: false,
        },
      ],
    };

    const pages = {
      id: 'pages',
      title: 'Módulos',
      // caption: 'Módulos',
      type: MenuItemType.GROUP,
      children: [
        /////* Administración ----------------
        {
          id: 'administracion',
          title: 'Administración',
          type: MenuItemType.COLLAPSE,
          icon: MdAdminPanelSettings,
          children: [
            renderByModule(SidenavModulesEnum.ADMIN_PAISES, {
              id: 'paises',
              title: 'Países',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.paisNav,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.ADMIN_PROVINCIAS, {
              id: 'provincias',
              title: 'Provincias',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.provinciasNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_CIUDADES, {
              id: 'ciudades',
              title: 'Ciudades',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.ciudadesNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
      ],
    };

    const cleanedMenu = cleanEmptyItems([dashboard, pages]);

    return cleanedMenu;
  }, [cleanEmptyItems, renderByModule]);

  return { menuItems };
};

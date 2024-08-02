import {
  IconBroadcast,
  IconBuildings,
  IconDashboard,
  IconReportMoney,
  IconUserShield,
} from '@tabler/icons-react';
import { useCallback, useMemo } from 'react';

import { ROUTER_PATHS } from '@/router/constants';
import { SidenavModulesEnum } from '@/shared';
import { hasSystemModule } from '@/shared/utils/auth';
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
      item: NestedMenuItem,
    ): NestedMenuItem | null => {
      return hasSystemModule(module) ? item : null;
    },
    [],
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
    [],
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
          icon: IconUserShield,
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
            renderByModule(SidenavModulesEnum.ADMIN_ZONAS, {
              id: 'zonas',
              title: 'Zonas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.zonasNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'sectores',
              title: 'Sectores',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.sectoresNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_AREAS, {
              id: 'areas',
              title: 'Areas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.areasNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_DEPARTAMENTOS, {
              id: 'despartamentos',
              title: 'Departamentos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.departamentosNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_CANAL_VENTA, {
              id: 'canales-venta',
              title: 'Canales de venta',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.canalesVentaNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_EMPRESAS, {
              id: 'empresas',
              title: 'Empresas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.empresasNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_IVA, {
              id: 'ivas',
              title: 'IVA',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.ivasNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_PARAMETRO_SISTEMA, {
              id: 'parametros-sistemas',
              title: 'Parametro Sistema',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.parametrosSistemasNav,
            }),

            //* users ---------------
            renderByModule(SidenavModulesEnum.USUARIOS_USUARIOS, {
              id: 'usuarios',
              title: 'Usuarios',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.usuariosNav,
            }),
            renderByModule(SidenavModulesEnum.USUARIOS_GRUPOS, {
              id: 'grupos',
              title: 'Grupos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.gruposNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Nomina ----------------
        {
          id: 'nomina',
          title: 'Nomina',
          type: MenuItemType.COLLAPSE,
          icon: IconReportMoney,
          children: [
            renderByModule(SidenavModulesEnum.NOMINA_CARGO, {
              id: 'cargos',
              title: 'Cargos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.nomina.cargosNav,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'empleados',
              title: 'Empleados',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.nomina.empleadosNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Servicios ----------------
        {
          id: 'servicios',
          title: 'Servicio',
          type: MenuItemType.COLLAPSE,
          icon: IconBroadcast,
          children: [
            renderByModule(SidenavModulesEnum.SERVICIOS_PLAN, {
              id: 'planes',
              title: 'Planes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.servicios.planesNav,
              // target: true, // target blank
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Comercial ----------------
        {
          id: 'comercial',
          title: 'Comercial',
          type: MenuItemType.COLLAPSE,
          icon: IconBuildings,
          children: [
            renderByModule(SidenavModulesEnum.COMERCIAL_SOLICITUD_SERVICIO, {
              id: 'solicitud-servicio',
              title: 'Solicitud de Servicio',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.comercial.solicitudServicioNav,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.COMERCIAL_PROMOCIONES, {
              id: 'promociones',
              title: 'Promociones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.comercial.promocionesNav,
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

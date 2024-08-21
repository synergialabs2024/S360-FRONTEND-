import {
  IconBroadcast,
  IconBuildings,
  IconBulldozer,
  IconCube3dSphere,
  IconDashboard,
  IconHierarchy3,
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
            /*
            renderByModule(SidenavModulesEnum.ADMIN_EMPRESAS, {
              id: 'empresas',
              title: 'Empresas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.empresasNav,
            }),
            */
            renderByModule(SidenavModulesEnum.ADMIN_ENTIDAD_FINANCIERA, {
              id: 'entidades-financiera',
              title: 'Entidades Financieras',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.entidadesFinancieraNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_IVA, {
              id: 'ivas',
              title: 'IVA',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.ivasNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_METODO_PAGO, {
              id: 'metodos-pago',
              title: 'Metodos Pagos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.metodospagoNav,
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
              id: 'planesinternet',
              title: 'Plan Internet',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.servicios.planesinternetNav,
              // target: true, // target blank
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Mantenimiento Operación ----------------
        {
          id: 'mantenimiento-operacion',
          title: 'Mantenimiento y Operación',
          type: MenuItemType.COLLAPSE,
          icon: IconBulldozer,
          children: [
            renderByModule(SidenavModulesEnum.MANTENIMIENTO_OPERACION, {
              id: 'flotas',
              title: 'Flotas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.mantenimientoOperacion.flotasNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Infraestructura ----------------
        {
          id: 'infraestructura',
          title: 'Infraestructura',
          type: MenuItemType.COLLAPSE,
          icon: IconHierarchy3,
          children: [
            renderByModule(SidenavModulesEnum.INFRAESTRUCTURA_NODO, {
              id: 'nodos',
              title: 'Nodos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.infraestructura.nodosNav,
            }),
            renderByModule(SidenavModulesEnum.INFRAESTRUCTURA_OLT, {
              id: 'olts',
              title: 'OLTs',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.infraestructura.oltsNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Supervisión Comercial ----------------
        {
          id: 'supervision-comercial',
          title: 'Supervisión Comercial',
          type: MenuItemType.COLLAPSE,
          icon: IconCube3dSphere,
          children: [
            renderByModule(
              SidenavModulesEnum.SUPERVISIONCOMERCIAL_SOLICITUD_DESBLOQUEO_VENTAS,
              {
                id: 'solicitud-desbloqueo-ventas',
                title: 'Solicitud Liberación Ventas',
                type: MenuItemType.ITEM,
                url: ROUTER_PATHS.supervisionComercial
                  .solicitudDesbloqueoVentasNav,
              },
            ),
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
            renderByModule(SidenavModulesEnum.COMERCIAL_PREVENTA, {
              id: 'preventas',
              title: 'Preventas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.comercial.preventasNav,
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

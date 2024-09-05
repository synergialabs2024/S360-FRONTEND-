import {
  IconAbacus,
  IconAccessPoint,
  IconAugmentedReality2,
  IconBrandAirtable,
  IconBroadcast,
  IconBuilding,
  IconBuildings,
  IconDashboard,
  IconDeviceDesktopAnalytics,
  IconHeartHandshake,
  IconHierarchy3,
  IconPigMoney,
  IconReportMoney,
  IconRouter,
  IconSettings2,
  IconUsersGroup,
  IconUserShield,
  IconWallet,
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
            renderByModule(SidenavModulesEnum.ADMIN_AREAS, {
              id: 'areas',
              title: 'Áreas',
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
              title: 'Entidades financieras',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.entidadesFinancieraNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'tipo-instalacion',
              title: 'Tipo de instalación',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_IVA, {
              id: 'ivas',
              title: 'IVA',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.ivasNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_METODO_PAGO, {
              id: 'metodos-pago',
              title: 'Métodos de pago',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.metodospagoNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_PARAMETRO_SISTEMA, {
              id: 'parametros-sistemas',
              title: 'Parámetro del sistema',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.parametrosSistemasNav,
            }),
            /*
            renderByModule(SidenavModulesEnum.ADMIN_CODIGO_OTP, {
              id: 'codigos-otp-admin',
              title: 'Códigos OTP',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.codigosOtpNav,
            }),
            */
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
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'prueba-integracion',
              title: 'Pruebas de integración',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
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
              title: 'Plan de Internet',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.servicios.planesinternetNav,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'servicio-adicional',
              title: 'Servicios adicionales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.COMERCIAL_PROMOCIONES, {
              id: 'promociones',
              title: 'Promociones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.comercial.promocionesNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'prueba-integracion',
              title: 'Pruebas de integración',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Comercial ----------------
        {
          id: 'comercial',
          title: 'Comercial',
          type: MenuItemType.COLLAPSE,
          icon: IconBuilding,
          children: [
            renderByModule(SidenavModulesEnum.COMERCIAL_SOLICITUD_SERVICIO, {
              id: 'solicitud-servicio',
              title: 'Solicitud de servicio',
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
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'agendamientos',
              title: 'Agendamiento',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'seguimiento-cliente',
              title: 'Seguimiento a clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'integracion-equifax',
              title: 'Integración Equifax',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'comiciones',
              title: 'Comisiones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Supervision Comercial ----------------
        {
          id: 'supervision-comercial',
          title: 'Supervisión Comercial',
          type: MenuItemType.COLLAPSE,
          icon: IconBuildings,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'desbloque-prosperos',
              title: 'Desbloqueo de prospectos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'desbloqueo-preventas',
              title: 'Desbloqueo de preventas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'desbloqueo-agendas',
              title: 'Desbloqueo de agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'reasignacion-gestion-vendedor',
              title: 'Reasignación de gestión de vendedores',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(
              SidenavModulesEnum.SUPERVISIONCOMERCIAL_SOLICITUD_DESBLOQUEO_VENTAS,
              {
                id: 'solicitud-desbloqueo-ventas',
                title: 'Solicitud de liberación de ventas',
                type: MenuItemType.ITEM,
                url: ROUTER_PATHS.supervisionComercial
                  .solicitudDesbloqueoVentasNav,
              },
            ),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Operaciones ----------------
        {
          id: 'operaciones',
          title: 'Operaciones',
          type: MenuItemType.COLLAPSE,
          icon: IconBrandAirtable,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'coordinacion-agendas',
              title: 'Coordinación de agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'recordinacion-agendas',
              title: 'Recordinación de agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'rechazo-agendas',
              title: 'Rechazo de agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Logistica ----------------
        {
          id: 'logistica',
          title: 'Logística',
          type: MenuItemType.COLLAPSE,
          icon: IconAbacus,
          children: [
            renderByModule(SidenavModulesEnum.MANTENIMIENTO_OPERACION, {
              id: 'flotas',
              title: 'Flotas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.mantenimientoOperacion.flotasNav,
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
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'planificaciones',
              title: 'Planificación',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Tecnicos ----------------
        {
          id: 'tecnicos',
          title: 'Técnicos',
          type: MenuItemType.COLLAPSE,
          icon: IconAugmentedReality2,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'solicitud-materiales',
              title: 'Solicitud de materiales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'detalle-material-disponible',
              title: 'Detalle de materiales disponibles',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'motivo-orden-trabajo',
              title: 'Motivos de orden de trabajo',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'asignacion-orden-trabajo',
              title: 'Asignación de orden de trabajo',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'registro-orden-trabajo-instalacion',
              title: 'Registro de orden de trabajo de instalaciones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'registro-orden-trabajo-visita',
              title: 'Registro de orden de trabajo de visitas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'registro-orden-trabajo-retiro',
              title: 'Registro de orden de trabajo de retiros',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'fizcalizacion',
              title: 'Fiscalización',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'registro-orden-trabajo-cambio',
              title: 'Registro de orden de trabajo de cambios de domicilio',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
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
            renderByModule(SidenavModulesEnum.INFRAESTRUCTURA_NAP, {
              id: 'naps',
              title: 'NAPs',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.infraestructura.napsNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'rutas',
              title: 'Rutas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* NetConnect ----------------
        {
          id: 'notconnect',
          title: 'NetConnect',
          type: MenuItemType.COLLAPSE,
          icon: IconAccessPoint,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'autorizacion-onus',
              title: 'Autorización de ONUs',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'gestion-onus',
              title: 'Gestión de ONUs',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'estado-caidas',
              title: 'Estado de caídas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'registro-onus-configuracion',
              title: 'Registro de ONUs configuradas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'vlans',
              title: 'VLANS',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'profiles',
              title: 'Profiles',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'integracion-apis',
              title: 'Integración de APIs',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'configuracion-snmp',
              title: 'Configuración de SNMP',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Administracion de Red ----------------
        {
          id: 'adminitracion-red',
          title: 'Administración de red',
          type: MenuItemType.COLLAPSE,
          icon: IconRouter,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'routers',
              title: 'Router',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'traficos',
              title: 'Radius',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'monitoreos',
              title: 'Monitoreo',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'configuracion-equipos',
              title: 'Configuración de equipos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'ipv4s',
              title: 'PooL IPV4',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'ipv6s',
              title: 'PooL IPV6',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'interaciones',
              title: 'Autorización',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Clientes ----------------
        {
          id: 'clientes',
          title: 'Clientes',
          type: MenuItemType.COLLAPSE,
          icon: IconUsersGroup,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'clientes-homes',
              title: 'Clientes Home',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'clientes-corporativos',
              title: 'Clientes corporativos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'notificaciones',
              title: 'Notificaciones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'mapa-clientes',
              title: 'Mapa de clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'contratos',
              title: 'Contratos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'administracion-general',
              title: 'Administración general',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Cartera ----------------
        {
          id: 'carteras',
          title: 'Cartera',
          type: MenuItemType.COLLAPSE,
          icon: IconWallet,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'rubros',
              title: 'Rubros',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'registro-pagos',
              title: 'Registro de pagos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'gestion-retiro-clientes',
              title: 'Gestión de retiros de clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'promesas-pago',
              title: 'Promesas de pago',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'registro-pagos-masivos',
              title: 'Registro de pagos masivos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'notas-credito',
              title: 'Notas de crédito',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'promesas-pago-emergentes',
              title: 'Promesas de pago emergentes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'promesas-pago-temporales',
              title: 'Promesas de pago temporales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'suspencion-clientes',
              title: 'Suspensión de clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'activacion-temporal',
              title: 'Activación temporal',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'reconexiones',
              title: 'Reconexión',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'parametrizacion-fecha-corte',
              title: 'Parametrización de fechas de corte',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'suspension-temporal',
              title: 'Suspensión temporal',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'retiro-clientes',
              title: 'Retiro de clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'consulta-contratos',
              title: 'Consulta de contratos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'transacciones',
              title: 'Transacciones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'reporte-pagos',
              title: 'Reporte de pagos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'factura-electronicas',
              title: 'Facturación electrónica',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'estadisticas',
              title: 'Estadística',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'consulta-equifax',
              title: 'Consulta de Equifax',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'reporte-equifax',
              title: 'Reporte de Equifax',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'cambio-domicilio',
              title: 'Cambio de domicilio ',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'consulta-contratos',
              title: 'Consulta de contratos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'parametrizacion-costos-visitas',
              title: 'Parametrización de costos de visitas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Desarrollo Monitor Transaccional ----------------
        {
          id: 'desarrollo-monitor-transaccional',
          title: 'Desarrollo Monitor Transaccional',
          type: MenuItemType.COLLAPSE,
          icon: IconDeviceDesktopAnalytics,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'consulta-deuda',
              title: 'Consulta de deuda',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'pago-deuda',
              title: 'Pago de deuda',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'reverso-deuda',
              title: 'Reverso de deuda',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'integracion-entidad-bancaria',
              title: 'Integración de entidad bancaria',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'conciliacion-bancaria',
              title: 'Conciliación bancaria',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Finanzas ----------------
        {
          id: 'finanzas',
          title: 'Finanzas',
          type: MenuItemType.COLLAPSE,
          icon: IconReportMoney,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'reporte-conciliacion',
              title: 'Reporte de conciliación',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'recaudacion-pichincha',
              title: 'Recaudación Pichincha',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'consulta-debito-bancarios',
              title: 'Consulta de débitos bancarios',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Ajustes ----------------
        {
          id: 'ajustes',
          title: 'Ajustes',
          type: MenuItemType.COLLAPSE,
          icon: IconSettings2,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'logs-sistemas',
              title: 'Logs del sistema',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'integracion-servicios',
              title: 'Integración de servicios',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'crontabs',
              title: 'Crontabs',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'importacion-clientes',
              title: 'Importación de clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'base-datos',
              title: 'Base de datos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'informacion-servidor',
              title: 'Información del servidor',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'pasarela-pago',
              title: 'Pasarela de pago',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Soporte Tecnico ----------------
        {
          id: 'soporte-tecnico',
          title: 'Soporte Técnico',
          type: MenuItemType.COLLAPSE,
          icon: IconHeartHandshake,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'desbloquear-usuarios',
              title: 'Desbloquear usuarios',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'auditoria-facturas-nopagadas',
              title: 'Auditoría de facturas no pagadas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Nomina ----------------
        {
          id: 'nomina',
          title: 'Nómina',
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
        /////* Cobranza ----------------
        {
          id: 'cobranza',
          title: 'Cobranza',
          type: MenuItemType.COLLAPSE,
          icon: IconPigMoney,
          children: [
            renderByModule(SidenavModulesEnum.COBRANZA_TARJETA, {
              id: 'tarjetas',
              title: 'Tarjetas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.cobranza.tarjetasNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /*
        /////* Mantenimiento Operación ----------------
        {
          id: 'mantenimiento-operacion',
          title: 'Mantenimiento y Operación',
          type: MenuItemType.COLLAPSE,
          icon: IconBulldozer,
          children: [*/
        /*
            renderByModule(SidenavModulesEnum.MANTENIMIENTO_OPERACION, {
              id: 'flotas',
              title: 'Flotas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.mantenimientoOperacion.flotasNav,
            }),
            */ /*
          ].filter(item => !!item) as NestedMenuItem[],
        },
*/
        /*
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
        */
      ],
    };

    const cleanedMenu = cleanEmptyItems([dashboard, pages]);

    return cleanedMenu;
  }, [cleanEmptyItems, renderByModule]);

  return { menuItems };
};

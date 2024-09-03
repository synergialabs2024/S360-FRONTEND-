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
            renderByModule(SidenavModulesEnum.ADMIN_ENTIDAD_FINANCIERA, {
              id: 'tipo-instalacion',
              title: 'Tipo de Instalacion',
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
            renderByModule(SidenavModulesEnum.USUARIOS_GRUPOS, {
              id: 'prueba-integracion',
              title: 'Pruebas de Integracion',
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
              title: 'Plan Internet',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.servicios.planesinternetNav,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'servicio-adicional',
              title: 'Servicios Adicionales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.COMERCIAL_PROMOCIONES, {
              id: 'promociones',
              title: 'Promociones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.comercial.promocionesNav,
            }),
            renderByModule(SidenavModulesEnum.COMERCIAL_PROMOCIONES, {
              id: 'prueba-integracion',
              title: 'Pruebas de Integracion',
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
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'agendamientos',
              title: 'Agendamiento',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'seguimiento-cliente',
              title: 'Seguimiento Clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'integracion-equifax',
              title: 'Integracion Equifax',
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
          title: 'Supervision Comercial',
          type: MenuItemType.COLLAPSE,
          icon: IconBuildings,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'desbloque-prosperos',
              title: 'Desbloqueo de Prospectos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'desbloqueo-preventas',
              title: 'Desbloqueo de Preventas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'desbloqueo-agendas',
              title: 'Desbloqueos de Agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'reasignacion-gestion-vendedor',
              title: 'Reasignacion de Gestion Vendedores',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
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
        /////* Operaciones ----------------
        {
          id: 'operaciones',
          title: 'Operaciones',
          type: MenuItemType.COLLAPSE,
          icon: IconBrandAirtable,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'coordinacion-agendas',
              title: 'Coordinación de Agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'recordinacion-agendas',
              title: 'Recordinacion de Agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'rechazo-agendas',
              title: 'Rechazo de Agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Logistica ----------------
        {
          id: 'logistica',
          title: 'Logistica',
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
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'planificaicones',
              title: 'Planificacion',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /////* Tecnicos ----------------
        {
          id: 'tecnicos',
          title: 'Tecnicos',
          type: MenuItemType.COLLAPSE,
          icon: IconAugmentedReality2,
          children: [
            renderByModule(SidenavModulesEnum.MANTENIMIENTO_OPERACION, {
              id: 'solicitud-materiales',
              title: 'Solicitud de Materiales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_ZONAS, {
              id: 'detalle-material-disponible',
              title: 'Detalle Materiales Disponibles',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'motivo-orden-trabajo',
              title: 'Motivos Orden de Trabajo',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'asignacion-orden-trabajo',
              title: 'Asignacion Orden de Trabajo',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'registro-orden-trabajo-instalacion',
              title: 'Registro de Orden de Trabajo Instalaciones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'registro-orden-trabajo-visita',
              title: 'Registro de Orden de Trabajo Visitas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'registro-orden-trabajo-retiro',
              title: 'Registro de Orden de Trabajo Retiros',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'fizcalizacion',
              title: 'Fiscalizacion',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'registro-orden-trabajo-cambio',
              title: 'Registro de Orden de Trabajo Cambios de Domicilio',
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
            renderByModule(SidenavModulesEnum.INFRAESTRUCTURA_NAP, {
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
            renderByModule(SidenavModulesEnum.MANTENIMIENTO_OPERACION, {
              id: 'autorizacion-onus',
              title: 'Autorizacion de Onus ',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_ZONAS, {
              id: 'gestion-onus',
              title: 'Gestion de Onus',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'estado-caidas',
              title: 'Estado de Caidas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'registro-onus-configuracion',
              title: 'Registro Onus Configuradas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'vlans',
              title: 'VLANS',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'profiles',
              title: 'Profiles',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'integracion-apis',
              title: 'Integracion de Apis',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'configuracion-snmp',
              title: 'Configuracion de SNMP',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Administracion de Red ----------------
        {
          id: 'adminitracion-red',
          title: 'Administracion de Red',
          type: MenuItemType.COLLAPSE,
          icon: IconRouter,
          children: [
            renderByModule(SidenavModulesEnum.MANTENIMIENTO_OPERACION, {
              id: 'routers',
              title: 'Router',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_ZONAS, {
              id: 'traficos',
              title: 'Radius(Trafico)',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'monitoreos',
              title: 'Monitoreo',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'configuracion-equipos',
              title: 'Configuracion Equipos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'ipv4s',
              title: 'PooL IPV4',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'ipv6s',
              title: 'PooL IPV6',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'interaciones',
              title: 'Autorizacion',
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
            renderByModule(SidenavModulesEnum.MANTENIMIENTO_OPERACION, {
              id: 'clientes-homes',
              title: 'Clientes Home',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_ZONAS, {
              id: 'clientes-corporativos',
              title: 'Clientes Corporativos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'notificaciones',
              title: 'Notificaciones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'mapa-clientes',
              title: 'Mapa Clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'contratos',
              title: 'Contratos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'administracion-general',
              title: 'Administracion General',
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
            renderByModule(SidenavModulesEnum.MANTENIMIENTO_OPERACION, {
              id: 'rubros',
              title: 'Rubros',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_ZONAS, {
              id: 'registro-pagos',
              title: 'Registro de Pagos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'gestion-retiro-clientes',
              title: 'Gestion de Retiros de Clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'promesas-pago',
              title: 'Promesas de Pago',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'registro-pagos-masivos',
              title: 'Registro de Pagos Masivos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'notas-credito',
              title: 'Notas de Credito',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'promesas-pago-emergentes',
              title: 'Promesas de Pago Emergentes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'promesas-pago-temporales',
              title: 'Promesas de Pago Temporales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'suspencion-clientes',
              title: 'Suspension de Clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'activacion-temporal',
              title: 'Activacion Temporal',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'reconexiones',
              title: 'Reconexion',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'parametrizacion-fecha-corte',
              title: 'Parametrizacion Fechas de Corte',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'suspension-temporal',
              title: 'Suspension Temporal',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'retiro-clientes',
              title: 'Retiro de Clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'consulta-contratos',
              title: 'Consulta de Contratos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'transacciones',
              title: 'Transacciones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'reporte-pagos',
              title: 'Reporte de Pagos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'factura-electronicas',
              title: 'Facturacion Electronica',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'estadisticas',
              title: 'Estadistica',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'consulta-equifax',
              title: 'Consulta de Equifax',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'reporte-equifax',
              title: 'Reporte de Equifax',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'cambio-domicilio',
              title: 'Cambio de Domicilio ',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'consulta-contratos',
              title: 'Consulta de Contratos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'parametrizacion-costos-visitas',
              title: 'Parametrizacion Costos Visitas',
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
            renderByModule(SidenavModulesEnum.NOMINA_CARGO, {
              id: 'consulta-deuda',
              title: 'Consulta de Deuda',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'pago-deuda',
              title: 'Pago de Deuda',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'reverso-deuda',
              title: 'Reverso de Deuda',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'integracion-entidad-bancaria',
              title: 'Integracion Entidad Bancaria',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'conciliacion-bancaria',
              title: 'Conciliacion Bancaria',
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
            renderByModule(SidenavModulesEnum.NOMINA_CARGO, {
              id: 'reporte-conciliacion',
              title: 'Reporte de Conciliacion',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'recaudacion-pichincha',
              title: 'Recaudacion Pichincha',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'consulta-debito-bancarios',
              title: 'Consulta de Debitos Bancarios',
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
            renderByModule(SidenavModulesEnum.NOMINA_CARGO, {
              id: 'logs-sistemas',
              title: 'Logs del Sistema',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'integracion-servicios',
              title: 'Intgegracion de Servicios',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'crontabs',
              title: 'Crontabs',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'importacion-clientes',
              title: 'Importacion de Clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'base-datos',
              title: 'Base de Datos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'informacion-servidor',
              title: 'Informacion de Servidor',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'pasarela-pago',
              title: 'Pasarela de Pago',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Soporte Tecnico ----------------
        {
          id: 'soporte-tecnico',
          title: 'Soporte Tecnico',
          type: MenuItemType.COLLAPSE,
          icon: IconHeartHandshake,
          children: [
            renderByModule(SidenavModulesEnum.NOMINA_CARGO, {
              id: 'debloquear-usuarios',
              title: 'Debloquear usuarios',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
              // target: true, // target blank
            }),
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'auditoria-facturas-nopagadas',
              title: 'Auditoria Facturas No Pagadas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },

        /*
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
        */

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

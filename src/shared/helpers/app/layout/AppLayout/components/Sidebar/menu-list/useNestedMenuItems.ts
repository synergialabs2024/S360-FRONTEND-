import {
  IconAbacus,
  IconAccessPoint,
  IconAugmentedReality2,
  IconBrandAirtable,
  IconBuilding,
  IconBuildings,
  IconBuildingWarehouse,
  IconCashRegister,
  IconHeartHandshake,
  IconHierarchy3,
  IconPigMoney,
  IconReportMoney,
  IconRouter,
  IconUserCog,
  IconUsersGroup,
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
    /*
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
    */

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
            renderByModule(SidenavModulesEnum.ADMIN_PROVINCIAS, {
              id: 'provincias',
              title: 'Provincias',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.provinciasNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_PAISES, {
              id: 'paises',
              title: 'Países',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.paisNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_CIUDADES, {
              id: 'ciudades',
              title: 'Ciudades',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.ciudadesNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_IVA, {
              id: 'ivas',
              title: 'IVA',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.ivasNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_ENTIDAD_FINANCIERA, {
              id: 'entidades-financiera',
              title: 'Entidades financieras',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.entidadesFinancieraNav,
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
            renderByModule(SidenavModulesEnum.ADMIN_CODIGO_OTP, {
              id: 'codigos-otp-admin',
              title: 'Administracion de Codigo OTP',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.codigosOtpNav,
            }),
            renderByModule(SidenavModulesEnum.COMERCIAL_PROMOCIONES, {
              id: 'promociones',
              title: 'Promociones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.comercial.promocionesNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_CENTRO_COSTO, {
              id: 'centro-costo',
              title: 'Centro de costo',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.centrocostosNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_CANAL_VENTA, {
              id: 'canales-venta',
              title: 'Canales de venta',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.canalesVentaNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_TRAZABILIDAD_VENTA, {
              id: 'trazabilidades-venta',
              title: 'Trazabilidad venta',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.trazabilidadesVentaNav,
            }),
            renderByModule(SidenavModulesEnum.COBRANZA_TARJETA, {
              id: 'tarjetas',
              title: 'Tarjetas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.cobranza.tarjetasNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'cooperativas-ahorro-credito',
              title: 'Cooperativas de ahorro y crédito',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_TIPO_COMPROBANTE, {
              id: 'tipo-comprobantes',
              title: 'Tipo de comprobante',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.tipocomprobantesNav,
            }),
            /*
            renderByModule(SidenavModulesEnum.ADMIN_EMPRESAS, {
              id: 'empresas',
              title: 'Empresas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.empresasNav,
            }),
            */
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Control de Usuarios ----------------
        {
          id: 'control-usuario',
          title: 'Control de Usuarios',
          type: MenuItemType.COLLAPSE,
          icon: IconUserCog,
          children: [
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
              url: ROUTER_PATHS.comercial.solicitudServicioCrearNav,
            }),
            renderByModule(SidenavModulesEnum.COMERCIAL_PREVENTA, {
              id: 'preventas',
              title: 'Preventas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.comercial.preventasNav,
            }),
            renderByModule(SidenavModulesEnum.COMERCIAL_AGENDAMIENTO, {
              id: 'agendamiento-ventas',
              title: 'Agendamiento',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.comercial.agendamientosNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'seguimiento-cliente',
              title: 'Seguimiento a clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'comiciones',
              title: 'Comisiones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'venta-orporativas',
              title: 'Ventas Corporativas',
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
            renderByModule(
              SidenavModulesEnum.SUPERVISIONCOMERCIAL_SOLICITUD_DESBLOQUEO_VENTAS,
              {
                id: 'desbloqueo-solicitud-consulta',
                title: 'Desbloqueo de solicitudes de consultas nuevas',
                type: MenuItemType.ITEM,
                url: ROUTER_PATHS.supervisionComercial
                  .solicitudDesbloqueoVentasNav,
              },
            ),
            renderByModule(
              SidenavModulesEnum.SUPERVISIONCOMERCIAL_SOLICITUD_DESBLOQUEO_PREVENTAS,
              {
                id: 'desbloqueo-cliente-preventa',
                title: 'Desbloqueo de clientes preventa',
                type: MenuItemType.ITEM,
                url: ROUTER_PATHS.supervisionComercial
                  .solicitudDesbloqueoPreventaNav,
              },
            ),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'desbloqueo-cliente-agendas',
              title: 'Desbloqueo de clientes agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(
              SidenavModulesEnum.SUPERVISIONCOMERCIAL_REASIGNACION_VENTAS,
              {
                id: 'reasignacion-ventas-vendedores',
                title: 'Reasignación de ventas de vendedores',
                type: MenuItemType.ITEM,
                url: ROUTER_PATHS.supervisionComercial.reasignacionVentasNav,
              },
            ),
            renderByModule(SidenavModulesEnum.SUPERVISIONCOMERCIAL_CODIGO_OTP, {
              id: 'codigos-otp',
              title: 'Libreacion de Código OTP',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.supervisionComercial.codigosOtpNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Catalogo de Productos ----------------
        {
          id: 'catalogo-producto',
          title: 'Catalogo de Productos',
          type: MenuItemType.COLLAPSE,
          icon: IconUserCog,
          children: [
            renderByModule(SidenavModulesEnum.INVENTARIO_PRODUCTO, {
              id: 'inventariables',
              title: 'Iventariables',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.inventario.productosNav,
            }),
            renderByModule(SidenavModulesEnum.SERVICIOS_PLAN, {
              id: 'productos-ventas',
              title: 'Ventas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.servicios.planesinternetNav,
            }),
            renderByModule(SidenavModulesEnum.INVENTARIO_CATEGORIA_PRODUCTO, {
              id: 'categorias-producto',
              title: 'Categoría de Producto',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.inventario.categoriaProductoNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Gestion de Inventarios ----------------
        {
          id: 'gestion-iventarios',
          title: 'Gestion de Iventarios',
          type: MenuItemType.COLLAPSE,
          icon: IconBuildingWarehouse,
          children: [
            renderByModule(SidenavModulesEnum.INVENTARIO_BODEGA, {
              id: 'bodegas',
              title: 'Bodegas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.inventario.bodegasNav,
            }),
            renderByModule(SidenavModulesEnum.INVENTARIO_UBICACION, {
              id: 'ubicaciones',
              title: 'Ubicaciones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.inventario.ubicacionesNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'solicitud-materiales-bodega',
              title: 'Recepción de solicitudes de materiales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'egreso-mercaderia',
              title: 'Egreso de Inventario',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'ingreso-mercaderia',
              title: 'Ingreso de Inventario',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'movimiento-mercaderia',
              title: 'Movimiento de Inventario',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'solcitud-devoluciones',
              title: 'Recepción de solicitud de devolución',
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
              id: 'asignacion-orden-trabajo',
              title: 'Órdenes de trabajo asignadas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'registro-orden-trabajo',
              title: 'Registro de Orden de Trabajo',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'solicitud-materiales-tecnico',
              title: 'Solicitud de materiales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'detalle-materiales',
              title: 'Detalle de Materiales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'solicitud-detalle-devolucion',
              title: 'Solicitud de devolución de materiales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
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
              url: ROUTER_PATHS.operaciones.agendamientosNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'recoordinacion-agendas',
              title: 'Recoordinación de agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'rechazo-agendas',
              title: 'Rechazo de agendas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'aprobacion-solicitud-materiales',
              title: 'Aprobación de solicitud de materiales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'aprobacion-solicitud-devolucion',
              title: 'Aprobación de solicitud de devolución',
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
            renderByModule(SidenavModulesEnum.ADMIN_ZONAS, {
              id: 'zonas',
              title: 'Zonas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.zonasNav,
            }),
            renderByModule(SidenavModulesEnum.MANTENIMIENTO_OPERACION, {
              id: 'flotas',
              title: 'Flotas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.mantenimientoOperacion.flotasNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'organizacion-horarios',
              title: 'Organización de horarios',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.mantenimientoOperacion.planificadoresNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_SECTORES, {
              id: 'sectores',
              title: 'Sectores',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracion.sectoresNav,
            }),
            renderByModule(SidenavModulesEnum.ADMIN_PAISES, {
              id: 'tipo-instalacion',
              title: 'Tipo de instalación',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.logistica.tipoinstalacionesNav,
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
            renderByModule(SidenavModulesEnum.INFRAESTRUCTURA_RUTA, {
              id: 'rutas',
              title: 'Rutas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.infraestructura.rutasNav,
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
              id: 'clientes',
              title: 'Clientes',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'configuracion-plantillas',
              title: 'Configuración de plantilla',
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
              id: 'contratos',
              title: 'Contratos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
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
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'facturas',
              title: 'Facturas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'rubros',
              title: 'Rubros',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'transacciones-cobranzas',
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
              id: 'promesas-pago',
              title: 'Promesas de pago',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'parametrizacion-costos-visitas',
              title: 'Parametrización de costos de visitas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(
              SidenavModulesEnum.SUPERVISIONCOMERCIAL_CONSULTA_BURO,
              {
                id: 'consultas-buro',
                title: 'Reporte de consultas EQUIFAX',
                type: MenuItemType.ITEM,
                url: ROUTER_PATHS.supervisionComercial.consultasBuroNav,
              },
            ),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'activacion-clientes-temporales',
              title: 'Activación de clientes temporales',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'suspesion-temporales',
              title: 'Suspensión temporal',
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
            renderByModule(SidenavModulesEnum.ADMINISTRACION_RED_ROUTER, {
              id: 'routers',
              title: 'Router',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracionRed.routersNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'bras',
              title: 'Bras',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'ipv4s',
              title: 'Redes IPV4',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'ipv6s',
              title: 'Redes IPV6',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.ADMINISTRACION_RED_MONITOREO, {
              id: 'monitoreos',
              title: 'Monitoreo',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracionRed.monitoreosNav,
            }),
            renderByModule(SidenavModulesEnum.ADMINISTRACION_RED_TRAFICO, {
              id: 'traficos',
              title: 'Tráfico',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracionRed.traficosNav,
            }),
            renderByModule(SidenavModulesEnum.ADMINISTRACION_RED_RADIUS, {
              id: 'radius',
              title: 'Radius',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracionRed.radiusNav,
            }),
            renderByModule(SidenavModulesEnum.ADMINISTRACION_RED_AUTHCLIENTES, {
              id: 'autenticacion-cliente',
              title: 'Autenticación del cliente',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.administracionRed.autenticacionClientesNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* NetConnect ----------------
        {
          id: 'netconnect',
          title: 'NetConnect',
          type: MenuItemType.COLLAPSE,
          icon: IconAccessPoint,
          children: [
            renderByModule(SidenavModulesEnum.NETCONNECT_AUTORIZACION_ONUS, {
              id: 'autorizacion-onus',
              title: 'Autorización de ONUs',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.netconnect.autorizacionOnusNav,
            }),
            renderByModule(SidenavModulesEnum.NETCONNECT_GESTION_ONUS, {
              id: 'gestion-onus',
              title: 'Gestión de ONUs',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.netconnect.gestionOnusNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'estado-caidas',
              title: 'Estado de caídas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.NETCONNECT_ONUS_CONFIGURADA, {
              id: 'registro-onus-configuracion',
              title: 'Registro de ONUs configuradas',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.netconnect.onusConfiguradasNav,
            }),
            renderByModule(SidenavModulesEnum.NETCONNECT_VLANS, {
              id: 'vlans',
              title: 'VLANS',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.netconnect.vlansNav,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'profiles',
              title: 'Profiles',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'autorizacion-onu-xml',
              title: 'Autorización de ONU con archivo XML',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'auditoria-consumos',
              title: 'Auditoría de consumos',
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
            renderByModule(SidenavModulesEnum.NOMINA_EMPLEADO, {
              id: 'empleados',
              title: 'Empleados',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.nomina.empleadosNav,
            }),
            renderByModule(SidenavModulesEnum.NOMINA_CARGO, {
              id: 'cargos',
              title: 'Cargos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.nomina.cargosNav,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
        /////* Finanzas ----------------
        {
          id: 'monitor-transaccional',
          title: 'Monitor Transaccional',
          type: MenuItemType.COLLAPSE,
          icon: IconCashRegister,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'metodo-transaccionar',
              title: 'Método de Transaccionar',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'conciliacion-bancaria',
              title: 'Conciliación Bancaria',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'generacion-malla-compensacion',
              title: 'Generación de Malla de Compensación',
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
          icon: IconRouter,
          children: [
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'rubros-finanza',
              title: 'Rubros financieros',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'transacciones-finanzas',
              title: 'Transacciones',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'saldos',
              title: 'Saldos',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'conciliacion-bancaria',
              title: 'Conciliación bancaria',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
            renderByModule(SidenavModulesEnum.INDEFINIDO, {
              id: 'debitos-bancarios',
              title: 'Débitos bancarios',
              type: MenuItemType.ITEM,
              url: ROUTER_PATHS.notFound,
            }),
          ].filter(item => !!item) as NestedMenuItem[],
        },
      ],
    };

    //const cleanedMenu = cleanEmptyItems([dashboard, pages]);
    const cleanedMenu = cleanEmptyItems([pages]);

    return cleanedMenu;
  }, [cleanEmptyItems, renderByModule]);

  return { menuItems };
};

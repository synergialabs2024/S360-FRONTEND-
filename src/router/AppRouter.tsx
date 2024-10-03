import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';

import InfraestructuraModule from '@/app/infraestructura/InfraestructuraModule';

import { Loadable } from '@/shared/components/common';
import AuthRoutes from './AuthRoutes';
import { ROUTER_PATHS } from './constants';

const AppLayout = Loadable(
  lazy(() => import('@/app/layout/AppLayout/AppLayout')),
);
const AuthLayout = Loadable(
  lazy(() => import('@/auth/layout/AuthLayout/AuthLayout')),
);

const Home1 = Loadable(lazy(() => import('@/app/home/pages/Home1')));
const Error404 = Loadable(lazy(() => import('@/shared/pages/error/Error404')));

const LoginPage = Loadable(
  lazy(() => import('@/auth/pages/LoginPage/LoginPage')),
);

const AdministrationModule = Loadable(
  lazy(() => import('@/app/administration/AdministrationModule')),
);
const PaisesPage = Loadable(
  lazy(() => import('@/app/administration/pais/pages/tables/PaisesPage')),
);
const UpdatePaisPage = Loadable(
  lazy(() => import('@/app/administration/pais/pages/forms/UpdatePaisPage')),
);
const CreatePaisPage = Loadable(
  lazy(() => import('@/app/administration/pais/pages/forms/CreatePaisPage')),
);
const ProvinciasPage = Loadable(
  lazy(
    () => import('@/app/administration/provincia/pages/tables/ProvinciasPage'),
  ),
);
const CreateProvinciaPage = Loadable(
  lazy(
    () =>
      import('@/app/administration/provincia/pages/forms/CreateProvinciaPage'),
  ),
);
const UpdateProvinciaPage = Loadable(
  lazy(
    () =>
      import('@/app/administration/provincia/pages/forms/UpdateProvinciaPage'),
  ),
);
const CiudadesPage = Loadable(
  lazy(() => import('@/app/administration/ciudad/pages/tables/CiudadesPage')),
);
const CreateCiudadPage = Loadable(
  lazy(
    () => import('@/app/administration/ciudad/pages/forms/CreateCiudadPage'),
  ),
);
const UpdateCiudadPage = Loadable(
  lazy(
    () => import('@/app/administration/ciudad/pages/forms/UpdateCiudadPage'),
  ),
);
const ZonasPage = Loadable(
  lazy(() => import('@/app/administration/zona/pages/tables/ZonasPage')),
);
const CreateZonaPage = Loadable(
  lazy(() => import('@/app/administration/zona/pages/forms/CreateZonaPage')),
);
const UpdateZonaPage = Loadable(
  lazy(() => import('@/app/administration/zona/pages/forms/UpdateZonaPage')),
);
const SectoresPage = Loadable(
  lazy(() => import('@/app/administration/sector/pages/tables/SectoresPage')),
);
const CreateSectorPage = Loadable(
  lazy(
    () => import('@/app/administration/sector/pages/forms/CreateSectorPage'),
  ),
);
const UpdateSectorPage = Loadable(
  lazy(
    () => import('@/app/administration/sector/pages/forms/UpdateSectorPage'),
  ),
);
const AreasPage = Loadable(
  lazy(() => import('@/app/administration/area/pages/tables/AreasPage')),
);
const CreateAreaPage = Loadable(
  lazy(() => import('@/app/administration/area/pages/forms/CreateAreaPage')),
);
const UpdateAreaPage = Loadable(
  lazy(() => import('@/app/administration/area/pages/forms/UpdateAreaPage')),
);

const SystemUserPage = Loadable(
  lazy(
    () =>
      import('@/app/administration/system-user/pages/tables/SystemUserPage'),
  ),
);
const SystemsGroupPage = Loadable(
  lazy(
    () =>
      import('@/app/administration/system-group/pages/tables/SystemsGroupPage'),
  ),
);
const CreateSystemGroupPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/system-group/pages/forms/CreateSystemGroupPage'
      ),
  ),
);
const UpdateSystemGroupPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/system-group/pages/forms/UpdateSystemGroupPage'
      ),
  ),
);
const CreateSystemUserPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/system-user/pages/forms/CreateSystemUserPage'
      ),
  ),
);
const UpdateSystemUserPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/system-user/pages/forms/UpdateSystemUserPage'
      ),
  ),
);
const DepartamentosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/departamento/pages/tables/DepartamentosPage'
      ),
  ),
);
const CreateDepartamentoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/departamento/pages/forms/CreateDepartamentoPage'
      ),
  ),
);
const UpdateDepartamentoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/departamento/pages/forms/UpdateDepartamentoPage'
      ),
  ),
);
const CanalesVentaPage = Loadable(
  lazy(
    () =>
      import('@/app/administration/canal-venta/pages/tables/CanalesVentaPage'),
  ),
);
const CreateCanalVentaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/canal-venta/pages/forms/CreateCanalVentaPage'
      ),
  ),
);
const UpdateCanalVentaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/canal-venta/pages/forms/UpdateCanalVentaPage'
      ),
  ),
);
const EmpresasPage = Loadable(
  lazy(() => import('@/app/administration/empresa/pages/tables/EmpresasPage')),
);
const CreateEmpresaPage = Loadable(
  lazy(
    () => import('@/app/administration/empresa/pages/forms/CreateEmpresaPage'),
  ),
);
const UpdateEmpresaPage = Loadable(
  lazy(
    () => import('@/app/administration/empresa/pages/forms/UpdateEmpresaPage'),
  ),
);
const EntidadesFinancieraPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/entidad-financiera/pages/tables/EntidadesFinancieraPage'
      ),
  ),
);
const CreateEntidadFinancieraPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/entidad-financiera/pages/forms/CreateEntidadFinancieraPage'
      ),
  ),
);
const UpdateEntidadFinancieraPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/entidad-financiera/pages/forms/UpdateEntidadFinancieraPage'
      ),
  ),
);
const IVAsPage = Loadable(
  lazy(() => import('@/app/administration/iva/pages/tables/IVAsPage')),
);
const CreateIVAPage = Loadable(
  lazy(() => import('@/app/administration/iva/pages/forms/CreateIVAPage')),
);
const UpdateIVAPage = Loadable(
  lazy(() => import('@/app/administration/iva/pages/forms/UpdateIVAPage')),
);
const MetodosPagoPage = Loadable(
  lazy(
    () =>
      import('@/app/administration/metodo-pago/pages/tables/MetodosPagoPage'),
  ),
);
const CreateMetodoPagoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/metodo-pago/pages/forms/CreateMetodoPagoPage'
      ),
  ),
);
const UpdateMetodoPagoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/metodo-pago/pages/forms/UpdateMetodoPagoPage'
      ),
  ),
);
const ParametrosSistemasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/parametro-sistema/pages/tables/ParametrosSistemasPage'
      ),
  ),
);
const CreateParametroSistemaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/parametro-sistema/pages/forms/CreateParametroSistemaPage'
      ),
  ),
);
const UpdateParametroSistemaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/parametro-sistema/pages/forms/UpdateParametroSistemaPage'
      ),
  ),
);

///* NOMINA
//Cargo
const CargosPage = Loadable(
  lazy(() => import('@/app/nomina/cargo/pages/tables/CargosPage')),
);
const CreateCargoPage = Loadable(
  lazy(() => import('@/app/nomina/cargo/pages/forms/CreateCargoPage')),
);
const UpdateCargoPage = Loadable(
  lazy(() => import('@/app/nomina/cargo/pages/forms/UpdateCargoPage')),
);
const EmpleadosPage = Loadable(
  lazy(() => import('@/app/nomina/empleado/pages/tables/EmpleadosPage')),
);
const CreateEmpleadoPage = Loadable(
  lazy(() => import('@/app/nomina/empleado/pages/forms/CreateEmpleadoPage')),
);
const UpdateEmpleadoPage = Loadable(
  lazy(() => import('@/app/nomina/empleado/pages/forms/UpdateEmpleadoPage')),
);

const PlanInternetsPage = Loadable(
  lazy(
    () => import('@/app/servicios/planinternet/pages/tables/PlanInternetsPage'),
  ),
);
const CreatePlanInternetPage = Loadable(
  lazy(
    () =>
      import('@/app/servicios/planinternet/pages/forms/CreatePlanInternetPage'),
  ),
);
const UpdatePlanInternetPage = Loadable(
  lazy(
    () =>
      import('@/app/servicios/planinternet/pages/forms/UpdatePlanInternetPage'),
  ),
);

const ComercialModule = Loadable(
  lazy(() => import('@/app/comercial/ComercialModule')),
);
const PromocionesPage = Loadable(
  lazy(() => import('@/app/comercial/promocion/pages/tables/PromocionsPage')),
);
const CreatePromocionPage = Loadable(
  lazy(
    () => import('@/app/comercial/promocion/pages/forms/CreatePromocionPage'),
  ),
);
const UpdatePromocionPage = Loadable(
  lazy(
    () => import('@/app/comercial/promocion/pages/forms/UpdatePromocionPage'),
  ),
);

///* Sales ---------------------
const SolicitudesServicioMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/solicitud-servicio/pages/tables/SolicitudesServicioMainPage'
      ),
  ),
);
const CreateSolicitudServicioPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/solicitud-servicio/pages/forms/CreateSolicitudServicioPage'
      ),
  ),
);

///* Supervision Comercial ------------
const SupervisionComercialModule = Loadable(
  lazy(() => import('@/app/supervision-comercial/SupervisionComercialModule')),
);
const SolicitudsDesbloqueoPreventasMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/supervision-comercial/desbloqueo-preventa/pages/tables/SolicitudsDesbloqueoPreventasMainPage'
      ),
  ),
);
const SolicitudsDesbloqueoVentasMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/solicitud-desbloqueo-ventas/pages/tables/SolicitudsDesbloqueoVentasMainPage'
      ),
  ),
);
const CodigosOtpSupervicionComercialMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/codigo-otp/pages/tables/CodigosOtpSupervicionComercialMainPage'
      ),
  ),
);
const CodigosOtpMainPage = Loadable(
  lazy(
    () => import('@/app/comercial/codigo-otp/pages/tables/CodigosOtpMainPage'),
  ),
);

const TrazabilidadVentasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/trazabilidad-venta/pages/tables/TrazabilidadVentasPage'
      ),
  ),
);

const PreventasMainPage = Loadable(
  lazy(() => import('@/app/comercial/preventa/pages/tables/PreventasMainPage')),
);
const CreatePreventaPage = Loadable(
  lazy(() => import('@/app/comercial/preventa/pages/forms/CreatePreventaPage')),
);
const AgendamientoVentasMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/agendamiento/pages/tables/AgendamientoVentasMainPage'
      ),
  ),
);
const CreateAgendamientoVentasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/agendamiento/pages/forms/CreateAgendamientoVentasPage'
      ),
  ),
);

///* Infraestructura ------------
//Nodo
const NodosPage = Loadable(
  lazy(() => import('@/app/infraestructura/nodo/pages/tables/NodosPage')),
);
const CreateNodoPage = Loadable(
  lazy(() => import('@/app/infraestructura/nodo/pages/forms/CreateNodoPage')),
);
const UpdateNodoPage = Loadable(
  lazy(() => import('@/app/infraestructura/nodo/pages/forms/UpdateNodoPage')),
);
// OLT
const OLTsPage = Loadable(
  lazy(() => import('@/app/infraestructura/olt/pages/tables/OLTsPage')),
);
const CreateOLTPage = Loadable(
  lazy(() => import('@/app/infraestructura/olt/pages/forms/CreateOLTPage')),
);
const UpdateOLTPage = Loadable(
  lazy(() => import('@/app/infraestructura/olt/pages/forms/UpdateOLTPage')),
);
// NAP
const NapsPage = Loadable(
  lazy(() => import('@/app/infraestructura/nap/pages/tables/NapsPage')),
);
const CreateNapPage = Loadable(
  lazy(() => import('@/app/infraestructura/nap/pages/forms/CreateNapPage')),
);
const UpdateNapPage = Loadable(
  lazy(() => import('@/app/infraestructura/nap/pages/forms/UpdateNapPage')),
);
// RADIOBASE
const RadioBasesPage = Loadable(
  lazy(
    () => import('@/app/infraestructura/radiobase/pages/tables/RadioBasesPage'),
  ),
);
const CreateRadioBasePage = Loadable(
  lazy(
    () =>
      import('@/app/infraestructura/radiobase/pages/forms/CreateRadioBasePage'),
  ),
);
const UpdateRadioBasePage = Loadable(
  lazy(
    () =>
      import('@/app/infraestructura/radiobase/pages/forms/UpdateRadioBasePage'),
  ),
);

///* Mantenimiento Operaciones ------------
const MantenimientoOperacionModule = Loadable(
  lazy(() => import('@/app/mante-operacion/MantenimientoOperacionModule')),
);
const FlotasPage = Loadable(
  lazy(() => import('@/app/mante-operacion/flota/pages/tables/FlotasPage')),
);
const CreateFlotaPage = Loadable(
  lazy(() => import('@/app/mante-operacion/flota/pages/forms/CreateFlotaPage')),
);
const UpdateFlotaPage = Loadable(
  lazy(() => import('@/app/mante-operacion/flota/pages/forms/UpdateFlotaPage')),
);

///* Cobranza ------------
const CobranzaModule = Loadable(
  lazy(() => import('@/app/cobranza/CobranzaModule')),
);
const TarjetasPage = Loadable(
  lazy(() => import('@/app/cobranza/tarjeta/pages/tables/TarjetasPage')),
);
const CreateTarjetaPage = Loadable(
  lazy(() => import('@/app/cobranza/tarjeta/pages/forms/CreateTarjetaPage')),
);
const UpdateTarjetaPage = Loadable(
  lazy(() => import('@/app/cobranza/tarjeta/pages/forms/UpdateTarjetaPage')),
);

const ConsultasBuroPage = Loadable(
  lazy(() => import('@/app/comercial/consultas-buro/pages/ConsultasBuroPage')),
);

///* Operaciones ------------
const AgendamientosMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/agedamiento/pages/tables/AgendamientosMainPage'
      ),
  ),
);
const ConfirmAgendaOperacionesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/agedamiento/pages/forms/ConfirmAgendaOperacionesPage'
      ),
  ),
);
const PlanificadorsPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/mante-operacion/planificador/pages/tables/PlanificadorsPage'
      ),
  ),
);
const PlanificadorFlotaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/mante-operacion/planificador/pages/custom/PlanificadorFlotaPage'
      ),
  ),
);

///* Administracion red ------------
const AdministracionRedModule = Loadable(
  lazy(() => import('@/app/administracion-red/AdministracionRedModule')),
);
const RoutersPage = Loadable(
  lazy(
    () => import('@/app/administracion-red/router/pages/tables/RoutersPage'),
  ),
);
const CreateRouterPage = Loadable(
  lazy(
    () =>
      import('@/app/administracion-red/router/pages/forms/CreateRouterPage'),
  ),
);
const UpdateRouterPage = Loadable(
  lazy(
    () =>
      import('@/app/administracion-red/router/pages/forms/UpdateRouterPage'),
  ),
);
///* Cliente ------------
//Servicio
const ServiciosPage = Loadable(
  lazy(() => import('@/app/cliente/servicio/pages/tables/ServiciosPage')),
);
const UpdateServicioPage = Loadable(
  lazy(() => import('@/app/cliente/servicio/pages/forms/UpdateServicioPage')),
);

const AppRouter = createBrowserRouter([
  ////* Auth
  {
    path: '/auth',
    element: (
      <AuthRoutes>
        <AuthLayout />
      </AuthRoutes>
    ),
    children: [{ path: 'login', element: <LoginPage /> }],
  },

  ////* Private ---------------------
  {
    path: '/',
    element: (
      <PrivateRoutes>
        <AppLayout />
      </PrivateRoutes>
    ),
    children: [
      //////////* Home ------------
      {
        index: true,
        element: <Home1 />,
      },

      //////////* Administration ------------
      {
        path: ROUTER_PATHS.administracion.root,
        element: <AdministrationModule />,
        children: [
          ///* pais
          {
            path: ROUTER_PATHS.administracion.pais,
            element: <PaisesPage />,
          },
          {
            path: ROUTER_PATHS.administracion.paisCrear,
            element: <CreatePaisPage />,
          },
          {
            path: ROUTER_PATHS.administracion.paisEditar,
            element: <UpdatePaisPage />,
          },

          ///* provincia
          {
            path: ROUTER_PATHS.administracion.provincias,
            element: <ProvinciasPage />,
          },
          {
            path: ROUTER_PATHS.administracion.provinciasCrear,
            element: <CreateProvinciaPage />,
          },
          {
            path: ROUTER_PATHS.administracion.provinciasEditar,
            element: <UpdateProvinciaPage />,
          },

          ///* ciudad
          {
            path: ROUTER_PATHS.administracion.ciudades,
            element: <CiudadesPage />,
          },
          {
            path: ROUTER_PATHS.administracion.ciudadesCrear,
            element: <CreateCiudadPage />,
          },
          {
            path: ROUTER_PATHS.administracion.ciudadesEditar,
            element: <UpdateCiudadPage />,
          },

          ///* zona
          {
            path: ROUTER_PATHS.administracion.zonas,
            element: <ZonasPage />,
          },
          {
            path: ROUTER_PATHS.administracion.zonasCrear,
            element: <CreateZonaPage />,
          },
          {
            path: ROUTER_PATHS.administracion.zonasEditar,
            element: <UpdateZonaPage />,
          },

          ///* sector
          {
            path: ROUTER_PATHS.administracion.sectores,
            element: <SectoresPage />,
          },
          {
            path: ROUTER_PATHS.administracion.sectoresCrear,
            element: <CreateSectorPage />,
          },
          {
            path: ROUTER_PATHS.administracion.sectoresEditar,
            element: <UpdateSectorPage />,
          },

          ///* area
          {
            path: ROUTER_PATHS.administracion.areas,
            element: <AreasPage />,
          },
          {
            path: ROUTER_PATHS.administracion.areasCrear,
            element: <CreateAreaPage />,
          },
          {
            path: ROUTER_PATHS.administracion.areasEditar,
            element: <UpdateAreaPage />,
          },

          ///* departamento
          {
            path: ROUTER_PATHS.administracion.departamentos,
            element: <DepartamentosPage />,
          },
          {
            path: ROUTER_PATHS.administracion.departamentosCrear,
            element: <CreateDepartamentoPage />,
          },
          {
            path: ROUTER_PATHS.administracion.departamentosEditar,
            element: <UpdateDepartamentoPage />,
          },
          {
            path: ROUTER_PATHS.administracion.canalesVenta,
            element: <CanalesVentaPage />,
          },
          {
            path: ROUTER_PATHS.administracion.canalesVentaCrear,
            element: <CreateCanalVentaPage />,
          },
          {
            path: ROUTER_PATHS.administracion.canalesVentaEditar,
            element: <UpdateCanalVentaPage />,
          },

          ///* empresa
          {
            path: ROUTER_PATHS.administracion.empresas,
            element: <EmpresasPage />,
          },
          {
            path: ROUTER_PATHS.administracion.empresasCrear,
            element: <CreateEmpresaPage />,
          },
          {
            path: ROUTER_PATHS.administracion.empresasEditar,
            element: <UpdateEmpresaPage />,
          },

          ///* entidad financiera
          {
            path: ROUTER_PATHS.administracion.entidadesFinanciera,
            element: <EntidadesFinancieraPage />,
          },
          {
            path: ROUTER_PATHS.administracion.entidadesFinancieraCrear,
            element: <CreateEntidadFinancieraPage />,
          },
          {
            path: ROUTER_PATHS.administracion.entidadesFinancieraEditar,
            element: <UpdateEntidadFinancieraPage />,
          },

          ///* iva
          {
            path: ROUTER_PATHS.administracion.ivas,
            element: <IVAsPage />,
          },
          {
            path: ROUTER_PATHS.administracion.ivasCrear,
            element: <CreateIVAPage />,
          },
          {
            path: ROUTER_PATHS.administracion.ivasEditar,
            element: <UpdateIVAPage />,
          },
          ///* metodo pago
          {
            path: ROUTER_PATHS.administracion.metodospago,
            element: <MetodosPagoPage />,
          },
          {
            path: ROUTER_PATHS.administracion.metodospagoCrear,
            element: <CreateMetodoPagoPage />,
          },
          {
            path: ROUTER_PATHS.administracion.metodospagoEditar,
            element: <UpdateMetodoPagoPage />,
          },

          ///* Parametro Sistema
          {
            path: ROUTER_PATHS.administracion.parametrosSistemas,
            element: <ParametrosSistemasPage />,
          },
          {
            path: ROUTER_PATHS.administracion.parametrosSistemasCrear,
            element: <CreateParametroSistemaPage />,
          },
          {
            path: ROUTER_PATHS.administracion.parametrosSistemasEditar,
            element: <UpdateParametroSistemaPage />,
          },

          ///* Codigo OTP
          {
            path: ROUTER_PATHS.administracion.codigosOtp,
            element: <CodigosOtpMainPage />,
          },

          ///* Trazabilidad Venta
          {
            path: ROUTER_PATHS.administracion.trazabilidadesVenta,
            element: <TrazabilidadVentasPage />,
          },

          ///* USER ----------
          {
            path: ROUTER_PATHS.administracion.usuarios,
            element: <SystemUserPage />,
          },
          {
            path: ROUTER_PATHS.administracion.usuariosCrear,
            element: <CreateSystemUserPage />,
          },
          {
            path: ROUTER_PATHS.administracion.usuariosEditar,
            element: <UpdateSystemUserPage />,
          },
          {
            path: ROUTER_PATHS.administracion.grupos,
            element: <SystemsGroupPage />,
          },
          {
            path: ROUTER_PATHS.administracion.gruposCrear,
            element: <CreateSystemGroupPage />,
          },
          {
            path: ROUTER_PATHS.administracion.gruposEditar,
            element: <UpdateSystemGroupPage />,
          },
        ],
      },

      //////////* Nomina ------------
      {
        path: ROUTER_PATHS.nomina.root,
        element: <AdministrationModule />,
        children: [
          ///* cargo
          {
            path: ROUTER_PATHS.nomina.cargos,
            element: <CargosPage />,
          },
          {
            path: ROUTER_PATHS.nomina.cargosCrear,
            element: <CreateCargoPage />,
          },
          {
            path: ROUTER_PATHS.nomina.cargosEditar,
            element: <UpdateCargoPage />,
          },
          ///* empleado
          {
            path: ROUTER_PATHS.nomina.empleados,
            element: <EmpleadosPage />,
          },
          {
            path: ROUTER_PATHS.nomina.empleadosCrear,
            element: <CreateEmpleadoPage />,
          },
          {
            path: ROUTER_PATHS.nomina.empleadosEditar,
            element: <UpdateEmpleadoPage />,
          },
        ],
      },

      //////////* Mantenimiento Operaciones ------------
      {
        path: ROUTER_PATHS.mantenimientoOperacion.root,
        element: <MantenimientoOperacionModule />,
        children: [
          ///* flotas
          {
            path: ROUTER_PATHS.mantenimientoOperacion.flotas,
            element: <FlotasPage />,
          },
          {
            path: ROUTER_PATHS.mantenimientoOperacion.flotasCrear,
            element: <CreateFlotaPage />,
          },
          {
            path: ROUTER_PATHS.mantenimientoOperacion.flotasEditar,
            element: <UpdateFlotaPage />,
          },

          ///* planificador
          {
            path: ROUTER_PATHS.mantenimientoOperacion.planificadoresNav,
            element: <PlanificadorsPage />,
          },
          {
            path: ROUTER_PATHS.mantenimientoOperacion.planificadorFlota,
            element: <PlanificadorFlotaPage />,
          },
        ],
      },

      //////////* Cobranza ------------
      {
        path: ROUTER_PATHS.cobranza.root,
        element: <CobranzaModule />,
        children: [
          ///* tarjetas
          {
            path: ROUTER_PATHS.cobranza.tarjetas,
            element: <TarjetasPage />,
          },
          {
            path: ROUTER_PATHS.cobranza.tarjetasCrear,
            element: <CreateTarjetaPage />,
          },
          {
            path: ROUTER_PATHS.cobranza.tarjetasEditar,
            element: <UpdateTarjetaPage />,
          },
        ],
      },

      //////////* Infraestructura ------------
      {
        path: ROUTER_PATHS.infraestructura.root,
        element: <InfraestructuraModule />,
        children: [
          ///* Nodo
          {
            path: ROUTER_PATHS.infraestructura.nodos,
            element: <NodosPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.nodosCrear,
            element: <CreateNodoPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.nodosEditar,
            element: <UpdateNodoPage />,
          },

          ///* OLT
          {
            path: ROUTER_PATHS.infraestructura.olts,
            element: <OLTsPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.oltsCrear,
            element: <CreateOLTPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.oltsEditar,
            element: <UpdateOLTPage />,
          },

          ///* NAP
          {
            path: ROUTER_PATHS.infraestructura.naps,
            element: <NapsPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.napsCrear,
            element: <CreateNapPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.napsEditar,
            element: <UpdateNapPage />,
          },

          ///* RADIOBASE
          {
            path: ROUTER_PATHS.infraestructura.radiobases,
            element: <RadioBasesPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.radiobasesCrear,
            element: <CreateRadioBasePage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.radiobasesEditar,
            element: <UpdateRadioBasePage />,
          },
        ],
      },

      //////////* Servicios ------------
      {
        path: ROUTER_PATHS.servicios.root,
        element: <AdministrationModule />,
        children: [
          ///* plan
          {
            path: ROUTER_PATHS.servicios.planesinternet,
            element: <PlanInternetsPage />,
          },
          {
            path: ROUTER_PATHS.servicios.planesinternetCrear,
            element: <CreatePlanInternetPage />,
          },
          {
            path: ROUTER_PATHS.servicios.planesinternetEditar,
            element: <UpdatePlanInternetPage />,
          },
        ],
      },

      //////////* Supervision Comercial ------------
      {
        path: ROUTER_PATHS.supervisionComercial.root,
        element: <SupervisionComercialModule />,
        children: [
          ///* solicitud liberacion
          {
            path: ROUTER_PATHS.supervisionComercial.solicitudDesbloqueoVentas,
            element: <SolicitudsDesbloqueoVentasMainPage />,
          },
          ///* codigos otp
          {
            path: ROUTER_PATHS.supervisionComercial.codigosOtp,
            element: <CodigosOtpSupervicionComercialMainPage />,
          },
          ///* consultas buro
          {
            path: ROUTER_PATHS.supervisionComercial.consultasBuro,
            element: <ConsultasBuroPage />,
          },
          ///* desbloqueo preventa
          {
            path: ROUTER_PATHS.supervisionComercial.solicitudDesbloqueoPreventa,
            element: <SolicitudsDesbloqueoPreventasMainPage />,
          },
        ],
      },

      //////////* Comercial ------------
      {
        path: ROUTER_PATHS.comercial.root,
        element: <ComercialModule />,
        children: [
          ///* promocion
          {
            path: ROUTER_PATHS.comercial.promociones,
            element: <PromocionesPage />,
          },
          {
            path: ROUTER_PATHS.comercial.promocionesCrear,
            element: <CreatePromocionPage />,
          },
          {
            path: ROUTER_PATHS.comercial.promocionesEditar,
            element: <UpdatePromocionPage />,
          },

          ///* solicitud de servicio
          {
            path: ROUTER_PATHS.comercial.solicitudServicio,
            element: <SolicitudesServicioMainPage />,
          },
          {
            path: ROUTER_PATHS.comercial.solicitudServicioCrear,
            element: <CreateSolicitudServicioPage />,
          },

          ///* preventas
          {
            path: ROUTER_PATHS.comercial.preventas,
            element: <PreventasMainPage />,
          },
          {
            path: ROUTER_PATHS.comercial.preventasCrear,
            element: <CreatePreventaPage />,
          },

          ///* agendamiento
          {
            path: ROUTER_PATHS.comercial.agendamientos,
            element: <AgendamientoVentasMainPage />,
          },
          {
            path: ROUTER_PATHS.comercial.createAgendamiento,
            element: <CreateAgendamientoVentasPage />,
          },
        ],
      },

      //////////* Operaciones ------------
      {
        path: ROUTER_PATHS.operaciones.root,

        children: [
          ///* agendamientos
          {
            path: ROUTER_PATHS.operaciones.agendamientos,
            element: <AgendamientosMainPage />,
          },
          {
            path: ROUTER_PATHS.operaciones.agendamientosPending,
            element: <ConfirmAgendaOperacionesPage />,
          },
        ],
      },

      //////////* Cliente ------------
      {
        path: ROUTER_PATHS.clientes.root,
        element: <AdministrationModule />,
        children: [
          ///* servicio
          {
            path: ROUTER_PATHS.clientes.servicios,
            element: <ServiciosPage />,
          },
          {
            path: ROUTER_PATHS.clientes.serviciosEditar,
            element: <UpdateServicioPage />,
          },
        ],
      },

      //////////* Administracion Red ------------
      {
        path: ROUTER_PATHS.administracionRed.root,
        element: <AdministracionRedModule />,
        children: [
          ///* router
          {
            path: ROUTER_PATHS.administracionRed.routers,
            element: <RoutersPage />,
          },
          {
            path: ROUTER_PATHS.administracionRed.routersCrear,
            element: <CreateRouterPage />,
          },
          {
            path: ROUTER_PATHS.administracionRed.routersEditar,
            element: <UpdateRouterPage />,
          },
        ],
      },

      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

export default AppRouter;

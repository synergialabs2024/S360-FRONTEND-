// @ts-ignore
import { lazy } from 'react';

import AdministrationModule from '@/app/administration/AdministrationModule';
import CreateSolicitudMaterialPage from '@/app/inventario/solicitud-material/pages/forms/CreateSolicitudMaterialPage';
import SolicitudMaterialMainPage from '@/app/inventario/solicitud-material/pages/tables/SolicitudMaterialMainPage';
import Loadable from '@/layouts/full/shared/loadable/Loadable';
import AuthRoutes from './AuthRoutes';
import PrivateRoutes from './PrivateRoutes';
import { ROUTER_PATHS } from './constants';

const AuthLayout = Loadable(
  lazy(() => import('@/auth/pages/LoginPage/LoginPage')),
);

const Home1 = Loadable(lazy(() => import('../views/dashboard/Modern')));

// authentication
const LoginPage = Loadable(
  // lazy(() => import('../views/authentication/auth1/Login')),
  lazy(() => import('../auth/pages/LoginPage/LoginPage')),
);

/* ***Layouts**** */

/* ****Pages***** */

const BlockedSystemUsers = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/system-user/pages/tables/BlockedSystemUsers'
      ),
  ),
);
const Error404 = Loadable(lazy(() => import('@/shared/pages/error/Error404')));
// import PaginaTabs from './PaginaTabs';
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

// const AdministrationModule = Loadable(
//   lazy(() => import('@/app/administration/AdministrationModule')),
// );
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
const MotivosRechazoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/motivo-rechazo/pages/tables/MotivosRechazoPage'
      ),
  ),
);
const CreateMotivoRechazoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/motivo-rechazo/pages/forms/CreateMotivoRechazoPage'
      ),
  ),
);
const UpdateMotivoRechazoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/motivo-rechazo/pages/forms/UpdateMotivoRechazoPage'
      ),
  ),
);
const MotivosActualizacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/motivo-actualizacion/pages/tables/MotivosActualizacionPage'
      ),
  ),
);
const CreateMotivoActualizacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/motivo-actualizacion/pages/forms/CreateMotivoActualizacionPage'
      ),
  ),
);
const UpdateMotivoActualizacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/motivo-actualizacion/pages/forms/UpdateMotivoActualizacionPage'
      ),
  ),
);

const CentroCostosPage = Loadable(
  lazy(
    () =>
      import('@/app/administration/centro-costo/pages/tables/CentroCostosPage'),
  ),
);
const CreateCentroCostoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/centro-costo/pages/forms/CreateCentroCostoPage'
      ),
  ),
);
const UpdateCentroCostoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/centro-costo/pages/forms/UpdateCentroCostoPage'
      ),
  ),
);

const TipoComprobantesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/tipo-comprobante/pages/tables/TipoComprobantesPage'
      ),
  ),
);
const CreateTipoComprobantePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/tipo-comprobante/pages/forms/CreateTipoComprobantePage'
      ),
  ),
);
const UpdateTipocomprobantePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/tipo-comprobante/pages/forms/UpdateTipocomprobantePage'
      ),
  ),
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
const CalendarioFacturacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/calendario-facturacion/pages/tables/CalendarioFacturacionPage'
      ),
  ),
);
const CreateCalendarioFacturacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/calendario-facturacion/pages/forms/CreateCalendarioFacturacionPage'
      ),
  ),
);
const UpdateCalendarioFacturacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/calendario-facturacion/pages/forms/UpdateCalendarioFacturacionPage'
      ),
  ),
);
// const EmpresasPage = Loadable(
//   lazy(() => import('@/app/administration/empresa/pages/tables/EmpresasPage')),
// );
// const CreateEmpresaPage = Loadable(
//   lazy(
//     () => import('@/app/administration/empresa/pages/forms/CreateEmpresaPage'),
//   ),
// );
// const UpdateEmpresaPage = Loadable(
//   lazy(
//     () => import('@/app/administration/empresa/pages/forms/UpdateEmpresaPage'),
//   ),
// );
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

// const ComercialModule = Loadable(
//   lazy(() => import('@/app/comercial/ComercialModule')),
// );
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

///* Instalaciones ---------------------
const InstalacionesVentasMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/instalacion/pages/tables/InstalacionesComercialOTMainPage'
      ),
  ),
);

const InstalacionPreRechazadaOT = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/instalacion/pages/forms/InstalacionPreRechazadaOT'
      ),
  ),
);

///* Supervision Comercial ------------
// const SupervisionComercialModule = Loadable(
//   lazy(() => import('@/app/supervision-comercial/SupervisionComercialModule')),
// );
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
const ReasignacionVentasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/supervision-comercial/reasignacion-ventas/pages/tables/ReasignacionVentasPage'
      ),
  ),
);

const SolicitudsAprobacionIAPreventaMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/supervision-comercial/solicitud-aprobacion-ia-preventa/pages/tables/SolicitudsAprobacionIAPreventaMainPage'
      ),
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
const TeleventasMainPage = Loadable(
  lazy(
    () => import('@/app/comercial/televentas/pages/tables/TeleventasMainPage'),
  ),
);
const PreventasMainPage = Loadable(
  lazy(() => import('@/app/comercial/preventa/pages/tables/PreventasMainPage')),
);
const CreatePreventaPage = Loadable(
  lazy(() => import('@/app/comercial/preventa/pages/forms/CreatePreventaPage')),
);

// correccion preventas

const CorreccionPreventasMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/correccion-preventa/pages/tables/CorreccionPreventasMainPage'
      ),
  ),
);
const CorreccionesPreventaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/correccion-preventa/pages/forms/CorreccionesPreventaPage'
      ),
  ),
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
const ConfigOLTPage = Loadable(
  lazy(() => import('@/app/infraestructura/olt/pages/forms/ConfigOLTPage')),
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
// PRIMERY NAP
const PrimaryNapPage = Loadable(
  lazy(
    () =>
      import('@/app/infraestructura/primary-nap/pages/tables/PrimaryNapPage'),
  ),
);
const CreatePrimaryNapPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/infraestructura/primary-nap/pages/forms/CreatePrimaryNapPage'
      ),
  ),
);
const UpdatePrimaryNapPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/infraestructura/primary-nap/pages/forms/UpdatePrimaryNapPage'
      ),
  ),
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
// RUTA
const RutasPage = Loadable(
  lazy(() => import('@/app/infraestructura/ruta/pages/tables/RutasPage')),
);
const CreateRutaPage = Loadable(
  lazy(() => import('@/app/infraestructura/ruta/pages/forms/CreateRutaPage')),
);
const UpdateRutaPage = Loadable(
  lazy(() => import('@/app/infraestructura/ruta/pages/forms/UpdateRutaPage')),
);

const GrupoIPv4sPage = Loadable(
  lazy(
    () =>
      import('@/app/administracion-red/grupoipv4/pages/tables/GruposIPv4Page'),
  ),
);
const CreateGrupoIPv4Page = Loadable(
  lazy(
    () =>
      import(
        '@/app/administracion-red/grupoipv4/pages/forms/CreateGrupoIPv4Page'
      ),
  ),
);
const UpdateGrupoIPv4Page = Loadable(
  lazy(
    () =>
      import(
        '@/app/administracion-red/grupoipv4/pages/forms/UpdateGrupoIPv4Page'
      ),
  ),
);
const GrupoIPv6sPage = Loadable(
  lazy(
    () =>
      import('@/app/administracion-red/grupoipv6/pages/tables/GruposIPv6Page'),
  ),
);
const CreateGrupoIPv6Page = Loadable(
  lazy(
    () =>
      import(
        '@/app/administracion-red/grupoipv6/pages/forms/CreateGrupoIPv6Page'
      ),
  ),
);
const UpdateGrupoIPv6Page = Loadable(
  lazy(
    () =>
      import(
        '@/app/administracion-red/grupoipv6/pages/forms/UpdateGrupoIPv6Page'
      ),
  ),
);

///* Mantenimiento Operaciones ------------
// const MantenimientoOperacionModule = Loadable(
//   lazy(() => import('@/app/mante-operacion/MantenimientoOperacionModule')),
// );
const FlotasPage = Loadable(
  lazy(() => import('@/app/mante-operacion/flota/pages/tables/FlotasPage')),
);
const CreateFlotaPage = Loadable(
  lazy(() => import('@/app/mante-operacion/flota/pages/forms/CreateFlotaPage')),
);
const UpdateFlotaPage = Loadable(
  lazy(() => import('@/app/mante-operacion/flota/pages/forms/UpdateFlotaPage')),
);
///* Cartera ------------
// const CarteraModule = Loadable(
//   lazy(() => import('@/app/cartera/CarteraModule')),
// );
const CreateVentaConvenioPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/venta-convenio/pages/forms/CreateVentaConvenioPage'
      ),
  ),
);

const CambioDomicilioPage = Loadable(
  lazy(
    () =>
      import('@/app/cartera/cambio-domicilio/pages/tables/CambioDomicilioPage'),
  ),
);
const CreateCambioDomicilioPage = Loadable(
  lazy(
    () =>
      import('@/app/cartera/cambio-domicilio/pages/forms/CambioDomicilioPage'),
  ),
);
const CambioPlanPage = Loadable(
  lazy(() => import('@/app/cartera/cambio-plan/pages/forms/CambioPlanPage')),
);

const CambioPlanByStatePage = Loadable(
  lazy(
    () =>
      import('@/app/cartera/cambio-plan/pages/tables/CambioPlanByStatePage'),
  ),
);

const PromesaPagoByStatePage = Loadable(
  lazy(
    () =>
      import('@/app/cartera/promesa-pago/pages/tables/PromesaPagoByStatePage'),
  ),
);

const CreatePromesaPagoPage = Loadable(
  lazy(
    () =>
      import('@/app/cartera/promesa-pago/pages/forms/CreatePromesaPagoPage'),
  ),
);

const UpdatePromesaPagoPage = Loadable(
  lazy(
    () =>
      import('@/app/cartera/promesa-pago/pages/forms/UpdatePromesaPagoPage'),
  ),
);

const MantenedorActivacionesBaseByStatePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-activaciones/mantenedor-activaciones-base/pages/tables/MantenedorActivacionesBaseByStatePage'
      ),
  ),
);

const MantenedorActivacionByStatePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-activaciones/mantenedor-activacion/pages/tables/MantenedorActivacionByStatePage'
      ),
  ),
);

// Buzon tareas

const BuzonTareasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/buzon-tarea/pages/tables/BuzonTareasPage'
      ),
  ),
);

const CreateBuzonTareasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/buzon-tarea/pages/forms/CreateBuzonTareasPage'
      ),
  ),
);

// Criterio mantenedor activaciones
const CriterioMantenedorActivacionesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-activaciones/parametros/criterio-mantenedor-activaciones/pages/tables/CriterioMantenedorActivacionesPage'
      ),
  ),
);

const CreateCriterioMantenedorActivacionesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-activaciones/parametros/criterio-mantenedor-activaciones/pages/forms/CreateCriterioMantenedorActivacionesPage'
      ),
  ),
);

const UpdateCriterioMantenedorActivacionesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-activaciones/parametros/criterio-mantenedor-activaciones/pages/forms/UpdateCriterioMantenedorActivacionesPage'
      ),
  ),
);

// Tipo mantenedor aplicaciones
const TipoMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios/pages/tables/TipoMantenedorBeneficiosPage'
      ),
  ),
);

const CreateTipoMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios/pages/forms/CreateTipoMantenedorBeneficiosPage'
      ),
  ),
);

const UpdateTipoMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios/pages/forms/UpdateTipoMantenedorBeneficiosPage'
      ),
  ),
);

// Subtipo mantenedor aplicaciones
const SubtipoMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios/pages/tables/SubtipoMantenedorBeneficiosPage'
      ),
  ),
);

const CreateSubtipoMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios/pages/forms/CreateSubtipoMantenedorBeneficiosPage'
      ),
  ),
);

const UpdateSubtipoMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios/pages/forms/UpdateSubtipoMantenedorBeneficiosPage'
      ),
  ),
);

// Beneficio mantenedor aplicaciones
const BeneficioMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios/pages/tables/BeneficioMantenedorBeneficiosPage'
      ),
  ),
);

const CreateBeneficioMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios/pages/forms/CreateBeneficioMantenedorBeneficiosPage'
      ),
  ),
);
const UpdateBeneficioMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios/pages/forms/UpdateBeneficioMantenedorBeneficiosPage'
      ),
  ),
);

// Causa mantenedor aplicaciones

const CausaMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/causa-mantenedor-beneficios/pages/tables/CausaMantenedorBeneficiosPage'
      ),
  ),
);

const CreateCausaMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/causa-mantenedor-beneficios/pages/forms/CreateCausaMantenedorBeneficiosPage'
      ),
  ),
);

const UpdateCausaMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/causa-mantenedor-beneficios/pages/forms/UpdateCausaMantenedorBeneficiosPage'
      ),
  ),
);

// Solucion mantenedor aplicaciones
const SolucionMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/solucion-mantenedor-beneficios/pages/tables/SolucionMantenedorBeneficiosPage'
      ),
  ),
);

const CreateSolucionMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/solucion-mantenedor-beneficios/pages/forms/CreateSolucionMantenedorBeneficiosPage'
      ),
  ),
);

const UpdateSolucionMantenedorBeneficiosPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/buzon-tareas/parametros/solucion-mantenedor-beneficios/pages/forms/UpdateSolucionMantenedorBeneficiosPage'
      ),
  ),
);

// Suspension mantenedor aplicaciones

const MantenedorSuspensionByStatePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-suspension/pages/tables/MantenedorSuspensionByStatePage'
      ),
  ),
);

const MantenedorSuspensionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-suspension/pages/forms/MantenedorSuspensionPage'
      ),
  ),
);

const UpdateMantenedorSuspensionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-suspension/pages/forms/UpdateMantenedorSuspensionPage'
      ),
  ),
);

const MantenedorAplicacionesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-activaciones/mantenedor-activaciones-base/pages/forms/MantenedorActivacionesBasePage'
      ),
  ),
);

const UpdateMantenedorActivacionesBasePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-activaciones/mantenedor-activaciones-base/pages/forms/UpdateMantenedorActivacionesBasePage'
      ),
  ),
);

const MantenedorActivacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-activaciones/mantenedor-activacion/pages/forms/MantenedorActivacionPage'
      ),
  ),
);

const UpdateMantenedorActivacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/mantenedor-activaciones/mantenedor-activacion/pages/forms/UpdateMantenedorActivacionPage'
      ),
  ),
);

const CambioPropietarioPagoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/cambio-propietario/pages/forms/CambioPropietarioPagoPage'
      ),
  ),
);
const AlquilerPages = Loadable(
  lazy(() => import('@/app/cartera/alquiler/pages/tables/AlquilerPages')),
);
const AlquilerFormPage = Loadable(
  lazy(() => import('@/app/cartera/alquiler/pages/forms/AlquilerFormPage')),
);

const RubrosPage = Loadable(
  lazy(() => import('@/app/cobranza/rubros/pages/tables/RubrosPage')),
);
const TransaccionsPage = Loadable(
  lazy(
    () => import('@/app/cobranza/transaccion/pages/tables/TransaccionsPage'),
  ),
);
const SaldosPage = Loadable(
  lazy(() => import('@/app/cobranza/saldo/pages/tables/SaldosPage')),
);
const ConfiguracionPlantillaClienteCarteraPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cobranza/config-plantilla/ConfiguracionPlantillaClienteCarteraPage'
      ),
  ),
);

const ActivacionManualWithFilterByStatePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/activacion-manual/pages/tables/ActivacionManualWithFilterByStatePage'
      ),
  ),
);

const ActivacionManualByStatePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cartera/activacion-manual/pages/tables/ActivacionManualByStatePage'
      ),
  ),
);

const FacturasPage = Loadable(
  lazy(() => import('@/app/cobranza/factura/pages/tables/FacturasPage')),
);
///* Cobranza ------------
// const CobranzaModule = Loadable(
//   lazy(() => import('@/app/cobranza/CobranzaModule')),
// );
const TarjetasPage = Loadable(
  lazy(() => import('@/app/cobranza/tarjeta/pages/tables/TarjetasPage')),
);
const CreateTarjetaPage = Loadable(
  lazy(() => import('@/app/cobranza/tarjeta/pages/forms/CreateTarjetaPage')),
);
const UpdateTarjetaPage = Loadable(
  lazy(() => import('@/app/cobranza/tarjeta/pages/forms/UpdateTarjetaPage')),
);
const MotivosRubroAdicionalPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cobranza/motivo-rubro-adicional/pages/tables/MotivosRubroAdicionalPage'
      ),
  ),
);
const CreateMotivoRubroAdicionalPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cobranza/motivo-rubro-adicional/pages/forms/CreateMotivoRubroAdicionalPage'
      ),
  ),
);
const UpdateMotivoRubroAdicionalPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cobranza/motivo-rubro-adicional/pages/forms/UpdateMotivoRubroAdicionalPage'
      ),
  ),
);

const ConsultasBuroPage = Loadable(
  lazy(() => import('@/app/comercial/consultas-buro/pages/ConsultasBuroPage')),
);

const PlanPagoCuotasPage = Loadable(
  lazy(
    () =>
      import('@/app/cobranza/plan-pago-cuota/pages/tables/PlanPagoCuotasPage'),
  ),
);
const CreatePlanPagoCuotaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cobranza/plan-pago-cuota/pages/forms/CreatePlanPagoCuotaPage'
      ),
  ),
);
const PlanPagoCuotaPage = Loadable(
  lazy(
    () =>
      import('@/app/cobranza/plan-pago-cuota/pages/forms/UpdatePlanPagoCuota'),
  ),
);
const ClientePendienteDevolucionMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cobranza/cliente-pendiente-devolucion/pages/tables/ClientePendienteDevolucionMainPage'
      ),
  ),
);

///* Operaciones ------------
// const AgendamientosMainPage = Loadable(
//   lazy(
//     () =>
//       import(
//         '@/app/operaciones/agedamiento/pages/tables/AgendamientosMainPage'
//       ),
//   ),
// );
// const ConfirmAgendaOperacionesPage = Loadable(
//   lazy(
//     () =>
//       import(
//         '@/app/operaciones/agedamiento/pages/forms/ConfirmAgendaOperacionesPage'
//       ),
//   ),
// );
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
// const AdministracionRedModule = Loadable(
//   lazy(() => import('@/app/administracion-red/AdministracionRedModule')),
// );
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
const MonitoreosPage = Loadable(
  lazy(
    () =>
      import('@/app/administracion-red/monitoreo/pages/tables/MonitoreosPage'),
  ),
);
const CreateMonitoreoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administracion-red/monitoreo/pages/forms/CreateMonitoreoPage'
      ),
  ),
);
const UpdateMonitoreoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administracion-red/monitoreo/pages/forms/UpdateMonitoreoPage'
      ),
  ),
);
const TraficosPage = Loadable(
  lazy(
    () => import('@/app/administracion-red/trafico/pages/tables/TraficosPage'),
  ),
);
const BrassPage = Loadable(
  lazy(() => import('@/app/administracion-red/brass/pages/tables/BrassPage')),
);
const CreateBrassPage = Loadable(
  lazy(
    () => import('@/app/administracion-red/brass/pages/forms/CreateBrassPage'),
  ),
);
const UpdateBrassPage = Loadable(
  lazy(
    () => import('@/app/administracion-red/brass/pages/forms/UpdateBrassPage'),
  ),
);

const RadiusPage = Loadable(
  lazy(() => import('@/app/administracion-red/radius/pages/tables/RadiusPage')),
);
const AutenticacionClientePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administracion-red/autenticacion-cliente/pages/tables/AutenticacionClientePage'
      ),
  ),
);
///* Cliente ------------InstalacionComercialOTByState
//Servicio
const ServiciosPage = Loadable(
  lazy(() => import('@/app/cliente/servicio/pages/tables/ServiciosPage')),
);
const UpdateServicioPage = Loadable(
  lazy(() => import('@/app/cliente/servicio/pages/forms/UpdateServicioPage')),
);

///* Inventario ------------
//Bodega
const BodegasPage = Loadable(
  lazy(() => import('@/app/inventario/bodega/pages/tables/BodegasPage')),
);
const CreateBodegaPage = Loadable(
  lazy(() => import('@/app/inventario/bodega/pages/forms/CreateBodegaPage')),
);
const UpdateBodegaPage = Loadable(
  lazy(() => import('@/app/inventario/bodega/pages/forms/UpdateBodegaPage')),
);
const ProductosPage = Loadable(
  lazy(() => import('@/app/inventario/producto/pages/tables/ProductosPage')),
);
const CreateProductoPage = Loadable(
  lazy(
    () => import('@/app/inventario/producto/pages/forms/CreateProductoPage'),
  ),
);
const UpdateProductoPage = Loadable(
  lazy(
    () => import('@/app/inventario/producto/pages/forms/UpdateProductoPage'),
  ),
);
const CategoriasProductoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/categoria-producto/pages/tables/CategoriasProductoPage'
      ),
  ),
);
const CreateCategoriaProductoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/categoria-producto/pages/forms/CreateCategoriaProductoPage'
      ),
  ),
);
const UpdateCategoriaProductoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/categoria-producto/pages/forms/UpdateCategoriaProductoPage'
      ),
  ),
);
const UbicacionsPage = Loadable(
  lazy(() => import('@/app/inventario/ubicacion/pages/tables/UbicacionsPage')),
);
const CreateUbicacionPage = Loadable(
  lazy(
    () => import('@/app/inventario/ubicacion/pages/forms/CreateUbicacionPage'),
  ),
);
const UpdateUbicacionPage = Loadable(
  lazy(
    () => import('@/app/inventario/ubicacion/pages/forms/UpdateUbicacionPage'),
  ),
);
const IngresoMaterialesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/ingreso-material/pages/tables/IngresoMaterialesPage'
      ),
  ),
);
const CreateIngresoMaterialPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/ingreso-material/pages/forms/CreateIngresoMaterialPage'
      ),
  ),
);
const EgresoMaterialesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/egreso-material/pages/tables/EgresoMaterialesPage'
      ),
  ),
);
const CreateEgresoMaterialPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/egreso-material/pages/forms/CreateEgresoMaterialPage'
      ),
  ),
);
const MovimientoMaterialesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/movimiento-material/pages/tables/MovimientoMaterialesPage'
      ),
  ),
);
const TransferenciaMaterialPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/transferencia-material/pages/tables/TransferenciaMaterialPage'
      ),
  ),
);
const CreateTransferenciaMaterialPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/transferencia-material/pages/forms/CreateTransferenciaMaterialPage'
      ),
  ),
);
const RecepcionMaterialMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/recepcion-material/pages/tables/RecepcionMaterialMainPage'
      ),
  ),
);
const UpdateRecepcionMaterialPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/recepcion-material/pages/forms/UpdateRecepcionMaterialPage'
      ),
  ),
);
const ModeloInventariosPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/modelo-inventario/pages/tables/ModeloInventariosPages'
      ),
  ),
);
const CreateModeloInventariosPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/modelo-inventario/pages/forms/CreateModeloInventariosPages'
      ),
  ),
);
const UpdateModeloInventariosPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/modelo-inventario/pages/forms/UpdateModeloInventariosPages'
      ),
  ),
);
const SolicitudDevolucionMainPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/solicitud-devolucion/pages/tables/SolicitudDevolucionMainPages'
      ),
  ),
);
const CreateSolicitudDevolucionPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/solicitud-devolucion/pages/forms/CreateSolicitudDevolucionPages'
      ),
  ),
);
const SolicitudTransferenciaMaterialMainPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/solicitud-transferencia-material/pages/tables/SolicitudTransferenciaMaterialMainPages'
      ),
  ),
);
const CreateSolicitudTransferenciaMaterialPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/solicitud-transferencia-material/pages/forms/CreateSolicitudTransferenciaMaterialPage'
      ),
  ),
);
const RecepcionSolicitudTransferenciaMaterialMainPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/recepcion-solicitud-transferencia/pages/tables/RecepcionSolicitudTransferenciaMaterialMainPages'
      ),
  ),
);
const CreateRecepcionSolicitudTransferenciaMaterialPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/recepcion-solicitud-transferencia/pages/forms/CreateRecepcionSolicitudTransferenciaMaterialPage'
      ),
  ),
);
const MotivoEgresoPages = Loadable(
  lazy(
    () =>
      import('@/app/inventario/motivo-egreso/pages/tables/MotivoEgresoPages'),
  ),
);
const CreateMotivoEgresoPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/motivo-egreso/pages/forms/CreateMotivoEgresoPages'
      ),
  ),
);
const UpdateMotivoEgresoPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/motivo-egreso/pages/forms/UpdateMotivoEgresoPages'
      ),
  ),
);
const MotivoIngresoPages = Loadable(
  lazy(
    () =>
      import('@/app/inventario/motivo-ingreso/pages/tables/MotivoIngresoPages'),
  ),
);
const CreateMotivoIngresoPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/motivo-ingreso/pages/forms/CreateMotivoIngresoPages'
      ),
  ),
);
const UpdateMotivoIngresoPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/motivo-ingreso/pages/forms/UpdateMotivoIngresoPages'
      ),
  ),
);
const MotivoTransferenciaPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/motivo-transferencia/pages/tables/MotivoTransferenciaPages'
      ),
  ),
);
const CreateMotivoTransferenciaPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/motivo-transferencia/pages/forms/CreateMotivoTransferenciaPages'
      ),
  ),
);
const UpdateMotivoTransferenciaPages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/motivo-transferencia/pages/forms/UpdateMotivoTransferenciaPages'
      ),
  ),
);
const ReporteStocksPages = Loadable(
  lazy(
    () =>
      import('@/app/inventario/reporte-stock/pages/tables/ReporteStocksPages'),
  ),
);
const CuentaContablePages = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/cuenta-contable/pages/tables/CuentaContablePages'
      ),
  ),
);
const CreateCuentaContablePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/cuenta-contable/pages/forms/CreateCuentaContablePage'
      ),
  ),
);
const UpdateCuentaContablePage = Loadable(
  lazy(
    () =>
      import(
        '@/app/inventario/cuenta-contable/pages/forms/UpdateCuentaContablePage'
      ),
  ),
);

///* Logistica ------------
//TipoInstalacion
const TipoInstalacionesPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/logistica/tipo-instalacion/pages/tables/TipoInstalacionesPage'
      ),
  ),
);
const CreateTipoInstalacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/logistica/tipo-instalacion/pages/forms/CreateTipoInstalacionPage'
      ),
  ),
);
const UpdateTipoInstalacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/logistica/tipo-instalacion/pages/forms/UpdateTipoInstalacionPage'
      ),
  ),
);

///* Netconnect ------------
//Autorizacion de ONUs
const AutorizacionOnusPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/netconnect/autorizacion-onus/pages/tables/AutorizacionOnusPage'
      ),
  ),
);
//Gestion de ONUs
const GestionOnusPage = Loadable(
  lazy(
    () => import('@/app/netconnect/gestion-onus/pages/tables/GestionOnusPage'),
  ),
);
//Gestion de ONUs
const AuditoriaConsumoMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/netconnect/auditoria-consumo/pages/tables/AuditoriaConsumoMainPage'
      ),
  ),
);
//Modelo ONT
const ONTModelsPage = Loadable(
  lazy(() => import('@/app/netconnect/ont-model/pages/tables/ONTModelsPage')),
);
const CreateONTModelsPage = Loadable(
  lazy(
    () => import('@/app/netconnect/ont-model/pages/forms/CreateONTModelsPage'),
  ),
);
const UpdateONTModelsPage = Loadable(
  lazy(
    () => import('@/app/netconnect/ont-model/pages/forms/UpdateONTModelsPage'),
  ),
);
//Vlan
const VlansPage = Loadable(
  lazy(() => import('@/app/netconnect/vlan/pages/tables/VlansPage')),
);
const CreateVlanPage = Loadable(
  lazy(() => import('@/app/netconnect/vlan/pages/forms/CreateVlanPage')),
);
const UpdateVlanPage = Loadable(
  lazy(() => import('@/app/netconnect/vlan/pages/forms/UpdateVlanPage')),
);
//Vlan
const OnusConfiguradasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/netconnect/onus-configurada/pages/tables/OnusConfiguradasPage'
      ),
  ),
);

///* agenda ------------
const SolicitudsRecoordinacionAgendaMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/solicitud-recoordinacion-agenda/pages/tables/SolicitudsRecoordinacionAgendaMainPage'
      ),
  ),
);
const HandleRecoordinacionAgendaSuperVentas = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/solicitud-recoordinacion-agenda/pages/forms/HandleRecoordinacionAgendaSuperVentas'
      ),
  ),
);

///* tecnico ------------
const InstalacionesAsignadasOTMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tecnico/install-asignada/pages/tables/InstalacionesAsignadasOTMainPage'
      ),
  ),
);
const InstalacionAsignadaOT = Loadable(
  lazy(
    () =>
      import(
        '@/app/tecnico/install-asignada/pages/forms/InstalacionAsignadaOT'
      ),
  ),
);
const UpdateCorreccionTec = Loadable(
  lazy(
    () =>
      import('@/app/tecnico/install-asignada/pages/forms/UpdateCorreccionTec'),
  ),
);

const TicketTenicoPage = Loadable(
  lazy(
    () =>
      import('@/app/tecnico/tickets-tecnico/pages/tables/TicketsTecnicoPage'),
  ),
);

const VisitaTecnico = Loadable(
  lazy(() => import('@/app/tecnico/tickets-tecnico/pages/forms/VisitaTecnico')),
);
const SoporteTecnicoPages = Loadable(
  lazy(
    () =>
      import('@/app/cliente/soporte-tecnico/pages/tables/SoporteTecnicoPages'),
  ),
);
const SoporteTecnicoFormPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/cliente/soporte-tecnico/pages/forms/SoporteTecnicoFormPage'
      ),
  ),
);

//* activaciones ---------
const ActivacionesInstalacionesMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/activacion/instalaciones/pages/tables/ActivacionesInstalacionesMainPage'
      ),
  ),
);
const ActivateInstalacionOTPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/activacion/instalaciones/pages/forms/ActivateInstalacionOTPage'
      ),
  ),
);

const SaveActualizacionSerieOnuOTPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/activacion/instalaciones/pages/forms/SaveActualizacionSerieOnuOTPage'
      ),
  ),
);

const TicketsVisitaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/tickets-visita/recoordinacion/pages/tables/TicketsVisitaPage'
      ),
  ),
);

const RecoordinacionTicketVisita = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/tickets-visita/recoordinacion/pages/forms/RecoordinacionTicketVisita'
      ),
  ),
);

const AprobacionTicketsVisitaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/tickets-visita/aprobacion/pages/tables/AprobacionTicketsVisitaPage'
      ),
  ),
);

const AprobacionTicketVisita = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/tickets-visita/aprobacion/pages/forms/AprobacionTicketVisita'
      ),
  ),
);

const UpdateCorreccionFotosTv = Loadable(
  lazy(
    () =>
      import(
        '@/app/tecnico/tickets-tecnico/pages/forms/UpdateCorreccionFotosTv'
      ),
  ),
);

const UpdateCorreccionDatosTv = Loadable(
  lazy(
    () =>
      import(
        '@/app/tecnico/tickets-tecnico/pages/forms/UpdateCorreccionDatosTv'
      ),
  ),
);

///* auditoria ------------
const AuditoriaInstalacionesMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/auditoria/pages/tables/AuditoriaInstalacionesMainPage'
      ),
  ),
);
const AuditoriaInstallPendienteFormPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/auditoria/pages/forms/AuditoriaInstallPendienteFormPage'
      ),
  ),
);
const InstallAsigOTUpdInfoPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tecnico/install-asignada/pages/forms/InstallAsigOTUpdInfoPage'
      ),
  ),
);
const AuditoriaInstallFixedOTPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/auditoria/pages/forms/AuditoriaInstallFixedOTPage'
      ),
  ),
);
const AuditoriaInstallActualizadasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/operaciones/auditoria/pages/forms/AuditoriaInstallActualizadasPage'
      ),
  ),
);

///* cliente ------------
// const ClienteModule = Loadable(
//   lazy(() => import('@/app/cliente/ClienteModule')),
// );
const ClientesFibraMainPage = Loadable(
  lazy(
    () => import('@/app/cliente/cliente/pages/tables/ClientesFibraMainPage'),
  ),
);
const FibraClientFormPage = Loadable(
  lazy(() => import('@/app/cliente/cliente/pages/forms/FibraClientFormPage')),
);

const ConfiguracionsPlantillaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/config-plantilla/pages/tables/ConfiguracionsPlantillaPage'
      ),
  ),
);
const CreateConfiguracionPlantillaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/config-plantilla/pages/forms/CreateConfiguracionPlantillaPage'
      ),
  ),
);
const UpdateConfiguracionPlantillaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/config-plantilla/pages/forms/UpdateConfiguracionPlantillaPage'
      ),
  ),
);

// Tickets

const TicketsPage = Loadable(
  lazy(() => import('@/app/tickets/tickets/pages/tables/TicketsPage')),
);

const CreateTicketTecnicoPage = Loadable(
  lazy(
    () => import('@/app/tickets/tickets/pages/forms/CreateTicketTecnicoPage'),
  ),
);

const AsuntosPage = Loadable(
  lazy(
    () => import('@/app/tickets/parametros/asunto/pages/tables/AsuntosPage'),
  ),
);
const CreateAsuntoPage = Loadable(
  lazy(
    () =>
      import('@/app/tickets/parametros/asunto/pages/forms/CreateAsuntoPage'),
  ),
);
const UpdateAsuntoPage = Loadable(
  lazy(
    () =>
      import('@/app/tickets/parametros/asunto/pages/forms/UpdateAsuntoPage'),
  ),
);

const OrigenesPage = Loadable(
  lazy(
    () => import('@/app/tickets/parametros/origen/pages/tables/OrigenesPage'),
  ),
);
const CreateOrigenPage = Loadable(
  lazy(
    () =>
      import('@/app/tickets/parametros/origen/pages/forms/CreateOrigenPage'),
  ),
);
const UpdateOrigenPage = Loadable(
  lazy(
    () =>
      import('@/app/tickets/parametros/origen/pages/forms/UpdateOrigenPage'),
  ),
);
///////* Ticket Masivos
// Causa
const CausaTMPage = Loadable(
  lazy(() => import('@/app/tickets/causa-tm/pages/tables/CausaTMPage')),
);
const CreateCausaTMPage = Loadable(
  lazy(() => import('@/app/tickets/causa-tm/pages/forms/CreateCausaTMPage')),
);
const UpdateCausaTMPage = Loadable(
  lazy(() => import('@/app/tickets/causa-tm/pages/forms/UpdateCausaTMPage')),
);
// Mensajeria
const MensajeriaTMPage = Loadable(
  lazy(
    () => import('@/app/tickets/mensajeria-tm/pages/tables/MensajeriaTMPage'),
  ),
);
const CreateMensajeriaTMPage = Loadable(
  lazy(
    () =>
      import('@/app/tickets/mensajeria-tm/pages/forms/CreateMensajeriaTMPage'),
  ),
);
const UpdateMensajeriaTMPage = Loadable(
  lazy(
    () =>
      import('@/app/tickets/mensajeria-tm/pages/forms/UpdateMensajeriaTMPage'),
  ),
);
// Incidencia
const IncidenciaTMPage = Loadable(
  lazy(
    () => import('@/app/tickets/incidencia-tm/pages/tables/IncidenciaTMPage'),
  ),
);
const CreateIncidenciaTMPage = Loadable(
  lazy(
    () =>
      import('@/app/tickets/incidencia-tm/pages/forms/CreateIncidenciaTMPage'),
  ),
);
const UpdateIncidenciaTMPage = Loadable(
  lazy(
    () =>
      import('@/app/tickets/incidencia-tm/pages/forms/UpdateIncidenciaTMPage'),
  ),
);
// Evento Mensajeria
const EventoMensajeriaTMPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tickets/evento-mensajeria-tm/pages/tables/EventoMensajeriaTMPage'
      ),
  ),
);
const CreateEventoMensajeriaTMPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tickets/evento-mensajeria-tm/pages/forms/CreateEventoMensajeriaTMPage'
      ),
  ),
);
const UpdateEventoMensajeriaTMPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tickets/evento-mensajeria-tm/pages/forms/UpdateEventoMensajeriaTMPage'
      ),
  ),
);
// Prioridad Incidencia
const PrioridadIncidenciaTMPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tickets/prioridad-incidencia-tm/pages/tables/PrioridadIncidenciaTMPage'
      ),
  ),
);
const CreatePrioridadIncidenciaTMPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tickets/prioridad-incidencia-tm/pages/forms/CreatePrioridadIncidenciaTMPage'
      ),
  ),
);
const UpdatePrioridadIncidenciaTMPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tickets/prioridad-incidencia-tm/pages/forms/UpdatePrioridadIncidenciaTMPage'
      ),
  ),
);
// Departamento TM
const DepartamentoTMPage = Loadable(
  lazy(
    () =>
      import('@/app/tickets/departamento-tm/pages/tables/DepartamentoTMPage'),
  ),
);
const CreateDepartamentoTMPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tickets/departamento-tm/pages/forms/CreateDepartamentoTMPage'
      ),
  ),
);
const UpdateDepartamentoTMPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/tickets/departamento-tm/pages/forms/UpdateDepartamentoTMPage'
      ),
  ),
);

///*
const ScoresLimitVentasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/score-limit-ventas/pages/tables/ScoresLimitVentasPage'
      ),
  ),
);
const UpdateScoreLimitVentasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/score-limit-ventas/pages/forms/UpdateScoreLimitVentasPage'
      ),
  ),
);
const ScoresMonthlyUsageVentasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/score-monthly-usageventas/pages/tables/ScoresMonthlyUsageVentasPage'
      ),
  ),
);

// Buzon Tareas

const TareasPage = Loadable(
  lazy(() => import('@/app/buzon-tareas/tareas/pages/tables/TareasPage')),
);

const CreateTareaPage = Loadable(
  lazy(() => import('@/app/buzon-tareas/tareas/pages/forms/CreateTareaPage')),
);

const PendientesActivacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/buzon-tareas/pendientes-activacion/pages/tables/PendientesActivacionPage'
      ),
  ),
);

const CreatePendientesActivacionPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/buzon-tareas/pendientes-activacion/pages/forms/CreatePendientesActivacionPage'
      ),
  ),
);

// Leed Televenta
const LeedTeleventaMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/televenta/leed-televenta/pages/tables/LeedTeleventaMainPage'
      ),
  ),
);
const CreateLeedTeleventaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/televenta/leed-televenta/pages/forms/CreateLeedTeleventaPage'
      ),
  ),
);
const UpdateLeedTeleventaPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/televenta/leed-televenta/pages/forms/UpdateLeedTeleventaPage'
      ),
  ),
);

const AppRouter = [
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
  {
    path: '/',
    element: (
      <PrivateRoutes>
        <FullLayout />
      </PrivateRoutes>
    ),
    children: [
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
          // {
          //   path: ROUTER_PATHS.administracion.empresas,
          //   element: <EmpresasPage />,
          // },
          // {
          //   path: ROUTER_PATHS.administracion.empresasCrear,
          //   element: <CreateEmpresaPage />,
          // },
          // {
          //   path: ROUTER_PATHS.administracion.empresasEditar,
          //   element: <UpdateEmpresaPage />,
          // },

          ///* motivo rechazo
          {
            path: ROUTER_PATHS.administracion.motivosRechazo,
            element: <MotivosRechazoPage />,
          },
          {
            path: ROUTER_PATHS.administracion.motivosRechazoCrear,
            element: <CreateMotivoRechazoPage />,
          },
          {
            path: ROUTER_PATHS.administracion.motivosRechazoEditar,
            element: <UpdateMotivoRechazoPage />,
          },
          ///* motivo actualizacion
          {
            path: ROUTER_PATHS.administracion.motivosActualizacion,
            element: <MotivosActualizacionPage />,
          },
          {
            path: ROUTER_PATHS.administracion.motivosActualizacionCrear,
            element: <CreateMotivoActualizacionPage />,
          },
          {
            path: ROUTER_PATHS.administracion.motivosActualizacionEditar,
            element: <UpdateMotivoActualizacionPage />,
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

          ///* Centro de Costo
          {
            path: ROUTER_PATHS.administracion.centrocostos,
            element: <CentroCostosPage />,
          },
          {
            path: ROUTER_PATHS.administracion.centrocostosCrear,
            element: <CreateCentroCostoPage />,
          },
          {
            path: ROUTER_PATHS.administracion.centrocostosEditar,
            element: <UpdateCentroCostoPage />,
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

          ///* Tipo de Comprobante
          {
            path: ROUTER_PATHS.administracion.tipocomprobantes,
            element: <TipoComprobantesPage />,
          },
          {
            path: ROUTER_PATHS.administracion.tipocomprobantesCrear,
            element: <CreateTipoComprobantePage />,
          },
          {
            path: ROUTER_PATHS.administracion.tipocomprobantesEditar,
            element: <UpdateTipocomprobantePage />,
          },

          ///* Configuracion Plantilla
          {
            path: ROUTER_PATHS.administracion.configuracionPlantillas,
            element: <ConfiguracionsPlantillaPage />,
          },
          {
            path: ROUTER_PATHS.administracion.configuracionPlantillasCrear,
            element: <CreateConfiguracionPlantillaPage />,
          },
          {
            path: ROUTER_PATHS.administracion.configuracionPlantillasEditar,
            element: <UpdateConfiguracionPlantillaPage />,
          },

          ///*Calendario Facturacion
          {
            path: ROUTER_PATHS.administracion.calendariofacturaciones,
            element: <CalendarioFacturacionPage />,
          },
          {
            path: ROUTER_PATHS.administracion.calendariofacturacionesCrear,
            element: <CreateCalendarioFacturacionPage />,
          },
          {
            path: ROUTER_PATHS.administracion.calendariofacturacionesEditar,
            element: <UpdateCalendarioFacturacionPage />,
          },

          ///* Score Limit Ventas
          {
            path: ROUTER_PATHS.administracion.scoreLimitVentas,
            element: <ScoresLimitVentasPage />,
          },
          {
            path: ROUTER_PATHS.administracion.scoreLimitVentasEditar,
            element: <UpdateScoreLimitVentasPage />,
          },

          ///* Score Monthly Usage Ventas
          {
            path: ROUTER_PATHS.administracion.scoreMonthlyUsageVentas,
            element: <ScoresMonthlyUsageVentasPage />,
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
          {
            path: ROUTER_PATHS.administracion.desbloquearUsuarios,
            element: <BlockedSystemUsers />,
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
        element: <AdministrationModule />,
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
      //////////* Cartera ------------
      {
        path: ROUTER_PATHS.cartera.root,
        element: <AdministrationModule />,
        children: [
          ///* cambio domiclio
          {
            path: ROUTER_PATHS.cartera.cambiodomicilioNav,
            element: <CambioDomicilioPage />,
          },
          {
            path: ROUTER_PATHS.cartera.cambiodomicilioCrear,
            element: <CreateCambioDomicilioPage />,
          },
          ///* venta convenio
          {
            path: ROUTER_PATHS.cartera.ventaconvenioNav,
            element: <CreateVentaConvenioPage />,
          },
          ///* cambio plan
          {
            path: ROUTER_PATHS.cartera.cambioplanNav,
            element: <CambioPlanByStatePage />,
          },
          {
            path: ROUTER_PATHS.cartera.cambioplanCrear,
            element: <CambioPlanPage />,
          },
          ///* Cambio propietario
          {
            path: ROUTER_PATHS.cartera.cambiopropietarioNav,
            element: <CambioPropietarioPagoPage />,
          },

          ///* Buzon de Tareas

          {
            path: ROUTER_PATHS.cartera.buzontareasNav,
            element: <BuzonTareasPage />,
          },
          {
            path: ROUTER_PATHS.cartera.buzontareasCrear,
            element: <CreateBuzonTareasPage />,
          },

          // Criterio mantenedor activaciones

          {
            path: ROUTER_PATHS.cartera
              .parametrosCriterioMantenedorActivacionesNav,
            element: <CriterioMantenedorActivacionesPage />,
          },
          {
            path: ROUTER_PATHS.cartera
              .parametrosCriterioMantenedorActivacionesCrear,
            element: <CreateCriterioMantenedorActivacionesPage />,
          },
          {
            path: ROUTER_PATHS.cartera
              .parametrosCriterioMantenedorActivacionesEditar,
            element: <UpdateCriterioMantenedorActivacionesPage />,
          },

          // Tipo mantenedor aplicaciones

          {
            path: ROUTER_PATHS.cartera.parametrosTipoMantenedorBeneficiosNav,
            element: <TipoMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera.parametrosTipoMantenedorBeneficiosCrear,
            element: <CreateTipoMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera.parametrosTipoMantenedorBeneficiosEditar,
            element: <UpdateTipoMantenedorBeneficiosPage />,
          },

          // Subtipo mantenedor aplicaciones

          {
            path: ROUTER_PATHS.cartera.parametrosSubtipoMantenedorBeneficiosNav,
            element: <SubtipoMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera
              .parametrosSubtipoMantenedorBeneficiosCrear,
            element: <CreateSubtipoMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera
              .parametrosSubtipoMantenedorBeneficiosEditar,
            element: <UpdateSubtipoMantenedorBeneficiosPage />,
          },

          // Beneficio mantenedor aplicaciones

          {
            path: ROUTER_PATHS.cartera
              .parametrosBeneficioMantenedorBeneficiosNav,
            element: <BeneficioMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera
              .parametrosBeneficioMantenedorBeneficiosCrear,
            element: <CreateBeneficioMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera
              .parametrosBeneficioMantenedorBeneficiosEditar,
            element: <UpdateBeneficioMantenedorBeneficiosPage />,
          },

          // Causa mantenedor aplicaciones

          {
            path: ROUTER_PATHS.cartera.parametrosCausaMantenedorBeneficiosNav,
            element: <CausaMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera.parametrosCausaMantenedorBeneficiosCrear,
            element: <CreateCausaMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera
              .parametrosCausaMantenedorBeneficiosEditar,
            element: <UpdateCausaMantenedorBeneficiosPage />,
          },

          // Solucion mantenedor aplicaciones

          {
            path: ROUTER_PATHS.cartera
              .parametrosSolucionMantenedorBeneficiosNav,
            element: <SolucionMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera
              .parametrosSolucionMantenedorBeneficiosCrear,
            element: <CreateSolucionMantenedorBeneficiosPage />,
          },
          {
            path: ROUTER_PATHS.cartera
              .parametrosSolucionMantenedorBeneficiosEditar,
            element: <UpdateSolucionMantenedorBeneficiosPage />,
          },

          // Solucion mantenedor aplicaciones

          {
            path: ROUTER_PATHS.cartera.parametrosMantenedorSuspensionNav,
            element: <MantenedorSuspensionByStatePage />,
          },
          {
            path: ROUTER_PATHS.cartera.parametrosMantenedorSuspensionCrear,
            element: <MantenedorSuspensionPage />,
          },
          {
            path: ROUTER_PATHS.cartera.parametrosMantenedorSuspensionEditar,
            element: <UpdateMantenedorSuspensionPage />,
          },

          ///* Promesas pago
          {
            path: ROUTER_PATHS.cartera.promesapagoNav,
            element: <PromesaPagoByStatePage />,
          },
          {
            path: ROUTER_PATHS.cartera.promesapagoCrear,
            element: <CreatePromesaPagoPage />,
          },
          {
            path: ROUTER_PATHS.cartera.promesapagoEditar,
            element: <UpdatePromesaPagoPage />,
          },
          ///* Mantenedor activaciones base
          {
            path: ROUTER_PATHS.cartera.mantenedorActivacionesBaseNav,
            element: <MantenedorActivacionesBaseByStatePage />,
          },
          {
            path: ROUTER_PATHS.cartera.mantenedorActivacionesBaseCrear,
            element: <MantenedorAplicacionesPage />,
          },
          {
            path: ROUTER_PATHS.cartera.mantenedorActivacionesBaseEditar,
            element: <UpdateMantenedorActivacionesBasePage />,
          },

          ///* Mantenedor activaciones
          {
            path: ROUTER_PATHS.cartera.mantenedorActivacionesNav,
            element: <MantenedorActivacionByStatePage />,
          },
          {
            path: ROUTER_PATHS.cartera.mantenedorActivacionesCrear,
            element: <MantenedorActivacionPage />,
          },
          {
            path: ROUTER_PATHS.cartera.mantenedorActivacionesEditar,
            element: <UpdateMantenedorActivacionPage />,
          },

          ///* rubros
          {
            path: ROUTER_PATHS.cobranza.rubros,
            element: <RubrosPage />,
          },

          ///* transacciones
          {
            path: ROUTER_PATHS.cartera.transacciones,
            element: <TransaccionsPage />,
          },

          ///* saldos
          {
            path: ROUTER_PATHS.cartera.saldos,
            element: <SaldosPage />,
          },

          ///* Configuracion plantilla cliente
          {
            path: ROUTER_PATHS.cartera.configuracionPlantillaCliente,
            element: <ConfiguracionPlantillaClienteCarteraPage />,
          },

          ///* Activacion manual
          {
            path: ROUTER_PATHS.cartera.activacionManualWithFilter,
            element: <ActivacionManualWithFilterByStatePage />,
          },

          ///* Activacion manual
          {
            path: ROUTER_PATHS.cartera.activacionManual,
            element: <ActivacionManualByStatePage />,
          },
        ],
      },
      //////////* Cobranza ------------
      {
        path: ROUTER_PATHS.cobranza.root,
        element: <AdministrationModule />,
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

          ///* motivo rubro adicional
          {
            path: ROUTER_PATHS.cobranza.motivoRubroAdicional,
            element: <MotivosRubroAdicionalPage />,
          },
          {
            path: ROUTER_PATHS.cobranza.motivoRubroAdicionalCrear,
            element: <CreateMotivoRubroAdicionalPage />,
          },
          {
            path: ROUTER_PATHS.cobranza.motivoRubroAdicionalEditar,
            element: <UpdateMotivoRubroAdicionalPage />,
          },

          ///* Plan Pago Cuota
          {
            path: ROUTER_PATHS.cobranza.planpagocuotas,
            element: <PlanPagoCuotasPage />,
          },
          {
            path: ROUTER_PATHS.cobranza.planpagocuotasCrear,
            element: <CreatePlanPagoCuotaPage />,
          },
          {
            path: ROUTER_PATHS.cobranza.planpagocuotasEditar,
            element: <PlanPagoCuotaPage />,
          },

          ///* Cobranza
          {
            path: ROUTER_PATHS.cobranza.facturas,
            element: <FacturasPage />,
          },

          ///* Cliente Pendiente Devolucion
          {
            path: ROUTER_PATHS.cobranza.clientependientedevolucion,
            element: <ClientePendienteDevolucionMainPage />,
          },
        ],
      },

      //////////* Infraestructura ------------
      {
        path: ROUTER_PATHS.infraestructura.root,
        element: <AdministrationModule />,
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
            path: ROUTER_PATHS.infraestructura.oltsConfigurar,
            element: <ConfigOLTPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.oltsCrear,
            element: <CreateOLTPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.oltsEditar,
            element: <UpdateOLTPage />,
          },

          ///* PRIMARY NAP
          {
            path: ROUTER_PATHS.infraestructura.primarynaps,
            element: <PrimaryNapPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.primarynapsCrear,
            element: <CreatePrimaryNapPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.primarynapsEditar,
            element: <UpdatePrimaryNapPage />,
          },

          ///* SECONDARY NAP
          {
            path: ROUTER_PATHS.infraestructura.secondarynaps,
            element: <NapsPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.secondarynapsCrear,
            element: <CreateNapPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.secondarynapsEditar,
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

          ///* RUTA
          {
            path: ROUTER_PATHS.infraestructura.rutas,
            element: <RutasPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.rutasCrear,
            element: <CreateRutaPage />,
          },
          {
            path: ROUTER_PATHS.infraestructura.rutasEditar,
            element: <UpdateRutaPage />,
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
        element: <AdministrationModule />,
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
          ///* reasignacion ventas
          {
            path: ROUTER_PATHS.supervisionComercial.reasignacionVentas,
            element: <ReasignacionVentasPage />,
          },
          ///* recoordinacion agenda
          {
            path: ROUTER_PATHS.supervisionComercial
              .solicitudRecoordinacionAgenda,
            element: <SolicitudsRecoordinacionAgendaMainPage />,
          },
          {
            path: ROUTER_PATHS.supervisionComercial
              .solicitudRecoordinacionAgendaHandle,
            element: <HandleRecoordinacionAgendaSuperVentas />,
          },

          ///* solicitud aprobar preventa IA
          {
            path: ROUTER_PATHS.supervisionComercial
              .solicitudAprobacionIAPreventa,
            element: <SolicitudsAprobacionIAPreventaMainPage />,
          },
        ],
      },

      //////////* Comercial ------------
      {
        path: ROUTER_PATHS.comercial.root,
        element: <AdministrationModule />,
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

          ///* televentas
          {
            path: ROUTER_PATHS.comercial.televentas,
            element: <TeleventasMainPage />,
          },
          {
            path: ROUTER_PATHS.comercial.televentasNav,
            element: <CorreccionPreventasMainPage />,
          },

          ///* correccion preventas
          {
            path: ROUTER_PATHS.comercial.correccionPreventas,
            element: <CorreccionPreventasMainPage />,
          },
          {
            path: ROUTER_PATHS.comercial.preventasCorrecciones,
            element: <CorreccionesPreventaPage />,
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

          ///* instalaciones
          {
            path: ROUTER_PATHS.comercial.instalaciones,
            element: <InstalacionesVentasMainPage />,
          },
          {
            path: ROUTER_PATHS.comercial.instalacionPreRechazadaOT,
            element: <InstalacionPreRechazadaOT />,
          },

          ///* Alquiler
          {
            path: ROUTER_PATHS.comercial.alquileres,
            element: <AlquilerPages />,
          },
          {
            path: ROUTER_PATHS.comercial.alquileresCrear,
            element: <AlquilerFormPage />,
          },
        ],
      },

      //////////* Operaciones ------------
      {
        path: ROUTER_PATHS.operaciones.root,
        element: <AdministrationModule />,
        children: [
          ///* agendamientos: ya no
          // {
          //   path: ROUTER_PATHS.operaciones.agendamientos,
          //   element: <AgendamientosMainPage />,
          // },
          // {
          //   path: ROUTER_PATHS.operaciones.agendamientosPending,
          //   element: <ConfirmAgendaOperacionesPage />,
          // },

          ///* activaciones
          {
            path: ROUTER_PATHS.operaciones.activaciones,
            element: <ActivacionesInstalacionesMainPage />,
          },
          {
            path: ROUTER_PATHS.operaciones.activacionesInstalacion,
            element: <ActivateInstalacionOTPage />,
          },
          {
            path: ROUTER_PATHS.operaciones.activacionesInstalacionGestionada,
            element: <SaveActualizacionSerieOnuOTPage />,
          },

          ///* auditoria
          {
            path: ROUTER_PATHS.operaciones.auditoriaInstalaciones,
            element: <AuditoriaInstalacionesMainPage />,
          },
          {
            path: ROUTER_PATHS.operaciones.auditoriaInstalacion,
            element: <AuditoriaInstallPendienteFormPage />,
          },
          {
            path: ROUTER_PATHS.operaciones.auditOtInstallFixedData,
            element: <AuditoriaInstallFixedOTPage />,
          },
          {
            path: ROUTER_PATHS.operaciones.auditOtInstallFixedPhotos,
            element: <AuditoriaInstallActualizadasPage />,
          },

          ///* tickets visita

          {
            path: ROUTER_PATHS.operaciones.ticketsVisita,
            element: <TicketsVisitaPage />,
          },
          {
            path: ROUTER_PATHS.operaciones.ticketsVisitaRecoordinacion,
            element: <RecoordinacionTicketVisita />,
          },

          {
            path: ROUTER_PATHS.operaciones.aprobacionTicketsVisita,
            element: <AprobacionTicketsVisitaPage />,
          },
          {
            path: ROUTER_PATHS.operaciones
              .aprobacionTicketsVisitaRecoordinacion,
            element: <AprobacionTicketVisita />,
          },

          //
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

          ///* clientes
          {
            path: ROUTER_PATHS.clientes.clientesFibra,
            element: <ClientesFibraMainPage />,
          },
          {
            path: ROUTER_PATHS.clientes.clientesFibraVer,
            element: <FibraClientFormPage />,
          },

          ///* Soporte Tecnico
          {
            path: ROUTER_PATHS.clientes.soporteTecnico,
            element: <SoporteTecnicoPages />,
          },
          {
            path: ROUTER_PATHS.clientes.soporteTecnicoEditar,
            element: <SoporteTecnicoFormPage />,
          },
        ],
      },

      //////////* Inventario ------------
      {
        path: ROUTER_PATHS.inventario.root,
        element: <AdministrationModule />,
        children: [
          ///* bodega
          {
            path: ROUTER_PATHS.inventario.bodegas,
            element: <BodegasPage />,
          },
          {
            path: ROUTER_PATHS.inventario.bodegasCrear,
            element: <CreateBodegaPage />,
          },
          {
            path: ROUTER_PATHS.inventario.bodegasEditar,
            element: <UpdateBodegaPage />,
          },

          ///* productos - inventariables
          {
            path: ROUTER_PATHS.inventario.productos,
            element: <ProductosPage />,
          },
          {
            path: ROUTER_PATHS.inventario.productosCrear,
            element: <CreateProductoPage />,
          },
          {
            path: ROUTER_PATHS.inventario.productosEditar,
            element: <UpdateProductoPage />,
          },

          ///* categorias producto
          {
            path: ROUTER_PATHS.inventario.categoriaProductos,
            element: <CategoriasProductoPage />,
          },
          {
            path: ROUTER_PATHS.inventario.categoriaProductoCrear,
            element: <CreateCategoriaProductoPage />,
          },
          {
            path: ROUTER_PATHS.inventario.categoriaProductoEditar,
            element: <UpdateCategoriaProductoPage />,
          },

          ///* ubicaciones
          {
            path: ROUTER_PATHS.inventario.ubicaciones,
            element: <UbicacionsPage />,
          },
          {
            path: ROUTER_PATHS.inventario.ubicacionesCrear,
            element: <CreateUbicacionPage />,
          },
          {
            path: ROUTER_PATHS.inventario.ubicacionesEditar,
            element: <UpdateUbicacionPage />,
          },

          ///* solicitud material
          {
            path: ROUTER_PATHS.inventario.solicitudMaterial,
            element: <SolicitudMaterialMainPage />,
          },
          {
            path: ROUTER_PATHS.inventario.solicitudMaterialCrear,
            element: <CreateSolicitudMaterialPage />,
          },
          /*  {
            path: ROUTER_PATHS.inventario.ubicacionesEditar,
            element: <UpdateUbicacionPage />,
          }, */

          ///* Ingreso Material
          {
            path: ROUTER_PATHS.inventario.ingresoMateriales,
            element: <IngresoMaterialesPage />,
          },
          {
            path: ROUTER_PATHS.inventario.ingresoMaterialesCrear,
            element: <CreateIngresoMaterialPage />,
          },

          ///* Egreso Material
          {
            path: ROUTER_PATHS.inventario.egresoMateriales,
            element: <EgresoMaterialesPage />,
          },
          {
            path: ROUTER_PATHS.inventario.egresoMaterialesCrear,
            element: <CreateEgresoMaterialPage />,
          },

          ///* Movimiento Material
          {
            path: ROUTER_PATHS.inventario.movimientoMateriales,
            element: <MovimientoMaterialesPage />,
          },

          ///* Egreso Material
          {
            path: ROUTER_PATHS.inventario.transferenciaMateriales,
            element: <TransferenciaMaterialPage />,
          },
          {
            path: ROUTER_PATHS.inventario.transferenciaMaterialesCrear,
            element: <CreateTransferenciaMaterialPage />,
          },

          ///* Recepcion Material
          {
            path: ROUTER_PATHS.inventario.RecepcionMateriales,
            element: <RecepcionMaterialMainPage />,
          },
          {
            path: ROUTER_PATHS.inventario.RecepcionMaterialesEditar,
            element: <UpdateRecepcionMaterialPage />,
          },

          ///* Modelo Inventario
          {
            path: ROUTER_PATHS.inventario.modeloInventarios,
            element: <ModeloInventariosPages />,
          },
          {
            path: ROUTER_PATHS.inventario.modeloInventariosCrear,
            element: <CreateModeloInventariosPages />,
          },
          {
            path: ROUTER_PATHS.inventario.modeloInventariosEditar,
            element: <UpdateModeloInventariosPages />,
          },

          ///* Solicitud Devolucion
          {
            path: ROUTER_PATHS.inventario.solicitudDevolucion,
            element: <SolicitudDevolucionMainPages />,
          },
          {
            path: ROUTER_PATHS.inventario.solicitudDevolucionCrear,
            element: <CreateSolicitudDevolucionPages />,
          },

          ///* Solicitud Transferencia Material
          {
            path: ROUTER_PATHS.inventario.solicitudTransferenciaMaterial,
            element: <SolicitudTransferenciaMaterialMainPages />,
          },
          {
            path: ROUTER_PATHS.inventario.solicitudTransferenciaMaterialCrear,
            element: <CreateSolicitudTransferenciaMaterialPage />,
          },

          ///* Recepcion Solicitud Transferencia Material
          {
            path: ROUTER_PATHS.inventario
              .recepcionSolicitudTransferenciaMateriales,
            element: <RecepcionSolicitudTransferenciaMaterialMainPages />,
          },
          {
            path: ROUTER_PATHS.inventario
              .recepcionSolicitudTransferenciaMaterialesEditar,
            element: <CreateRecepcionSolicitudTransferenciaMaterialPage />,
          },

          ///* Motivo Egreso
          {
            path: ROUTER_PATHS.inventario.motivoEgresos,
            element: <MotivoEgresoPages />,
          },
          {
            path: ROUTER_PATHS.inventario.motivoEgresosCrear,
            element: <CreateMotivoEgresoPages />,
          },
          {
            path: ROUTER_PATHS.inventario.motivoEgresosEditar,
            element: <UpdateMotivoEgresoPages />,
          },

          ///* Motivo Ingreso
          {
            path: ROUTER_PATHS.inventario.motivoIngresos,
            element: <MotivoIngresoPages />,
          },
          {
            path: ROUTER_PATHS.inventario.motivoIngresosCrear,
            element: <CreateMotivoIngresoPages />,
          },
          {
            path: ROUTER_PATHS.inventario.motivoIngresosEditar,
            element: <UpdateMotivoIngresoPages />,
          },

          ///* Motivo Transferencia
          {
            path: ROUTER_PATHS.inventario.motivoTransferencias,
            element: <MotivoTransferenciaPages />,
          },
          {
            path: ROUTER_PATHS.inventario.motivoTransferenciasCrear,
            element: <CreateMotivoTransferenciaPages />,
          },
          {
            path: ROUTER_PATHS.inventario.motivoTransferenciasEditar,
            element: <UpdateMotivoTransferenciaPages />,
          },

          ///* Reporte Stock
          {
            path: ROUTER_PATHS.inventario.reporteStocks,
            element: <ReporteStocksPages />,
          },

          ///* Cuenta Contable
          {
            path: ROUTER_PATHS.inventario.cuentaContables,
            element: <CuentaContablePages />,
          },
          {
            path: ROUTER_PATHS.inventario.cuentaContablesCrear,
            element: <CreateCuentaContablePage />,
          },
          {
            path: ROUTER_PATHS.inventario.cuentaContablesEditar,
            element: <UpdateCuentaContablePage />,
          },
        ],
      },

      //////////* Logistica ------------
      {
        path: ROUTER_PATHS.logistica.root,
        element: <AdministrationModule />,
        children: [
          ///* tipo instalacion
          {
            path: ROUTER_PATHS.logistica.tipoinstalaciones,
            element: <TipoInstalacionesPage />,
          },
          {
            path: ROUTER_PATHS.logistica.tipoinstalacionesCrear,
            element: <CreateTipoInstalacionPage />,
          },
          {
            path: ROUTER_PATHS.logistica.tipoinstalacionesEditar,
            element: <UpdateTipoInstalacionPage />,
          },
        ],
      },

      //////////* Administracion Red ------------
      {
        path: ROUTER_PATHS.administracionRed.root,
        element: <AdministrationModule />,
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
          ///* monitoreo
          {
            path: ROUTER_PATHS.administracionRed.monitoreos,
            element: <MonitoreosPage />,
          },
          {
            path: ROUTER_PATHS.administracionRed.monitoreosCrear,
            element: <CreateMonitoreoPage />,
          },
          {
            path: ROUTER_PATHS.administracionRed.monitoreosEditar,
            element: <UpdateMonitoreoPage />,
          },
          ///* trafico
          {
            path: ROUTER_PATHS.administracionRed.traficos,
            element: <TraficosPage />,
          },
          ///* Brass
          {
            path: ROUTER_PATHS.administracionRed.brass,
            element: <BrassPage />,
          },
          {
            path: ROUTER_PATHS.administracionRed.brassCrear,
            element: <CreateBrassPage />,
          },
          {
            path: ROUTER_PATHS.administracionRed.brassEditar,
            element: <UpdateBrassPage />,
          },
          ///* radius
          {
            path: ROUTER_PATHS.administracionRed.radius,
            element: <RadiusPage />,
          },
          ///* Autenticacion de Cliente
          {
            path: ROUTER_PATHS.administracionRed.autenticacionClientes,
            element: <AutenticacionClientePage />,
          },
          ///* Grupo IPv4
          {
            path: ROUTER_PATHS.administracionRed.gruposIPv4,
            element: <GrupoIPv4sPage />,
          },
          {
            path: ROUTER_PATHS.administracionRed.gruposIPv4Crear,
            element: <CreateGrupoIPv4Page />,
          },
          {
            path: ROUTER_PATHS.administracionRed.gruposIPv4Editar,
            element: <UpdateGrupoIPv4Page />,
          },
          ///* Grupo IPv6
          {
            path: ROUTER_PATHS.administracionRed.gruposIPv6,
            element: <GrupoIPv6sPage />,
          },
          {
            path: ROUTER_PATHS.administracionRed.gruposIPv6Crear,
            element: <CreateGrupoIPv6Page />,
          },
          {
            path: ROUTER_PATHS.administracionRed.gruposIPv6Editar,
            element: <UpdateGrupoIPv6Page />,
          },
        ],
      },

      //////////* Netconnect ------------
      {
        path: ROUTER_PATHS.netconnect.root,
        element: <AdministrationModule />,
        children: [
          ///* Autorizacion de ONUs
          {
            path: ROUTER_PATHS.netconnect.autorizacionOnus,
            element: <AutorizacionOnusPage />,
          },

          ///* Gestion de ONUs
          {
            path: ROUTER_PATHS.netconnect.gestionOnus,
            element: <GestionOnusPage />,
          },

          ///* Auditoria de Consumo
          {
            path: ROUTER_PATHS.netconnect.auditoriaConsumosNav,
            element: <AuditoriaConsumoMainPage />,
          },

          ///* Vlan
          {
            path: ROUTER_PATHS.netconnect.vlans,
            element: <VlansPage />,
          },
          {
            path: ROUTER_PATHS.netconnect.vlansCrear,
            element: <CreateVlanPage />,
          },
          {
            path: ROUTER_PATHS.netconnect.vlansEditar,
            element: <UpdateVlanPage />,
          },
          ///* Registro de ONUs Configuradas
          {
            path: ROUTER_PATHS.netconnect.onusConfiguradas,
            element: <OnusConfiguradasPage />,
          },
          ///* ONT Module
          {
            path: ROUTER_PATHS.netconnect.ontModels,
            element: <ONTModelsPage />,
          },
          {
            path: ROUTER_PATHS.netconnect.ontModelsCrear,
            element: <CreateONTModelsPage />,
          },
          {
            path: ROUTER_PATHS.netconnect.ontModelsEditar,
            element: <UpdateONTModelsPage />,
          },
        ],
      },

      //////////* Tecnico ------------
      {
        path: ROUTER_PATHS.tecnico.root,
        element: <AdministrationModule />,
        children: [
          ///* Instalaciones Asignadas
          {
            path: ROUTER_PATHS.tecnico.instalacionesAsignadas,
            element: <InstalacionesAsignadasOTMainPage />,
          },
          {
            path: ROUTER_PATHS.tecnico.instalacionAsignadaOT,
            element: <InstalacionAsignadaOT />,
          },
          {
            path: ROUTER_PATHS.tecnico.instalPendingUpdDatos,
            element: <InstallAsigOTUpdInfoPage />,
          },
          {
            path: ROUTER_PATHS.tecnico.instalacionesCorreccionFotos,
            element: <UpdateCorreccionTec />,
          },
          {
            path: ROUTER_PATHS.tecnico.instalacionesOrdenTrabajo,
            element: <div>Orden de trabajo</div>,
          },
          {
            path: ROUTER_PATHS.tecnico.instalacionesSolicitudMateriales,
            element: <SolicitudMaterialMainPage />,
          },
          {
            path: ROUTER_PATHS.tecnico.ticketsAsignados,
            element: <TicketTenicoPage />,
          },
          {
            path: ROUTER_PATHS.tecnico.ticketsAsignadosOV,
            element: <VisitaTecnico />,
          },

          //

          {
            path: ROUTER_PATHS.tecnico.auditTvFixedData,
            element: <UpdateCorreccionDatosTv />,
          },

          {
            path: ROUTER_PATHS.tecnico.auditTvFixedPhotos,
            element: <UpdateCorreccionFotosTv />,
          },
        ],
      },

      //////////* Tickets ------------
      {
        path: ROUTER_PATHS.tickets.root,
        element: <AdministrationModule />,
        children: [
          {
            path: ROUTER_PATHS.tickets.ticketsCrear,
            element: <CreateTicketTecnicoPage />,
          },
          {
            path: ROUTER_PATHS.tickets.ticketsNav,
            element: <TicketsPage />,
          },

          ///* Parametro / Asunto
          {
            path: ROUTER_PATHS.tickets.parametrosAsuntos,
            element: <AsuntosPage />,
          },
          {
            path: ROUTER_PATHS.tickets.parametrosAsuntosCrear,
            element: <CreateAsuntoPage />,
          },
          {
            path: ROUTER_PATHS.tickets.parametrosAsuntosEditar,
            element: <UpdateAsuntoPage />,
          },

          ///* Parametro / Origen

          {
            path: ROUTER_PATHS.tickets.parametrosOrigenes,
            element: <OrigenesPage />,
          },
          {
            path: ROUTER_PATHS.tickets.parametrosOrigenesCrear,
            element: <CreateOrigenPage />,
          },
          {
            path: ROUTER_PATHS.tickets.parametrosOrigenesEditar,
            element: <UpdateOrigenPage />,
          },

          ///* TICKETS MASIVOS
          //Causa
          {
            path: ROUTER_PATHS.tickets.causaTM,
            element: <CausaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.causaTMCrear,
            element: <CreateCausaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.causaTMEditar,
            element: <UpdateCausaTMPage />,
          },
          //Mensajeria
          {
            path: ROUTER_PATHS.tickets.mensajeriaTM,
            element: <MensajeriaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.mensajeriaTMCrear,
            element: <CreateMensajeriaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.mensajeriaTMEditar,
            element: <UpdateMensajeriaTMPage />,
          },
          //Incidencia
          {
            path: ROUTER_PATHS.tickets.incidenciaTM,
            element: <IncidenciaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.incidenciaTMCrear,
            element: <CreateIncidenciaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.incidenciaTMEditar,
            element: <UpdateIncidenciaTMPage />,
          },
          //Evento Mensajeria
          {
            path: ROUTER_PATHS.tickets.eventomensajeriaTM,
            element: <EventoMensajeriaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.eventomensajeriaTMCrear,
            element: <CreateEventoMensajeriaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.eventomensajeriaTMEditar,
            element: <UpdateEventoMensajeriaTMPage />,
          },
          //Prioridad Incidencia
          {
            path: ROUTER_PATHS.tickets.prioridadincidenciaTM,
            element: <PrioridadIncidenciaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.prioridadincidenciaTMCrear,
            element: <CreatePrioridadIncidenciaTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.prioridadincidenciaTMEditar,
            element: <UpdatePrioridadIncidenciaTMPage />,
          },
          //Departamento
          {
            path: ROUTER_PATHS.tickets.departamentoTM,
            element: <DepartamentoTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.departamentoTMCrear,
            element: <CreateDepartamentoTMPage />,
          },
          {
            path: ROUTER_PATHS.tickets.departamentoTMEditar,
            element: <UpdateDepartamentoTMPage />,
          },
        ],
      },

      //////////* Buzon Tareas ------------
      {
        path: ROUTER_PATHS.buzonTareas.root,
        element: <AdministrationModule />,
        children: [
          {
            path: ROUTER_PATHS.buzonTareas.buzonTareasAsignadasNav,
            element: <TareasPage />,
          },
          {
            path: ROUTER_PATHS.buzonTareas.buzonTareasAsignada,
            element: <CreateTareaPage />,
          },
          {
            path: ROUTER_PATHS.buzonTareas.clientesSuspendidosAsignadasNav,
            element: <PendientesActivacionPage />,
          },
          {
            path: ROUTER_PATHS.buzonTareas.clientesSuspendidosAsignada,
            element: <CreatePendientesActivacionPage />,
          },
        ],
      },

      //////////* Televenta ------------
      {
        path: ROUTER_PATHS.televentas.root,
        element: <AdministrationModule />,
        children: [
          ///* Leed Televenta
          {
            path: ROUTER_PATHS.televentas.leedTeleventas,
            element: <LeedTeleventaMainPage />,
          },
          {
            path: ROUTER_PATHS.televentas.leedTeleventasCrear,
            element: <CreateLeedTeleventaPage />,
          },
          {
            path: ROUTER_PATHS.televentas.leedTeleventasEditar,
            element: <UpdateLeedTeleventaPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Error404 />,
  },
];

export default AppRouter;

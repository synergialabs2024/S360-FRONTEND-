import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';

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
const IVAsPage = Loadable(
  lazy(() => import('@/app/administration/iva/pages/tables/IVAsPage')),
);
const CreateIVAPage = Loadable(
  lazy(() => import('@/app/administration/iva/pages/forms/CreateIVAPage')),
);
const UpdateIVAPage = Loadable(
  lazy(() => import('@/app/administration/iva/pages/forms/UpdateIVAPage')),
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

const SolicitudsDesbloqueoVentasMainPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/comercial/solicitud-desbloqueo-ventas/pages/tables/SolicitudsDesbloqueoVentasMainPage'
      ),
  ),
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
        ],
      },
      {
        path: '/404',
        element: <Error404 />,
      },
    ],
  },
]);

export default AppRouter;

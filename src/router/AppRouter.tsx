// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Loadable from '@/layouts/full/shared/loadable/Loadable';
import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import PrivateRoutes from './PrivateRoutes';
import { ROUTER_PATHS } from './constants';
import AdministrationModule from '@/app/administration/AdministrationModule';
import { Navigate } from 'react-router-dom';

// import PaginaTabs from './PaginaTabs';

const AuthLayout = Loadable(
  lazy(() => import('@/auth/pages/LoginPage/LoginPage')),
);
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

// authentication
const Login = Loadable(
  // lazy(() => import('../views/authentication/auth1/Login')),
  lazy(() => import('../auth/pages/LoginPage/LoginPage')),
);

/* ***Layouts**** */

/* ****Pages***** */
// const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));

// Codigos OTP

const CodigosOtpMainPage = Loadable(
  lazy(
    () => import('@/app/comercial/codigo-otp/pages/tables/CodigosOtpMainPage'),
  ),
);

const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));

// Paises

const PaisesPage = Loadable(
  lazy(() => import('@/app/administration/pais/pages/tables/PaisesPage')),
);
const UpdatePaisPage = Loadable(
  lazy(() => import('@/app/administration/pais/pages/forms/UpdatePaisPage')),
);
const CreatePaisPage = Loadable(
  lazy(() => import('@/app/administration/pais/pages/forms/CreatePaisPage')),
);

// Provincias

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

// Ciudades

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

// Zonas

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

// ENTIDADES FINANCIERAS

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

// IVA

const IVAsPage = Loadable(
  lazy(() => import('@/app/administration/iva/pages/tables/IVAsPage')),
);
const CreateIVAPage = Loadable(
  lazy(() => import('@/app/administration/iva/pages/forms/CreateIVAPage')),
);
const UpdateIVAPage = Loadable(
  lazy(() => import('@/app/administration/iva/pages/forms/UpdateIVAPage')),
);

// Metodo de pago

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

// Parametro del sistema

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

const TrazabilidadVentasPage = Loadable(
  lazy(
    () =>
      import(
        '@/app/administration/trazabilidad-venta/pages/tables/TrazabilidadVentasPage'
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

const AppRouter = [
  ////* Auth
  {
    path: '/auth',
    element: (
      <AuthRoutes>
        <AuthLayout />
      </AuthRoutes>
    ),
    children: [{ path: 'login', element: <Login /> }],
  },
  {
    path: '/',
    element: (
      <PrivateRoutes>
        <FullLayout />
      </PrivateRoutes>
    ),
    children: [
      { path: '/', element: <Navigate to="/dashboards/modern" /> },
      { path: '/dashboards/modern', exact: true, element: <ModernDash /> },

      //Administracion
      // { path: '/parametrizacion/paises', element: <PaisesPage /> },

      //////////* Administrat`ion ------------
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
    ],
  },
  // {
  //   path: '/',
  //   element: (
  //       <PaginaTabs />
  //   ),
  // },
  // {
  //   path: '/',
  //   element: (
  //       <BlankLayout />
  //   ),
  //   children: [
  //     { path: '/auth/404', element: <Error /> },
  //     { path: '/auth/login', element: <Login /> },
  //     { path: '/auth/login2', element: <Login2 /> },
  //     { path: '/auth/register', element: <Register /> },
  //     { path: '/auth/register2', element: <Register2 /> },
  //     { path: '/auth/forgot-password', element: <ForgotPassword /> },
  //     { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
  //     { path: '/auth/two-steps', element: <TwoSteps /> },
  //     { path: '/auth/two-steps2', element: <TwoSteps2 /> },
  //     { path: '/auth/maintenance', element: <Maintenance /> },
  //     { path: '/landingpage', element: <Landingpage /> },
  //     { path: '*', element: <Navigate to="/auth/404" /> },
  //   ],
  // },
];

export default AppRouter;


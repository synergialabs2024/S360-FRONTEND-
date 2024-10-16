// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Loadable from '@/layouts/full/shared/loadable/Loadable';
import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import PrivateRoutes from './PrivateRoutes';
import { ROUTER_PATHS } from './constants';
import AdministrationModule from '@/app/administration/AdministrationModule';
import PaginaTabs from './PaginaTabs';

// import PaginaTabs from './PaginaTabs';

// const AuthLayout = Loadable(
//   lazy(() => import('@/auth/pages/LoginPage/LoginPage')),
// );

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

const AppRouter = [
  ////* Auth
  {
    path: '/auth',
    element: (
      <AuthRoutes>
        <PaginaTabs />
      </AuthRoutes>
    ),
    children: [{ path: 'login', element: <Login /> }],
  },
  {
    path: '/',
    element: (
      <PrivateRoutes>
        <PaginaTabs />
      </PrivateRoutes>
    ),
    children: [
      // { path: '/', element: <Navigate to="/dashboards/modern" /> },
      // { path: '/dashboards/modern', exact: true, element: <ModernDash /> },

      //Administracion
      // { path: '/parametrizacion/paises', element: <PaisesPage /> },

      //////////* Administrat`ion ------------
      {
        path: ROUTER_PATHS.administracion.root,
        element: <AdministrationModule />,
        children: [

          ///* Codigo OTP
          {
            path: ROUTER_PATHS.administracion.codigosOtp,
            element: <CodigosOtpMainPage />,
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


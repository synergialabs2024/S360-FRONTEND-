// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import PaginaTabs from './PaginaTabs';


const AppRouter = [
  {
    path: '/',
    element: (
        <PaginaTabs />
    ),
  },
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

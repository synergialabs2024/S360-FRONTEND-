/* eslint-disable indent */
import { ComponentType, Suspense } from 'react';

import LoaderRouter from './LoaderRouter';

const Loadable =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <Suspense fallback={<LoaderRouter />}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;

import { Outlet } from 'react-router-dom';

export type SupervisionComercialModuleProps = {};

const SupervisionComercialModule: React.FC<
  SupervisionComercialModuleProps
> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default SupervisionComercialModule;

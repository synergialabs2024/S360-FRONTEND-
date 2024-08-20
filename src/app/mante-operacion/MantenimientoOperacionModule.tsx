import { Outlet } from 'react-router-dom';

export type MantenimientoOperacionModuleProps = {};

const MantenimientoOperacionModule: React.FC<
  MantenimientoOperacionModuleProps
> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MantenimientoOperacionModule;

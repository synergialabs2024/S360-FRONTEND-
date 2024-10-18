import { Outlet } from 'react-router-dom';

export type AdministracionRedModuleProps = {};

const AdministracionRedModule: React.FC<AdministracionRedModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdministracionRedModule;

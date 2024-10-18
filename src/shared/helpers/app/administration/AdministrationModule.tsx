import { Outlet } from 'react-router-dom';

export type AdministrationModuleProps = {};

const AdministrationModule: React.FC<AdministrationModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdministrationModule;

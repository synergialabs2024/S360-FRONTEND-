import { Outlet } from 'react-router-dom';

export type ClienteModuleProps = {};

const ClienteModule: React.FC<ClienteModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ClienteModule;

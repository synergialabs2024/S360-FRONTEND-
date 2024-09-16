import { Outlet } from 'react-router-dom';

export type OperacionesModuleProps = {};

const OperacionesModule: React.FC<OperacionesModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default OperacionesModule;

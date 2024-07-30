import { Outlet } from 'react-router-dom';

export type ComercialModuleProps = {};

const ComercialModule: React.FC<ComercialModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ComercialModule;

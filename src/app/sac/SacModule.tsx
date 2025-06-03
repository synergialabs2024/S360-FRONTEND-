import { Outlet } from 'react-router-dom';

export type SacModuleProps = {};

const SacModule: React.FC<SacModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default SacModule;

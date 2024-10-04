import { Outlet } from 'react-router-dom';

export type InventarioModuleProps = {};

const InventarioModule: React.FC<InventarioModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default InventarioModule;

import { Outlet } from 'react-router-dom';

export type BuzonTareasModuleModuleProps = {};
const BuzonTareasModule: React.FC<BuzonTareasModuleModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default BuzonTareasModule;

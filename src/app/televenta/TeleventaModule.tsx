import { Outlet } from 'react-router-dom';

export type TeleventaModuleProps = {};

const TeleventaModule: React.FC<TeleventaModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default TeleventaModule;

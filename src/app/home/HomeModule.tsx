import { Outlet } from 'react-router-dom';

export type HomeModuleProps = {};

const HomeModule: React.FC<HomeModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default HomeModule;

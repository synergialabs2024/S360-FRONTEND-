import { Outlet } from 'react-router-dom';

export type CobranzaModuleProps = {};

const CobranzaModule: React.FC<CobranzaModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default CobranzaModule;

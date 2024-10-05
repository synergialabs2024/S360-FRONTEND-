import { Outlet } from 'react-router-dom';

export type LogisticaModuleProps = {};

const LogisticaModule: React.FC<LogisticaModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default LogisticaModule;

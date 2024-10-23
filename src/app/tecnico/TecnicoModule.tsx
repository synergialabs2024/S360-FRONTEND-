import { Outlet } from 'react-router-dom';

export type TecnicoModuleProps = {};

const TecnicoModule: React.FC<TecnicoModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default TecnicoModule;

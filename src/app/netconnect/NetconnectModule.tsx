import { Outlet } from 'react-router-dom';

export type NominaModuleProps = {};

const NominaModule: React.FC<NominaModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default NominaModule;

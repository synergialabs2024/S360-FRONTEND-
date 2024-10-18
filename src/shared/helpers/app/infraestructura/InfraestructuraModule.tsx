import { Outlet } from 'react-router-dom';

export type InfraestructuraModuleProps = {};

const InfraestructuraModule: React.FC<InfraestructuraModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default InfraestructuraModule;

import { Outlet } from 'react-router-dom';

export type TicketsModuleProps = {};
const TicketsModule: React.FC<TicketsModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default TicketsModule;

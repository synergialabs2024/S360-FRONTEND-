import { Outlet } from 'react-router-dom';

export type CarteraModuleProps = {};

const CarteraModule: React.FC<CarteraModuleProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default CarteraModule;

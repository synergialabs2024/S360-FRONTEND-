import { Outlet } from 'react-router-dom';

export type CustomerExperienceModuleProps = {};

const CustomerExperienceModule: React.FC<
  CustomerExperienceModuleProps
> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default CustomerExperienceModule;

import { LineaServicio } from '@/shared';
import { CustomTypoLabel } from '@/shared/components';
import ClienteFibraServicePlanTable from './ClienteFibraServicePlanTable';

export type ServiceFibraClientPartProps = {
  serviceLine: LineaServicio;
};

const ServiceFibraClientPart: React.FC<ServiceFibraClientPartProps> = ({
  serviceLine,
}) => {
  return (
    <>
      <CustomTypoLabel text="Servicio de internet" />

      {/* ---------------- service plan table ---------------- */}
      <ClienteFibraServicePlanTable serviceLine={serviceLine} />
    </>
  );
};

export default ServiceFibraClientPart;

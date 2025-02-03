import { PromocionPreventaView } from '@/app/comercial/agendamiento/shared/components/SaveAgendamiento/form';
import { LineaServicio } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import ClienteFibraAlquileresPart from './ClienteFibraAlquileresPart';
import ClienteFibraOTServicePart from './ClienteFibraOTServicePart';
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

      {/* ---------------- alquileres ---------------- */}
      <ClienteFibraAlquileresPart serviceLine={serviceLine} />

      {/* ---------------- Promociones ---------------- */}
      <CustomTypoLabel
        text="PROMOCIONES"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <PromocionPreventaView
        preventa={
          {
            ...serviceLine?.preventa_data,
            promociones_data: serviceLine?.promociones_data,
          } as any
        }
      />

      {/* ---------------- OT ---------------- */}
      <ClienteFibraOTServicePart serviceLine={serviceLine} />
    </>
  );
};

export default ServiceFibraClientPart;

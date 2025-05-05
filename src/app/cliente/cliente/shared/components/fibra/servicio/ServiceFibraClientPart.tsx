import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { PromocionPreventaView } from '@/app/comercial/agendamiento/shared/components/SaveAgendamiento/form';
import { type SelectedEqPromoctionType } from '@/app/comercial/promocion/shared/components/SavePromocion/SavePromocion';
import { LineaServicio } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import ClienteFibraAlquileresPart from './alquileres/ClienteFibraAlquileresPart';
import ClienteFibraOTServicePart from './ClienteFibraOTServicePart';
import ClienteFibraServicePlanTable from './ClienteFibraServicePlanTable';

export type ServiceFibraClientPartProps = {
  serviceLine: LineaServicio;
};

export type ServiceFibraClientFormPromocionType = {
  selectedPromoOptions?: SelectedEqPromoctionType[];
  selectedPromoPremioUuid?: string;
};

const ServiceFibraClientPart: React.FC<ServiceFibraClientPartProps> = ({
  serviceLine,
}) => {
  ///* form ---------------------
  const form = useForm<ServiceFibraClientFormPromocionType>({
    defaultValues: {},
  });

  ///* effects ----------------
  useEffect(() => {
    if (!serviceLine) return;
    const preventa = serviceLine?.preventa_data;
    form.reset({
      selectedPromoOptions: preventa?.promocion_items_selected || [],
      selectedPromoPremioUuid: preventa?.promocion_premio_selected,
    });
  }, [form, serviceLine]);

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
        form={form as any}
      />

      {/* ---------------- OT ---------------- */}
      <ClienteFibraOTServicePart serviceLine={serviceLine} />
    </>
  );
};

export default ServiceFibraClientPart;

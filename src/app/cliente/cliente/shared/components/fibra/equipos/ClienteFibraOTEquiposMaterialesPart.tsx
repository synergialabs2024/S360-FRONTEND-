import { EquipoAdicionalInstallTectAsignFormPart } from '@/app/tecnico/install-asignada/shared/components/form';
import { LineaServicio } from '@/shared';
import ClienteFibraOTEquiposUtilizados from './ClienteFibraOTEquiposUtilizados';
import ClienteFibraOTMaterialesUtilizados from './ClienteFibraOTMaterialesUtilizados';

export type ClienteFibraOTEquiposMaterialesPartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraOTEquiposMaterialesPart: React.FC<
  ClienteFibraOTEquiposMaterialesPartProps
> = ({ serviceLine }) => {
  const ordenTrabajo = serviceLine?.orden_trabajo_data;

  return (
    <>
      <EquipoAdicionalInstallTectAsignFormPart
        ordenTrabajo={
          {
            ...ordenTrabajo,
            preventa_data: serviceLine?.preventa_data,
          } as any
        }
      />

      <ClienteFibraOTEquiposUtilizados
        ordenTrabajo={
          {
            ...ordenTrabajo,
          } as any
        }
      />

      <ClienteFibraOTMaterialesUtilizados
        ordenTrabajo={
          {
            ...ordenTrabajo,
            ciudad_data: serviceLine?.ciudad_data,
          } as any
        }
      />
    </>
  );
};

export default ClienteFibraOTEquiposMaterialesPart;

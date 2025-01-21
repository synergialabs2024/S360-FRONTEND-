import ClienteFibraTVEquiposUtilizados from './ClienteFibraTVEquiposUtilizados';
import ClienteFibraTVMaterialesUtilizados from './ClienteFibraTVMaterialesUtilizados';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';

export type ClienteFibraTVEquiposMaterialesPartProps = {
  ticket_data?: Ticket;
};

const ClienteFibraTVEquiposMaterialesPart: React.FC<
  ClienteFibraTVEquiposMaterialesPartProps
> = ({ ticket_data }) => {
  return (
    <>
      <ClienteFibraTVEquiposUtilizados
        ticket={
          {
            ...ticket_data,
          } as any
        }
      />

      <ClienteFibraTVMaterialesUtilizados
        ticket={
          {
            ...ticket_data,
          } as any
        }
      />
    </>
  );
};

export default ClienteFibraTVEquiposMaterialesPart;

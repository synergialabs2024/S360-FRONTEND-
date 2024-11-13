/* eslint-disable indent */
import { EstadoRubroEnumChoice, humanizeString } from '@/shared';
import { ChipModelState } from '@/shared/components';

export type ClienteFibraRubroChipStateProps = {
  state: EstadoRubroEnumChoice;
};

const ClienteFibraRubroChipState: React.FC<ClienteFibraRubroChipStateProps> = ({
  state,
}) => {
  if (!state) return 'N/A';

  return (
    <>
      {state === EstadoRubroEnumChoice.NO_PAGADO ||
      state === EstadoRubroEnumChoice.PAGO_INCOMPLETO ? (
        <ChipModelState color="warning" label={humanizeString(state)} />
      ) : state === EstadoRubroEnumChoice.PAGADO ? (
        <ChipModelState color="success" label={humanizeString(state)} />
      ) : state === EstadoRubroEnumChoice.VENCIDO ? (
        <ChipModelState color="info" label={humanizeString(state)} />
      ) : state === EstadoRubroEnumChoice.ANULADO ? (
        <ChipModelState color="error" label={humanizeString(state)} />
      ) : (
        'N/A'
      )}
    </>
  );
};

export default ClienteFibraRubroChipState;

import { useState } from 'react';

import { Rubro } from '@/shared';
import ClienteFibraRobroInfoModal from './ClienteFibraRubroInfoModal';

export type ClienteFibraRubroInfoTableCellProps = {
  rubro: Rubro;
};

const ClienteFibraRubroInfoTableCell: React.FC<
  ClienteFibraRubroInfoTableCellProps
> = ({ rubro }) => {
  ///* local state -------------------------
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ------------- text ------------- */}
      <span
        onClick={() => {
          setIsOpen(true);
        }}
        className="table__link"
      >
        {rubro?.numero_referencia}
      </span>

      {/* ------------- modal ------------- */}
      <ClienteFibraRobroInfoModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        rubro={rubro!}
      />
    </>
  );
};

export default ClienteFibraRubroInfoTableCell;

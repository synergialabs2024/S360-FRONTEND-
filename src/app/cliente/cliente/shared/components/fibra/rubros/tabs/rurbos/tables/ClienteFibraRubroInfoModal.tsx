import { Divider } from '@mui/material';

import { Rubro } from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import {
  ClienteFibraRobroInfoAmounts,
  ClienteFibraRobroInfoFromTo,
  ClienteFibraRobroInfoHeader,
  ClienteFibraRobroInfoTableDetailsRubroItem,
} from './modal';

export type ClienteFibraRobroInfoModalProps = {
  open: boolean;
  onClose: () => void;
  rubro: Rubro;
};

const ClienteFibraRobroInfoModal: React.FC<ClienteFibraRobroInfoModalProps> = ({
  open,
  onClose,
  rubro,
}) => {
  const rubroType = rubro?.tipo_rubro;

  ///* global state --------------------
  const setSelectedRow = useInstalacionesStore(s => s.setSelectedRow);
  const clearAllStore = useInstalacionesStore(s => s.clearAll);

  ///* handlers -------------------------
  const handleClose = () => {
    onClose();
    setSelectedRow(null);
    clearAllStore();
  };

  if (!open) return null;

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title={`Rubro: ${rubroType || ''} - ${rubro?.numero_referencia}`}
        minWidth="87%"
        cancelTextBtn="Cerrar"
        onClose={handleClose}
        contentNode={
          <>
            <ClienteFibraRobroInfoHeader rubro={rubro} />
            <Divider></Divider>

            <ClienteFibraRobroInfoFromTo rubro={rubro} />

            {/* <ClienteFibraRobroInfoTableDetails rubro={rubro} /> */}
            <ClienteFibraRobroInfoTableDetailsRubroItem rubro={rubro} />

            <ClienteFibraRobroInfoAmounts rubro={rubro} />
          </>
        }
      />
    </>
  );
};

export default ClienteFibraRobroInfoModal;

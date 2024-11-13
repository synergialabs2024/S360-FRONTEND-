import { useState } from 'react';

import { Rubro, TipoRubroEnumChoice } from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { Divider } from '@mui/material';
import {
  ClienteFibraRobroInfoFromTo,
  ClienteFibraRobroInfoHeader,
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

  ///* local state -------------------
  const [openSeriesModal, setOpenSeriesModal] = useState<boolean>(false);
  console.log('openSeriesModal', openSeriesModal);

  ///* global state --------------------
  const setSelectedRow = useInstalacionesStore(s => s.setSelectedRow);
  const clearAllStore = useInstalacionesStore(s => s.clearAll);

  ///* handlers -------------------------
  const handleClose = () => {
    onClose();
    setOpenSeriesModal(false);
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
            <>
              {rubroType === TipoRubroEnumChoice.SERVICIO ? (
                <>SERVICIO</>
              ) : rubroType === TipoRubroEnumChoice.PRODUCTOS ? (
                <>PRODUCTOS</>
              ) : rubroType === TipoRubroEnumChoice.LIBRE ? (
                <>LIBRE</>
              ) : null}
            </>

            {/* ========================================================================== */}
            <ClienteFibraRobroInfoHeader rubro={rubro} />
            <Divider></Divider>

            <ClienteFibraRobroInfoFromTo rubro={rubro} />
          </>
        }
      />
    </>
  );
};

export default ClienteFibraRobroInfoModal;

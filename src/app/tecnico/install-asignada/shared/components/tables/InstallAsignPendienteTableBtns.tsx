import { Grid } from '@mui/material';
import { useState } from 'react';
import { MdCancel } from 'react-icons/md';

import {
  EstadoOrdenTrabajoEnumChoice,
  OrdenTrabajo,
  UserRolesEnumChoice,
} from '@/shared';
import { SingleIconButton } from '@/shared/components';
import { useAuthStore } from '@/store/auth';
import { PrerejectInstalacionAsignadaOTModal } from '../form';

export type InstallAsignPendienteTableBtnsProps = {
  ot: OrdenTrabajo;
};

const InstallAsignPendienteTableBtns: React.FC<
  InstallAsignPendienteTableBtnsProps
> = ({ ot }) => {
  ///* local states ---------------------
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);

  ///* global states ---------------------
  const user = useAuthStore(s => s.user);

  const cabPreRejectTech = () => {
    if (user?.role !== UserRolesEnumChoice.TECNICO) return true;

    return (
      ot.estado_orden_trabajo === EstadoOrdenTrabajoEnumChoice.PENDIENTE &&
      !!ot?.can_be_managed
    );
  };

  return (
    <Grid item container spacing={2}>
      <Grid item xs={2}>
        {cabPreRejectTech() && (
          <SingleIconButton
            startIcon={<MdCancel />}
            label="Pre-rechazar"
            color="error"
            onClick={() => {
              setIsOpenRejectModal(true);
            }}
          />
        )}
      </Grid>

      {/* ========================= modals ========================= */}
      <PrerejectInstalacionAsignadaOTModal
        open={isOpenRejectModal}
        onClose={() => setIsOpenRejectModal(false)}
        ordenTrabajo={ot!}
      />
    </Grid>
  );
};

export default InstallAsignPendienteTableBtns;

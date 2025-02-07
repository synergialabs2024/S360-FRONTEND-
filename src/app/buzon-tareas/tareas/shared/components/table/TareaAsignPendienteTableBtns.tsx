import { Grid } from '@mui/material';
import { useState } from 'react';
import { MdCancel } from 'react-icons/md';

import { UserRolesEnumChoice } from '@/shared';
import { SingleIconButton } from '@/shared/components';
import { useAuthStore } from '@/store/auth';
import ReasignarTareaAsignadaModal from '../form/ReasignarTareaAsignadaModal';
import { BuzonTarea } from '@/shared/interfaces/app/cartera/buzon-tareas';

export type TareaAsignPendienteTableBtnsProps = {
  buzonTarea: BuzonTarea;
};

const TareaAsignPendienteTableBtns: React.FC<
  TareaAsignPendienteTableBtnsProps
> = ({ buzonTarea }) => {
  ///* local states ---------------------
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);

  ///* global states ---------------------
  const user = useAuthStore(s => s.user);

  const cabPreRejectTech = () => {
    if (user?.role !== UserRolesEnumChoice.TECNICO) return true;

    return true;
    // return (
    //   ot.estado_orden_trabajo === EstadoOrdenTrabajoEnumChoice.PENDIENTE &&
    //   !!ot?.can_be_managed
    // );
  };

  return (
    <Grid item container spacing={2}>
      <Grid item xs={2}>
        {cabPreRejectTech() && (
          <SingleIconButton
            startIcon={<MdCancel />}
            label="Reasignar"
            color="error"
            onClick={() => {
              setIsOpenRejectModal(true);
            }}
          />
        )}
      </Grid>

      {/* ========================= modals ========================= */}
      <ReasignarTareaAsignadaModal
        open={isOpenRejectModal}
        onClose={() => setIsOpenRejectModal(false)}
        buzonTarea={buzonTarea!}
      />
    </Grid>
  );
};

export default TareaAsignPendienteTableBtns;

import { Grid } from '@mui/material';
import { useState } from 'react';
import { MdCancel } from 'react-icons/md';

import { PermissionsEnum, Preventa } from '@/shared';
import { SingleIconButton } from '@/shared/components';
import { hasPermission } from '@/shared/utils/auth';
import RejectPreventaModal from './RejectPreventaModal';

export type CustomButtonsPreventaByStateProps = {
  preventa: Preventa;
  canReject?: boolean;
};

const CustomButtonsPreventaByState: React.FC<
  CustomButtonsPreventaByStateProps
> = ({ preventa, canReject }) => {
  ///* local state ------------------------
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      {hasPermission(PermissionsEnum.comercial_change_preventa) && canReject ? (
        <Grid item xs={2}>
          <SingleIconButton
            startIcon={<MdCancel />}
            label="Cancelar preventa"
            color="error"
            onClick={() => {
              setOpenModal(true);
            }}
          />
        </Grid>
      ) : null}

      {/* ================ modals ================ */}
      <RejectPreventaModal
        openModal={openModal}
        preventa={preventa}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default CustomButtonsPreventaByState;

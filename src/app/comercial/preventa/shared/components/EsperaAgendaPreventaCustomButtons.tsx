/* eslint-disable indent */
import { Grid } from '@mui/material';
import { useState } from 'react';
import { HiDocumentPlus } from 'react-icons/hi2';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { returnUrlAgendamientoVentasPage } from '@/app/comercial/agendamiento/pages/tables/AgendamientoVentasMainPage';
import { EstadoPagoEnumChoice, PermissionsEnum, Preventa } from '@/shared';
import { SingleIconButton } from '@/shared/components';
import { hasPermission } from '@/shared/utils/auth';
import RejectPreventaModal from './RejectPreventaModal';

export type EsperaAgendaPreventaCustomButtonsProps = { preventa: Preventa };

const EsperaAgendaPreventaCustomButtons: React.FC<
  EsperaAgendaPreventaCustomButtonsProps
> = ({ preventa }) => {
  ///* local state ------------------------
  const [openModal, setOpenModal] = useState<boolean>(false);

  ///* hooks ------------------------
  const navigate = useNavigate();

  return (
    <>
      <Grid container item xs={12} spacing={4}>
        {(preventa?.requiere_pago_previo &&
          preventa?.estado_pago === EstadoPagoEnumChoice.PENDIENTE) ||
        !preventa.contrato_aceptado ? null : (
          <Grid item xs={2}>
            <SingleIconButton
              startIcon={<HiDocumentPlus />}
              label="Crear agenda "
              color="inherit"
              onClick={() => {
                navigate(
                  `${returnUrlAgendamientoVentasPage}/crear/${preventa?.uuid}`,
                );
              }}
            />
          </Grid>
        )}

        {hasPermission(PermissionsEnum.comercial_change_preventa) ? (
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
      </Grid>

      {/* ================ modals ================ */}
      <RejectPreventaModal
        openModal={openModal}
        preventa={preventa}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default EsperaAgendaPreventaCustomButtons;

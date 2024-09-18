/* eslint-disable indent */
import { Grid } from '@mui/material';
import { HiDocumentPlus } from 'react-icons/hi2';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { returnUrlAgendamientoVentasPage } from '@/app/comercial/agendamiento/pages/tables/AgendamientoVentasMainPage';
import { EstadoPagoEnumChoice, Preventa } from '@/shared';
import { SingleIconButton } from '@/shared/components';

export type EsperaAgendaPreventaCustomButtonsProps = { preventa: Preventa };

const EsperaAgendaPreventaCustomButtons: React.FC<
  EsperaAgendaPreventaCustomButtonsProps
> = ({ preventa }) => {
  ///* hooks ------------------------
  const navigate = useNavigate();

  return (
    <Grid container item xs={12} spacing={4}>
      {preventa?.requiere_pago_previo &&
      preventa?.estado_pago === EstadoPagoEnumChoice.PENDIENTE ? null : (
        <Grid item xs={2}>
          <SingleIconButton
            startIcon={<HiDocumentPlus />}
            label="Crear agenda"
            color="inherit"
            onClick={() => {
              navigate(
                `${returnUrlAgendamientoVentasPage}/crear/${preventa?.uuid}`,
              );
            }}
          />
        </Grid>
      )}

      <Grid item xs={2}>
        <SingleIconButton
          startIcon={<MdCancel />}
          label="Cancelar preventa"
          color="error"
          onClick={() => {}}
        />
      </Grid>
    </Grid>
  );
};

export default EsperaAgendaPreventaCustomButtons;

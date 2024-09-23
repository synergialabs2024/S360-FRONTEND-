import { UseFormReturn } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared';
import { CustomCircularPorgress } from '@/shared/components';
import { useAgendamientoVentasStore } from '@/store/app';
import { Grid } from '@mui/material';
import { usePlanificadorAgendamiento } from '../../hooks';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento/SaveAgendamiento';
import HourInstallSchedulePaperAndCountdown from './HourInstallSchedulePaperAndCountdown';

export type InstallationScheduleComponentProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
};

const InstallationScheduleComponent: React.FC<
  InstallationScheduleComponentProps
> = ({ form }) => {
  ///* hooks ---------------------
  const { isLoadingFlotas, isRefetchingFlotas } = usePlanificadorAgendamiento({
    form,
  });

  ///* global state ============================
  const availableFleetsByZonePks = useAgendamientoVentasStore(
    s => s.availableFleetsByZonePks,
  );

  if (isLoadingFlotas || isRefetchingFlotas) return <CustomCircularPorgress />;

  console.log('availableFleetsByZonePks', availableFleetsByZonePks);

  return (
    <>
      <Grid
        item
        container
        xs={12}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item {...gridSizeMdLg6}>
          Paninador de flotas x zona
        </Grid>

        <Grid item {...gridSizeMdLg6}>
          Secondary
        </Grid>
      </Grid>

      <HourInstallSchedulePaperAndCountdown form={form} />
    </>
  );
};

export default InstallationScheduleComponent;

import { FormHelperText, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import { CacheBaseKeysPreventaEnum } from '@/actions/app';
import { Preventa } from '@/shared';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import { InstallationScheduleComponent } from '../../planificador-step';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento';
import PromocionPreventaView from './PromocionPreventaView';

export type AgendamientoSaveAgendaStepProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
  preventa: Preventa;
};

const AgendamientoSaveAgendaStep: React.FC<AgendamientoSaveAgendaStepProps> = ({
  form,
  preventa,
}) => {
  return (
    <>
      <CustomTypoLabel text="Detalle Instalación" />

      <CustomTextFieldNoForm
        label="NAP"
        value={preventa?.nap_data?.name || 'N/A'}
        disabled
      />
      <CustomTextFieldNoForm
        label="Distancia"
        value={preventa?.distancia_nap || 'N/A'}
        disabled
        endAdornment="m"
      />
      <Grid item xs={12} m={0} p={0}>
        <FormHelperText
          sx={{
            textAlign: 'left',
          }}
        >
          *La distancia es un valor aproximado en metros, calculado entre las
          coordenadas del usuario y la NAP asignada.
        </FormHelperText>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <CustomTypoLabel
          text="PROMOCIONES"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <PromocionPreventaView preventa={preventa!} form={form as any} />
      </Grid>

      {/* ============ planificador component ============ */}
      <>
        <CustomTypoLabel
          text="Horarios disponibles"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <InstallationScheduleComponent
          form={form}
          preventa={preventa!}
          cacheKey={`${CacheBaseKeysPreventaEnum.HORARIO_INSTALACION_AGENDA_VENTAS}_${preventa?.uuid!}`}
          showFleetName
        />
      </>
    </>
  );
};

export default AgendamientoSaveAgendaStep;

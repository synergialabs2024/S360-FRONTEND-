import dayjs from 'dayjs';
import { UseFormReturn } from 'react-hook-form';

import {
  DatosClienteTecnicoOTPart,
  DatosInstallOTFormTabPart,
} from '@/app/tecnico/install-asignada/shared/components/form';
import { OrdenTrabajo } from '@/shared';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import type { ActicacionInstallOTSaveFormData } from './SaveActivacionInstallPendienteOT';

export type ActivacionInstallOTGeneralInfoTabProps = {
  ordenTrabajo: OrdenTrabajo;
  form: UseFormReturn<ActicacionInstallOTSaveFormData>;
};

const ActivacionInstallOTGeneralInfoTab: React.FC<
  ActivacionInstallOTGeneralInfoTabProps
> = ({ ordenTrabajo, form }) => {
  ///* form ---------------------
  const watchedHoraInicio = form.watch('hora_inicio');
  const watchedHoraFin = form.watch('hora_fin');

  return (
    <>
      <DatosInstallOTFormTabPart ordenTrabajo={ordenTrabajo} />

      <>
        <CustomTextFieldNoForm
          label="Hora de entrada técnico"
          value={dayjs(watchedHoraInicio).format('HH:mm:ss') || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Hora de salida técnico"
          value={dayjs(watchedHoraFin).format('HH:mm:ss') || ''}
          disabled
        />

        {/* <CustomTimePicker
          label="Hora de salida técnico"
          name="hora_fin"
          control={form.control}
          defaultValue={ordenTrabajo?.hora_fin}
          error={errors.hora_fin}
          helperText={errors.hora_fin?.message}
          size={gridSizeMdLg6}
          minTime={dayjs(watchedHoraInicio, 'HH:mm')}
        /> */}
      </>

      <>
        <CustomTypoLabel
          text="Datos del cliente"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <DatosClienteTecnicoOTPart ordenTrabajo={ordenTrabajo} />
      </>
    </>
  );
};

export default ActivacionInstallOTGeneralInfoTab;

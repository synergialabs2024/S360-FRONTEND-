import dayjs from 'dayjs';
import { UseFormReturn } from 'react-hook-form';

import {
  DatosClienteTecnicoOTPart,
  DatosInstallOTFormTabPart,
} from '@/app/tecnico/install-asignada/shared/components/form';
import { gridSizeMdLg6, OrdenTrabajo } from '@/shared';
import {
  CustomTimePicker,
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
  const { errors } = form.formState;
  const watchedHoraInicio = form.watch('hora_inicio');

  return (
    <>
      <DatosInstallOTFormTabPart ordenTrabajo={ordenTrabajo} />

      <>
        <CustomTimePicker
          label="Hora de entrada técnico"
          name="hora_inicio"
          control={form.control}
          defaultValue={ordenTrabajo?.hora_inicio}
          error={errors.hora_inicio}
          helperText={errors.hora_inicio?.message}
          size={gridSizeMdLg6}
          onChangeValue={() => {
            form.setValue('hora_fin', undefined);
          }}
        />
        <CustomTimePicker
          label="Hora de salida técnico"
          name="hora_fin"
          control={form.control}
          defaultValue={ordenTrabajo?.hora_fin}
          error={errors.hora_fin}
          helperText={errors.hora_fin?.message}
          size={gridSizeMdLg6}
          minTime={dayjs(watchedHoraInicio, 'HH:mm')}
        />
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

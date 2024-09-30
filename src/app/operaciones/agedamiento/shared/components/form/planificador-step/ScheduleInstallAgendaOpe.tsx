import { UseFormReturn } from 'react-hook-form';
import { LuCalendarSearch } from 'react-icons/lu';
import { MdEditCalendar } from 'react-icons/md';

import { InstallationScheduleComponent } from '@/app/comercial/agendamiento/shared/components/planificador-step';
import { Agendamiento, gridSize } from '@/shared';
import {
  CustomTextFieldNoForm,
  SingleIconButton,
  TabTexLabelCustomSpace,
} from '@/shared/components';
import { useAgendamientoOperacionesStore } from '@/store/app';
import type { SaveConfirmAgendaOperaciones } from '../../SaveConfirmAgendaOperaciones';

export type ScheduleInstallAgendaOpeProps = {
  form: UseFormReturn<SaveConfirmAgendaOperaciones>;
  agendamiento: Agendamiento;
};

const ScheduleInstallAgendaOpe: React.FC<ScheduleInstallAgendaOpeProps> = ({
  agendamiento,
  form,
}) => {
  ///* global state ---------------------
  const isEdittingSchedule = useAgendamientoOperacionesStore(
    s => s.isEdittingSchedule,
  );
  const setEdittingSchedule = useAgendamientoOperacionesStore(
    s => s.setIsEdittingSchedule,
  );
  const isComponentBlocked = useAgendamientoOperacionesStore(
    s => s.isComponentBlocked,
  );

  return (
    <>
      <TabTexLabelCustomSpace
        textContent="Actualizar agendamiento"
        showCustomRightSpace
        customRightSpace={
          <>
            <SingleIconButton
              startIcon={
                isEdittingSchedule ? <LuCalendarSearch /> : <MdEditCalendar />
              }
              color={!isEdittingSchedule ? 'primary' : 'secondary'}
              label={!isEdittingSchedule ? 'Actualizar' : 'Horarios'}
              onClick={() => setEdittingSchedule(!isEdittingSchedule)}
            />
          </>
        }
      />
      <>
        {!isEdittingSchedule && !isComponentBlocked ? (
          <>
            <CustomTextFieldNoForm
              label="Fecha de instalación"
              value={agendamiento?.fecha_instalacion}
              disabled
            />
            <CustomTextFieldNoForm
              label="Hora de instalación"
              value={agendamiento?.hora_instalacion}
              disabled
            />

            <CustomTextFieldNoForm
              label="Flota asignada"
              value={agendamiento?.flota_data?.name}
              disabled
              size={gridSize}
            />
          </>
        ) : (
          <>
            <InstallationScheduleComponent
              form={form as any}
              preventa={agendamiento.preventa_data!}
            />
          </>
        )}
      </>
    </>
  );
};

export default ScheduleInstallAgendaOpe;

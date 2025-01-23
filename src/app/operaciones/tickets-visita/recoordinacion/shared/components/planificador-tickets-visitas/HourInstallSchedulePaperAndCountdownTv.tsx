/* eslint-disable indent */
import { Grid, Paper } from '@mui/material';
import dayjs from 'dayjs';
import { UseFormReturn } from 'react-hook-form';

import { COUNTDOWN_TICKETS_VISITAS_ID } from '@/actions/app';
import {
  formatHourTimeField,
  gridSizeMdLg5,
  gridSizeMdLg6,
  ToastWrapper,
} from '@/shared';
import { CustomDateCalendar } from '@/shared/components';
import { useAgendamientoVentasStore } from '@/store/app';
import {
  CountDownAgendaVenta,
  CustomInstallSchedulePaperSlot,
} from '@/app/comercial/agendamiento/shared/components/planificador-step';
import { SaveFormDataAgendaTicketsVisita } from '../SaveRecoordinacionTicketVisita';

export type HourInstallSchedulePaperAndCountdownTvProps = {
  form: UseFormReturn<SaveFormDataAgendaTicketsVisita>;
  setIsOpenModal: (isOpen: boolean) => void;
};

const HourInstallSchedulePaperAndCountdownTv: React.FC<
  HourInstallSchedulePaperAndCountdownTvProps
> = ({ form, setIsOpenModal }) => {
  ///* global state ============================
  const availableTimeMap = useAgendamientoVentasStore(s => s.availableTimeMap);
  const selectedHour = useAgendamientoVentasStore(s => s.selectedHour);
  const isComponentBlocked = useAgendamientoVentasStore(
    s => s.isComponentBlocked,
  );
  const setSelectedHour = useAgendamientoVentasStore(s => s.setSelectedHour);

  ///* form ---------------------
  const { errors } = form.formState;

  ///* handlers ---------------------
  const onChangeFechaInstalacion = (date: string | null) => {
    if (!date) return;
  };

  return (
    <>
      <Grid
        item
        xs={12}
        container
        spacing={3}
        justifyContent="center"
        alignItems="start"
        mt={2}
      >
        <Grid item {...gridSizeMdLg6}>
          <CustomDateCalendar
            name="fecha_instalacion"
            control={form.control}
            defaultValue={dayjs().format('YYYY-MM-DD')}
            error={errors.fecha_instalacion}
            helperText={errors.fecha_instalacion?.message}
            onChangeValue={onChangeFechaInstalacion}
            minDate={dayjs()}
            maxDate={dayjs().add(6, 'week').format('YYYY-MM-DD') || null}
            size={gridSizeMdLg5}
            disabled={isComponentBlocked}
            // shouldDisableDate={day => {
            //   const isBlockedDate = !allTimeMaps?.some(
            //     tm =>
            //       dayjs(tm.fecha).format('YYYY-MM-DD') ===
            //         dayjs(day).format('YYYY-MM-DD') && tm.horas.length,
            //   );

            //   return isBlockedDate;
            // }}
          />
        </Grid>
        <span className="spacer" />

        <Grid
          item
          {...gridSizeMdLg5}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item container xs={12} spacing={2}>
            {/* --------- timer --------- */}
            <CountDownAgendaVenta countDownId={COUNTDOWN_TICKETS_VISITAS_ID} />

            {/* --------- hours --------- */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  maxHeight: 250,
                  overflowY: 'auto',
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                {availableTimeMap && availableTimeMap?.length ? (
                  availableTimeMap?.map(timeSlot => {
                    return (
                      <CustomInstallSchedulePaperSlot
                        key={timeSlot.uuid}
                        hour={timeSlot.hora}
                        isClicked={
                          selectedHour?.toString() ===
                          timeSlot?.hora?.toString()
                        }
                        onClick={() => {
                          if (isComponentBlocked) {
                            ToastWrapper.warning(
                              'Ya seleccionaste un horario, espera a que termine el tiempo de bloqueo.',
                            );
                            return;
                          }

                          setIsOpenModal(true);
                          setSelectedHour(timeSlot.hora);
                        }}
                      >
                        {formatHourTimeField(timeSlot.hora)}
                      </CustomInstallSchedulePaperSlot>
                    );
                  })
                ) : (
                  <Grid item xs={12}>
                    <img
                      src="/empty-schedule.svg"
                      alt="Empty schedule"
                      draggable="false"
                      style={{
                        width: '70%',
                        height: 'auto',
                        margin: 'auto',
                        objectFit: 'cover',
                      }}
                    />
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HourInstallSchedulePaperAndCountdownTv;

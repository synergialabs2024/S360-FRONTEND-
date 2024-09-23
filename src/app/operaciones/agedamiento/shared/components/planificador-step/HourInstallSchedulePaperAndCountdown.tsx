/* eslint-disable indent */
import { Grid, Paper } from '@mui/material';
import dayjs from 'dayjs';
import { UseFormReturn } from 'react-hook-form';

import { formatHourTimeField, gridSizeMdLg5, gridSizeMdLg6 } from '@/shared';
import { CustomDateCalendar } from '@/shared/components';
import { useAgendamientoVentasStore } from '@/store/app';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento/SaveAgendamiento';
import CustomInstallSchedulePaperSlot from './CustomInstallSchedulePaperSlot';

export type HourInstallSchedulePaperAndCountdownProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
};

const HourInstallSchedulePaperAndCountdown: React.FC<
  HourInstallSchedulePaperAndCountdownProps
> = ({ form }) => {
  ///* global state ============================
  const availableTimeMap = useAgendamientoVentasStore(s => s.availableTimeMap);

  ///* form ---------------------
  const { errors } = form.formState;

  ///* handlers ---------------------
  const onChangeFechaInstalacion = (date: string | null) => {
    if (!date) return;
    console.log('date', date);
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
          {/* <img
            src="/schedule-planificador.svg"
            alt="select hour"
            draggable="false"
            style={{
              width: '100%',
              height: 'auto',
              margin: 'auto',
              objectFit: 'cover',
            }}
          /> */}
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
            <>COUNT DOWN</>

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
                        isClicked={false}
                        onClick={() => {}}
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

                {/* {planificadores?.map(planificador => {
                  if (!planificador) return null;

                  if (planificador?.fecha === '2024-09-23') {
                    return planificador?.time_map?.map(timeSlot => {
                      return (
                        <CustomInstallSchedulePaperSlot
                          key={timeSlot.uuid}
                          hour={timeSlot.hora}
                          isClicked={false}
                          onClick={() => {}}
                        >
                          {timeSlot.hora}
                        </CustomInstallSchedulePaperSlot>
                      );
                    });
                  }

                  return null;
                })} */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HourInstallSchedulePaperAndCountdown;

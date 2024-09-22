import { Grid, Paper } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import { gridSizeMdLg5, gridSizeMdLg6 } from '@/shared';
import { useAgendamientoVentasStore } from '@/store/app';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento/SaveAgendamiento';
import CustomInstallSchedulePaperSlot from './CustomInstallSchedulePaperSlot';

export type HourInstallSchedulePaperAndCountdownProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
};

const HourInstallSchedulePaperAndCountdown: React.FC<
  HourInstallSchedulePaperAndCountdownProps
> = () => {
  ///* global state ============================
  const availableTimeMap = useAgendamientoVentasStore(s => s.availableTimeMap);

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
          <img
            src="/calendar-planificador.svg"
            alt="select hour"
            draggable="false"
            style={{
              width: '100%',
              height: 'auto',
              margin: 'auto',
              objectFit: 'cover',
            }}
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
                {availableTimeMap?.map(timeSlot => {
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
                })}

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

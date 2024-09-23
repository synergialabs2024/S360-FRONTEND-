import { Box, Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import { CustomCircularPorgress } from '@/shared/components';
import { useAgendamientoVentasStore } from '@/store/app';
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

  ///* global state ---------------------
  const availableFleetsByZonePks = useAgendamientoVentasStore(
    s => s.availableFleetsByZonePks,
  );

  ///* local state ---------------------
  const [optionsPks, setOptionsPks] = useState<number[]>(
    availableFleetsByZonePks || [],
  );
  const [currentOptionIdx, setCurrentOptionIdx] = useState<number>(0);

  ///* handlers ---------------------
  const handleNext = () => {
    if (currentOptionIdx === optionsPks.length - 1) return;
    setCurrentOptionIdx(prev => prev + 1);

    // upd form flota pk
    form.setValue('flota', optionsPks[currentOptionIdx + 1]);
  };
  const handlePrev = () => {
    if (currentOptionIdx === 0) return;
    setCurrentOptionIdx(prev => prev - 1);

    // upd form flota pk
    form.setValue('flota', optionsPks[currentOptionIdx - 1]);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (availableFleetsByZonePks && availableFleetsByZonePks.length > 0) {
      setOptionsPks(availableFleetsByZonePks);
    } else {
      setOptionsPks([]);
    }
  }, [availableFleetsByZonePks]);

  if (isLoadingFlotas || isRefetchingFlotas) return <CustomCircularPorgress />;

  console.log({
    availableFleetsByZonePks,
    optionsPks,
    currentOptionIdx,
    currentPk: optionsPks[currentOptionIdx],
  });

  return (
    <>
      {/* ============= fleets paginator ============= */}
      <Grid container>
        <span className="spacer" />
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            color="primary"
            onClick={handlePrev}
            disabled={currentOptionIdx === 0}
          >
            <MdArrowBackIosNew fontSize="large" />
          </IconButton>

          <IconButton
            color="primary"
            onClick={handleNext}
            disabled={currentOptionIdx === optionsPks.length - 1}
          >
            <MdArrowForwardIos fontSize="large" />
          </IconButton>
        </Box>
      </Grid>

      {/* ============= main component ============= */}
      <HourInstallSchedulePaperAndCountdown form={form} />
    </>
  );
};

export default InstallationScheduleComponent;

import { Box, Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import { gridSize, Preventa } from '@/shared';
import { CustomTextFieldNoForm } from '@/shared/components';
import { useAgendamientoVentasStore } from '@/store/app';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento/SaveAgendamiento';
import ConfirmInstallScheduleVentasModal from './ConfirmInstallScheduleVentasModal';
import HourInstallSchedulePaperAndCountdown from './HourInstallSchedulePaperAndCountdown';

export type InstallationScheduleComponentProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
  preventa: Preventa;
  cacheKey: string;
  showFleetName?: boolean;
};

const InstallationScheduleComponent: React.FC<
  InstallationScheduleComponentProps
> = ({ form, preventa, cacheKey, showFleetName = false }) => {
  ///* global state ---------------------
  const availableFleetsByZonePks = useAgendamientoVentasStore(
    s => s.availableFleetsByZonePks,
  );
  const isComponentBlocked = useAgendamientoVentasStore(
    s => s.isComponentBlocked,
  );

  ///* form ---------------------
  const watchedRawFleet = form.watch('rawFlota');

  ///* local state ---------------------
  const [optionsPks, setOptionsPks] = useState<number[]>(
    availableFleetsByZonePks || [],
  );
  const [currentOptionIdx, setCurrentOptionIdx] = useState<number>(0);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  ///* handlers ---------------------
  const handleNext = () => {
    if (currentOptionIdx === optionsPks.length - 1) return;
    setCurrentOptionIdx(prev => prev + 1);
  };
  const handlePrev = () => {
    if (currentOptionIdx === 0) return;
    setCurrentOptionIdx(prev => prev - 1);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (availableFleetsByZonePks && availableFleetsByZonePks.length > 0) {
      setOptionsPks(availableFleetsByZonePks);
    } else {
      setOptionsPks([]);
    }
  }, [availableFleetsByZonePks]);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);
  // upd form flota pk on change
  useEffect(() => {
    if (!isMounted) return;

    if (optionsPks.length > 0) {
      form.setValue('flota', optionsPks[currentOptionIdx]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOptionIdx, isMounted]);

  if (!preventa?.flota) return null;

  return (
    <>
      {/* ================ fleets paginator ================ */}
      <Grid item container xs={12} direction="column">
        {showFleetName && (
          <Grid item xs={12} m={0} p={0}>
            <CustomTextFieldNoForm
              label="Flota asignada"
              value={watchedRawFleet?.name || ''}
              disabled
              size={gridSize}
            />
          </Grid>
        )}

        <span className="spacer" />
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              color="primary"
              onClick={handlePrev}
              disabled={currentOptionIdx === 0 || isComponentBlocked}
            >
              <MdArrowBackIosNew fontSize="large" />
            </IconButton>

            <IconButton
              color="primary"
              onClick={handleNext}
              disabled={
                currentOptionIdx === optionsPks.length - 1 || isComponentBlocked
              }
            >
              <MdArrowForwardIos fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* ================ main component ================ */}
      <HourInstallSchedulePaperAndCountdown
        form={form}
        setIsOpenModal={setIsOpenModal}
      />

      {/* ================ MODALS ================ */}
      <ConfirmInstallScheduleVentasModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        preventaId={preventa?.id!}
        form={form}
        cacheKey={cacheKey}
      />
    </>
  );
};

export default InstallationScheduleComponent;

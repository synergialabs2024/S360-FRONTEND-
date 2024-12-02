import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import { gridSize, Preventa } from '@/shared';
import { CustomSingleButton, CustomTextFieldNoForm } from '@/shared/components';
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
  const availableFleetsByZoneUUIDs = useAgendamientoVentasStore(
    s => s.availableFleetsByZoneUUIDs,
  );
  const isComponentBlocked = useAgendamientoVentasStore(
    s => s.isComponentBlocked,
  );
  const fleetsByZoneLimitData = useAgendamientoVentasStore(
    s => s.fleetsByZoneLimitData,
  );

  ///* form ---------------------
  const watchedRawFleet = form.watch('rawFlota');

  ///* local state ---------------------
  const [optionsUUIDs, setOptionsUUIDs] = useState<string[]>(
    availableFleetsByZoneUUIDs || [],
  );
  const [currentOptionIdx, setCurrentOptionIdx] = useState<number>(0);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  ///* handlers ---------------------
  const handleNext = () => {
    if (currentOptionIdx === optionsUUIDs.length - 1) return;
    setCurrentOptionIdx(prev => prev + 1);
  };
  const handlePrev = () => {
    if (currentOptionIdx === 0) return;
    setCurrentOptionIdx(prev => prev - 1);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (availableFleetsByZoneUUIDs && availableFleetsByZoneUUIDs.length > 0) {
      setOptionsUUIDs(availableFleetsByZoneUUIDs);
    } else {
      setOptionsUUIDs([]);
    }
  }, [availableFleetsByZoneUUIDs]);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);
  // upd form flotaUUID and rawFlota
  useEffect(() => {
    if (!isMounted) return;

    if (optionsUUIDs.length > 0) {
      form.setValue('flotaUUID', optionsUUIDs[currentOptionIdx]);

      const rawFleet = fleetsByZoneLimitData.find(
        fleet => fleet?.uuid === optionsUUIDs[currentOptionIdx],
      );
      form.setValue('rawFlota', rawFleet as any);
      form.setValue('flota', rawFleet?.id!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOptionIdx, isMounted]);

  if (!preventa?.flota_data?.uuid) return null;

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
            <CustomSingleButton
              label="Atrás"
              variant={currentOptionIdx === 0 ? 'outlined' : 'contained'}
              color="primary"
              startIcon={<MdArrowBackIosNew />}
              onClick={handlePrev}
              sxBtn={{
                ml: 0.8,
              }}
              disabled={currentOptionIdx === 0 || isComponentBlocked}
            />
            <span className="spacer" />

            <CustomSingleButton
              label="Siguiente"
              variant={
                currentOptionIdx === optionsUUIDs.length - 1
                  ? 'outlined'
                  : 'contained'
              }
              color="primary"
              startIcon={<MdArrowForwardIos />}
              onClick={handleNext}
              sxBtn={{
                ml: 0.8,
              }}
              disabled={
                currentOptionIdx === optionsUUIDs.length - 1 ||
                isComponentBlocked
              }
              justifyContent="flex-end"
            />
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

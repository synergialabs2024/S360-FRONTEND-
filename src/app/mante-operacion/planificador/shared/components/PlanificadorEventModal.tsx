import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { useFetchSystemUsers } from '@/actions/app';
import { gridSize, humanizeString, useLoaders } from '@/shared';
import {
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  ScrollableDialogProps,
} from '@/shared/components';
import { Nullable, SystemUser } from '@/shared/interfaces';
import { usePlanificadoresStore } from '@/store/app';
import dayjs from 'dayjs';

export type PlanificadorEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PlanificadorEventModal: React.FC<PlanificadorEventModalProps> = ({
  isOpen,
  onClose,
}) => {
  ///* local state ---------------------
  const [user, setUser] = useState<Nullable<SystemUser>>(null);

  ///* global state ---------------------
  const selectedEvent = usePlanificadoresStore(s => s.selectedEvent);

  ///* fetch data ---------------------
  const {
    data: systemUsersPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSystemUsers({
    enabled: isOpen,
    params: {
      id: selectedEvent?.user!,
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* effects ---------------------
  const customLoader = isLoading || isRefetching;
  useEffect(() => {
    if (!isOpen || customLoader) return;
    const user = systemUsersPagingRes?.data?.items[0];
    setUser(user?.user || null);
  }, [customLoader, isOpen, systemUsersPagingRes?.data?.items]);

  useLoaders(customLoader);

  return (
    <>
      <ScrollableDialogProps
        title={`Detalle de horario ${humanizeString(selectedEvent?.title || 'Evento')}`}
        open={isOpen}
        onClose={handleClose}
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid item container spacing={3} py={3}>
            <CustomTextFieldNoForm
              label="Usuario"
              value={user?.razon_social || 'N/A'}
              disabled
              size={gridSize}
            />
            <CustomTextFieldNoForm
              label="Fecha"
              value={dayjs(selectedEvent?.start).format('DD/MM/YYYY')}
              disabled
            />
            <CustomTextFieldNoForm
              label="Horario"
              value={dayjs(selectedEvent?.start).format('HH:mm A')}
              disabled
            />

            <CustomTextAreaNoForm
              label="Estado"
              value={selectedEvent?.estado || 'N/A'}
              disabled
              size={gridSize}
            />
          </Grid>
        }
      />
    </>
  );
};

export default PlanificadorEventModal;

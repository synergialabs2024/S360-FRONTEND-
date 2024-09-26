import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  BlockManyHours,
  PlanificadorTSQEnum,
  usePostPlanificador,
} from '@/actions/app';
import {
  blockManyHoursSchema,
  gridSize,
  SLOT_AGENDAMIENTO_ESTADOS_ARRAY_CHOICES,
} from '@/shared';
import {
  CustomAutocompleteArrString,
  ScrollableDialogProps,
} from '@/shared/components';
import { usePlanificadoresStore } from '@/store/app';
import { useQueryClient } from '@tanstack/react-query';

export type MultipleSlotsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type BlockManyHoursForm = BlockManyHours & {
  isUnblockRequest?: boolean;
};

const MultipleSlotsModal: React.FC<MultipleSlotsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();

  ///* local state ---------------------
  const [isUnblockRequest, setRequestUnblock] = useState<boolean>(false);

  ///* global state ---------------------
  const selectedSlots = usePlanificadoresStore(s => s.selectedSlots);
  const selectedEvents = usePlanificadoresStore(s => s.selectedEvents);
  const setSelectedSlots = usePlanificadoresStore(s => s.setSelectedSlots);
  const setSelectedEvents = usePlanificadoresStore(s => s.setSelectedEvents);
  const flota = usePlanificadoresStore(s => s.selectedFleet);

  ///* form -----------------
  const form = useForm<BlockManyHoursForm>({
    resolver: yupResolver(blockManyHoursSchema) as any,
  });
  const { formState } = form;
  const { errors } = formState;

  ///* mutation ---------------------
  const tempBlockUnlockManyHoursPlanificador =
    usePostPlanificador<BlockManyHours>(
      {
        customMessageToast: `Horario ${isUnblockRequest ? 'desbloqueado' : 'bloqueado'} correctamente`,
      },
      '/slot/block-many/',
    );

  ///* handlers ---------------------
  const onSubmit = async (data: BlockManyHoursForm) => {
    console.log('onSubmit', { data });

    // unblock ----------------
    if (isUnblockRequest) {
      await queryClient.invalidateQueries({
        queryKey: [PlanificadorTSQEnum.PLANIFICADORS],
      });
      return;
    }

    // block ----------------
    tempBlockUnlockManyHoursPlanificador.mutateAsync({
      estado: data.estado,
      fecha: dayjs(selectedSlots[0]).format('YYYY-MM-DD'),
      flota: flota?.id!,
      hours: selectedSlots.map(slot => dayjs(slot).format('HH:mm:ss')),
    });

    await queryClient.invalidateQueries({
      queryKey: [PlanificadorTSQEnum.PLANIFICADORS],
    });
  };

  const handleClose = () => {
    onClose();
    form.reset();
    setSelectedSlots([]);
    setSelectedEvents([]);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!isOpen) return;

    console.log({
      selectedEvents,
      selectedSlots,
    });

    setRequestUnblock(false);
  }, [isOpen, selectedEvents, selectedSlots]);

  return (
    <>
      <ScrollableDialogProps
        title={isUnblockRequest ? 'Desbloquear Horario' : 'Bloquear Horario'}
        open={isOpen}
        onClose={handleClose}
        // minWidth="30%"
        confirmTextBtn={isUnblockRequest ? 'Desbloquear' : 'Bloquear'}
        onConfirm={form.handleSubmit(onSubmit, () => {})}
        confirmVariantBtn="outlined"
        disabledConfirmBtn={formState.isSubmitting}
        // contentNode
        contentNode={
          <>
            <Grid container spacing={3} pt={2} pb={3}>
              <Grid item xs={12} pb={1}>
                <Typography variant="body1">
                  Se {isUnblockRequest ? 'desbloquearán' : 'bloquearán'} los
                  siguientes horarios para el día{' '}
                  <b>
                    {selectedSlots &&
                      dayjs(selectedSlots[0]).format('DD/MM/YYYY')}
                  </b>
                  en el horario seleccionado:
                  <b>
                    {dayjs(selectedSlots[0]).format('HH:mm')} -{' '}
                    {dayjs(selectedSlots?.at(-1)).format('HH:mm')}
                  </b>
                </Typography>
              </Grid>

              <CustomAutocompleteArrString
                label="Estado"
                name="estado"
                control={form.control}
                defaultValue={form.getValues('estado')}
                options={SLOT_AGENDAMIENTO_ESTADOS_ARRAY_CHOICES}
                isLoadingData={false}
                error={errors.estado}
                helperText={errors.estado?.message}
                size={gridSize}
                disableClearable
              />
            </Grid>
          </>
        }
      />
    </>
  );
};

export default MultipleSlotsModal;

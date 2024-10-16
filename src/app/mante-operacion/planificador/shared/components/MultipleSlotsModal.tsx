import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
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
import { useUiStore } from '@/store/ui';
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

  ///* global state ---------------------
  const selectedSlots = usePlanificadoresStore(s => s.selectedSlots);
  const setSelectedSlots = usePlanificadoresStore(s => s.setSelectedSlots);
  const flota = usePlanificadoresStore(s => s.selectedFleet);
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

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
        customMessageToast: 'Horario gestionado correctamente',
      },
      '/slot/block-many/',
    );

  ///* handlers ---------------------
  const onSubmit = async (data: BlockManyHoursForm) => {
    // set state
    setIsGlobalLoading(true);
    tempBlockUnlockManyHoursPlanificador.mutateAsync({
      estado: data.estado,
      fecha: dayjs(selectedSlots[0]).format('YYYY-MM-DD'),
      flota: flota?.id!,
      hours: selectedSlots.map(slot => dayjs(slot).format('HH:mm:ss')),
    });

    await queryClient.invalidateQueries({
      queryKey: [PlanificadorTSQEnum.PLANIFICADORS],
    });
    setIsGlobalLoading(false);

    handleClose();
  };

  const handleClose = () => {
    onClose();
    form.reset();
    setSelectedSlots([]);
  };

  ///* effects ---------------------

  return (
    <>
      <ScrollableDialogProps
        title="Gestionar Horarios"
        open={isOpen}
        onClose={handleClose}
        // minWidth="30%"
        confirmTextBtn="Establecer estado"
        onConfirm={form.handleSubmit(onSubmit, () => {})}
        confirmVariantBtn="outlined"
        disabledConfirmBtn={formState.isSubmitting}
        // contentNode
        contentNode={
          <>
            <Grid container spacing={3} pt={2} pb={3}>
              <Grid item xs={12} pb={1}>
                <Typography variant="body1">
                  Se establecerá el estado deseado para los siguientes horarios
                  del día{' '}
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

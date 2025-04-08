import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  LineaServicioTSQEnum,
  useFetchMotivoRubroAdicionals,
} from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  LineaServicio,
  manualSuspensionSchema,
  MotivoRubroAdicional,
  tipoRubroAdicionalMantenedorEnumChoice,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { CustomAutocomplete, ScrollableDialogProps } from '@/shared/components';

export type SuspendServiceLineModalProps = {
  open: boolean;
  onClose: () => void;
  serviceLine: LineaServicio;
};

type SaveSuspendClienteType = {
  reason_suspension: number;
};
const SuspendServiceLineModal: React.FC<SuspendServiceLineModalProps> = ({
  onClose,
  open,
  serviceLine,
}) => {
  ///* form ---------------------
  const form = useForm<SaveSuspendClienteType>({
    resolver: yupResolver(manualSuspensionSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  ///* fetch data ---------------------
  const {
    data: motivoRubroAdicionals,
    isLoading: isLoadingMotivoRubroAdicionals,
    isRefetching: isRefetchingMotivoRubroAdicionals,
  } = useFetchMotivoRubroAdicionals({
    enabled: open,
    params: {
      page_size: 400,
      state: true,
      tipo_rubro_adicional:
        tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_SUSPENSIONES,
    },
  });

  ///* mutations ---------------------
  const simpleSuspenion = useGenericPATCH<SaveSuspendClienteType, any>(
    `/linea-servicio/suspend/${serviceLine.id}/`,
    LineaServicioTSQEnum.LINEASERVICIO,
    {
      customMessageToast: 'Se ha suspendido la línea de servicio correctamente',
      customOnSuccess: () => {
        handleClose();
      },
    },
  );

  ///* handler ---------------------
  const onSave = (data: SaveSuspendClienteType) => {
    if (!isValid) return;
    simpleSuspenion.mutate({
      reason_suspension: data.reason_suspension,
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    if (isLoadingMotivoRubroAdicionals || isRefetchingMotivoRubroAdicionals)
      return;

    if (motivoRubroAdicionals?.data?.meta?.count === 0) {
      ToastWrapper.error('No se encontraron motivos de suspensón activos');
    }
  }, [
    open,
    motivoRubroAdicionals,
    isLoadingMotivoRubroAdicionals,
    isRefetchingMotivoRubroAdicionals,
  ]);

  const isCustomLoading =
    isLoadingMotivoRubroAdicionals || isRefetchingMotivoRubroAdicionals;
  useLoaders(isCustomLoading);

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title="Suspender línea de servicio"
        onClose={handleClose}
        onConfirm={handleSubmit(onSave, err => {
          if (err?.reason_suspension?.message) {
            ToastWrapper.error('No se ha seleccionado un motivo de suspensión');
          }
        })}
        contentNode={
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Para la suspensión manual de la línea de servicio, se requiere
                un motivo de suspensión.
              </Typography>
            </Grid>

            <CustomAutocomplete<MotivoRubroAdicional>
              label="Motivo de suspensión"
              name="reason_suspension"
              // options
              options={motivoRubroAdicionals?.data?.items || []}
              valueKey="nombre"
              actualValueKey="id"
              defaultValue={form.getValues().reason_suspension}
              isLoadingData={
                isLoadingMotivoRubroAdicionals ||
                isRefetchingMotivoRubroAdicionals
              }
              // vaidation
              control={form.control}
              error={errors.reason_suspension}
              helperText={errors.reason_suspension?.message}
              onChangeRawValue={e => {
                console.log(e);
              }}
            />

            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                ¿Está seguro que desea suspender esta línea de servicio?
              </Typography>
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default SuspendServiceLineModal;

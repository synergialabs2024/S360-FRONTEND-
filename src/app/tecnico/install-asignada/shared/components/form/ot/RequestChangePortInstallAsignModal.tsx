import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useUpdateOrdenTrabajo } from '@/actions/app';
import {
  gridSize,
  OrdenTrabajo,
  requestChangePortSchema,
  TIPO_ACTUALIZACION_ACTIVACIONES_ARRAY_CHOICES,
} from '@/shared';
import {
  CustomTextArea,
  ScrollableDialogProps,
  SelectArrayString,
} from '@/shared/components';

export type RequestChangePortInstallAsignModalProps = {
  open: boolean;
  onClose: () => void;
  ordenTrabajo: OrdenTrabajo;

  customOnSuccess?: (ot: OrdenTrabajo) => void;
};

type FormData = Pick<
  OrdenTrabajo,
  'tipo_actualizacion_puerto' | 'observacion_cambio_puerto'
>;

const RequestChangePortInstallAsignModal: React.FC<
  RequestChangePortInstallAsignModalProps
> = ({ onClose, open, ordenTrabajo, customOnSuccess }) => {
  ///* form ---------------------
  const form = useForm<FormData>({
    resolver: yupResolver(requestChangePortSchema) as any,
  });
  const { errors } = form.formState;

  ///* mutations ---------------------
  const requestChangePort = useUpdateOrdenTrabajo<FormData>({
    customMessageToast: 'Se ha solicitado el cambio de puerto con éxito',
    customOnSuccess: ot => {
      handleCloseModal();
      customOnSuccess && customOnSuccess(ot as OrdenTrabajo);
    },
  });

  ///* handlers ---------------------
  const onSave = (data: FormData) => {
    requestChangePort.mutate({
      id: ordenTrabajo?.id!,
      data,
    });
  };

  const handleCloseModal = () => {
    onClose();
    form.reset();
  };

  return (
    <>
      <ScrollableDialogProps
        open={open}
        onClose={handleCloseModal}
        title={`Solicitar cambio de NAP y/o puerto de la instalación ${ordenTrabajo?.numero_referencia}`}
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid item container xs={12} spacing={2} mt={1} mb={3}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Si solicitas la actualización de la NAP o puerto deberás esperar
                a que se atienda el requerimiento por parte del área de
                activaciones antes de poder subir la orden de trabajo.
              </Typography>
            </Grid>

            <SelectArrayString
              label="Se requiere actualización de:"
              name="tipo_actualizacion_puerto"
              control={form.control}
              defaultValue={form.getValues().tipo_actualizacion_puerto}
              options={TIPO_ACTUALIZACION_ACTIVACIONES_ARRAY_CHOICES}
              gridSize={gridSize}
            />
            <CustomTextArea
              label="Observaciones adicionales"
              name="observacion_cambio_puerto"
              control={form.control}
              defaultValue={form.getValues().observacion_cambio_puerto}
              error={errors.observacion_cambio_puerto}
              helperText={errors.observacion_cambio_puerto?.message}
              required={false}
            />
          </Grid>
        }
        onConfirm={form.handleSubmit(onSave)}
      />
    </>
  );
};

export default RequestChangePortInstallAsignModal;

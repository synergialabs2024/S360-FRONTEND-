import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ApproveOrRejectSolicitudDesbloqueoVentasParams } from '@/actions/app';
import {
  approveOrRejectSolUnblockSalesFormSchema,
  Nullable,
  SolicitudDesbloqueoVentas,
} from '@/shared';
import {
  ConfirmRejectCantelButtonsForm,
  CustomTextArea,
  ScrollableDialogProps,
} from '@/shared/components';

export type HandleSolUnblockServicioModalProps = {
  openModal: boolean;
  onClose: () => void;
  selectedSolicitudDesbloqueoVentas: Nullable<SolicitudDesbloqueoVentas>;
};

type SaveFormData = ApproveOrRejectSolicitudDesbloqueoVentasParams & {};

const HandleSolUnblockServicioModal: React.FC<
  HandleSolUnblockServicioModalProps
> = ({ onClose, openModal, selectedSolicitudDesbloqueoVentas }) => {
  ///* form ----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(approveOrRejectSolUnblockSalesFormSchema) as any,
  });
  const { errors } = form.formState;

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    console.log(data);
  };

  return (
    <ScrollableDialogProps
      title="Gestionar Solicitud Desbloqueo Venta"
      open={openModal}
      onClose={onClose}
      onConfirm={form.handleSubmit(onSave)}
      contentNode={
        <Grid item container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              La solicitud de desbloqueo para la solicitud de servicio{' '}
              <span
                style={{
                  fontWeight: 'bold',
                }}
              >
                {selectedSolicitudDesbloqueoVentas?.modelo_data?.codigo}
              </span>{' '}
              está pendiente de revisión. Por favor, confirme si desea liberarla
              o rechazar su liberación.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomTextArea
              label="Motivo"
              name="motivo"
              control={form.control}
              defaultValue={form.getValues().motivo}
              error={errors.motivo}
              helperText={errors.motivo?.message}
              required={false}
            />
          </Grid>
        </Grid>
      }
      //
      showCustomActions
      customActions={
        <>
          <ConfirmRejectCantelButtonsForm
            // cancel -----------------
            onCancel={onClose}
            // reject -----------------
            onReject={() => {}}
            // confirm -----------------
            confirmTextBtn="Liberar"
            onConfirm={form.handleSubmit(onSave)}
            confirmVariantBtn="outlined"
            sxContainer={{
              pt: 0,
            }}
          />
        </>
      }
    />
  );
};

export default HandleSolUnblockServicioModal;

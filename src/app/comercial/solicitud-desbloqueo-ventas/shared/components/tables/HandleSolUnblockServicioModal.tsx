import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  ApproveOrRejectSolicitudDesbloqueoVentasData,
  useUpdateSolicitudDesbloqueoVentas,
} from '@/actions/app';
import {
  approveOrRejectSolUnblockSalesFormSchema,
  GeneralModelStatesEnumChoice,
  Nullable,
  SalesModelsEnumChoice,
  SalesStatesEnumChoice,
  SolicitudDesbloqueoVentas,
} from '@/shared';
import {
  ConfirmRejectCantelButtonsForm,
  CustomTextArea,
  ScrollableDialogProps,
} from '@/shared/components';
import { useNavigate } from 'react-router-dom';
import { returnUrlSolicitudsDesbloqueoVentasPage } from '../../../pages/tables/SolicitudsDesbloqueoVentasMainPage';

export type HandleSolUnblockServicioModalProps = {
  openModal: boolean;
  onClose: () => void;
  selectedSolicitudDesbloqueoVentas: Nullable<SolicitudDesbloqueoVentas>;
};

type SaveFormData = ApproveOrRejectSolicitudDesbloqueoVentasData & {};

const HandleSolUnblockServicioModal: React.FC<
  HandleSolUnblockServicioModalProps
> = ({ onClose, openModal, selectedSolicitudDesbloqueoVentas }) => {
  ///* hooks ----------------
  const navigate = useNavigate();

  ///* form ----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(approveOrRejectSolUnblockSalesFormSchema) as any,
  });
  const { errors } = form.formState;

  ///* mutations ----------------
  const approveOrRejectMutation =
    useUpdateSolicitudDesbloqueoVentas<ApproveOrRejectSolicitudDesbloqueoVentasData>(
      {
        navigate,
        returnUrl: returnUrlSolicitudsDesbloqueoVentasPage,
      },
    );

  ///* handlers ----------------
  const onSave = async (data: SaveFormData) => {
    approveOrRejectMutation.mutate({
      id: selectedSolicitudDesbloqueoVentas?.id!,
      data: {
        solicitud_desbloqueo_estado: GeneralModelStatesEnumChoice.APROBADO,
        motivo: data.motivo,

        modelo: SalesModelsEnumChoice.SOLICITUD_SERVICIO,
        modelo_id: selectedSolicitudDesbloqueoVentas?.modelo_id!,
        modelo_estado: SalesStatesEnumChoice.SOLICITUD_DESBLOQUEO_APROBADO,
      },
    });
  };
  const onReject = async (data: SaveFormData) => {
    approveOrRejectMutation.mutate({
      id: selectedSolicitudDesbloqueoVentas?.id!,
      data: {
        solicitud_desbloqueo_estado: GeneralModelStatesEnumChoice.RECHAZADO,
        motivo: data.motivo,

        modelo: SalesModelsEnumChoice.SOLICITUD_SERVICIO,
        modelo_id: selectedSolicitudDesbloqueoVentas?.modelo_id!,
        modelo_estado: SalesStatesEnumChoice.SOLICITUD_DESBLOQUEO_RECHAZADO,
      },
    });
  };

  return (
    <ScrollableDialogProps
      title="Gestionar Solicitud Desbloqueo Venta"
      open={openModal}
      onClose={() => {
        form.reset();
        onClose();
      }}
      onConfirm={form.handleSubmit(onSave)}
      contentNode={
        <Grid item container spacing={3} py={3}>
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
            onCancel={() => {
              form.reset();
              onClose();
            }}
            // reject -----------------
            onReject={form.handleSubmit(onReject)}
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

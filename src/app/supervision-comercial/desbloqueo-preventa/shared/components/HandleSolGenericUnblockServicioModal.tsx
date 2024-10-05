import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  ApproveOrRejectSolicitudDesbloqueoVentasData,
  useUpdateSolicitudDesbloqueoVentas,
} from '@/actions/app';
import {
  approveOrRejectSolUnblockSalesFormSchema,
  GeneralModelStatesEnumChoice,
  Nullable,
  SalesModelsEnumChoice,
  SalesStatesActionsEnumChoice,
  SolicitudDesbloqueoVentas,
} from '@/shared';
import {
  ConfirmRejectCantelButtonsForm,
  CustomTextArea,
  ScrollableDialogProps,
} from '@/shared/components';

export type HandleSolGenericUnblockServicioModalProps = {
  openModal: boolean;
  onClose: () => void;
  selectedSolicitudDesbloqueoVentas: Nullable<SolicitudDesbloqueoVentas>;

  modelo: SalesModelsEnumChoice;
  actionApprove: SalesStatesActionsEnumChoice;
  actionReject: SalesStatesActionsEnumChoice;
  firstTextModal: string;
  returnUrl: string;
  modalTitle?: string;
};

type SaveFormData = ApproveOrRejectSolicitudDesbloqueoVentasData & {};

const HandleSolGenericUnblockServicioModal: React.FC<
  HandleSolGenericUnblockServicioModalProps
> = ({
  onClose,
  openModal,
  selectedSolicitudDesbloqueoVentas,
  modelo,
  actionApprove,
  actionReject,
  firstTextModal,
  returnUrl,
  modalTitle = 'Gestionar Solicitud Desbloqueo Venta',
}) => {
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
        returnUrl,
      },
    );

  ///* handlers ----------------
  const onSave = async (data: SaveFormData) => {
    approveOrRejectMutation.mutate({
      id: selectedSolicitudDesbloqueoVentas?.id!,
      data: {
        solicitud_desbloqueo_estado: GeneralModelStatesEnumChoice.APROBADO,
        motivo: data.motivo,

        modelo,
        modelo_id: selectedSolicitudDesbloqueoVentas?.modelo_id!,
        modelo_estado: actionApprove,
      },
    });
    onClose();
  };
  const onReject = async (data: SaveFormData) => {
    approveOrRejectMutation.mutate({
      id: selectedSolicitudDesbloqueoVentas?.id!,
      data: {
        solicitud_desbloqueo_estado: GeneralModelStatesEnumChoice.RECHAZADO,
        motivo: data.motivo,

        modelo,
        modelo_id: selectedSolicitudDesbloqueoVentas?.modelo_id!,
        modelo_estado: actionReject,
      },
    });
    onClose();
  };

  return (
    <ScrollableDialogProps
      title={modalTitle}
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
              {firstTextModal}{' '}
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

export default HandleSolGenericUnblockServicioModal;

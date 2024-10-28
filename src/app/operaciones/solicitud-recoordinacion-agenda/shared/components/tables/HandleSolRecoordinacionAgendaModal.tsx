import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { type HandleSolicitudRecoordinacionAgendaData } from '@/actions/app';
import {
  approveOrRejectSolRecoordinacionSchema,
  Nullable,
  SolicitudRecoordinacionAgenda,
} from '@/shared';
import {
  ConfirmRejectCantelButtonsForm,
  ScrollableDialogProps,
} from '@/shared/components';

export type HandleSolRecoordinacionAgendaModalProps = {
  open: boolean;
  onClose: () => void;
  selectedSolicitudRecoordinacionAgenda: Nullable<SolicitudRecoordinacionAgenda>;
};

type SaveFormData = HandleSolicitudRecoordinacionAgendaData & {};

const HandleSolRecoordinacionAgendaModal: React.FC<
  HandleSolRecoordinacionAgendaModalProps
> = ({ open, onClose, selectedSolicitudRecoordinacionAgenda }) => {
  ///* form ----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(approveOrRejectSolRecoordinacionSchema) as any,
  });

  ///* handlers ----------------
  const onSave = (data: SaveFormData) => {};

  const onReject = (data: SaveFormData) => {};

  return (
    <>
      <ScrollableDialogProps
        title="Gestionar solicitud de recoordinación de agenda"
        open={open}
        onClose={() => {
          form.reset();
          onClose();
        }}
        onConfirm={form.handleSubmit(onSave)}
        contentNode={
          <Grid item container spacing={3} py={3}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                La solicitud de recoordinación del agendamiento{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {
                    selectedSolicitudRecoordinacionAgenda?.agendamiento_data
                      ?.numero_referencia
                  }
                </span>{' '}
                está pendiente de revisión. En caso de aprobarla, por favor
                seleccione el nuevo horario de instalación.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              PLANIFICADOR
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
              confirmTextBtn="Recordinar"
              onConfirm={form.handleSubmit(onSave)}
              confirmVariantBtn="outlined"
              sxContainer={{
                pt: 0,
              }}
            />
          </>
        }
      />
    </>
  );
};

export default HandleSolRecoordinacionAgendaModal;

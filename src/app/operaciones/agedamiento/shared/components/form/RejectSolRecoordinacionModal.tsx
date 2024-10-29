import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  AgendamientoTSQEnum,
  RejectSolRecoordinacionAgenda,
} from '@/actions/app';
import { useGenericPATCH, useSetCacheRedis } from '@/actions/shared';
import { returnUrlSolicitudsRecoordinacionAgendaPage } from '@/app/operaciones/solicitud-recoordinacion-agenda/pages/tables/SolicitudsRecoordinacionAgendaMainPage';
import {
  getKeysFormErrorsMessage,
  rejectSolRecoordinacionSchema,
  ToastWrapper,
  type SolicitudRecoordinacionAgenda,
} from '@/shared';
import { CustomTextArea, ScrollableDialogProps } from '@/shared/components';

export type RejectSolRecoordinacionModalProps = {
  open: boolean;
  onClose: () => void;
  solicitudRecoordinacionUUID: string;
  keyCache: string;
};

type FormData = Pick<SolicitudRecoordinacionAgenda, 'observacion_atiende'>;

const RejectSolRecoordinacionModal: React.FC<
  RejectSolRecoordinacionModalProps
> = ({ onClose, open, solicitudRecoordinacionUUID, keyCache }) => {
  ///* hooks ---------------------
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<FormData>({
    resolver: yupResolver(rejectSolRecoordinacionSchema) as any,
  });
  const { errors } = form.formState;

  ///* mutations ---------------------
  const setCache = useSetCacheRedis({
    enableToast: false,
  });

  const rejectSolicitudRecoordinacion = useGenericPATCH<
    RejectSolRecoordinacionAgenda,
    SolicitudRecoordinacionAgenda
  >(
    `/solicitud-recoordinacion-agenda/reject/${solicitudRecoordinacionUUID}/`,
    AgendamientoTSQEnum.AGENDAMIENTOS,
    {
      customMessageToast: 'Solicitud de recoordinación rechazada con éxito',
      navigate,
      returnUrl: returnUrlSolicitudsRecoordinacionAgendaPage,
      customOnSuccess() {
        handleClose();
        setCache.mutate({
          key: keyCache,
          value: null,
        });
      },
    },
  );

  ///* handlers ---------------------
  const onSave = (data: FormData) => {
    rejectSolicitudRecoordinacion.mutate({
      observacion_atiende: data.observacion_atiende,
    });
  };
  const handleClose = () => {
    onClose();
    form.setValue('observacion_atiende', '');
  };

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title="Rechazar solicitud de recoordinación"
        width="60%"
        contentNode={
          <Grid item container xs={12} spacing={3} mt={0.01} mb={3}>
            <Grid item xs={12}>
              <Typography variant="body1">
                ¿Está seguro que desea rechazar esta solicitud de
                recoordinación? De ser así, puede agregar una observación.
              </Typography>
            </Grid>

            <CustomTextArea
              label="Observación"
              name="observacion_atiende"
              control={form.control}
              defaultValue={form.getValues().observacion_atiende}
              error={errors.observacion_atiende}
              helperText={errors.observacion_atiende?.message}
              required={false}
            />
          </Grid>
        }
        cancelTextBtn="Cerrar"
        onClose={handleClose}
        onConfirm={form.handleSubmit(onSave, errors => {
          const keys = getKeysFormErrorsMessage(errors);
          ToastWrapper.error(`Faltan campos: ${keys}`);
        })}
      />
    </>
  );
};

export default RejectSolRecoordinacionModal;

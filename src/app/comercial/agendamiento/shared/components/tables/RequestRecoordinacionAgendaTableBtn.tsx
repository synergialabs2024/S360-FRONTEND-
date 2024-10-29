import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import {
  AgendamientoTSQEnum,
  CreateSolRecoordinacionAgenda,
  useCreateSolicitudRecoordinacionAgenda,
} from '@/actions/app';
import {
  Agendamiento,
  getKeysFormErrorsMessage,
  SolicitudRecoordinacionAgenda,
  solicitudRecoordinacionAgendaFormSchema,
  ToastWrapper,
} from '@/shared';
import { CustomTextArea, ScrollableDialogProps } from '@/shared/components';

export type RequestRecoordinacionAgendaTableBtnProps = {
  agendamiento: Agendamiento;
  open: boolean;
  onClose(): void;
};

type SaveFormData = SolicitudRecoordinacionAgenda & {};

const RequestRecoordinacionAgendaTableBtn: React.FC<
  RequestRecoordinacionAgendaTableBtnProps
> = ({ open, onClose, agendamiento }) => {
  const queryClient = useQueryClient();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudRecoordinacionAgendaFormSchema) as any,
  });
  const { errors } = form.formState;

  ///* mutations ---------------------
  const createSolRecoordinacionAgenda =
    useCreateSolicitudRecoordinacionAgenda<CreateSolRecoordinacionAgenda>({
      customMessageToast:
        'Se ha solicitado la recoordinación de agenda con éxito',
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!agendamiento?.id)
      return ToastWrapper.error('No se ha encontrado el id del agendamiento');

    await createSolRecoordinacionAgenda.mutateAsync({
      descripcion: data.descripcion,
      agendamiento: agendamiento?.id!,
    });

    await queryClient.invalidateQueries({
      queryKey: [AgendamientoTSQEnum.AGENDAMIENTOS],
    });

    handleCloseModal();
  };

  const handleCloseModal = () => {
    onClose();
    form.setValue('descripcion', '');
  };

  return (
    <>
      <ScrollableDialogProps
        open={open}
        onClose={handleCloseModal}
        title={`Solicitar recoordinación de agenda ${agendamiento?.numero_referencia}`}
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid item container xs={12} spacing={2} mt={1} mb={3}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Está a punto de solicitar la recoordinación del horario de
                instalación del cliente{' '}
                <b>{agendamiento?.solicitud_servicio_data?.razon_social}</b>.
                Por favor, ingrese una descripción del motivo por el cual se
                solicita la recoordinación de la agenda, indicando además la
                nueva fecha y hora propuesta para su posterior aprobación.
              </Typography>
            </Grid>

            <CustomTextArea
              label="Observaciones"
              name="descripcion"
              control={form.control}
              defaultValue={form.getValues().descripcion}
              error={errors.descripcion}
              helperText={errors.descripcion?.message}
            />
          </Grid>
        }
        onConfirm={form.handleSubmit(onSave, errors => {
          const keys = getKeysFormErrorsMessage(errors);
          ToastWrapper.error(`Faltan campos requeridos: ${keys}`);
        })}
      />
    </>
  );
};

export default RequestRecoordinacionAgendaTableBtn;

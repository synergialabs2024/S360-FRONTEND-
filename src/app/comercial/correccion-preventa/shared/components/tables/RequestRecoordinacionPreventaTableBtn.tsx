import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useGenericPOST } from '@/actions/shared';
import {
  getKeysFormErrorsMessage,
  Preventa,
  solicitudAprobacionIAPreventaFormSchema,
  ToastWrapper,
} from '@/shared';
import { CustomTextArea, ScrollableDialogProps } from '@/shared/components';
import { useNavigate } from 'react-router';
import {
  CreateSolRecoordinacionAprobacionIAPreventa,
  SolicitudAprobacionIAPreventaTSQEnum,
} from '@/actions/app/supervision-comercial';

export type RequestRecoordinacionPreventaTableBtnProps = {
  preventa: Preventa;
  open: boolean;
  onClose(): void;

  customUrl?: string;
  urlRedirect?: string;
};

type SaveFormData = CreateSolRecoordinacionAprobacionIAPreventa & {};

const RequestRecoordinacionPreventaTableBtn: React.FC<
  RequestRecoordinacionPreventaTableBtnProps
> = ({
  open,
  onClose,
  preventa,
  customUrl = '/solicitud-aprobacion-ia-preventa/',
  urlRedirect,
}) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudAprobacionIAPreventaFormSchema) as any,
  });
  const { errors } = form.formState;

  ///* mutations ---------------------
  const createSolRecoordinacionAgenda = useGenericPOST<
    SaveFormData,
    CreateSolRecoordinacionAprobacionIAPreventa
  >(
    customUrl,
    SolicitudAprobacionIAPreventaTSQEnum.SOLICITUDAPROBACIONIAPREVENTAS,
    {
      returnUrl: urlRedirect,
      customMessageToast:
        'Se ha solicitado la aprobacion manual de la preventa con éxito',
      overrideOnError: false,
      async customOnError() {
        await queryClient.invalidateQueries({
          queryKey: [
            SolicitudAprobacionIAPreventaTSQEnum.SOLICITUDAPROBACIONIAPREVENTAS,
          ],
        });
        handleCloseModal();
      },
    },
  );

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!preventa?.id)
      return ToastWrapper.error('No se ha encontrado el id de la preventa');

    await createSolRecoordinacionAgenda.mutateAsync({
      descripcion: data.descripcion,
      preventa: preventa?.id!,
    });

    await queryClient.invalidateQueries({
      queryKey: [
        SolicitudAprobacionIAPreventaTSQEnum.SOLICITUDAPROBACIONIAPREVENTAS,
      ],
    });

    handleCloseModal();

    if (urlRedirect) navigate(urlRedirect);
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
        title={`Solicitar aprobacion manual de preventa ${preventa?.numero_referencia}`}
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid item container xs={12} spacing={2} mt={1} mb={3}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Está a punto de solicitar la aprobacion manual de la preventa
                del cliente{' '}
                <b>{preventa?.solicitud_servicio_data?.razon_social}</b>. Por
                favor, ingrese una descripción del motivo por el cual se
                solicita la aprobacion manual de la preventa.
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

export default RequestRecoordinacionPreventaTableBtn;

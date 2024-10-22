import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  AgendamientoTSQEnum,
  RequestUpdateAgendamientoOpe,
  useFetchMotivoActualizacions,
} from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  Agendamiento,
  EstadoAgendamientoEnumChoice,
  MotivoActualizacion,
  MotivoActualizacionModuloEnumChoice,
  updAgendamientoOpSchema,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextArea,
  ScrollableDialogProps,
} from '@/shared/components';
import { useNavigate } from 'react-router';
import { returnUrlAgendamientoOperacionesPage } from '../../../pages/tables/AgendamientosMainPage';
export type AgendaOpeRequestUpdateProps = {
  open: boolean;
  onClose: () => void;
  agendamiento: Agendamiento;
};

type SaveFormData = RequestUpdateAgendamientoOpe & {};

const AgendaOpeRequestUpdate: React.FC<AgendaOpeRequestUpdateProps> = ({
  onClose,
  open,
  agendamiento,
}) => {
  const navigate = useNavigate();

  ///* form ------------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(updAgendamientoOpSchema) as any,
    defaultValues: {
      estado_agendamiento: EstadoAgendamientoEnumChoice.ACTUALIZACION_PENDIENTE,
    },
  });
  const { errors } = form.formState;

  ///* fetch data ------------------------
  const {
    data: motivosActualizacionPagingRes,
    isLoading: isLoadingMotivoActualizacion,
    isRefetching: isRefetchingMotivoActualizacion,
  } = useFetchMotivoActualizacions({
    params: {
      page_size: 1090,
      modulo: MotivoActualizacionModuloEnumChoice.AGENDAMIENTO,
      order_by: 'name',
      order_by_asc: true,
    },
  });

  ///* mutations ------------------------
  const requestUpdData = useGenericPATCH<
    RequestUpdateAgendamientoOpe,
    Agendamiento
  >(`/agendamiento/${agendamiento?.id!}/`, AgendamientoTSQEnum.AGENDAMIENTOS, {
    customMessageToast: 'Solictud de actualización enviada con éxito',
    customOnSuccess: () => {
      navigate(returnUrlAgendamientoOperacionesPage, { replace: true });
    },
  });

  ///* handlers ------------------------
  const onSave = (data: SaveFormData) => {
    onClose();
    requestUpdData.mutate(data);
  };
  const handleClose = () => {
    onClose();
  };

  const isLoading =
    isLoadingMotivoActualizacion || isRefetchingMotivoActualizacion;
  useLoaders(isLoading);

  return (
    <>
      <ScrollableDialogProps
        title={'Solicitar actualización'}
        open={open}
        onClose={handleClose}
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid item container spacing={3} xs={12}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Para solicitar actualización de datos del cliente{' '}
                <strong>
                  {agendamiento?.solicitud_servicio_data?.razon_social}
                </strong>
                , deberá ingresar el motivo y una observación. ¿Desea continuar?
              </Typography>
            </Grid>

            <CustomAutocomplete<MotivoActualizacion>
              label="Motivo de actualización"
              name="motivo_actualizacion"
              // options
              options={motivosActualizacionPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().motivo_actualizacion}
              isLoadingData={
                isLoadingMotivoActualizacion || isRefetchingMotivoActualizacion
              }
              // vaidation
              control={form.control}
              error={errors.motivo_actualizacion}
              helperText={errors.motivo_actualizacion?.message}
            />

            <CustomTextArea
              label="Observación"
              name="observacion_actualizacion"
              control={form.control}
              defaultValue={form.getValues().observacion_actualizacion}
              error={errors.observacion_actualizacion}
              helperText={errors.observacion_actualizacion?.message}
            />
          </Grid>
        }
        onConfirm={form.handleSubmit(onSave)}
      />
    </>
  );
};

export default AgendaOpeRequestUpdate;

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  OrdenTrabajoTSQEnum,
  RejectInstalacionOTData,
  useFetchMotivoRechazos,
} from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  getKeysFormErrorsMessage,
  MotivoRechazo,
  MotivoRechazoModuloEnumChoice,
  OrdenTrabajo,
  prerejectInstallOTAsigSchema,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextArea,
  ScrollableDialogProps,
} from '@/shared/components';
import { useEffect } from 'react';
import { returnUrlInstallAsignadasOT } from '../../../pages/tables/InstalacionesAsignadasOTMainPage';

export type PrerejectInstalacionAsignadaOTModalProps = {
  open: boolean;
  onClose: () => void;
  ordenTrabajo: OrdenTrabajo;
};

type FormData = RejectInstalacionOTData & {};

const PrerejectInstalacionAsignadaOTModal: React.FC<
  PrerejectInstalacionAsignadaOTModalProps
> = ({ onClose, open, ordenTrabajo }) => {
  ///* hooks ---------------------
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<FormData>({
    resolver: yupResolver(prerejectInstallOTAsigSchema) as any,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  ///* fetch data ---------------------
  const {
    data: motivosRechazoPagingRes,
    isLoading: isLoadingMotivoRechazo,
    isRefetching: isRefetchingMotivoRechazo,
  } = useFetchMotivoRechazos({
    enabled: !!open,
    params: {
      page_size: 1090,
      modulo: MotivoRechazoModuloEnumChoice.TECNICO,
      order_by: 'name',
      order_by_asc: true,
    },
  });

  ///* mutations ---------------------
  const prerejectInstalacionAsignada = useGenericPATCH<
    RejectInstalacionOTData,
    OrdenTrabajo
  >(
    `/orden-trabajo/instalaciones/pre-reject/${ordenTrabajo?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast: 'Instalación asignada pre-rechazada con éxito',
      navigate,
      returnUrl: returnUrlInstallAsignadasOT,
      customOnSuccess() {
        handleClose();
      },
    },
  );

  ///* handlers ---------------------
  const onSave = (data: FormData) => {
    prerejectInstalacionAsignada.mutate({
      motivo_prerechazo: data.motivo_prerechazo,
      observacion_prerechazo: data.observacion_prerechazo,
    });
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  ///* effects ---------------------
  const isLoading = isLoadingMotivoRechazo || isRefetchingMotivoRechazo;
  useEffect(() => {
    if (isLoading || !open) return;

    if (!motivosRechazoPagingRes?.data?.items?.length) {
      ToastWrapper.error('No se encontraron motivos de rechazo');
    }
  }, [isLoading, motivosRechazoPagingRes, open]);
  useLoaders(isLoading);

  if (!open) return null;

  return (
    <ScrollableDialogProps
      open={open}
      title={`Pre-rechazar instalación asignada ${ordenTrabajo?.numero_referencia}`}
      width="60%"
      contentNode={
        <Grid item container xs={12} spacing={3} mt={0.01} mb={3}>
          <Grid item xs={12}>
            <Typography variant="body1">
              ¿Está seguro que desea rechazar esta instalación asignada? De ser
              así, debe seleccionar un motivo y adicinalmente puede agregar una
              observación.
            </Typography>
          </Grid>

          <CustomAutocomplete<MotivoRechazo>
            label="Motivo de pre-rechazo"
            name="motivo_prerechazo"
            // options
            options={motivosRechazoPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().motivo_prerechazo}
            isLoadingData={isLoadingMotivoRechazo || isRefetchingMotivoRechazo}
            // vaidation
            control={form.control}
            error={errors.motivo_prerechazo}
            helperText={errors.motivo_prerechazo?.message}
          />

          <CustomTextArea
            label="Observación"
            name="observacion_prerechazo"
            control={form.control}
            defaultValue={form.getValues().observacion_prerechazo}
            error={errors.observacion_prerechazo}
            helperText={errors.observacion_prerechazo?.message}
            required={false}
          />
        </Grid>
      }
      onConfirm={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Faltan campos: ${keys}`);
      })}
      onClose={handleClose}
      cancelTextBtn="Cerrar"
    />
  );
};

export default PrerejectInstalacionAsignadaOTModal;

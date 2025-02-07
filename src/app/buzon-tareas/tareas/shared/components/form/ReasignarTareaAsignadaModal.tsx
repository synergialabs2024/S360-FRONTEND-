import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useFetchDepartamentos } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  Departamento,
  getKeysFormErrorsMessage,
  gridSizeMdLg12,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextArea,
  ScrollableDialogProps,
} from '@/shared/components';
import { useEffect } from 'react';
import { returnUrlBuzonTareas } from '../../../pages/tables/TareasPage';
import { BuzonTarea } from '@/shared/interfaces/app/cartera/buzon-tareas';
import {
  BuzonTareasTSQEnum,
  CreateBuzonTareaParamsBase,
} from '@/actions/app/cartera/buzon-tareas';
import { tareaFormSchema } from '@/shared/utils/validation-schemas/app/cartera/buzon-tareas/buzon-tareas.schema';

export type ReasignarTareaAsignadaModalProps = {
  open: boolean;
  onClose: () => void;
  buzonTarea: BuzonTarea;
};

type FormData = CreateBuzonTareaParamsBase & {};

const ReasignarTareaAsignadaModal: React.FC<
  ReasignarTareaAsignadaModalProps
> = ({ onClose, open, buzonTarea }) => {
  ///* hooks ---------------------
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<FormData>({
    resolver: yupResolver(tareaFormSchema) as any,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  ///* fetch data ---------------------
  const {
    data: departamentoPagingRes,
    isLoading: isLoadingDepartamentos,
    isRefetching: isRefetchingDepartamentos,
  } = useFetchDepartamentos({
    enabled: !!open,
    params: {
      page_size: 1090,
    },
  });

  ///* mutations ---------------------
  const prerejectInstalacionAsignada = useGenericPATCH<any, BuzonTarea>(
    `/buzon-tarea-mantenedor/escalate-task-departament/${buzonTarea?.id!}/`,
    BuzonTareasTSQEnum.BUZONTAREAS,
    {
      customMessageToast: 'Tarea reasignada con éxito',
      navigate,
      returnUrl: returnUrlBuzonTareas,
      customOnSuccess() {
        handleClose();
      },
    },
  );

  ///* handlers ---------------------
  const onSave = (data: FormData) => {
    prerejectInstalacionAsignada.mutate({
      departamento_escalado: data.departamento_asignado,
      justificacion_escalamiento: data.justificacion_escalamiento,
    });
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  ///* effects ---------------------
  const isLoading = isLoadingDepartamentos || isRefetchingDepartamentos;
  useEffect(() => {
    if (isLoading || !open) return;

    if (!departamentoPagingRes?.data?.items?.length) {
      ToastWrapper.error('No se encontraron departamentos');
    }
  }, [isLoading, departamentoPagingRes, open]);
  useLoaders(isLoading);

  if (!open) return null;

  return (
    <ScrollableDialogProps
      open={open}
      title={`Reasignar tarea ${buzonTarea?.numero_referencia}`}
      width="60%"
      contentNode={
        <Grid item container xs={12} spacing={3} mt={0.01} mb={3}>
          <Grid item xs={12}>
            <Typography variant="body1">
              ¿Está seguro que desea reasignar esta tarea asignada? De ser así,
              debe seleccionar un motivo y adicinalmente puede agregar una
              observación.
            </Typography>
          </Grid>

          <CustomAutocomplete<Departamento>
            label="Departamento"
            name="departamento_asignado"
            valueKey="name"
            actualValueKey="id"
            control={form.control}
            defaultValue={form.getValues().departamento_asignado}
            options={departamentoPagingRes?.data.items || []}
            isLoadingData={isLoadingDepartamentos}
            error={errors.departamento_asignado}
            helperText={errors.departamento_asignado?.message}
            size={gridSizeMdLg12}
          />

          <CustomTextArea
            label="Observación"
            name="observacion_prerechazo"
            control={form.control}
            defaultValue={form.getValues().justificacion_escalamiento}
            error={errors.justificacion_escalamiento}
            helperText={errors.justificacion_escalamiento?.message}
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

export default ReasignarTareaAsignadaModal;

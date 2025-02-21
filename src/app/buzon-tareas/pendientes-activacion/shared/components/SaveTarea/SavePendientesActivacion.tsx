/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  CustomAutocomplete,
  CustomCardAlert,
  CustomTextArea,
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  getKeysFormErrorsMessage,
  IdentificationTypeEnumChoice,
  LineaServicio,
  ToastWrapper,
  useLoaders,
  YES_NO_ARRAY_CHOICES,
} from '@/shared';
import { Grid } from '@mui/material';
import { useUiConfirmModalStore } from '@/store/ui';
import {
  CreateBuzonTareaParamsBase,
  useCreateBuzonTarea,
} from '@/actions/app/cartera/buzon-tareas';
import { useAuthStore } from '@/store/auth';
import dayjs from 'dayjs';
import { returnUrlCambioPlanPage } from '../../../pages/forms/CreatePendientesActivacionPage';
import {
  BeneficioMantenedorBeneficios,
  BuzonTarea,
  SolucionMantenedorBeneficios,
} from '@/shared/interfaces/app/cartera/buzon-tareas';
import { useFetchSolucionMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/solucion-mantenedor-beneficios';
import { useFetchBeneficioMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios';
import { tareaGestionadaFormSchema } from '@/shared/utils/validation-schemas/app/cartera/buzon-tareas/tarea.schema';

export interface SavePendientesActivacionProps {
  title: string;
  buzonTarea?: BuzonTarea;
}
type SaveFormData = CreateBuzonTareaParamsBase & {
  tipo_identificacion: string;
  identificacion: string;
  linea_servicio_data?: LineaServicio;
  error_message: string;
  numero_contrato: string;
  //
  cedula: string;
  telefono: string;
  cliente_name: string;
  correo: string;
  //
};
const SavePendientesActivacion: React.FC<SavePendientesActivacionProps> = ({
  title,
  buzonTarea,
}) => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  const user = useAuthStore(s => s.user);

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(tareaGestionadaFormSchema) as any,
    defaultValues: {
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
    },
  });

  ///* mutations ---------------------

  const createBuzonTarea = useCreateBuzonTarea({
    navigate,
    returnUrl: returnUrlCambioPlanPage,
    enableErrorNavigate: false,
    customOnSuccess: () => {},
  });

  //

  const {
    data: beneficioMantenedorBeneficiosPaginatedRes,
    isLoading: isLoadingBeneficioMantenedorBeneficios,
    isRefetching: isRefetchingBeneficioMantenedorBeneficios,
  } = useFetchBeneficioMantenedorBeneficios({
    params: {
      tipo_mantenedor_beneficio: Number(buzonTarea?.tipo_tarea),
      subtipo_mantenedor_beneficio: Number(buzonTarea?.subtipo_tarea),
      page_size: 200,
    },
  });

  const {
    data: solucionMantenedorBeneficiosPaginatedRes,
    isLoading: isLoadingSolucionMantenedorBeneficios,
    isRefetching: isRefetchingSolucionMantenedorBeneficios,
  } = useFetchSolucionMantenedorBeneficios({
    params: {
      page_size: 200,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedErrorMessage = form.watch('error_message');
  //

  const onSave = async (data: SaveFormData) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Buzon de tarea',
      subtitle: '¿Está seguro que gestionar crear la tarea?',
      onConfirm: () => {
        createBuzonTarea.mutate({
          beneficio: data.beneficio,
          aplica_beneficio_solucion: data.aplica_beneficio_solucion,
          detalle_solucion: data.detalle_solucion,
          aplica_beneficio: data.aplica_beneficio,
          solucion_tarea: data.solucion_tarea,
          departamento_gestiona: buzonTarea?.departamento_asignado,
        });
        setConfirmDialogIsOpen(false);
      },
    });
  };

  const customLoader =
    isLoadingBeneficioMantenedorBeneficios ||
    isRefetchingBeneficioMantenedorBeneficios ||
    isLoadingSolucionMantenedorBeneficios ||
    isRefetchingSolucionMantenedorBeneficios;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCambioPlanPage)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Errores en: ${keys}`);
      })}
      maxWidth="xl"
      gridSizeForm={gridSizeMdLg12}
    >
      {!watchedErrorMessage ? (
        <></>
      ) : (
        <>
          <CustomCardAlert
            sizeType="medium"
            alertSeverity="info"
            alertTitle="ERROR"
            alertContentNode={<>{watchedErrorMessage}</>}
          />
        </>
      )}

      <>
        <CustomTypoLabel text="Datos de solicitud" />
        <CustomTextFieldNoForm
          label="Responsable"
          size={gridSizeMdLg6}
          value={user?.username}
          disabled
        />
        {/* ============= Nuevo Plan ============= */}
        <CustomTextFieldNoForm
          label="Fecha creacion"
          size={gridSizeMdLg6}
          value={dayjs().format('YYYY-MM-DD')}
          disabled
        />
        <CustomTextFieldNoForm
          label="Departamento"
          size={gridSizeMdLg6}
          value={buzonTarea?.departamento_asignado_data.name}
          disabled
        />
        <CustomTextFieldNoForm
          label="Tipo de solicitud"
          size={gridSizeMdLg6}
          value={buzonTarea?.tipo_tarea_data.name}
          disabled
        />
        <CustomTextFieldNoForm
          label="Subtipo de solicitud"
          size={gridSizeMdLg6}
          value={buzonTarea?.subtipo_tarea_data.name}
          disabled
        />
        <CustomTextFieldNoForm
          label="causa de solicitud"
          size={gridSizeMdLg6}
          value={buzonTarea?.causa_tarea_data.name}
          disabled
        />
        <CustomTextFieldNoForm
          label="Aplica beneficio perfil"
          size={gridSizeMdLg6}
          value={buzonTarea?.aplica_beneficio_segun_perfil}
          disabled
        />

        <CustomTextFieldNoForm
          label="Canal de referencia"
          size={gridSizeMdLg6}
          value={buzonTarea?.canal_referencia}
          disabled
        />

        <>
          <CustomTypoLabel text="Datos del cliente" />
          <Grid item container {...gridSizeMdLg12} spacing={2}>
            <CustomTextFieldNoForm
              label="Cliente"
              size={gridSizeMdLg6}
              value={
                buzonTarea?.linea_servicio_data.solicitud_servicio_data
                  ?.identificacion
              }
              disabled
            />
            <CustomTextFieldNoForm
              label="Contrato"
              size={gridSizeMdLg6}
              value={
                buzonTarea?.linea_servicio_data.contrato_data?.numero_contrato
              }
              disabled
            />

            <CustomTextFieldNoForm
              label="Cédula/Ruc"
              size={gridSizeMdLg6}
              value={
                buzonTarea?.linea_servicio_data.solicitud_servicio_data
                  ?.identificacion
              }
              disabled
            />

            <CustomTextFieldNoForm
              label="Correo"
              size={gridSizeMdLg6}
              value={
                buzonTarea?.linea_servicio_data.solicitud_servicio_data?.email
              }
              disabled
            />

            <CustomTextAreaNoForm
              label="Detalle de caso"
              size={gridSizeMdLg12}
              value={buzonTarea?.detalle_caso}
              disabled
            />

            <SelectArrayString
              label="Aplica Beneficio"
              name="beneficio_aplicado"
              control={form.control}
              error={errors.beneficio_aplicado}
              helperText={errors.beneficio_aplicado?.message}
              options={YES_NO_ARRAY_CHOICES}
              gridSize={gridSizeMdLg6}
            />

            <SelectArrayString
              label="Aplica Beneficio Solucion"
              name="aplica_beneficio_solucion"
              control={form.control}
              error={errors.aplica_beneficio_solucion}
              helperText={errors.aplica_beneficio_solucion?.message}
              options={YES_NO_ARRAY_CHOICES}
              gridSize={gridSizeMdLg6}
            />

            <CustomAutocomplete<BeneficioMantenedorBeneficios>
              label="Beneficio"
              name="beneficio"
              valueKey="name"
              actualValueKey="id"
              control={form.control}
              defaultValue={form.getValues().beneficio}
              options={
                beneficioMantenedorBeneficiosPaginatedRes?.data.items || []
              }
              isLoadingData={isLoadingBeneficioMantenedorBeneficios}
              error={errors.beneficio}
              helperText={errors.beneficio?.message}
              size={gridSizeMdLg6}
            />

            <CustomAutocomplete<SolucionMantenedorBeneficios>
              label="Solucion Tarea"
              name="solucion_tarea"
              valueKey="name"
              actualValueKey="id"
              control={form.control}
              defaultValue={form.getValues().solucion_tarea}
              options={
                solucionMantenedorBeneficiosPaginatedRes?.data.items || []
              }
              isLoadingData={isLoadingSolucionMantenedorBeneficios}
              error={errors.solucion_tarea}
              helperText={errors.solucion_tarea?.message}
              size={gridSizeMdLg6}
            />

            <CustomTextArea
              label="Detalle de solucion"
              name="detalle_solucion"
              control={form.control}
              defaultValue={form.getValues().detalle_solucion}
              error={errors.detalle_solucion}
              helperText={errors.detalle_solucion?.message}
              size={gridSizeMdLg12}
            />
          </Grid>
        </>
      </>

      {/* ============= loaders ============= */}
    </SingleFormBoxScene>
  );
};
export default SavePendientesActivacion;

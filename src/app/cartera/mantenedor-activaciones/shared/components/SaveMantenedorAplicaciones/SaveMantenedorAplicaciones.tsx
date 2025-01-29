/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  CustomCardAlert,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  getKeysFormErrorsMessage,
  IdentificationTypeEnumChoice,
  LineaServicio,
  SolicitudServicio,
  ToastWrapper,
} from '@/shared';
import { cambioPlanFormSchema } from '@/shared/utils/validation-schemas/app/cartera/cambio-plan/cambio-plan.schema';
import {
  CreateCambioPlanParamsBase,
  useCreateCambioPlan,
} from '@/actions/app/cartera/cambio-plan/cambio-plan.actions';
import { CambioPlanComputeValores } from '@/shared/interfaces/app/cartera';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlMantenedorAplicacionesPage } from '../../../pages/forms/MantenedorAplicacionesPage';

export interface SaveMantenedorAplicacionesProps {
  title: string;
}
type SaveFormData = CreateCambioPlanParamsBase & {
  // helper
  isFormBlocked?: boolean;
  isValidIdentificacion?: boolean;
  numero_contrato: string;
  cityName?: string;
  provinceName?: string;
  zoneName?: string;
  thereIsCoverage?: boolean;
  thereAreNaps?: boolean;
  tipo_servicio?: string;
  tipo_plan?: string;
  plan_internet?: string;

  //

  tipo_identificacion?: string;
  identificacion?: string;
  es_cliente?: boolean;
  solicitud_servicio_data?: SolicitudServicio;
  plan_actual?: string;
  precio_plan_actual?: string;
  linea_servicio_data?: LineaServicio;
  cambio_plan_compute_valores_data?: CambioPlanComputeValores;
  plan_nuevo_id: number;
  error_message: string;
  valores_positivos: boolean;
};
const SaveMantenedorAplicaciones: React.FC<SaveMantenedorAplicacionesProps> = ({
  title,
}) => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations ---------------------

  const createCambioPlan = useCreateCambioPlan({
    enableErrorNavigate: false,
    customOnSuccess: () => {
      navigate(returnUrlMantenedorAplicacionesPage);
    },
    navigate,
    returnUrl: returnUrlMantenedorAplicacionesPage,
  });

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cambioPlanFormSchema) as any,
    defaultValues: {
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
      isFormBlocked: false,
      thereIsCoverage: false,
      thereAreNaps: false,
      es_cliente: false,
      valores_positivos: false,
    },
  });

  const { handleSubmit } = form;
  const watchedPlanNuevoId = form.watch('plan_nuevo_id');
  const watchedLineaServicio = form.watch('linea_servicio_data');
  const watchedErrorMessage = form.watch('error_message');
  //

  const onSave = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar plan',
      subtitle: '¿Está seguro que desea cambiar este plan?',
      onConfirm: () => {
        createCambioPlan.mutate({
          plan_internet_nuevo: watchedPlanNuevoId,
          linea_servicio: watchedLineaServicio?.contrato_data?.id,
        });
        clearForm();
        setConfirmDialogIsOpen(false);
      },
    });
  };

  const clearForm = () => {
    form.reset({
      ...form.getValues(),
      numero_contrato: '',
      error_message: '',
      valores_positivos: false,
      cambio_plan_compute_valores_data: undefined,
      solicitud_servicio_data: undefined,
      plan_actual: undefined,
      precio_plan_actual: undefined,
      linea_servicio_data: undefined,
      plan_nuevo_id: undefined,
    });
  };

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMantenedorAplicacionesPage)}
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
          label="Motivo"
          size={gridSizeMdLg6}
          value={''}
          disabled
        />
        {/* ============= Nuevo Plan ============= */}
        <CustomTextFieldNoForm
          label="Tiempo de bloqueo (dias)"
          size={gridSizeMdLg6}
          value={''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Tiempo limite (dias)"
          size={gridSizeMdLg6}
          value={''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Incluye facturacion"
          size={gridSizeMdLg6}
          value={''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Incluye notificacion"
          size={gridSizeMdLg6}
          value={''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Usuarios autorizados"
          size={gridSizeMdLg6}
          value={''}
          disabled
        />
      </>

      {/* ============= loaders ============= */}
    </SingleFormBoxScene>
  );
};
export default SaveMantenedorAplicaciones;

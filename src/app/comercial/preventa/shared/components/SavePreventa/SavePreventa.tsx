import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAddCircle, MdExpandLess } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import {
  CreatePreventaParamsBase,
  useCreatePreventa,
  useUpdatePreventa,
} from '@/actions/app';
import {
  IdentificationTypeEnumChoice,
  REFERIDO_TYPE_ARRAY_CHOICES,
  ReferidoTypeEnumChoice,
  ToastWrapper,
} from '@/shared';
import {
  CustomCellphoneTextField,
  CustomIdentificacionTextField,
  CustomNumberTextField,
  CustomTextField,
  CustomTypoLabel,
  InputAndBtnGridSpace,
  SelectTextFieldArrayString,
  SingleIconButton,
  StepperBoxScene,
  TabTexLabelCustomSpace,
  useCustomStepper,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { SolicitudServicio } from '@/shared/interfaces';
import { preventaFormSchema, validarCedulaEcuador } from '@/shared/utils';
import { CiSearch } from 'react-icons/ci';
import { returnUrlPreventasPage } from '../../../pages/tables/PreventasMainPage';

export interface SavePreventaProps {
  title: React.ReactNode;
  solicitudServicio?: SolicitudServicio;
}

type SaveFormData = CreatePreventaParamsBase &
  Partial<SolicitudServicio> & {
    // helpers
    identificacion_refiere?: string;
  };

const steps = ['Datos generales', 'Ubicación', 'Servicio', 'Documentos'];

const SavePreventa: React.FC<SavePreventaProps> = ({
  title,
  solicitudServicio,
}) => {
  const navigate = useNavigate();

  ///* local state -------------------
  const [showReferidosPart, setShowReferidosPart] = useState<boolean>(false);

  ///* stepper ---------------------
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
    });

  ///* form --------------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(preventaFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedTipoReferido = form.watch('tipo_referido');
  const watchedIdentificationRefiere = form.watch('identificacion_refiere');

  ///* mutations ---------------------
  const createPreventaMutation = useCreatePreventa({
    navigate,
    returnUrl: returnUrlPreventasPage,
    enableErrorNavigate: false,
  });
  const updatePreventaMutation = useUpdatePreventa<CreatePreventaParamsBase>({
    navigate,
    returnUrl: returnUrlPreventasPage,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (solicitudServicio?.id) {
      updatePreventaMutation.mutate({ id: solicitudServicio.id!, data });
      return;
    }

    ///* create
    createPreventaMutation.mutate(data);
  };

  const handleFetchCedulaRucInfo = async (value: string) => {
    console.log('handleFetchCedulaRucInfo', value);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!solicitudServicio?.id) return;

    reset({
      ...solicitudServicio,
    });
  }, [solicitudServicio, reset]);

  return (
    <StepperBoxScene
      titleNode={title}
      // steps
      steps={steps}
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      disableNextStepBtn={disableNextStepBtn}
      // action btns
      onCancel={() => navigate(returnUrlPreventasPage)}
      onSave={handleSubmit(onSave, () => {
        ToastWrapper.error('Faltan campos por requeridos');
      })}
    >
      {/* ============= Datos Generales ============= */}
      {activeStep === 0 && (
        <>
          <CustomTypoLabel text="Datos Cliente" />

          <CustomTextField
            label="Tipo identificación"
            name="tipo_identificacion"
            control={form.control}
            defaultValue={form.getValues().tipo_identificacion}
            error={errors.tipo_identificacion}
            helperText={errors.tipo_identificacion?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Identificación"
            name="identificacion"
            control={form.control}
            defaultValue={form.getValues().identificacion}
            error={errors.identificacion}
            helperText={errors.identificacion?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Razon social"
            name="razon_social"
            control={form.control}
            defaultValue={form.getValues().razon_social}
            error={errors.razon_social}
            helperText={errors.razon_social?.message}
            disabled
          />

          <CustomTextField
            label="Fecha nacimiento"
            name="fecha_nacimiento"
            control={form.control}
            defaultValue={form.getValues().fecha_nacimiento}
            error={errors.fecha_nacimiento}
            helperText={errors.fecha_nacimiento?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomNumberTextField
            label="Edad"
            name="edad"
            control={form.control}
            defaultValue={form.getValues().edad}
            error={errors.edad}
            helperText={errors.edad?.message}
            disabled
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Email"
            name="email"
            type="email"
            control={form.control}
            defaultValue={form.getValues().email}
            error={errors.email}
            helperText={errors.email?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomCellphoneTextField
            label="Celular adicional"
            name="celular_adicional"
            control={form.control}
            defaultValue={form.getValues().celular_adicional}
            error={errors.celular_adicional}
            helperText={errors.celular_adicional?.message}
            size={gridSizeMdLg6}
          />

          <TabTexLabelCustomSpace
            textContent="Sistema Referidos"
            showCustomRightSpace={true}
            customRightSpace={
              <SingleIconButton
                newCustomButton
                startIcon={
                  showReferidosPart ? <MdExpandLess /> : <MdAddCircle />
                }
                label={showReferidosPart ? '' : 'AGREGAR'}
                variant="text"
                onClick={() => {
                  setShowReferidosPart(true);
                }}
              />
            }
          />
          {showReferidosPart && (
            <>
              <SelectTextFieldArrayString
                label="Tipo referido"
                name="tipo_referido"
                textFieldKey="tipo_referido"
                // options
                options={REFERIDO_TYPE_ARRAY_CHOICES}
                defaultValue={form.getValues()?.tipo_referido || ''}
                // errors
                control={form.control}
                error={form.formState.errors.tipo_referido}
                helperText={form.formState.errors.tipo_referido?.message}
                gridSize={gridSizeMdLg6}
              />
              {!watchedTipoReferido && <span className="spacer" />}

              <>
                {watchedTipoReferido === ReferidoTypeEnumChoice.CLIENTE ? (
                  <>
                    <InputAndBtnGridSpace
                      inputNode={
                        <CustomIdentificacionTextField
                          label="Identificación"
                          name="identificacion_refiere"
                          control={form.control}
                          selectedDocumentType={
                            IdentificationTypeEnumChoice.CEDULA
                          }
                          defaultValue={form.getValues(
                            'identificacion_refiere',
                          )}
                          error={errors.identificacion_refiere}
                          helperText={errors.identificacion_refiere?.message}
                          onFetchCedulaRucInfo={async value => {
                            await handleFetchCedulaRucInfo(value);
                          }}
                        />
                      }
                      btnLabel="Buscar"
                      iconBtn={<CiSearch />}
                      onClick={() => {
                        if (
                          !watchedIdentificationRefiere ||
                          watchedIdentificationRefiere?.length < 10 ||
                          !validarCedulaEcuador(watchedIdentificationRefiere)
                        )
                          return ToastWrapper.warning(
                            'Ingrese un número de cédula válido',
                          );

                        handleFetchCedulaRucInfo(watchedIdentificationRefiere);
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            </>
          )}
        </>
      )}

      {/* ============= Ubicación ============= */}
      {activeStep === 1 && (
        <>
          <CustomTextField
            label="Tipo servicio"
            name="tipo_servicio"
            control={form.control}
            defaultValue={form.getValues().tipo_servicio}
            error={errors.tipo_servicio}
            helperText={errors.tipo_servicio?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Tipo plan"
            name="tipo_plan"
            control={form.control}
            defaultValue={form.getValues().tipo_plan}
            error={errors.tipo_plan}
            helperText={errors.tipo_plan?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Numero cuenta bancaria"
            name="numero_cuenta_bancaria"
            control={form.control}
            defaultValue={form.getValues().numero_cuenta_bancaria}
            error={errors.numero_cuenta_bancaria}
            helperText={errors.numero_cuenta_bancaria?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Costo instalacion"
            name="costo_instalacion"
            control={form.control}
            defaultValue={form.getValues().costo_instalacion}
            error={errors.costo_instalacion}
            helperText={errors.costo_instalacion?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Url foto cedula frontal"
            name="url_foto_cedula_frontal"
            control={form.control}
            defaultValue={form.getValues().url_foto_cedula_frontal}
            error={errors.url_foto_cedula_frontal}
            helperText={errors.url_foto_cedula_frontal?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Url foto cedula trasera"
            name="url_foto_cedula_trasera"
            control={form.control}
            defaultValue={form.getValues().url_foto_cedula_trasera}
            error={errors.url_foto_cedula_trasera}
            helperText={errors.url_foto_cedula_trasera?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Url foto documento cuenta"
            name="url_foto_documento_cuenta"
            control={form.control}
            defaultValue={form.getValues().url_foto_documento_cuenta}
            error={errors.url_foto_documento_cuenta}
            helperText={errors.url_foto_documento_cuenta?.message}
            size={gridSizeMdLg6}
          />

          <CustomNumberTextField
            label="Metodo pago"
            name="metodo_pago"
            control={form.control}
            defaultValue={form.getValues().metodo_pago}
            error={errors.metodo_pago}
            helperText={errors.metodo_pago?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Entidad financiera"
            name="entidad_financiera"
            control={form.control}
            defaultValue={form.getValues().entidad_financiera}
            error={errors.entidad_financiera}
            helperText={errors.entidad_financiera?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Solicitud servicio"
            name="solicitud_servicio"
            control={form.control}
            defaultValue={form.getValues().solicitud_servicio}
            error={errors.solicitud_servicio}
            helperText={errors.solicitud_servicio?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Area"
            name="area"
            control={form.control}
            defaultValue={form.getValues().area}
            error={errors.area}
            helperText={errors.area?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Departamento"
            name="departamento"
            control={form.control}
            defaultValue={form.getValues().departamento}
            error={errors.departamento}
            helperText={errors.departamento?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Canal venta"
            name="canal_venta"
            control={form.control}
            defaultValue={form.getValues().canal_venta}
            error={errors.canal_venta}
            helperText={errors.canal_venta?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Vendedor"
            name="vendedor"
            control={form.control}
            defaultValue={form.getValues().vendedor}
            error={errors.vendedor}
            helperText={errors.vendedor?.message}
            size={gridSizeMdLg6}
            min={0}
          />
        </>
      )}
    </StepperBoxScene>
  );
};

export default SavePreventa;

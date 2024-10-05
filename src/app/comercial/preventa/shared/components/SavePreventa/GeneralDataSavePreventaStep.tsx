import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { IoMdTrash } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';

import { useFetchFlotas } from '@/actions/app';
import {
  Flota,
  gridSizeMdLg6,
  IdentificationTypeEnumChoice,
  PARENTESCO_TYPE_ARRAY_CHOICES,
  REFERIDO_TYPE_ARRAY_CHOICES,
  ReferidoTypeEnumChoice,
  ToastWrapper,
  validarCedulaEcuador,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomCellphoneTextField,
  CustomIdentificacionTextField,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  InputAndBtnGridSpace,
  SelectTextFieldArrayString,
  SingleIconButton,
  TabTexLabelCustomSpace,
} from '@/shared/components';
import type { SaveFormDataPreventa } from './SavePreventa';
import { DatosGeneralesPreventaP1 } from './form';

export type GeneralDataSavePreventaStepProps = {
  form: UseFormReturn<SaveFormDataPreventa>;
};

const GeneralDataSavePreventaStep: React.FC<
  GeneralDataSavePreventaStepProps
> = ({ form }) => {
  ///* local state -------------------
  const [showReferidosPart, setShowReferidosPart] = useState<boolean>(false);

  ///* form ----------------
  const { errors } = form.formState;

  const watchedIdentificationRefiere = form.watch('identificacion_refiere');
  const watchedThereAreClientRefiere = form.watch('thereAreClientRefiere');
  const watchedTipoReferido = form.watch('tipo_referido');

  ///* fetch data ----------------
  // referidos
  const {
    data: flotasPagign,
    isLoading: isLoadingFlotas,
    isRefetching: isRefetchingFlotas,
  } = useFetchFlotas({
    enabled:
      !!watchedTipoReferido &&
      watchedTipoReferido === ReferidoTypeEnumChoice.FLOTA,
    params: {
      page_size: 1200,
    },
  });

  ///* handlers ----------------
  const handleFetchClienteByCedula = async (value: string) => {
    // TODO: fetch client data:
    console.log('handleFetchCedulaRucInfo', value);
    form.reset({
      ...form.getValues(),
      thereAreClientRefiere: true,
      clienteRefiere: 'Cliente Refiere',
      celularRefiere: '0999999999',
      direccionRefiere: 'Dirección Refiere',
      es_referido: true,
    });
  };

  const onTrashReferidosPart = () => {
    onClearCedula();
    onClearFlotaRefiere();
    form.setValue('es_referido', false);
  };

  const onClearCedula = () => {
    form.reset({
      ...form.getValues(),
      thereAreClientRefiere: false,
      identificacion_refiere: '',
      clienteRefiere: '',
      celularRefiere: '',
      direccionRefiere: '',
      es_referido: false,
    });
  };
  const onClearFlotaRefiere = () => {
    form.reset({
      ...form.getValues(),
      thereAreClientRefiere: false,
      es_referido: false,
    });
  };

  ///* effects ----------------
  useEffect(() => {
    if (isLoadingFlotas || isRefetchingFlotas) return;

    // flotas
    if (watchedTipoReferido === ReferidoTypeEnumChoice.FLOTA) {
      if (!flotasPagign?.data?.items?.length)
        ToastWrapper.error(
          'No se encontraron flotas para el tipo de referido seleccionado',
        );
    }
  }, [
    flotasPagign?.data?.items?.length,
    isLoadingFlotas,
    isRefetchingFlotas,
    watchedTipoReferido,
  ]);

  return (
    <>
      <DatosGeneralesPreventaP1
        form={form as UseFormReturn<Partial<SaveFormDataPreventa>>}
      />

      {/* ============= Persona Referencia ============= */}
      <>
        <CustomTypoLabel
          text="Persona Referencia"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <CustomTextField
          label="Nombre Persona Referencia"
          name="nombre_persona_referencia"
          control={form.control}
          defaultValue={form.getValues().nombre_persona_referencia}
          error={errors.nombre_persona_referencia}
          helperText={errors.nombre_persona_referencia?.message}
        />
        <SelectTextFieldArrayString
          label="Parentesco Referencia"
          name="parentesco_referencia"
          textFieldKey="parentesco_referencia"
          // options
          options={PARENTESCO_TYPE_ARRAY_CHOICES}
          defaultValue={form.getValues()?.parentesco_referencia || ''}
          // errors
          control={form.control}
          error={form.formState.errors.parentesco_referencia}
          helperText={form.formState.errors.parentesco_referencia?.message}
          gridSize={gridSizeMdLg6}
        />
        <CustomCellphoneTextField
          label="Celular Referencia"
          name="celular_adicional"
          control={form.control}
          defaultValue={form.getValues().celular_adicional}
          error={errors.celular_adicional}
          helperText={errors.celular_adicional?.message}
          size={gridSizeMdLg6}
        />
      </>

      {/* ============= Sistema Referidos ============= */}
      <>
        <TabTexLabelCustomSpace
          textContent="Sistema Referidos"
          showCustomRightSpace={true}
          customRightSpace={
            <SingleIconButton
              newCustomButton
              color={!showReferidosPart ? 'primary' : 'error'}
              startIcon={showReferidosPart ? <IoMdTrash /> : <MdAddCircle />}
              label={showReferidosPart ? 'REMOVER' : 'AGREGAR'}
              onClick={() => {
                setShowReferidosPart(prev => !prev);
                if (!showReferidosPart) {
                  onTrashReferidosPart();
                }
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
              onChangeValue={() => {
                onClearCedula();
                onClearFlotaRefiere();
              }}
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
                        defaultValue={form.getValues('identificacion_refiere')}
                        error={errors.identificacion_refiere}
                        helperText={errors.identificacion_refiere?.message}
                        onFetchCedulaRucInfo={async value => {
                          await handleFetchClienteByCedula(value);
                        }}
                        onClear={() => {
                          onClearCedula();
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

                      handleFetchClienteByCedula(watchedIdentificationRefiere);
                    }}
                  />
                  <>
                    {watchedThereAreClientRefiere && (
                      <>
                        <CustomTextField
                          label="Cliente refiere"
                          name="clienteRefiere"
                          control={form.control}
                          defaultValue={form.getValues().clienteRefiere}
                          error={errors.clienteRefiere}
                          helperText={errors.clienteRefiere?.message}
                          disabled
                          size={gridSizeMdLg6}
                        />
                        <CustomCellphoneTextField
                          label="Celular refiere"
                          name="celularRefiere"
                          control={form.control}
                          defaultValue={form.getValues().celularRefiere}
                          error={errors.celularRefiere}
                          helperText={errors.celularRefiere?.message}
                          disabled
                          size={gridSizeMdLg6}
                        />
                        <CustomTextField
                          label="Dirección refiere"
                          name="direccionRefiere"
                          control={form.control}
                          defaultValue={form.getValues().direccionRefiere}
                          error={errors.direccionRefiere}
                          helperText={errors.direccionRefiere?.message}
                          disabled
                        />
                      </>
                    )}
                  </>
                </>
              ) : watchedTipoReferido === ReferidoTypeEnumChoice.FLOTA ? (
                <>
                  <CustomAutocomplete<Flota>
                    label="Flota"
                    name="flota_refiere"
                    // options
                    options={flotasPagign?.data?.items || []}
                    valueKey="name"
                    actualValueKey="id"
                    defaultValue={form.getValues().flota_refiere}
                    isLoadingData={isLoadingFlotas || isRefetchingFlotas}
                    // vaidation
                    control={form.control}
                    error={errors.flota_refiere}
                    helperText={errors.flota_refiere?.message}
                    size={gridSizeMdLg6}
                  />
                </>
              ) : null}
            </>
          </>
        )}
      </>
    </>
  );
};

export default GeneralDataSavePreventaStep;

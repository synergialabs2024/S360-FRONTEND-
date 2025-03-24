import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { IoMdTrash } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';

import { ClienteTSQEnum, useFetchFlotas } from '@/actions/app';
import { useGenericPOST } from '@/actions/shared';
import {
  FindByIdentification,
  Flota,
  gridSizeMdLg6,
  IdentificationTypeEnumChoice,
  REFERIDO_TYPE_ARRAY_CHOICES,
  ReferidoTypeEnumChoice,
  ToastWrapper,
  useDebouncer,
  useLoaders,
  validarCedulaEcuador,
} from '@/shared';
import {
  CustomAutocompleteSearch,
  CustomCellphoneTextField,
  CustomIdentificacionTextField,
  CustomTextField,
  InputAndBtnGridSpace,
  SelectTextFieldArrayString,
  SingleIconButton,
  TabTexLabelCustomSpace,
} from '@/shared/components';
import { usePreventaStore } from '@/store/app';
import type { SaveFormDataPreventa } from '../../SavePreventa';

export type ReferidosPreventaFormPartProps = {
  form: UseFormReturn<SaveFormDataPreventa>;
};

const ReferidosPreventaFormPart: React.FC<ReferidosPreventaFormPartProps> = ({
  form,
}) => {
  ///* local state -------------------
  const showReferidosPart = usePreventaStore(s => s.showReferidosPart);
  const toggleShowReferidosPart = usePreventaStore(
    s => s.toggleShowReferidosPart,
  );
  const [floataSearchTerm, setFloataSearchTerm] = useState<string>('');

  ///* hooks -------------------
  const {
    onChangeFilter: onChangeFilterFloata,
    searchTerm: debouncedFloataTerm,
  } = useDebouncer({
    searchTerm: floataSearchTerm,
    setSearchTerm: setFloataSearchTerm,
  });

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
      page_size: 20,
      filterByState: false,
      name: debouncedFloataTerm,
    },
  });

  const onSuccessSearchCliente = (slData: FindByIdentification) => {
    form.reset({
      ...form.getValues(),
      thereAreClientRefiere: true,
      clienteRefiere: slData?.cliente_data?.razon_social || 'N/A',
      celularRefiere: slData?.cliente_data?.celular || 'N/A',
      direccionRefiere: slData?.contrato_data?.direccion_referencia || 'N/A',
      es_referido: true,
    });
  };
  ///* mutations ----------------
  const searchCliente = useGenericPOST<any, any>(
    '/cliente/find-by-identification/',
    ClienteTSQEnum.CLIENTES,
    {
      customMessageToast: 'El cliente existe en el sistema',
      customOnSuccess(res) {
        onSuccessSearchCliente(
          (res as any)?.data?.at(0) as FindByIdentification,
        );
      },
      customOnError(err: any) {
        if (err?.response?.status === 404) {
          ToastWrapper.error('Cliente no encontrado en el sistema');
          onClearCedula();
        }
      },
    },
  );

  ///* handlers ----------------
  const handleFetchClienteByCedula = async (value: string) => {
    if (!value) return;

    searchCliente.mutate({
      identificacion: value,
    });
  };

  const onTrashReferidosPart = () => {
    onClearCedula();
    onClearFlotaRefiere();
    form.setValue('es_referido', false);
    form.setValue('tipo_referido', null as any);
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
      flota_refiere: undefined,
    });
    setFloataSearchTerm('');
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

  const isCustomLoading = isLoadingFlotas || isRefetchingFlotas;
  useLoaders(isCustomLoading);

  return (
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
              toggleShowReferidosPart();
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
                      selectedDocumentType={IdentificationTypeEnumChoice.CEDULA}
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
                <CustomAutocompleteSearch<Flota>
                  label="Flota"
                  name="flota_refiere"
                  // options
                  options={flotasPagign?.data?.items || []}
                  valueKey="name"
                  actualValueKey="id"
                  defaultValue={form.getValues().flota_refiere}
                  isLoading={isLoadingFlotas || isRefetchingFlotas}
                  // vaidation
                  control={form.control}
                  error={errors.flota_refiere}
                  helperText={errors.flota_refiere?.message}
                  // debouncer
                  onChangeInputText={onChangeFilterFloata}
                />
              </>
            ) : null}
          </>
        </>
      )}
    </>
  );
};

export default ReferidosPreventaFormPart;

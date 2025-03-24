import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateMotivoRubroAdicionalParamsBase,
  useCreateMotivoRubroAdicional,
  useFetchSystemGroups,
  useUpdateMotivoRubroAdicional,
} from '@/actions/app';
import {
  TIPO_RUBRO_ADICIONAL_MANTENEDOR_ARRAY_CHOICES,
  tipoRubroAdicionalMantenedorEnumChoice,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocompleteMultiple,
  CustomNumberTextField,
  CustomTextArea,
  CustomTextField,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import { MotivoRubroAdicional, SystemGroup } from '@/shared/interfaces';
import {
  getKeysFormErrorsMessage,
  motivoRubroAdicionalFormSchema,
} from '@/shared/utils';
import { returnUrlMotivosRubroAdicionalPage } from '../../../pages/tables/MotivosRubroAdicionalPage';

export interface SaveMotivoRubroAdicionalProps {
  title: string;
  motivorubroadicional?: MotivoRubroAdicional;
}

type SaveFormData = CreateMotivoRubroAdicionalParamsBase & {};

const SaveMotivoRubroAdicional: React.FC<SaveMotivoRubroAdicionalProps> = ({
  title,
  motivorubroadicional,
}) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(motivoRubroAdicionalFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const watchedTipoRubroAdicional = form.watch('tipo_rubro_adicional');

  const {
    data: systemGroupsPagingRes,
    isLoading: isLoadingsyStemGroups,
    isRefetching: isRefetchingSystemGroups,
  } = useFetchSystemGroups({
    params: {
      page_size: 1000,
    },
  });

  ///* mutations ---------------------
  const createMotivoRubroAdicionalMutation = useCreateMotivoRubroAdicional({
    navigate,
    returnUrl: returnUrlMotivosRubroAdicionalPage,
    enableErrorNavigate: false,
  });
  const updateMotivoRubroAdicionalMutation =
    useUpdateMotivoRubroAdicional<CreateMotivoRubroAdicionalParamsBase>({
      navigate,
      returnUrl: returnUrlMotivosRubroAdicionalPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (
      watchedTipoRubroAdicional ===
        tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_ACTIVACIONES &&
      data.grupos_usuario_autorizados.length === 0
    ) {
      ToastWrapper.warning('Debe seleccionar al menos un grupo de usuarios');
      return;
    }

    ///* upd
    if (motivorubroadicional?.id) {
      updateMotivoRubroAdicionalMutation.mutate({
        id: motivorubroadicional.id!,
        data,
      });
      return;
    }
    console.log('data', data);
    ///* create
    createMotivoRubroAdicionalMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!motivorubroadicional?.id) return;
    reset(motivorubroadicional);
  }, [motivorubroadicional, reset]);

  const customLoader = isLoadingsyStemGroups || isRefetchingSystemGroups;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMotivosRubroAdicionalPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
        size={gridSizeMdLg6}
      />
      <SelectArrayString
        label="Tipo rubro adicional"
        name="tipo_rubro_adicional"
        control={form.control}
        error={errors.tipo_rubro_adicional}
        helperText={errors.tipo_rubro_adicional?.message}
        defaultValue={form.getValues('tipo_rubro_adicional')}
        options={TIPO_RUBRO_ADICIONAL_MANTENEDOR_ARRAY_CHOICES}
        onChangeValue={() => {
          form.setValue('grupos_usuario_autorizados', []);
        }}
      />

      {watchedTipoRubroAdicional ===
      tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_ACTIVACIONES ? (
          <>
            {/* --------- SYSTEM GROUP --------- */}
            <CustomAutocompleteMultiple<SystemGroup>
              label="Grupos Usuarios autorizados"
              name="grupos_usuario_autorizados"
              textFieldKey="nombre"
              valueKey="name"
              actualValueKey="id"
              // options
              options={systemGroupsPagingRes?.data?.items || []}
              defaultValue={
                form.getValues().grupos_usuario_autorizados?.length
                  ? systemGroupsPagingRes?.data?.items?.filter(
                    (departamento: SystemGroup) =>
                      (
                        form.getValues().grupos_usuario_autorizados as any[]
                      )?.includes(departamento?.id!),
                  )
                  : []
              }
              isLoadingData={isLoadingsyStemGroups || isRefetchingSystemGroups}
              // errors
              control={form.control}
              error={undefined}
              helperText={errors.grupos_usuario_autorizados?.message}
              onlyActualValueKey
              required={false}
              size={gridSizeMdLg12}
            />
          </>
        ) : (
          <></>
        )}

      <CustomTextField
        label="Código"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
        defaultHelperText="El código debe ser único"
        disabled={!!motivorubroadicional?.id}
        size={gridSizeMdLg6}
      />

      <CustomNumberTextField
        label="Valor"
        name="valor"
        control={form.control}
        defaultValue={form.getValues().valor}
        error={errors.valor}
        helperText={errors.valor?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomTextArea
        label="Descripción"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
      />
    </SingleFormBoxScene>
  );
};

export default SaveMotivoRubroAdicional;

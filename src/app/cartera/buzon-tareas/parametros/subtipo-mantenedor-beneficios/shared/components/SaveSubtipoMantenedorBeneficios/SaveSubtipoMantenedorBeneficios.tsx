import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  getKeysFormErrorsMessage,
  gridSizeMdLg6,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { useEffect } from 'react';
import {
  CustomAutocomplete,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { useFetchTipoMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import { returnUrlSubtipoMantenedorBeneficiosPage } from '../../../pages/tables/SubtipoMantenedorBeneficiosPage';
import { SubtipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import { subtipoMantenedorBeneficiosFormSchema } from '@/shared/utils/validation-schemas/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import {
  CausaMantenedorBeneficios,
  SolucionMantenedorBeneficios,
  TipoMantenedorBeneficios,
} from '@/shared/interfaces/app/cartera/buzon-tareas/parametros';
import {
  CreateSubtipoMantenedorBeneficioParamsBase,
  useCreateSubtipoMantenedorBeneficio,
  useUpdateSubtipoMantenedorBeneficio,
} from '@/actions/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import { useFetchCausaMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/causa-mantenedor-beneficios';
import { useFetchSolucionMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/solucion-mantenedor-beneficios';

export type SaveSubtipoMantenedorBeneficiosProps = {
  title: string;
  subtipoMantenedorBeneficios?: SubtipoMantenedorBeneficios;
};

type SaveFormData = CreateSubtipoMantenedorBeneficioParamsBase & {};

const SaveSubtipoMantenedorBeneficios: React.FC<
  SaveSubtipoMantenedorBeneficiosProps
> = ({ title, subtipoMantenedorBeneficios }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(subtipoMantenedorBeneficiosFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const {
    data: tipoMantenedorBeneficiosPaginatedRes,
    isLoading: isLoadingTipoMantenedorBeneficios,
    isRefetching: isRefetchingTipoMantenedorBeneficios,
  } = useFetchTipoMantenedorBeneficios({
    params: {
      page_size: 200,
    },
  });

  const {
    data: causaMantenedorBeneficiosPaginatedRes,
    isLoading: isLoadingCausaMantenedorBeneficios,
    isRefetching: isRefetchingCausaMantenedorBeneficios,
  } = useFetchCausaMantenedorBeneficios({
    params: {
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

  ///* mutations ---------------------
  const createTipoMantenedorBeneficio = useCreateSubtipoMantenedorBeneficio({
    navigate,
    returnUrl: returnUrlSubtipoMantenedorBeneficiosPage,
    enableErrorNavigate: false,
  });

  const updateSubtipoMantenedorBeneficio = useUpdateSubtipoMantenedorBeneficio({
    navigate,
    returnUrl: returnUrlSubtipoMantenedorBeneficiosPage,
    enableErrorNavigate: false,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (subtipoMantenedorBeneficios?.id) {
      updateSubtipoMantenedorBeneficio.mutate({
        id: subtipoMantenedorBeneficios.id!,
        data,
      });
      return;
    }

    ///* create
    createTipoMantenedorBeneficio.mutate({
      name: data.name,
      code: data.code,
      state: data.state,
      description: data.description,
      motivo: data.motivo,
      causa: data.causa,
      solucion: data.solucion,
      tipo_mantenedor_beneficio: data.tipo_mantenedor_beneficio,
    });
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!subtipoMantenedorBeneficios?.id) return;
    reset(subtipoMantenedorBeneficios);
  }, [subtipoMantenedorBeneficios, reset]);

  const customLoader =
    isLoadingTipoMantenedorBeneficios ||
    isRefetchingTipoMantenedorBeneficios ||
    isLoadingCausaMantenedorBeneficios ||
    isRefetchingCausaMantenedorBeneficios ||
    isLoadingSolucionMantenedorBeneficios ||
    isRefetchingSolucionMantenedorBeneficios;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSubtipoMantenedorBeneficiosPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Codigo"
        name="code"
        control={form.control}
        defaultValue={form.getValues().code}
        error={errors.code}
        helperText={errors.code?.message}
        size={gridSizeMdLg6}
        disabled={!!subtipoMantenedorBeneficios?.id}
      />

      <CustomTextField
        label="Motivo"
        name="motivo"
        control={form.control}
        defaultValue={form.getValues().motivo}
        error={errors.motivo}
        helperText={errors.motivo?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<CausaMantenedorBeneficios>
        label="Causa"
        name="causa"
        valueKey="name"
        actualValueKey="id"
        control={form.control}
        defaultValue={form.getValues().causa}
        options={causaMantenedorBeneficiosPaginatedRes?.data.items || []}
        isLoadingData={isLoadingCausaMantenedorBeneficios}
        error={errors.causa}
        helperText={errors.causa?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<SolucionMantenedorBeneficios>
        label="Solucion"
        name="solucion"
        valueKey="name"
        actualValueKey="id"
        control={form.control}
        defaultValue={form.getValues().solucion}
        options={solucionMantenedorBeneficiosPaginatedRes?.data.items || []}
        isLoadingData={isLoadingSolucionMantenedorBeneficios}
        error={errors.solucion}
        helperText={errors.solucion?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<TipoMantenedorBeneficios>
        label="Tipo Mantenedor Beneficio"
        name="tipo_mantenedor_beneficio"
        valueKey="name"
        actualValueKey="id"
        control={form.control}
        defaultValue={form.getValues().tipo_mantenedor_beneficio}
        options={tipoMantenedorBeneficiosPaginatedRes?.data.items || []}
        isLoadingData={isLoadingTipoMantenedorBeneficios}
        error={errors.tipo_mantenedor_beneficio}
        helperText={errors.tipo_mantenedor_beneficio?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextArea
        label="Descripcion"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveSubtipoMantenedorBeneficios;

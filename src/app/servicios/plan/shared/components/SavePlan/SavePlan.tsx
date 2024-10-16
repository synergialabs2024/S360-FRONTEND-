import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreatePlanParamsBase,
  useCreatePlan,
  useUpdatePlan,
} from '@/actions/app';
import {
  CustomAutocompleteArrString,
  CustomNumberTextField,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  INTERNET_PERMANENCE_ARRAY_CHOICES,
  INTERNET_PLAN_TYPE_ARRAY_CHOICES,
  INTERNET_SERVICE_TYPE_ARRAY_CHOICES,
  INTERNET_UNIT_VELOCITY_ARRAY_CHOICES,
} from '@/shared/constants/app';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { Plan } from '@/shared/interfaces';
import { planFormSchema } from '@/shared/utils';
import { returnUrlPlansPage } from '../../../pages/tables/PlansPage';

export interface SavePlanProps {
  title: string;
  plan?: Plan;
}

type SaveFormData = CreatePlanParamsBase & {};

const SavePlan: React.FC<SavePlanProps> = ({ title, plan }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(planFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedSpeedUnit = form.watch('unidad_velocidad');

  ///* mutations
  const createPlanMutation = useCreatePlan({
    navigate,
    returnUrl: returnUrlPlansPage,
    enableErrorNavigate: false,
  });
  const updatePlanMutation = useUpdatePlan<CreatePlanParamsBase>({
    navigate,
    returnUrl: returnUrlPlansPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (plan?.id) {
      updatePlanMutation.mutate({ id: plan.id!, data });
      return;
    }

    ///* create
    createPlanMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!plan?.id) return;
    reset(plan);
  }, [plan, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPlansPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
      />
      <CustomTextArea
        label="Descripción"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
        required={false}
      />

      <CustomNumberTextField
        label="Valor base"
        name="valor"
        control={form.control}
        defaultValue={form.getValues().valor}
        error={errors.valor}
        helperText={errors.valor?.message}
        size={gridSizeMdLg6}
        customType="currency"
        min={0}
      />
      <CustomTextField
        label="Comparticion"
        name="comparticion"
        control={form.control}
        defaultValue={form.getValues().comparticion}
        error={errors.comparticion}
        helperText={errors.comparticion?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocompleteArrString
        label="Unidad velocidad"
        name="unidad_velocidad"
        options={INTERNET_UNIT_VELOCITY_ARRAY_CHOICES}
        isLoadingData={false}
        control={form.control}
        defaultValue={form.getValues().unidad_velocidad}
        error={errors.unidad_velocidad}
        helperText={errors.unidad_velocidad?.message}
      />
      <CustomNumberTextField
        label="Velocidad descarga minima"
        name="velocidad_descarga_minima"
        control={form.control}
        defaultValue={form.getValues().velocidad_descarga_minima}
        error={errors.velocidad_descarga_minima}
        helperText={errors.velocidad_descarga_minima?.message}
        size={gridSizeMdLg6}
        customType="speed"
        endAdornment={watchedSpeedUnit}
      />
      <CustomNumberTextField
        label="Velocidad descarga maxima"
        name="velocidad_descarga_maxima"
        control={form.control}
        defaultValue={form.getValues().velocidad_descarga_maxima}
        error={errors.velocidad_descarga_maxima}
        helperText={errors.velocidad_descarga_maxima?.message}
        size={gridSizeMdLg6}
        customType="speed"
        endAdornment={watchedSpeedUnit}
      />
      <CustomNumberTextField
        label="Velocidad subida minima"
        name="velocidad_subida_minima"
        control={form.control}
        defaultValue={form.getValues().velocidad_subida_minima}
        error={errors.velocidad_subida_minima}
        helperText={errors.velocidad_subida_minima?.message}
        size={gridSizeMdLg6}
        customType="speed"
        endAdornment={watchedSpeedUnit}
      />
      <CustomNumberTextField
        label="Velocidad subida maxima"
        name="velocidad_subida_maxima"
        control={form.control}
        defaultValue={form.getValues().velocidad_subida_maxima}
        error={errors.velocidad_subida_maxima}
        helperText={errors.velocidad_subida_maxima?.message}
        size={gridSizeMdLg6}
        customType="speed"
        endAdornment={watchedSpeedUnit}
      />

      <CustomNumberTextField
        label="Prioridad"
        name="prioridad"
        control={form.control}
        defaultValue={form.getValues().prioridad}
        error={errors.prioridad}
        helperText={errors.prioridad?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomAutocompleteArrString
        label="Permanencia"
        name="permanencia"
        options={INTERNET_PERMANENCE_ARRAY_CHOICES}
        isLoadingData={false}
        control={form.control}
        defaultValue={form.getValues().permanencia}
        error={errors.permanencia}
        helperText={errors.permanencia?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocompleteArrString
        label="Tipo de servicio"
        name="tipo_servicio"
        options={INTERNET_SERVICE_TYPE_ARRAY_CHOICES}
        isLoadingData={false}
        control={form.control}
        defaultValue={form.getValues().tipo_servicio}
        error={errors.tipo_servicio}
        helperText={errors.tipo_servicio?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocompleteArrString
        label="Tipo de plan"
        name="tipo_plan"
        options={INTERNET_PLAN_TYPE_ARRAY_CHOICES}
        isLoadingData={false}
        control={form.control}
        defaultValue={form.getValues().tipo_plan}
        error={errors.tipo_plan}
        helperText={errors.tipo_plan?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SavePlan;

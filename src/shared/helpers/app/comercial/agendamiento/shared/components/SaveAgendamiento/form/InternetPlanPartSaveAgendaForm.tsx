import { UseFormReturn } from 'react-hook-form';

import {
  gridSizeMdLg6,
  INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES,
  INTERNET_SERVICE_TYPE_ARRAY_CHOICES,
} from '@/shared';
import {
  CustomAutocompleteArrString,
  CustomTextField,
  CustomTypoLabel,
} from '@/shared/components';
import { SaveFormDataAgendaVentas } from '../SaveAgendamiento';

export type InternetPlanPartSaveAgendaFormProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
  ptLabel?: string;
};

const InternetPlanPartSaveAgendaForm: React.FC<
  InternetPlanPartSaveAgendaFormProps
> = ({ form, ptLabel = '0px' }) => {
  ///* form ---------------------
  const { errors } = form.formState;

  return (
    <>
      {/* ------------------ plan ------------------ */}
      <CustomTypoLabel text="Plan de Internet" pt={ptLabel} />
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
        onChangeValue={() => {
          // reset related fields
          form.setValue('plan_internet', '' as any);
        }}
        disabled
      />
      <CustomAutocompleteArrString
        label="Tipo de plan"
        name="tipo_plan"
        options={INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES}
        isLoadingData={false}
        control={form.control}
        defaultValue={form.getValues().tipo_plan}
        error={errors.tipo_plan}
        helperText={errors.tipo_plan?.message}
        size={gridSizeMdLg6}
        onChangeValue={() => {
          // reset related fields
          form.setValue('plan_internet', '' as any);
        }}
        disabled
      />
      <CustomTextField
        label="Plan de Internet"
        name="planName"
        control={form.control}
        defaultValue={form.getValues().planName}
        error={errors.planName}
        helperText={errors.planName?.message}
        disabled
      />
    </>
  );
};

export default InternetPlanPartSaveAgendaForm;

import { UseFormReturn } from 'react-hook-form';

import { gridSizeMdLg6, PARENTESCO_TYPE_ARRAY_CHOICES } from '@/shared';
import {
  CustomCellphoneTextField,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SelectTextFieldArrayString,
} from '@/shared/components';
import type { SaveFormDataPreventa } from './SavePreventa';
import { DatosGeneralesPreventaP1 } from './form';
import ReferidosPreventaFormPart from './form/referidos/ReferidosPreventaFormPart';

export type GeneralDataSavePreventaStepProps = {
  form: UseFormReturn<SaveFormDataPreventa>;
};

const GeneralDataSavePreventaStep: React.FC<
  GeneralDataSavePreventaStepProps
> = ({ form }) => {
  ///* form ----------------
  const { errors } = form.formState;

  return (
    <>
      <DatosGeneralesPreventaP1
        form={form as UseFormReturn<Partial<SaveFormDataPreventa>>}
        canEditEmail
      />

      {/* ============= Persona Referencia ============= */}
      <>
        <CustomTypoLabel
          text="Persona Referencia"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        {errors.celular_adicional ? (
          <>
            <CustomTextField
              label="Nombre Persona Referencia"
              name="nombre_persona_referencia"
              control={form.control}
              defaultValue={form.getValues().nombre_persona_referencia}
              error={errors.nombre_persona_referencia}
              helperText={errors.nombre_persona_referencia?.message}
              size={gridSizeMdLg6}
            />
            <CustomCellphoneTextField
              label="Celular Cliente"
              name="celular"
              control={form.control}
              defaultValue={form.getValues().celular}
              error={form.formState.errors.celular}
              helperText={form.formState.errors.celular?.message}
              size={gridSizeMdLg6}
              disabled={true}
            />
          </>
        ) : (
          <>
            <CustomTextField
              label="Nombre Persona Referencia"
              name="nombre_persona_referencia"
              control={form.control}
              defaultValue={form.getValues().nombre_persona_referencia}
              error={errors.nombre_persona_referencia}
              helperText={errors.nombre_persona_referencia?.message}
            />
          </>
        )}

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
      <ReferidosPreventaFormPart form={form} />
    </>
  );
};

export default GeneralDataSavePreventaStep;

import { UseFormReturn } from 'react-hook-form';

import { DatosGeneralesPreventaP1 } from '@/app/comercial/preventa/shared/components';
import { PARENTESCO_TYPE_ARRAY_CHOICES, gridSizeMdLg6 } from '@/shared';
import {
  CustomCellphoneTextField,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SelectTextFieldArrayString,
} from '@/shared/components';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento';

export type GeneralDataSaveAgendaVentaStepProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
};

const GeneralDataSaveAgendaVentaStep: React.FC<
  GeneralDataSaveAgendaVentaStepProps
> = ({ form }) => {
  ///* form ---------------------
  const { errors } = form.formState;

  return (
    <>
      <DatosGeneralesPreventaP1 form={form as any} />

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
          disabled
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
          disabled
        />
        <CustomCellphoneTextField
          label="Celular Referencia"
          name="celular_adicional"
          control={form.control}
          defaultValue={form.getValues().celular_adicional}
          error={errors.celular_adicional}
          helperText={errors.celular_adicional?.message}
          size={gridSizeMdLg6}
          disabled
        />
      </>
    </>
  );
};

export default GeneralDataSaveAgendaVentaStep;

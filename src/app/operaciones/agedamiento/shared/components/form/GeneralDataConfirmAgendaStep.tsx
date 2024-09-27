import { UseFormReturn } from 'react-hook-form';

import {
  Agendamiento,
  gridSizeMdLg6,
  PARENTESCO_TYPE_ARRAY_CHOICES,
} from '@/shared';
import {
  CustomCellphoneTextField,
  CustomTextField,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SelectTextFieldArrayString,
} from '@/shared/components';
import type { SaveConfirmAgendaOperaciones } from '../SaveConfirmAgendaOperaciones';
import UbicacionPartAgendaOpe from './UbicacionPartAgendaOpe';

export type GeneralDataConfirmAgendaStepProps = {
  form: UseFormReturn<SaveConfirmAgendaOperaciones>;
  agendamiento: Agendamiento;
};

const GeneralDataConfirmAgendaStep: React.FC<
  GeneralDataConfirmAgendaStepProps
> = ({ form, agendamiento }) => {
  ///* form ---------------------
  const { errors } = form.formState;

  return (
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

      {/* =================== Persona Referencia =================== */}
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

      {/* =================== Ubicación =================== */}
      <>
        <UbicacionPartAgendaOpe
          form={form}
          initialCoords={
            agendamiento?.solicitud_servicio_data?.coordenadas || ''
          }
          isEdit={true}
        />
      </>

      {/* =================== Datos Vendedor =================== */}
      <>
        <CustomTypoLabel
          text="Datos Vendedor"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <CustomTextFieldNoForm
          label="Vendedor"
          value={agendamiento?.vendedor_data?.razon_social || 'N/A'}
          disabled
        />

        <CustomTextFieldNoForm
          label="Vendedor"
          value={agendamiento?.vendedor_data?.canal_venta_data?.name || 'N/A'}
          disabled
        />
      </>
    </>
  );
};

export default GeneralDataConfirmAgendaStep;

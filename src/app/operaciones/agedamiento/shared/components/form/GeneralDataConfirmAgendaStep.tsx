import { UseFormReturn } from 'react-hook-form';

import {
  Agendamiento,
  ESTADO_LLAMADA_ARRAY_CHOICES,
  gridSizeMdLg6,
  PARENTESCO_TYPE_ARRAY_CHOICES,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomAutocompleteArrString,
  CustomCellphoneTextField,
  CustomTabPanel,
  CustomTextArea,
  CustomTextField,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FormTabsOnly,
  NestedTabsScene,
  SelectTextFieldArrayString,
} from '@/shared/components';
import { Tab } from '@mui/material';
import type { SaveConfirmAgendaOperaciones } from '../SaveConfirmAgendaOperaciones';
import LocationZonePolygonFormPart from './LocationZonePolygonFormPart';

export type GeneralDataConfirmAgendaStepProps = {
  form: UseFormReturn<SaveConfirmAgendaOperaciones>;
  agendamiento: Agendamiento;
};

const GeneralDataConfirmAgendaStep: React.FC<
  GeneralDataConfirmAgendaStepProps
> = ({ form, agendamiento }) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

  ///* form ---------------------
  const { errors } = form.formState;

  return (
    <>
      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Datos Cliente" value={1} {...a11yProps(1)} />
            <Tab label="Ubicadión Cliente" value={2} {...a11yProps(2)} />
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 0,
        }}
      >
        <CustomTabPanel value={tabValue} index={1} ptGrid="0">
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
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2} ptGrid="0">
          {/* =================== Ubicación =================== */}
          <LocationZonePolygonFormPart
            form={form}
            initialCoords={
              agendamiento?.solicitud_servicio_data?.coordenadas || ''
            }
            isEdit={true}
          />
        </CustomTabPanel>
      </NestedTabsScene>

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

      {/* =================== Estado Llamada =================== */}
      <>
        <CustomTypoLabel
          text="Estado Llamada"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <CustomCellphoneTextField
          label="Celular"
          name="celular"
          control={form.control}
          defaultValue={form.getValues().celular}
          error={errors.celular}
          helperText={errors.celular?.message}
          size={gridSizeMdLg6}
        />
        <CustomAutocompleteArrString
          label="Estado Llamada"
          name="estado_llamada"
          options={ESTADO_LLAMADA_ARRAY_CHOICES}
          isLoadingData={false}
          control={form.control}
          defaultValue={form.getValues().estado_llamada}
          error={errors.estado_llamada}
          helperText={errors.estado_llamada?.message}
          size={gridSizeMdLg6}
          onChangeValue={() => {
            // reset related fields
            form.setValue('plan_internet', '' as any);
          }}
        />
        <CustomTextArea
          label="Observación Llamada"
          name="observacion_llamada"
          control={form.control}
          defaultValue={form.getValues().observacion_llamada}
          error={errors.observacion_llamada}
          helperText={errors.observacion_llamada?.message}
        />
      </>
    </>
  );
};

export default GeneralDataConfirmAgendaStep;

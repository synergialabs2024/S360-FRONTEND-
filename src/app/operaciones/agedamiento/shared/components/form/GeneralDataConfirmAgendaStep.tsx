import { Tab } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import {
  Agendamiento,
  ESTADO_LLAMADA_ARRAY_CHOICES,
  gridSizeMdLg3,
  gridSizeMdLg6,
  Nap,
  PARENTESCO_TYPE_ARRAY_CHOICES,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomAutocomplete,
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
import { useMapStore } from '@/store/app';
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

  ///* global state ---------------------
  const napsByCoords = useMapStore(s => s.napsByCoords);
  const isLoadingNaps = useMapStore(s => s.isLoadingNaps);

  ///* form ---------------------
  const { errors } = form.formState;

  return (
    <>
      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Datos Cliente" value={1} {...a11yProps(1)} />
            <Tab label="Ubicadión cliente y NAP" value={2} {...a11yProps(2)} />
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
            ptLabel="0px"
            showSectionTitle={false}
            onChangeCoordsInput={coords => {
              form.reset({
                ...form.getValues(),
                coordenadas: coords,
                nap: '' as any,
                distancia_nap: '' as any,
                puerto_nap: '' as any,
              });
            }}
          />

          {/* ---------- NAP ---------- */}
          <>
            <CustomAutocomplete<Nap>
              label="NAP"
              name="nap"
              // options
              options={napsByCoords || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().nap}
              isLoadingData={isLoadingNaps}
              // vaidation
              control={form.control}
              error={errors.nap}
              helperText={errors.nap?.message}
              size={gridSizeMdLg6}
              onChangeRawValue={nap => {
                if (!nap) {
                  form.setValue('distancia_nap', '' as any);
                  form.setValue('puerto_nap', '' as any);
                  return;
                }
                form.setValue('distancia_nap', nap?.distance as any);
                form.setValue('puerto_nap', '' as any);
              }}
            />
            <CustomTextField
              label="Distancia NAP"
              name="distancia_nap"
              control={form.control}
              defaultValue={form.getValues().distancia_nap}
              error={errors.distancia_nap}
              helperText={errors.distancia_nap?.message}
              size={gridSizeMdLg3}
              disabled
              endAdornmentInput="m"
            />
            <CustomTextField
              label="Puerto designado"
              name="puerto_nap"
              control={form.control}
              defaultValue={(form.getValues().puerto_nap as any) || ''}
              error={errors.puerto_nap}
              helperText={errors.puerto_nap?.message}
              size={gridSizeMdLg3}
              disabled
            />
          </>
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

import { Tab } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  gridSizeMdLg6,
  LineaServicio,
  PARENTESCO_TYPE_ARRAY_CHOICES,
  Preventa,
  SolicitudServicio,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomCellphoneTextField,
  CustomNumberTextField,
  CustomTabPanel,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FormTabsOnly,
  NestedTabsScene,
  SelectTextFieldArrayString,
} from '@/shared/components';
import { useEffect } from 'react';

export type FibraClientInfoPartProps = {
  serviceLine: LineaServicio;
};

type FormData = Partial<SolicitudServicio> & Partial<Preventa>;

const FibraClientInfoPart: React.FC<FibraClientInfoPartProps> = ({
  serviceLine,
}) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

  ///* form ---------------------
  const form = useForm<FormData>();
  const {
    formState: { errors },
  } = form;

  ///* effects ---------------------
  useEffect(() => {
    if (!serviceLine) return;
    const { solicitud_servicio_data, preventa_data, ...rest } = serviceLine;
    console.log('serviceLine', rest);

    form.reset({
      ...solicitud_servicio_data,
      ...preventa_data,
    });
  }, [form, serviceLine]);

  return (
    <>
      <CustomTypoLabel
        text="Datos del cliente"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Cliente" value={1} {...a11yProps(1)} />
            <Tab label="Ubicadión cliente y NAP" value={2} {...a11yProps(2)} />
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 4,
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
            label="Nombre"
            name="razon_social"
            control={form.control}
            defaultValue={form.getValues().razon_social}
            error={errors.razon_social}
            helperText={errors.razon_social?.message}
            disabled
          />
          <CustomTextField
            label="Fecha nacimiento"
            name="fecha_nacimiento"
            control={form.control}
            defaultValue={form.getValues().fecha_nacimiento}
            error={errors.fecha_nacimiento}
            helperText={errors.fecha_nacimiento?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomNumberTextField
            label="Edad"
            name="edad"
            control={form.control}
            defaultValue={form.getValues().edad}
            error={errors.edad}
            helperText={errors.edad?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Email"
            name="email"
            type="email"
            control={form.control}
            defaultValue={form.getValues().email}
            error={errors.email}
            helperText={errors.email?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomCellphoneTextField
            label="Celular"
            name="celular"
            control={form.control}
            defaultValue={form.getValues().celular}
            error={errors.celular}
            helperText={errors.celular?.message}
            disabled
            size={gridSizeMdLg6}
          />

          {/* =================== Persona Referencia =================== */}
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
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default FibraClientInfoPart;

import { Tab } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { IoMdClock } from 'react-icons/io';
import { MdCall, MdDateRange } from 'react-icons/md';

import { gridSize, OrdenTrabajo, useTabsOnly } from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import { SingleImageModal } from '@/shared/components/ui';
import type { InstallAsignOTSaveFormData } from '../SaveOrdenTrabajo/SaveOrdenTrabajo';

export type InstallAsigTecnicoOTFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
  ordenTrabajo: OrdenTrabajo;
};

const InstallAsigTecnicoOTFormTab: React.FC<
  InstallAsigTecnicoOTFormTabProps
> = ({ ordenTrabajo }) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <>
      <CustomTypoLabel text="Datos de instalación" />

      <CustomTextFieldNoForm
        label="Flota"
        value={ordenTrabajo?.flota_data?.name}
        disabled
      />
      <CustomTextFieldNoForm
        label="Tipo de orden trabajo"
        value={ordenTrabajo?.tipo_orden_trabajo}
        disabled
      />
      <CustomTextFieldNoForm
        label="Fecha de instalación"
        value={ordenTrabajo?.agendamiento_data?.fecha_instalacion}
        disabled
        startAdornment={<MdDateRange />}
      />
      <CustomTextFieldNoForm
        label="Hora de instalación"
        value={ordenTrabajo?.agendamiento_data?.hora_instalacion}
        disabled
        startAdornment={<IoMdClock />}
      />

      <>
        <NestedTabsScene
          tabs={
            <FormTabsOnly value={tabValue} onChange={handleTabChange}>
              <Tab label="Servicio" value={1} {...a11yProps(1)} />
              <Tab label="Datos Cliente" value={2} {...a11yProps(2)} />
              <Tab label="Estado Llamada" value={3} {...a11yProps(3)} />
            </FormTabsOnly>
          }
          sxContainer={{
            pt: 0,
            pb: 0,
            mt: 1,
          }}
        >
          {/* ------------- Servicio ------------- */}
          <CustomTabPanel value={tabValue} index={1} ptGrid="0">
            <CustomTextFieldNoForm
              label="Tipo de servicio"
              value={ordenTrabajo?.preventa_data?.tipo_servicio}
              disabled
            />
            <CustomTextFieldNoForm
              label="Tipo de plan"
              value={ordenTrabajo?.preventa_data?.tipo_plan}
              disabled
            />
            <CustomTextFieldNoForm
              label="Tipo de plan"
              value={
                ordenTrabajo?.linea_servicio_data?.contrato_data
                  ?.plan_internet_ingreso_data?.name
              }
              disabled
              size={gridSize}
            />

            <>
              <CustomTypoLabel
                text="Vivienda del cliente"
                pt={CustomTypoLabelEnum.ptMiddlePosition}
              />

              <SingleImageModal
                image={{
                  id: 1,
                  imgUrl: ordenTrabajo?.preventa_data?.url_foto_vivienda!,
                  title: 'Foto de la vivienda',
                }}
                widthPercentage="70%"
              />
            </>
          </CustomTabPanel>

          {/* ------------- Datos Cliente ------------- */}
          <CustomTabPanel value={tabValue} index={2} ptGrid="0">
            <CustomTextFieldNoForm
              label="Nombre cliente"
              value={ordenTrabajo?.solicitud_servicio_data?.razon_social}
              disabled
              size={gridSize}
            />
            <CustomTextFieldNoForm
              label="Tipo identificación"
              value={ordenTrabajo?.solicitud_servicio_data?.tipo_identificacion}
              disabled
            />
            <CustomTextFieldNoForm
              label="Identificación"
              value={ordenTrabajo?.solicitud_servicio_data?.identificacion}
              disabled
            />
            <CustomTextFieldNoForm
              label="Celular"
              value={ordenTrabajo?.solicitud_servicio_data?.celular}
              disabled
              startAdornment={<MdCall />}
              size={gridSize}
            />

            <CustomTextFieldNoForm
              label="Nombre Persona Referencia"
              value={ordenTrabajo?.preventa_data?.nombre_persona_referencia}
              disabled
              size={gridSize}
            />
            <CustomTextFieldNoForm
              label="Parentesco Referencia"
              value={ordenTrabajo?.preventa_data?.parentesco_referencia}
              disabled
            />
            <CustomTextFieldNoForm
              label="Teléfono Referencia"
              value={ordenTrabajo?.preventa_data?.celular_adicional}
              disabled
              startAdornment={<MdCall />}
            />
          </CustomTabPanel>

          {/* ------------- Estado Llamada ------------- */}
          <CustomTabPanel value={tabValue} index={3} ptGrid="0">
            <CustomTextFieldNoForm
              label="Celular"
              value={ordenTrabajo?.solicitud_servicio_data?.celular}
              disabled
              startAdornment={<MdCall />}
            />
            <CustomTextFieldNoForm
              label="Estado llamada"
              value={ordenTrabajo?.agendamiento_data?.estado_llamada}
              disabled
            />
            <CustomTextAreaNoForm
              label="Observación llamada"
              value={ordenTrabajo?.agendamiento_data?.observacion_llamada}
              disabled
              size={gridSize}
            />
          </CustomTabPanel>
        </NestedTabsScene>
      </>

      <>
        <CustomTypoLabel
          text="Hora de instalación"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <CustomTextFieldNoForm
          label="Hora de inicio"
          value={ordenTrabajo?.hora_inicio}
          disabled
          startAdornment={<IoMdClock />}
        />
        <CustomTextFieldNoForm
          label="Hora de fin"
          value={ordenTrabajo?.hora_fin}
          disabled
          startAdornment={<IoMdClock />}
        />
      </>
    </>
  );
};

export default InstallAsigTecnicoOTFormTab;

import { Tab } from '@mui/material';
import { IoMdClock } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';

import {
  DatosClienteTecnicoOTPart,
  DatosPlanBasicoTecnicoPart,
} from '@/app/tecnico/install-asignada/shared/components/form';
import { formatDateWithTime, LineaServicio, useTabsOnly } from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import { SingleImageModal } from '@/shared/components/ui';

export type InstallAsigTecnicoOTClienteFibraPartProps = {
  serviceLine: LineaServicio;
};

const InstallAsigTecnicoOTClienteFibraPart: React.FC<
  InstallAsigTecnicoOTClienteFibraPartProps
> = ({ serviceLine }) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

  const ordenTrabajo = serviceLine?.orden_trabajo_data;

  return (
    <>
      <>
        <CustomTypoLabel text="Datos de instalación" />

        <CustomTextFieldNoForm
          label="Flota"
          value={serviceLine?.flota_data?.name}
          disabled
        />
        <CustomTextFieldNoForm
          label="Tipo de orden trabajo"
          value={ordenTrabajo?.tipo_orden_trabajo}
          disabled
        />
        <CustomTextFieldNoForm
          label="Fecha de instalación"
          value={serviceLine?.agendamiento_data?.fecha_instalacion}
          disabled
          startAdornment={<MdDateRange />}
        />
        <CustomTextFieldNoForm
          label="Hora de instalación"
          value={serviceLine?.agendamiento_data?.hora_instalacion}
          disabled
          startAdornment={<IoMdClock />}
        />
      </>

      <>
        <NestedTabsScene
          tabs={
            <FormTabsOnly value={tabValue} onChange={handleTabChange}>
              <Tab label="Servicio" value={1} {...a11yProps(1)} />
              <Tab label="Datos Cliente" value={2} {...a11yProps(2)} />
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
            <DatosPlanBasicoTecnicoPart
              ordenTrabajo={
                {
                  ...ordenTrabajo,
                  linea_servicio_data: serviceLine,
                  preventa_data: serviceLine?.preventa_data,
                } as any
              }
            />

            <>
              <CustomTypoLabel
                text="Vivienda del cliente"
                pt={CustomTypoLabelEnum.ptMiddlePosition}
              />

              <SingleImageModal
                image={{
                  id: 1,
                  imgUrl: serviceLine?.preventa_data?.url_foto_vivienda!,
                  title: 'Foto de la vivienda',
                }}
                widthPercentage="70%"
              />
            </>
          </CustomTabPanel>

          {/* ------------- Datos Cliente ------------- */}
          <CustomTabPanel value={tabValue} index={2} ptGrid="0">
            <DatosClienteTecnicoOTPart
              ordenTrabajo={
                {
                  ...ordenTrabajo,
                  linea_servicio_data: serviceLine,
                  solicitud_servicio_data: serviceLine?.solicitud_servicio_data,
                  preventa_data: serviceLine?.preventa_data,
                } as any
              }
            />
          </CustomTabPanel>
        </NestedTabsScene>

        <>
          <CustomTypoLabel
            text="Hora de instalación"
            pt={CustomTypoLabelEnum.ptMiddlePosition}
          />
          <CustomTextFieldNoForm
            label="Hora de inicio"
            value={
              ordenTrabajo?.hora_inicio_real
                ? formatDateWithTime(ordenTrabajo.hora_inicio_real)
                : ''
            }
            disabled
            startAdornment={<IoMdClock />}
          />
          <CustomTextFieldNoForm
            label="Hora de fin"
            value={
              ordenTrabajo?.hora_fin
                ? formatDateWithTime(ordenTrabajo.hora_fin)
                : ''
            }
            disabled
            startAdornment={<IoMdClock />}
            sxTextField={{ mb: 4 }}
          />
        </>
      </>
    </>
  );
};

export default InstallAsigTecnicoOTClienteFibraPart;

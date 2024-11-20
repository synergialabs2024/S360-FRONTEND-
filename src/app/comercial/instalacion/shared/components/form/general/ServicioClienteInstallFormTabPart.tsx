import { Tab } from '@mui/material';

import { OrdenTrabajo, useTabsOnly } from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import { SingleImageModal } from '@/shared/components/ui';
import DatosClienteTecnicoOTPart from './DatosClienteTecnicoOTPart';
import DatosPlanBasicoTecnicoPart from './DatosPlanBasicoTecnicoPart';

export type ServicioClienteInstallFormTabPartProps = {
  showHomeImage?: boolean;
  ordenTrabajo: OrdenTrabajo;
};

const ServicioClienteInstallFormTabPart: React.FC<
  ServicioClienteInstallFormTabPartProps
> = ({ showHomeImage = true, ordenTrabajo }) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <>
      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Servicio" value={1} {...a11yProps(1)} />
            <Tab label="Datos Cliente" value={2} {...a11yProps(2)} />
            {/* <Tab label="Estado Llamada" value={3} {...a11yProps(3)} /> */}
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 0,
          mt: 0,
        }}
      >
        {/* ------------- Servicio ------------- */}
        <CustomTabPanel value={tabValue} index={1} ptGrid="0">
          <DatosPlanBasicoTecnicoPart ordenTrabajo={ordenTrabajo} />

          <>
            {showHomeImage && (
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
            )}
          </>
        </CustomTabPanel>

        {/* ------------- Datos Cliente ------------- */}
        <CustomTabPanel value={tabValue} index={2} ptGrid="0">
          <DatosClienteTecnicoOTPart ordenTrabajo={ordenTrabajo} />
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default ServicioClienteInstallFormTabPart;

import { Tab } from '@mui/material';

import { DatosPlanBasicoTecnicoPart } from '@/app/tecnico/install-asignada/shared/components/form';
import { OrdenTrabajo, useTabsOnly } from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  CustomTypoLabel,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';

export type ActivacionInstallOTDetallesEquiposFormTabProps = {
  ordenTrabajo: OrdenTrabajo;
};

const ActivacionInstallOTDetallesEquiposFormTab: React.FC<
  ActivacionInstallOTDetallesEquiposFormTabProps
> = ({ ordenTrabajo }) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <>
      <CustomTypoLabel text="Datos generales de activación" />

      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Servicio" value={1} {...a11yProps(1)} />
            <Tab label="Ubicadión cliente y NAP" value={2} {...a11yProps(2)} />
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 0,
        }}
      >
        <CustomTabPanel value={tabValue} index={1} ptGrid="0">
          <DatosPlanBasicoTecnicoPart ordenTrabajo={ordenTrabajo} />
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2} ptGrid="0">
          sss
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default ActivacionInstallOTDetallesEquiposFormTab;

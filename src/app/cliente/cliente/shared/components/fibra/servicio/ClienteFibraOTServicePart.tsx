import { Tab } from '@mui/material';

import { LineaServicio, useTabsOnly } from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import InstallAsigTecnicoOTClienteFibraPart from './InstallAsigTecnicoOTClienteFibraPart';

export type ClienteFibraOTServicePartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraOTServicePart: React.FC<ClienteFibraOTServicePartProps> = ({
  serviceLine,
}) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <>
      <CustomTypoLabel
        text="Orden de trabajo"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Información general" value={1} {...a11yProps(1)} />
            <Tab label="Órden de trabajo" value={2} {...a11yProps(2)} />
            <Tab label="Materiales" value={3} {...a11yProps(3)} />
            <Tab label="Fotos" value={4} {...a11yProps(4)} />
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 0,
        }}
      >
        {/* ========================= Datos Generales ========================= */}
        <CustomTabPanel index={1} value={tabValue}>
          <InstallAsigTecnicoOTClienteFibraPart serviceLine={serviceLine} />
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default ClienteFibraOTServicePart;

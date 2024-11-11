import { Tab } from '@mui/material';

import { gridSize, gridSizeMdLg10, LineaServicio, useTabsOnly } from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import ClienteFibraTitle from './ClienteFibraTitle';
import FibraClientSummaryFormPart from './summary/FibraClientSummaryFormPart';

export type GeneralFibraClientProps = {
  serviceLine?: LineaServicio;
};

const GeneralFibraClient: React.FC<GeneralFibraClientProps> = ({
  serviceLine,
}) => {
  ///* hooks ----------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  return (
    <TabsFormBoxScene
      titlePageNode={<ClienteFibraTitle serviceLine={serviceLine!} />}
      showBtns={false}
      // tabs -------------
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="RESUMEN" value={1} {...a11yProps(1)} />
          <Tab label="SERVICIO" value={2} {...a11yProps(2)} />
          <Tab label="PLANTILLA" value={3} {...a11yProps(3)} />
          <Tab label="DOCUMENTOS" value={4} {...a11yProps(4)} />
          <Tab label="LOGS" value={5} {...a11yProps(5)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Resumen ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg10}>
        <FibraClientSummaryFormPart serviceLine={serviceLine!} />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default GeneralFibraClient;

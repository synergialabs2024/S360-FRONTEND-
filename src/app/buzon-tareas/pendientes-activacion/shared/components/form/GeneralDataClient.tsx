import { Tab } from '@mui/material';
import { useEffect } from 'react';

import {
  gridSize,
  gridSizeMdLg10,
  LineaServicio,
  useTabOnlyNuqs,
} from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import { useRubroStore } from '@/store/app/rubros';
import { ClienteFibraTitle } from '@/app/cliente/cliente/shared/components';
import ClientDataFormPart from '../client-data/ClientDataFormPart';

export type GeneralFibraClientProps = {
  serviceLine?: LineaServicio;
};

const GeneralDataClient: React.FC<GeneralFibraClientProps> = ({
  serviceLine,
}) => {
  ///* hooks ----------------
  const { tabValue, handleTabChange } = useTabOnlyNuqs();

  ///* global state ----------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAllMinusSL);

  ///* effects ----------------
  useEffect(() => {
    return () => {
      clearAllRubroStore();
    };
  }, [clearAllRubroStore]);

  return (
    <TabsFormBoxScene
      titlePageNode={<ClienteFibraTitle serviceLine={serviceLine!} />}
      showBtns={false}
      // tabs -------------
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="RESUMEN" value={1} {...a11yProps(1)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Resumen ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg10}>
        <ClientDataFormPart serviceLine={serviceLine!} />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default GeneralDataClient;

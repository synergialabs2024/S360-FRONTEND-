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
import ClienteFibraTitle from './ClienteFibraTitle';
import { ConfigPlantillaClienteFibraPart } from './plantilla';
import { ClienteFibrRubrosTab } from './rubros';
import { ServiceFibraClientPart } from './servicio';
import FibraClientSummaryFormPart from './summary/FibraClientSummaryFormPart';

export type GeneralFibraClientProps = {
  serviceLine?: LineaServicio;
};

const GeneralFibraClient: React.FC<GeneralFibraClientProps> = ({
  serviceLine,
}) => {
  ///* hooks ----------------
  const { tabValue, handleTabChange } = useTabOnlyNuqs();

  ///* global state ----------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAll);

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
          <Tab label="SERVICIO" value={2} {...a11yProps(2)} />
          <Tab label="PLANTILLA" value={3} {...a11yProps(3)} />
          <Tab label="DOCUMENTOS" value={4} {...a11yProps(4)} />
          <Tab label="RUBROS" value={5} {...a11yProps(5)} />
          <Tab label="LOGS" value={6} {...a11yProps(6)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Resumen ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg10}>
        <FibraClientSummaryFormPart serviceLine={serviceLine!} />
      </CustomTabPanel>

      {/* ========================= Servicio ========================= */}
      <CustomTabPanel index={2} value={tabValue}>
        <ServiceFibraClientPart serviceLine={serviceLine!} />
      </CustomTabPanel>

      {/* ========================= Plantilla ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <ConfigPlantillaClienteFibraPart serviceLine={serviceLine!} />
      </CustomTabPanel>

      {/* ========================= Documentos ========================= */}
      <CustomTabPanel index={4} value={tabValue}>
        Documentos
      </CustomTabPanel>

      {/* ========================= Rubros ========================= */}
      <CustomTabPanel index={5} value={tabValue}>
        <ClienteFibrRubrosTab serviceLine={serviceLine} />
      </CustomTabPanel>

      {/* ========================= Logs ========================= */}
      <CustomTabPanel index={6} value={tabValue}>
        Logs
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default GeneralFibraClient;

import { Tab } from '@mui/material';
import { useEffect } from 'react';

import { useFetchCalendarioFacturaciones } from '@/actions/app';
import {
  gridSize,
  gridSizeMdLg10,
  LineaServicio,
  ToastWrapper,
  useLoaders,
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
  const setCalendariosFacturacion = useRubroStore(
    s => s.setCalendariosFacturacion,
  );

  ///* fetch data ----------------
  const {
    data: calendarioFacturacionesPagingRes,
    isLoading: isCalendarioFacturacionesLoading,
    isRefetching: isCalendarioFacturacionesRefetching,
  } = useFetchCalendarioFacturaciones({
    enabled: !!serviceLine?.id,
    params: {
      page_size: 1002,
    },
  });

  const isCustomLoading =
    isCalendarioFacturacionesLoading || isCalendarioFacturacionesRefetching;
  useLoaders(isCustomLoading);

  ///* effects ----------------
  useEffect(() => {
    if (!serviceLine || isCustomLoading) return;

    // alert no calendarios
    if (calendarioFacturacionesPagingRes?.data?.meta.count === 0) {
      ToastWrapper.error('No se encontraron calendarios de facturación.');
    }
    // set calendarios
    setCalendariosFacturacion(
      calendarioFacturacionesPagingRes?.data?.items || [],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceLine, isCustomLoading, calendarioFacturacionesPagingRes]);

  useEffect(() => {
    return () => {
      clearAllRubroStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCustomLoading || !serviceLine) return null;

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

import { Tab } from '@mui/material';
import { useEffect } from 'react';

import { LineaServicio, useTabsOnly } from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import { useRubroStore } from '@/store/app/rubros';
import GenericHistoricoTicketsTab from './tabs/GenericHistoricoTicketsTab';

export type ClienteHistoricoTicketsTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteHistoricoTicketsTab: React.FC<ClienteHistoricoTicketsTabProps> = ({
  serviceLine,
}) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* global state --------------------------
  const setActiveServiceLine = useRubroStore(s => s.setActiveServiceLine); // to edit
  const clearAllRubroStore = useRubroStore(s => s.clearAll);

  ///* effects -------------------------
  useEffect(() => {
    if (!serviceLine) return;
    setActiveServiceLine(serviceLine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceLine]);
  // clear store
  useEffect(() => {
    return () => {
      clearAllRubroStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Tickets en Espera" value={1} {...a11yProps(1)} />
            <Tab label="Tickets Gestionados" value={2} {...a11yProps(2)} />
            <Tab label="Tickets por Reasignar" value={3} {...a11yProps(3)} />
            <Tab label="Tickets Cerrados" value={4} {...a11yProps(4)} />
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 0,
          m: 0,
        }}
      >
        {/* ========================= Tickets en Espera ========================= */}
        <CustomTabPanel index={1} value={tabValue}>
          <GenericHistoricoTicketsTab
            cedula={serviceLine?.cliente_data?.identificacion!}
          />
        </CustomTabPanel>

        {/* ========================= Tickets Gestionados ========================= */}
        <CustomTabPanel index={2} value={tabValue}>
          <GenericHistoricoTicketsTab
            cedula={serviceLine?.cliente_data?.identificacion!}
          />
        </CustomTabPanel>

        {/* ========================= Tickets por Reasignar ========================= */}
        <CustomTabPanel index={3} value={tabValue}>
          <GenericHistoricoTicketsTab
            cedula={serviceLine?.cliente_data?.identificacion!}
          />
        </CustomTabPanel>

        {/* ========================= Tickets Cerrados ========================= */}
        <CustomTabPanel index={4} value={tabValue}>
          <GenericHistoricoTicketsTab
            cedula={serviceLine?.cliente_data?.identificacion!}
          />
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default ClienteHistoricoTicketsTab;

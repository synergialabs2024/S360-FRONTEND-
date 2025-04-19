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
import { ClienteFibraRubroTab } from './tabs/rurbos';
import { ClienteFibraSaldosTab } from './tabs/saldos';
import { ClienteFibraTransaccionesTab } from './tabs/transacciones';

export type ClienteFibrRubrosTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrRubrosTab: React.FC<ClienteFibrRubrosTabProps> = ({
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
            <Tab label="Rubros" value={1} {...a11yProps(1)} />
            <Tab label="Transacciones" value={2} {...a11yProps(2)} />
            <Tab label="Saldos" value={3} {...a11yProps(3)} />
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 0,
          m: 0,
        }}
      >
        {/* ========================= rubros ========================= */}
        <CustomTabPanel index={1} value={tabValue}>
          <ClienteFibraRubroTab serviceLine={serviceLine} />
        </CustomTabPanel>

        {/* ========================= transacciones ========================= */}
        <CustomTabPanel index={2} value={tabValue}>
          <ClienteFibraTransaccionesTab serviceLine={serviceLine} />
        </CustomTabPanel>

        {/* ========================= saldos ========================= */}
        <CustomTabPanel index={3} value={tabValue}>
          <ClienteFibraSaldosTab serviceLine={serviceLine} />
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default ClienteFibrRubrosTab;

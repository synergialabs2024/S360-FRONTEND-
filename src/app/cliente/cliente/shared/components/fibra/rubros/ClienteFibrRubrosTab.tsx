import { Tab } from '@mui/material';

import { LineaServicio, useTabsOnly } from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import { ClienteFibraRubroTab } from './tabs/rurbos';

export type ClienteFibrRubrosTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrRubrosTab: React.FC<ClienteFibrRubrosTabProps> = ({
  serviceLine,
}) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

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
          TRANSACCIONES
        </CustomTabPanel>

        {/* ========================= saldos ========================= */}
        <CustomTabPanel index={3} value={tabValue}>
          SALDOS
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default ClienteFibrRubrosTab;

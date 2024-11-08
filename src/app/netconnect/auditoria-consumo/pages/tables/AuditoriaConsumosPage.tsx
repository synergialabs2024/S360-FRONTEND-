import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import { useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';

export const returnUrlAuditoriaConsumoPage =
  ROUTER_PATHS.netconnect.auditoriaConsumosNav;

export type AuditoriaConsumoMainPageProps = {};

const AuditoriaConsumoMainPage: React.FC<
  AuditoriaConsumoMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Auditoria de Consumos"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab
          label={'CLIENTES SUSPENDIDOS CON CONSUMO'}
          value={1}
          {...a11yProps(1)}
        />
        <Tab
          label={'CLIENTES ACTIVOS ALTO CONSUMO'}
          value={2}
          {...a11yProps(2)}
        />
        <Tab label={'CLIENTES ACTIVOS EN MOROSO'} value={3} {...a11yProps(3)} />
        <Tab
          label={'CLIENTES SUSPENDIDOS CON CONSUMO EN MK'}
          value={4}
          {...a11yProps(4)}
        />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        1
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        2
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        3
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        4
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default AuditoriaConsumoMainPage;

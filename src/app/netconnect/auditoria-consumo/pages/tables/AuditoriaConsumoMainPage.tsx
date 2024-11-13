import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import { AuditoriaConsumoEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import AuditoriaConsumosByStatePage from './AuditoriaConsumosByStatePage';

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
        <AuditoriaConsumosByStatePage
          state={AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <AuditoriaConsumosByStatePage
          state={AuditoriaConsumoEnumChoice.ACTIVOS_ALTO_CONSUMO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <AuditoriaConsumosByStatePage
          state={AuditoriaConsumoEnumChoice.ACTIVOS_MOROSO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <AuditoriaConsumosByStatePage
          state={AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO_MK}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default AuditoriaConsumoMainPage;

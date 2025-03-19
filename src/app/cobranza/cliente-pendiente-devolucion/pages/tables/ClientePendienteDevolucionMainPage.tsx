import { Tab } from '@mui/material';

import {
  a11yProps,
  CustomTabPanel,
  BoxFormTabsOnly,
  SingleTableBoxScene,
} from '@/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import { EstadoDevolucionEnumChoice, useTabsOnly } from '@/shared';
import ClientePendienteDevolucionStatePage from './ClientePendienteDevolucionStatePage';

export const returnUrlClientePendienteDevolucionPage =
  ROUTER_PATHS.cobranza.clientependientedevolucionNav;

export type ClientePendienteDevolucionMainPageProps = {};

const ClientePendienteDevolucionMainPage: React.FC<
  ClientePendienteDevolucionMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Cliente Pendiente de Devolucion"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'PENDIENTE'} value={1} {...a11yProps(1)} />
        <Tab label={'FINALIZADO'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADO'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <ClientePendienteDevolucionStatePage
          state={EstadoDevolucionEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <ClientePendienteDevolucionStatePage
          state={EstadoDevolucionEnumChoice.FINALIZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <ClientePendienteDevolucionStatePage
          state={EstadoDevolucionEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default ClientePendienteDevolucionMainPage;

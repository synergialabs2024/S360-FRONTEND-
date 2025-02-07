import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import { InventarioEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import RecepcionSolicitudTransferenciaMaterialStatePage from './RecepcionSolicitudTransferenciaMaterialStatePage';

export const returnUrlRecepcionSolicitudTransferenciaMaterialesPage =
  ROUTER_PATHS.inventario.recepcionSolicitudTransferenciaMaterialesNav;

export type SolicitudTransferenciaMaterialMainPageProps = {};

const SolicitudTransferenciaMaterialMainPage: React.FC<
  SolicitudTransferenciaMaterialMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Aprobación de Solicitud Transferencia Material"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'PENDIENTES'} value={1} {...a11yProps(1)} />
        <Tab label={'APROBADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
        <Tab label={'CANCELADO'} value={4} {...a11yProps(4)} />
        <Tab label={'FINALIZADAS'} value={5} {...a11yProps(5)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <RecepcionSolicitudTransferenciaMaterialStatePage
          state={InventarioEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <RecepcionSolicitudTransferenciaMaterialStatePage
          state={InventarioEnumChoice.APROBADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <RecepcionSolicitudTransferenciaMaterialStatePage
          state={InventarioEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <RecepcionSolicitudTransferenciaMaterialStatePage
          state={InventarioEnumChoice.CANCELADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <RecepcionSolicitudTransferenciaMaterialStatePage
          state={InventarioEnumChoice.FINALIZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudTransferenciaMaterialMainPage;

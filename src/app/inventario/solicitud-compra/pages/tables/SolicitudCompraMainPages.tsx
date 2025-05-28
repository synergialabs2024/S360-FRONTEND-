import { Tab } from '@mui/material';

import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import { InventarioEnumChoice, useTabsOnly } from '@/shared';
import SolicitudCompraStatePage from './SolicitudCompraStatePages';

export const returnUrlSolicitudCompraPage =
  ROUTER_PATHS.inventario.solicitudCompraNav;

export type SolicitudCompraMainPageProps = {};

const SolicitudCompraMainPage: React.FC<SolicitudCompraMainPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Solicitud Compra"
      createPageUrl={`${returnUrlSolicitudCompraPage}/crear`}
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
        <Tab label={'FINALIZADAS'} value={5} {...a11yProps(4)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <SolicitudCompraStatePage state={InventarioEnumChoice.PENDIENTE} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <SolicitudCompraStatePage state={InventarioEnumChoice.APROBADO} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <SolicitudCompraStatePage state={InventarioEnumChoice.RECHAZADO} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <SolicitudCompraStatePage state={InventarioEnumChoice.CANCELADO} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <SolicitudCompraStatePage state={InventarioEnumChoice.FINALIZADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudCompraMainPage;

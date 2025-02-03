import { ROUTER_PATHS } from '@/router/constants';
import { InventarioEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import SolicitudDevolucionStatePage from './SolicitudDevolucionStatePages';

export const returnUrlSolicitudDevolucionPage =
  ROUTER_PATHS.inventario.solicitudDevolucionNav;

export type SolicitudDevolucionMainPageProps = {};

const SolicitudDevolucionMainPage: React.FC<
  SolicitudDevolucionMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Solicitud Devolucion"
      createPageUrl={`${returnUrlSolicitudDevolucionPage}/crear`}
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
        <Tab label={'CANECLADO'} value={4} {...a11yProps(4)} />
        <Tab label={'FINALIZADAS'} value={5} {...a11yProps(4)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <SolicitudDevolucionStatePage state={InventarioEnumChoice.PENDIENTE} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <SolicitudDevolucionStatePage state={InventarioEnumChoice.APROBADO} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <SolicitudDevolucionStatePage state={InventarioEnumChoice.RECHAZADO} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <SolicitudDevolucionStatePage state={InventarioEnumChoice.CANCELADO} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <SolicitudDevolucionStatePage state={InventarioEnumChoice.FINALIZADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudDevolucionMainPage;

import { Tab } from '@mui/material';

import {
  a11yProps,
  CustomTabPanel,
  BoxFormTabsOnly,
  SingleTableBoxScene,
} from '@/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import { InventarioEnumChoice, useTabsOnly } from '@/shared';
import RecepSolCompraStatePage from './RecepSolCompraStatePage';

export const returnUrlRecepSolCompraPage =
  ROUTER_PATHS.inventario.recepcionSolicitudCompraNav;

export type SolicitudCompraMaterialMainPageProps = {};

const SolicitudCompraMaterialMainPage: React.FC<
  SolicitudCompraMaterialMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Recepción de Solicitud Compra Material"
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
        <RecepSolCompraStatePage state={InventarioEnumChoice.PENDIENTE} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <RecepSolCompraStatePage state={InventarioEnumChoice.APROBADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <RecepSolCompraStatePage state={InventarioEnumChoice.RECHAZADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <RecepSolCompraStatePage state={InventarioEnumChoice.CANCELADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <RecepSolCompraStatePage state={InventarioEnumChoice.FINALIZADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudCompraMaterialMainPage;

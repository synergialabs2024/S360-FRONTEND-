import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
import { EstadoSolicitudMaterialEnumChoice } from '@/shared/constants/app';
import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';
import PreventaByStatePage from './SolicitudMaterialByStatePage';
import SolicitudMaterialEsperaPage from './SolicitudMaterialEsperaPage';
import SolicitudMaterialByStatePage from './SolicitudMaterialByStatePage';

export const returnUrlSolicitudMaterialPage =
  ROUTER_PATHS.inventario.solicitudMaterialNav;

export type PreventasMainPageProps = {};

const SolicitudMaterialMainPage: React.FC<PreventasMainPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Solicitud Material"
      createPageUrl={`${returnUrlSolicitudMaterialPage}/crear`}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'PENDIENTES'} value={1} {...a11yProps(1)} />
        <Tab label={'APROBADAS'} value={6} {...a11yProps(6)} />
        <Tab label={'RECHAZADAS'} value={7} {...a11yProps(7)} />
        <Tab label={'FINALIZADAS'} value={2} {...a11yProps(2)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <SolicitudMaterialEsperaPage />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={6} ptGrid="0">
        <PreventaByStatePage
          state={EstadoSolicitudMaterialEnumChoice.APROBADO}
          noAceptados
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={7} ptGrid="0">
        <SolicitudMaterialByStatePage
          state={EstadoSolicitudMaterialEnumChoice.RECHAZADO}
          pedingPayment
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <PreventaByStatePage
          state={EstadoSolicitudMaterialEnumChoice.FINALIZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudMaterialMainPage;

import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
import { RecepcionMaterialEnumChoice } from '@/shared/constants/app';
import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';
import SolicitudMaterialEsperaPage from './SolicitudMaterialEsperaPage';

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
        <Tab label={'APROBADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
        <Tab label={'FINALIZADAS'} value={4} {...a11yProps(4)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <SolicitudMaterialEsperaPage
          state={RecepcionMaterialEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <SolicitudMaterialEsperaPage
          state={RecepcionMaterialEnumChoice.APROBADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <SolicitudMaterialEsperaPage
          state={RecepcionMaterialEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <SolicitudMaterialEsperaPage
          state={RecepcionMaterialEnumChoice.FINALIZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudMaterialMainPage;

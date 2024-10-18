import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
import { GeneralModelStatesEnumChoice } from '@/shared/constants/app';
import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';
import SolicitudsDesbloqueoPreventaByStatePage from './SolicitudsDesbloqueoPreventaByStatePage';

export const returnUrlSolicitudsDesbloqueoPrevetasPage =
  ROUTER_PATHS.supervisionComercial.solicitudDesbloqueoPreventaNav;

export type SolicitudsDesbloqueoPreventasMainPageProps = {};

const SolicitudsDesbloqueoPreventasMainPage: React.FC<
  SolicitudsDesbloqueoPreventasMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Solicitudes de liberación de preventas"
      showCreateBtn={false}
      createPageUrl={`${returnUrlSolicitudsDesbloqueoPrevetasPage}/crear`}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'APROBADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <SolicitudsDesbloqueoPreventaByStatePage
          state={GeneralModelStatesEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <SolicitudsDesbloqueoPreventaByStatePage
          state={GeneralModelStatesEnumChoice.APROBADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <SolicitudsDesbloqueoPreventaByStatePage
          state={GeneralModelStatesEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudsDesbloqueoPreventasMainPage;

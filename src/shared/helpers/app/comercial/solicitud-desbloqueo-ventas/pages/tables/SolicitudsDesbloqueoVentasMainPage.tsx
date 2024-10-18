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
import SolicitudUnblockSolServicioByStatePage from './SolicitudUnblockSolServicioByStatePage';

export const returnUrlSolicitudsDesbloqueoVentasPage =
  ROUTER_PATHS.supervisionComercial.solicitudDesbloqueoVentasNav;

export type SolicitudsDesbloqueoVentasMainPageProps = {};

const SolicitudsDesbloqueoVentasMainPage: React.FC<
  SolicitudsDesbloqueoVentasMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Solicitudes de Liberación de Solicitudes de Servicio"
      showCreateBtn={false}
      createPageUrl={`${returnUrlSolicitudsDesbloqueoVentasPage}/crear`}
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
        <SolicitudUnblockSolServicioByStatePage
          state={GeneralModelStatesEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <SolicitudUnblockSolServicioByStatePage
          state={GeneralModelStatesEnumChoice.APROBADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <SolicitudUnblockSolServicioByStatePage
          state={GeneralModelStatesEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudsDesbloqueoVentasMainPage;

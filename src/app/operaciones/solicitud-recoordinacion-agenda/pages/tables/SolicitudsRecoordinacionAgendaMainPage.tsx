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
import RecoordinacionAgendaByStatePage from './RecoordinacionAgendaByStatePage';

export const returnUrlSolicitudsRecoordinacionAgendaPage =
  ROUTER_PATHS.supervisionComercial.solicitudRecoordinacionAgendaNav;

export type SolicitudsRecoordinacionAgendaMainPageProps = {};

const SolicitudsRecoordinacionAgendaMainPage: React.FC<
  SolicitudsRecoordinacionAgendaMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Solicitudes de Recoordinación de Agendamientos"
      showCreateBtn={false}
      createPageUrl={`${returnUrlSolicitudsRecoordinacionAgendaPage}/crear`}
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
        <RecoordinacionAgendaByStatePage
          state={GeneralModelStatesEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <RecoordinacionAgendaByStatePage
          state={GeneralModelStatesEnumChoice.APROBADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <RecoordinacionAgendaByStatePage
          state={GeneralModelStatesEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudsRecoordinacionAgendaMainPage;

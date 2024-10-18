import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
import { EstadoAgendamientoEnumChoice } from '@/shared/constants/app';
import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';
import AgendamientoByStatePage from './AgendamientoByStatePage';
import AgendamientoEsperaOperacionesPage from './AgendamientoEsperaOperacionesPage';

export const returnUrlAgendamientoOperacionesPage =
  ROUTER_PATHS.operaciones.agendamientosNav;

export type AgendamientosMainPageProps = {};

const AgendamientosMainPage: React.FC<AgendamientosMainPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Agendamientos"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'APROBADAS'} value={2} {...a11yProps(2)} />
        {/* <Tab label={'REALIZADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
        <Tab label={'SIN GESTION'} value={4} {...a11yProps(4)} /> */}
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <AgendamientoEsperaOperacionesPage />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <AgendamientoByStatePage
          state={EstadoAgendamientoEnumChoice.APROBADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default AgendamientosMainPage;

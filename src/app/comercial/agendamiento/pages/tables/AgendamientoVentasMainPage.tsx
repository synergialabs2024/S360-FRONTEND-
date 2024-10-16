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
import AgendamientoVentasByStatePage from './AgendamientoVentasByStatePage';

export const returnUrlAgendamientoVentasPage =
  ROUTER_PATHS.comercial.agendamientosNav;

export type AgendamientoVentasMainPageProps = {};

const AgendamientoVentasMainPage: React.FC<
  AgendamientoVentasMainPageProps
> = () => {
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
        <Tab label={'ESPERA VALIDACIÓN'} value={1} {...a11yProps(1)} />

        {/* <Tab label={'REALIZADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
        <Tab label={'SIN GESTION'} value={4} {...a11yProps(4)} /> */}
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <AgendamientoVentasByStatePage
          state={EstadoAgendamientoEnumChoice.ESPERA}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default AgendamientoVentasMainPage;

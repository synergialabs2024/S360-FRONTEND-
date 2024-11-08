import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import { EstadoAgendamientoEnumChoice } from '@/shared';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
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
        {/* <Tab label={'ESPERA VALIDACIÓN'} value={1} {...a11yProps(1)} /> */}
        <Tab label={'AGENDADOS'} value={1} {...a11yProps(1)} />

        <Tab label={'ESPERA RECOORDINACION'} value={2} {...a11yProps(2)} />
        <Tab label={'RECOORDINADOS'} value={3} {...a11yProps(3)} />

        {/* <Tab label={'REALIZADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
        <Tab label={'SIN GESTION'} value={4} {...a11yProps(4)} /> */}
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <AgendamientoVentasByStatePage
          state={EstadoAgendamientoEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <AgendamientoVentasByStatePage
          state={EstadoAgendamientoEnumChoice.ESPERA_RECOORDINACION}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <AgendamientoVentasByStatePage
          state={EstadoAgendamientoEnumChoice.RECOORDINADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default AgendamientoVentasMainPage;

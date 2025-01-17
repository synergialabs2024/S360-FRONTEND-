import { ROUTER_PATHS } from '@/router/constants';
import { EstadoTicketTecnicoEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import TicketsTecnicoByStatePage from './TicketsTecnicoByStatePage';

export const returnUrlTicketsCrear = ROUTER_PATHS.tickets.ticketsNav;

export type TicketsTecnicoPageProps = {};

const TicketsTecnicoPage: React.FC<TicketsTecnicoPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Tickets"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'REALIZADO'} value={2} {...a11yProps(2)} />
        <Tab label={'CERRADO'} value={3} {...a11yProps(3)} />
        <Tab label={'PENDIENTE RECOORDINACION'} value={4} {...a11yProps(4)} />
        <Tab
          label={'PENDIENTE CORRECCION AUDITORIA'}
          value={5}
          {...a11yProps(5)}
        />
        <Tab
          label={'ESPERA CORREGIDOS AUDITORIA'}
          value={6}
          {...a11yProps(6)}
        />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <TicketsTecnicoByStatePage
          state={EstadoTicketTecnicoEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <TicketsTecnicoByStatePage
          state={EstadoTicketTecnicoEnumChoice.REALIZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <TicketsTecnicoByStatePage
          state={EstadoTicketTecnicoEnumChoice.CERRADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <TicketsTecnicoByStatePage
          state={EstadoTicketTecnicoEnumChoice.PENDIENTE_RECOORDINACION}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <TicketsTecnicoByStatePage
          state={EstadoTicketTecnicoEnumChoice.PENDIENTE_CORRECCION_AUDITORIA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={6} ptGrid="0">
        <TicketsTecnicoByStatePage
          state={EstadoTicketTecnicoEnumChoice.ESPERA_CORREGIDOS_AUDITORIA}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default TicketsTecnicoPage;

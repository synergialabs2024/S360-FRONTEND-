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
        <Tab label={'REALIZADA'} value={2} {...a11yProps(2)} />
        <Tab label={'RECOORDINADA'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <TicketsTecnicoByStatePage
          state={EstadoTicketTecnicoEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <TicketsTecnicoByStatePage
          state={EstadoTicketTecnicoEnumChoice.REALIZADA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <TicketsTecnicoByStatePage
          state={EstadoTicketTecnicoEnumChoice.RECORDINADA}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default TicketsTecnicoPage;

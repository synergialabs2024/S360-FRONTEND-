import { ROUTER_PATHS } from '@/router/constants';
import { EstadoTicketEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import TicketsByStatePage from './TicketsByStatePage';

export const returnUrlTicketsCrear = ROUTER_PATHS.tickets.ticketsNav;

export type TicketTenicoPageProps = {};

const TicketTenicoPage: React.FC<TicketTenicoPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Tickets"
      showCreateBtn={true}
      isMainTableStates
      createPageUrl={ROUTER_PATHS.tickets.ticketsCrear}
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'EN PROCESO'} value={2} {...a11yProps(2)} />
        <Tab label={'CERRADO'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <TicketsByStatePage state={EstadoTicketEnumChoice.ESPERA} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <TicketsByStatePage state={EstadoTicketEnumChoice.EN_PROCESO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <TicketsByStatePage state={EstadoTicketEnumChoice.CERRADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default TicketTenicoPage;

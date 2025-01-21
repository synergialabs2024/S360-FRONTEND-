import { ROUTER_PATHS } from '@/router/constants';
import { EstadoTicketTecnicoEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import TicketsVisitaByStatePage from './TicketsVisitaByStatePage';

export const returnUrlTicketsCrear = ROUTER_PATHS.tickets.ticketsNav;

export type TicketsVisitaPageProps = {};

const TicketsVisitaPage: React.FC<TicketsVisitaPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Recoordinacion visita tecnica"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'PENDIENTE RECOORDINACION'} value={1} {...a11yProps(1)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <TicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.PENDIENTE_RECOORDINACION}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default TicketsVisitaPage;

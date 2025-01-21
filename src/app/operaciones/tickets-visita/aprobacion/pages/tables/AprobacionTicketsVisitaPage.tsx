import { ROUTER_PATHS } from '@/router/constants';
import { EstadoTicketTecnicoEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import AprobacionTicketsVisitaByStatePage from './AprobacionTicketsVisitaByStatePage';

export const returnUrlTicketsCrear = ROUTER_PATHS.tickets.ticketsNav;

export type AprobacionTicketsVisitaPageProps = {};

const AprobacionTicketsVisitaPage: React.FC<
  AprobacionTicketsVisitaPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Aprobacion visita tecnica"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'APROBADO'} value={2} {...a11yProps(2)} />
        <Tab
          label={'PENDIENTE CORRECCION AUDITORIA'}
          value={3}
          {...a11yProps(3)}
        />
        <Tab
          label={'ESPERA CORREGIDOS AUDITORIA'}
          value={4}
          {...a11yProps(4)}
        />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <AprobacionTicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.REALIZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <AprobacionTicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.CERRADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <AprobacionTicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.PENDIENTE_CORRECCION_AUDITORIA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <AprobacionTicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.ESPERA_CORREGIDOS_AUDITORIA}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default AprobacionTicketsVisitaPage;

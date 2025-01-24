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

export const returnUrlTicketsRecoordinacion =
  ROUTER_PATHS.operaciones.ticketsVisitaNav;

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
        {/* <Tab label={'PENDIENTE RECOORDINACION'} value={1} {...a11yProps(1)} /> */}
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
        <TicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <TicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.REALIZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <TicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.CERRADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <TicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.PENDIENTE_RECOORDINACION}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <TicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.PENDIENTE_CORRECCION_AUDITORIA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={6} ptGrid="0">
        <TicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.ESPERA_CORREGIDOS_AUDITORIA}
        />
      </CustomTabPanel>

      {/* <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <TicketsVisitaByStatePage
          state={EstadoTicketTecnicoEnumChoice.PENDIENTE_RECOORDINACION}
        />
      </CustomTabPanel> */}
    </SingleTableBoxScene>
  );
};

export default TicketsVisitaPage;

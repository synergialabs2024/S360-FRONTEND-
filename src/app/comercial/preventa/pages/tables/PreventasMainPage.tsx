import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
import { EstadoPreventaEnumChoice } from '@/shared/constants/app';
import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';
import PreventaByStatePage from './PreventaByStatePage';
import PreventaEsperaAgendaPage from './PreventaEsperaAgendaPage';

export const returnUrlPreventasPage = ROUTER_PATHS.comercial.preventasNav;

export type PreventasMainPageProps = {};

const PreventasMainPage: React.FC<PreventasMainPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Preventas"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'PREVENTAS'} value={1} {...a11yProps(1)} />
        <Tab label={'ESPERA ACEPTACION'} value={6} {...a11yProps(6)} />
        <Tab label={'ESPERA PAGO'} value={7} {...a11yProps(7)} />

        <Tab label={'FINALIZADAS'} value={2} {...a11yProps(2)} />
        {/**
          <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
         */}
        <Tab label={'FALLIDAS'} value={5} {...a11yProps(5)} />
        <Tab label={'SIN GESTION'} value={4} {...a11yProps(4)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <PreventaEsperaAgendaPage />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={6} ptGrid="0">
        <PreventaByStatePage
          state={EstadoPreventaEnumChoice.ESPERA}
          noAceptados
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={7} ptGrid="0">
        <PreventaByStatePage
          state={EstadoPreventaEnumChoice.ESPERA}
          pedingPayment
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <PreventaByStatePage state={EstadoPreventaEnumChoice.FINALIZADO} />
      </CustomTabPanel>

      {/*
      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <PreventaByStatePage state={EstadoPreventaEnumChoice.RECHAZADO} />
      </CustomTabPanel>
        */}

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <PreventaByStatePage state={EstadoPreventaEnumChoice.SIN_GESTION} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <PreventaByStatePage state={EstadoPreventaEnumChoice.FALLIDO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default PreventasMainPage;

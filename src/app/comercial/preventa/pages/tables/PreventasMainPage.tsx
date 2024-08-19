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
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'REALIZADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
        <Tab label={'SIN GESTION'} value={4} {...a11yProps(4)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <PreventaByStatePage state={EstadoPreventaEnumChoice.ESPERA} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <PreventaByStatePage state={EstadoPreventaEnumChoice.REALIZADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <PreventaByStatePage state={EstadoPreventaEnumChoice.RECHAZADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <PreventaByStatePage state={EstadoPreventaEnumChoice.SIN_GESTION} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default PreventasMainPage;

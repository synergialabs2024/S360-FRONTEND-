import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';
import PreventaRequiereCorreccionPage from './CorreccionPreventaPage';
import CorreccionPreventaByStatePage from './CorreccionPreventaByStatePage';
import { EstadoCorreccionPreventaEnumChoice } from '@/shared';

export const returnUrlCorreccionPreventasPage =
  ROUTER_PATHS.comercial.CorreccionPreventasNav;

export type CorreccionPreventasMainPageProps = {};

const CorreccionPreventasMainPage: React.FC<
  CorreccionPreventasMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Correccion Preventas"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'REQUIERE CORRECCION'} value={1} {...a11yProps(1)} />
        <Tab label={'PREVENTAS CORREGIDAS'} value={2} {...a11yProps(2)} />
        <Tab
          label={'PENDIENTES APROBACION MANUAL'}
          value={3}
          {...a11yProps(3)}
        />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <PreventaRequiereCorreccionPage />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <CorreccionPreventaByStatePage
          state={EstadoCorreccionPreventaEnumChoice.CORREGIDO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <CorreccionPreventaByStatePage
          state={EstadoCorreccionPreventaEnumChoice.PENDIENTE_APROBACION_MANUAL}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default CorreccionPreventasMainPage;

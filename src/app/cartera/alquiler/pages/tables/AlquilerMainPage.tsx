import { ROUTER_PATHS } from '@/router/constants';
import { Tab } from '@mui/material';

import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import AlquilerByStatePage from './AlquilerByStatePage';
import { EstadoAlquilerEnumChoice, useTabsOnly } from '@/shared';

export const returnUrlAlquilerPage = ROUTER_PATHS.cartera.alquileresNav;

export type AlquilerPageProps = {};

const AlquilerMainPage: React.FC<AlquilerPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Alquiler"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ACTIVO'} value={1} {...a11yProps(1)} />
        <Tab label={'PAGADO'} value={2} {...a11yProps(2)} />
        <Tab label={'CANCELADO'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <AlquilerByStatePage state={EstadoAlquilerEnumChoice.ACTIVO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <AlquilerByStatePage state={EstadoAlquilerEnumChoice.PAGADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <AlquilerByStatePage state={EstadoAlquilerEnumChoice.CANCELADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default AlquilerMainPage;

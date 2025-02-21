import { ROUTER_PATHS } from '@/router/constants';
import { EstadoTareaEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import PendientesActivacionByStatePage from './PendientesActivacionByStatePage';

export const returnUrlActivacionAsignadas =
  ROUTER_PATHS.buzonTareas.pendientesActivacionAsignadasNav;

export type PendientesActivacionPageProps = {};

const PendientesActivacionPage: React.FC<
  PendientesActivacionPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Pendientes Activacion"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'ACTIVADOS'} value={2} {...a11yProps(2)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <PendientesActivacionByStatePage
          state={EstadoTareaEnumChoice.EN_BORRADOR}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <PendientesActivacionByStatePage
          state={EstadoTareaEnumChoice.GESTIONADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default PendientesActivacionPage;

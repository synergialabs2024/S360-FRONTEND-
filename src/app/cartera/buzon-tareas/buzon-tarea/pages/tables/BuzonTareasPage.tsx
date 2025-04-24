import { ROUTER_PATHS } from '@/router/constants';
import { EstadoTareaEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import BuzonTareasByStatePage from './BuzonTareasByStatePage';

export const returnUrlBuzonTareasPage = ROUTER_PATHS.cartera.buzontareasNav;

export type BuzonTareasPageProps = {};

const BuzonTareasPage: React.FC<BuzonTareasPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Buzon de Tareas"
      createPageUrl={`${returnUrlBuzonTareasPage}/crear`}
      showCreateBtn={true}
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
        <Tab label={'SEPARADO'} value={4} {...a11yProps(4)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <BuzonTareasByStatePage state={EstadoTareaEnumChoice.EN_BORRADOR} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <BuzonTareasByStatePage state={EstadoTareaEnumChoice.GESTIONADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <BuzonTareasByStatePage state={EstadoTareaEnumChoice.RECHAZADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <BuzonTareasByStatePage state={EstadoTareaEnumChoice.SEPARADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default BuzonTareasPage;

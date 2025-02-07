import { ROUTER_PATHS } from '@/router/constants';
import { EstadoTareaEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import TareasByStatePage from './TareasByStatePage';

export const returnUrlBuzonTareas =
  ROUTER_PATHS.buzonTareas.buzonTareasAsignadasNav;

export type TareasPageProps = {};

const TareasPage: React.FC<TareasPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene title="Tareas" showCreateBtn={false} isMainTableStates>
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
        <TareasByStatePage state={EstadoTareaEnumChoice.EN_BORRADOR} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <TareasByStatePage state={EstadoTareaEnumChoice.GESTIONADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <TareasByStatePage state={EstadoTareaEnumChoice.RECHAZADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <TareasByStatePage state={EstadoTareaEnumChoice.SEPARADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default TareasPage;

import { ROUTER_PATHS } from '@/router/constants';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import PendientesActivacionByStatePage from '@/app/buzon-tareas/pendientes-activacion/pages/tables/PendientesActivacionByStatePage';
import { EstadoTareaEnumChoice, useTabsOnly } from '@/shared';

export const returnUrlEncuestaTotemsPage =
  ROUTER_PATHS.customerExperience.encuestaTotemsNav;

export type EncuestaRelacionalPageProps = {};

const EncuestaRelacionalPage: React.FC<EncuestaRelacionalPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Clientes suspendidos"
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

export default EncuestaRelacionalPage;

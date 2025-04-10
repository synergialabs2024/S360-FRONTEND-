import { ROUTER_PATHS } from '@/router/constants';
import {
  LeedTeleventa_Estado_TMEnumChoice,
  PermissionsEnum,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { Tab } from '@mui/material';
import LeedTeleventaByStatePage from './LeedTeleventaByStatePage';

export const returnUrlLeedTeleventaPage =
  ROUTER_PATHS.televentas.leedTeleventasNav;

export type LeedTeleventaPageProps = {};

const LeedTeleventaMainPage: React.FC<LeedTeleventaPageProps> = () => {
  useCheckPermissionsArray([PermissionsEnum.televentas_view_leedteleventa]);
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Lead de Televenta"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'DISPONIBLES'} value={1} {...a11yProps(1)} />
        <Tab label={'MIS GESTIONES PENDIENTES'} value={2} {...a11yProps(2)} />
        <Tab label={'MIS GESTIONES'} value={3} {...a11yProps(3)} />
        <Tab label={'SIN GESTION'} value={4} {...a11yProps(4)} />
        <Tab label={'RECHAZADO'} value={5} {...a11yProps(5)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <LeedTeleventaByStatePage
          state={LeedTeleventa_Estado_TMEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <LeedTeleventaByStatePage
          state={LeedTeleventa_Estado_TMEnumChoice.SEPARADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <LeedTeleventaByStatePage
          state={LeedTeleventa_Estado_TMEnumChoice.REGISTRA_SOLICITUD_SERVICIO}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <LeedTeleventaByStatePage
          state={LeedTeleventa_Estado_TMEnumChoice.SIN_GESTION}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <LeedTeleventaByStatePage
          state={LeedTeleventa_Estado_TMEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default LeedTeleventaMainPage;

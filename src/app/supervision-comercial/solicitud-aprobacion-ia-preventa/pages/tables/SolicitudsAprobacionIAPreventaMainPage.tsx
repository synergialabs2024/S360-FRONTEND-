import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  EstadoSolicitudAprobacionIAEnumChoice,
  PermissionsEnum,
  useTabOnlyNuqs,
} from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import SolicitudsAprobacionIAPreventaByStatePage from './SolicitudsAprobacionIAPreventaByStatePage';

export type SolicitudsAprobacionIAPreventaMainPageProps = {};

export const returnUrlSolicitudsAprobacionIAPreventaPage =
  ROUTER_PATHS.supervisionComercial.solicitudAprobacionIAPreventaNav;

const SolicitudsAprobacionIAPreventaMainPage: React.FC<
  SolicitudsAprobacionIAPreventaMainPageProps
> = () => {
  ///* hooks ----------------
  useCheckPermission(
    PermissionsEnum.comercial_view_solicitudaprobacioniapreventa,
  );

  const { tabValue, handleTabChange } = useTabOnlyNuqs();

  return (
    <SingleTableBoxScene
      title="Solicitudes Aprobación Manual Match Rostros"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'APROBADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <SolicitudsAprobacionIAPreventaByStatePage
          state={EstadoSolicitudAprobacionIAEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <SolicitudsAprobacionIAPreventaByStatePage
          state={EstadoSolicitudAprobacionIAEnumChoice.APROBADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <SolicitudsAprobacionIAPreventaByStatePage
          state={EstadoSolicitudAprobacionIAEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudsAprobacionIAPreventaMainPage;

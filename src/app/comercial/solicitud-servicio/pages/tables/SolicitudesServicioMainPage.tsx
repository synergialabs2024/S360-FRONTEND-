import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
import { EstadoSolicitudServicioEnumChoice } from '@/shared/constants/app';
import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';
import { PermissionsEnum } from '@/shared/interfaces';
import { hasAllPermissions } from '@/shared/utils/auth';
import SolicitudServicioByStatePage from './SolicitudServicioByStatePage';

export const returnUrlSolicitudsServicioPage =
  ROUTER_PATHS.comercial.solicitudServicioNav;

export type SolicitudesServicioMainPageProps = {};

const SolicitudesServicioMainPage: React.FC<
  SolicitudesServicioMainPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Solicitudes de Servicio"
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.comercial_add_solicitudservicio,
      ])}
      createPageUrl={`${returnUrlSolicitudsServicioPage}/crear`}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'INGRESADAS'} value={1} {...a11yProps(1)} />
        <Tab label={'GESTIONADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <SolicitudServicioByStatePage
          state={EstadoSolicitudServicioEnumChoice.INGRESADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <SolicitudServicioByStatePage
          state={EstadoSolicitudServicioEnumChoice.GESTIONANDO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <SolicitudServicioByStatePage
          state={EstadoSolicitudServicioEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default SolicitudesServicioMainPage;

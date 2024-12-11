import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  EstadoAuditoriaOTInstallEnumChoice,
  PermissionsEnum,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import AuditoriaInstalacionByStatePage from './AuditoriaInstalacionByStatePage';

export const returnUrlAuditoriaInstallacionesOT =
  ROUTER_PATHS.operaciones.auditoriaNav;

export type AuditoriaInstalacionesMainPageProps = {};

const AuditoriaInstalacionesMainPage: React.FC<
  AuditoriaInstalacionesMainPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);

  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Revisión | Instalaciones"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'ESPERA REVISIÓN CORREGIDOS'} value={2} {...a11yProps(2)} />

        <Tab label={'APROBADAS'} value={4} {...a11yProps(4)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1}>
        <AuditoriaInstalacionByStatePage
          estadoAuditoria={EstadoAuditoriaOTInstallEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2}>
        <AuditoriaInstalacionByStatePage
          estadoAuditoria={
            EstadoAuditoriaOTInstallEnumChoice.ACTUALIZADOS_TECNICO_ESPERA_REVISION
          }
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4}>
        <AuditoriaInstalacionByStatePage
          estadoAuditoria={EstadoAuditoriaOTInstallEnumChoice.APROBADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default AuditoriaInstalacionesMainPage;

import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import { PermissionsEnum } from '@/shared';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
import {
  EstadoActivacionEnumChoice,
  EstadoOrdenTrabajoEnumChoice,
} from '@/shared/constants/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';
import ActivacionInstalacionOTByState from './ActivacionInstalacionOTByState';

export const returnUrlActivacionesInstallacionesOT =
  ROUTER_PATHS.operaciones.activacionesNav;

export type ActivacionesInstalacionesMainPageProps = {};

const ActivacionesInstalacionesMainPage: React.FC<
  ActivacionesInstalacionesMainPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Activación | Instalaciones"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ASIGNADAS'} value={1} {...a11yProps(1)} />
        <Tab label={'ASIGNADAS RECOORDINADAS'} value={4} {...a11yProps(4)} />
        <Tab label={'GESTIONADAS'} value={2} {...a11yProps(2)} />
        <Tab label={'INSTALACIONES REALIZADAS'} value={5} {...a11yProps(5)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <ActivacionInstalacionOTByState
          otState={EstadoOrdenTrabajoEnumChoice.PENDIENTE}
          activacionState={EstadoActivacionEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <ActivacionInstalacionOTByState
          otState={EstadoOrdenTrabajoEnumChoice.PENDIENTE}
          isRecoordinada
          activacionState={EstadoActivacionEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <ActivacionInstalacionOTByState
          activacionState={EstadoActivacionEnumChoice.GESTIONADA}
          otState={EstadoOrdenTrabajoEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <ActivacionInstalacionOTByState
          activacionState={EstadoActivacionEnumChoice.GESTIONADA}
          otState={EstadoOrdenTrabajoEnumChoice.ESPERA_AUDITORIA}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default ActivacionesInstalacionesMainPage;

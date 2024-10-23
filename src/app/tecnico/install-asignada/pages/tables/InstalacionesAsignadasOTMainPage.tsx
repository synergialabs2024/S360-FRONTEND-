import { Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import { PermissionsEnum } from '@/shared';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';
import { EstadoOrdenTrabajoEnumChoice } from '@/shared/constants/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';
import InstalacionAsignadaOTByState from './InstalacionAsignadaOTByState';

export const returnUrlInstallAsignadasOT =
  ROUTER_PATHS.tecnico.instalacionesAsignadasNav;

export type InstalacionesAsignadasOTMainPageProps = {};

const InstalacionesAsignadasOTMainPage: React.FC<
  InstalacionesAsignadasOTMainPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Agendamientos"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ASIGNADAS'} value={1} {...a11yProps(1)} />
        <Tab label={'FINALIZADAS'} value={2} {...a11yProps(2)} />

        <Tab label={'PRE RECHAZADAS'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <InstalacionAsignadaOTByState
          state={EstadoOrdenTrabajoEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <InstalacionAsignadaOTByState
          state={EstadoOrdenTrabajoEnumChoice.FINALIZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <InstalacionAsignadaOTByState
          state={EstadoOrdenTrabajoEnumChoice.PRE_RECHAZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default InstalacionesAsignadasOTMainPage;

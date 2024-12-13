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
import InstalacionAsignadaEsperaCoreccionTectOT from './InstalacionAsignadaEsperaCoreccionTectOT';
import InstalacionAsignadaEsperaTablePage from './InstalacionAsignadaEsperaTablePage';
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
      title="Instalaciones"
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
        <Tab label={'ESPERA REVISIÓN'} value={5} {...a11yProps(5)} />

        <Tab label={'PENDIENTES CORECCIÓN'} value={6} {...a11yProps(6)} />

        <Tab label={'FINALIZADAS'} value={2} {...a11yProps(2)} />

        <Tab label={'PRE RECHAZADAS'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <InstalacionAsignadaEsperaTablePage />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <InstalacionAsignadaOTByState
          state={EstadoOrdenTrabajoEnumChoice.PENDIENTE}
          isRecoordinada
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <InstalacionAsignadaOTByState
          state={EstadoOrdenTrabajoEnumChoice.ESPERA_AUDITORIA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={6} ptGrid="0">
        <InstalacionAsignadaEsperaCoreccionTectOT />
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

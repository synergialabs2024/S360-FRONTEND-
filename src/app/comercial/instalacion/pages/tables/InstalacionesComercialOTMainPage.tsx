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
import InstalacionComercialOTByState from './InstalacionComercialOTByState';

export const returnUrlInstallPreRechazadasOT =
  ROUTER_PATHS.comercial.instalacionesNav;

export type InstalacionesComercialOTMainPageProps = {};

const InstalacionesComercialOTMainPage: React.FC<
  InstalacionesComercialOTMainPageProps
> = () => {
  useCheckPermission(PermissionsEnum.comercial_view_ordentrabajo);
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

        <Tab label={'ESPERA REVISIÓN'} value={5} {...a11yProps(5)} />

        <Tab label={'PENDIENTES CORRECCIÓN'} value={6} {...a11yProps(6)} />

        <Tab label={'FINALIZADAS'} value={2} {...a11yProps(2)} />

        <Tab label={'PRE RECHAZADAS'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <InstalacionComercialOTByState
          state={EstadoOrdenTrabajoEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>
      {/* <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <InstalacionComercialOTByState
          state={EstadoOrdenTrabajoEnumChoice.PENDIENTE}
          isRecoordinada
        />
      </CustomTabPanel> */}

      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <InstalacionComercialOTByState
          state={EstadoOrdenTrabajoEnumChoice.ESPERA_AUDITORIA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={6} ptGrid="0">
        <InstalacionComercialOTByState
          state={EstadoOrdenTrabajoEnumChoice.ESPERA_CORRECCION}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <InstalacionComercialOTByState
          state={EstadoOrdenTrabajoEnumChoice.FINALIZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <InstalacionComercialOTByState
          state={EstadoOrdenTrabajoEnumChoice.PRE_RECHAZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default InstalacionesComercialOTMainPage;

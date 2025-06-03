import { Tab } from '@mui/material';

import {
  LineaServicio,
  TrazabilidadModeloNameTMEnumChoice,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import ClienteFibrTrazabilidadState from './ClienteFibrTrazabilidadState';

export type ClienteFibrTrazaProcesoVentaMainProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrTrazaProcesoVentaMain: React.FC<
  ClienteFibrTrazaProcesoVentaMainProps
> = ({ serviceLine }) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  return (
    <NestedTabsScene
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Solicitud Servicio" value={1} {...a11yProps(1)} />
          <Tab label="Preventa" value={2} {...a11yProps(2)} />
          <Tab label="Agendamiento" value={3} {...a11yProps(3)} />
          <Tab label="Orden Trabajo" value={4} {...a11yProps(4)} />
        </FormTabsOnly>
      }
      sxContainer={{
        pt: 0,
        pb: 0,
        mt: -8,
      }}
    >
      {/* ========================= Solicitud Servicio ========================= */}
      <CustomTabPanel index={1} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={TrazabilidadModeloNameTMEnumChoice.SOLICITUD_SERVICIO}
          serviceLine={serviceLine}
        />
      </CustomTabPanel>

      {/* ========================= Preventa ========================= */}
      <CustomTabPanel index={2} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={TrazabilidadModeloNameTMEnumChoice.PREVENTA}
          serviceLine={serviceLine}
        />
      </CustomTabPanel>
      {/* ========================= Agendamiento ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={TrazabilidadModeloNameTMEnumChoice.AGENDAMIENTO}
          serviceLine={serviceLine}
        />
      </CustomTabPanel>
      {/* ========================= Orden Trabajo ========================= */}
      <CustomTabPanel index={4} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={TrazabilidadModeloNameTMEnumChoice.ORDEN_TRABAJO}
          serviceLine={serviceLine}
        />
      </CustomTabPanel>
    </NestedTabsScene>
  );
};

export default ClienteFibrTrazaProcesoVentaMain;

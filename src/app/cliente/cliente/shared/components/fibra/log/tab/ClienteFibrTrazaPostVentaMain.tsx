import { Tab } from '@mui/material';

import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import {
  LineaServicio,
  useTabsOnly,
  TrazabilidadModeloNameTMEnumChoice,
} from '@/shared';
import ClienteFibrTrazabilidadState from './ClienteFibrTrazabilidadState';

export type ClienteFibrTrazaPostVentaMainProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrTrazaPostVentaMain: React.FC<
  ClienteFibrTrazaPostVentaMainProps
> = ({ serviceLine }) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  return (
    <NestedTabsScene
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Ticket Tecnico" value={1} {...a11yProps(1)} />
          <Tab
            label="Solicitud Servicio Convenio"
            value={2}
            {...a11yProps(2)}
          />
          <Tab label="Leed Televenta" value={3} {...a11yProps(3)} />
          <Tab
            label="Cliente Pendiente Devolucion"
            value={4}
            {...a11yProps(4)}
          />
          <Tab
            label="Solicitud Desbloqueo Ventas"
            value={5}
            {...a11yProps(5)}
          />
          <Tab
            label="Solicitud Aprobacion IA Preventa"
            value={6}
            {...a11yProps(6)}
          />
        </FormTabsOnly>
      }
      sxContainer={{
        pt: 0,
        pb: 0,
        mt: -8,
      }}
    >
      {/* ========================= Ticket Tecnico ========================= */}
      <CustomTabPanel index={1} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={TrazabilidadModeloNameTMEnumChoice.TICKET_TECNICO}
          serviceLine={serviceLine}
        />
      </CustomTabPanel>

      {/* ========================= Solicitud Servicio Convenio ========================= */}
      <CustomTabPanel index={2} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={TrazabilidadModeloNameTMEnumChoice.SOLICITUD_SERVICIO_CONVENIO}
          serviceLine={serviceLine}
        />
      </CustomTabPanel>
      {/* ========================= Leed Televenta ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={TrazabilidadModeloNameTMEnumChoice.TELEVENTA}
          serviceLine={serviceLine}
        />
      </CustomTabPanel>
      {/* ========================= Cliente Pendiente Devolucion ========================= */}
      <CustomTabPanel index={4} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={
            TrazabilidadModeloNameTMEnumChoice.CLIENTE_PENDIENTE_DEVOLUCION
          }
          serviceLine={serviceLine}
        />
      </CustomTabPanel>

      {/* ========================= Solicitud Desbloqueo Venta ========================= */}
      <CustomTabPanel index={5} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={TrazabilidadModeloNameTMEnumChoice.SOLICITUD_DESBLOQUEO_VENTAS}
          serviceLine={serviceLine}
        />
      </CustomTabPanel>

      {/* ========================= solicitud Aprobacion IA Preventa ========================= */}
      <CustomTabPanel index={6} value={tabValue}>
        <ClienteFibrTrazabilidadState
          state={
            TrazabilidadModeloNameTMEnumChoice.SOLICITUD_APROBACION_IA_PREVENTA
          }
          serviceLine={serviceLine}
        />
      </CustomTabPanel>
    </NestedTabsScene>
  );
};

export default ClienteFibrTrazaPostVentaMain;

import { Tab } from '@mui/material';

import {
  a11yProps,
  FormTabsOnly,
  CustomTabPanel,
  NestedTabsScene,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import {
  ClienteFibrAuditLog,
  ClienteFibrSuspensionInternet,
  ClienteFibrTrazaProcesoVentaMain,
} from './tab';
import { LineaServicio, useTabsOnly } from '@/shared';
import ClienteFibrTrazaPostVentaMain from './tab/ClienteFibrTrazaPostVentaMain';

export type ClienteFibrLogsTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrLogsTab: React.FC<ClienteFibrLogsTabProps> = ({
  serviceLine,
}) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  return (
    <>
      <CustomTypoLabel
        text="AUDIT LOGS"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <ClienteFibrAuditLog serviceLine={serviceLine} />
      <CustomTypoLabel
        text="TRAZABILIDAD"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Proceso Venta" value={1} {...a11yProps(1)} />
            <Tab label="Post Venta" value={2} {...a11yProps(2)} />
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 0,
        }}
      >
        {/* ========================= tabla 1 ========================= */}
        <CustomTabPanel index={1} value={tabValue}>
          <ClienteFibrTrazaProcesoVentaMain serviceLine={serviceLine} />
        </CustomTabPanel>

        {/* ========================= tabla 2 ========================= */}
        <CustomTabPanel index={2} value={tabValue}>
          <ClienteFibrTrazaPostVentaMain serviceLine={serviceLine} />
        </CustomTabPanel>
      </NestedTabsScene>
      <CustomTypoLabel
        text="SUSPENCION INTERNET"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <ClienteFibrSuspensionInternet serviceLine={serviceLine} />
    </>
  );
};

export default ClienteFibrLogsTab;

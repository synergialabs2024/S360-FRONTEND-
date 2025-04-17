import { ROUTER_PATHS } from '@/router/constants';
import {
  EstadoCambioDomicilioEnumChoice,
  PermissionsEnum,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import CambioDomicilioByStatePage from './CambioDomicilioByStatePage';
import { hasPermission } from '@/shared/utils/auth';

export const returnUrlCambioDomicilioPage =
  ROUTER_PATHS.cartera.cambiodomicilioNav;

export type CambioDomicilioPageProps = {};

const CambioDomicilioPage: React.FC<CambioDomicilioPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Cambio de Domicilio"
      createPageUrl={`${returnUrlCambioDomicilioPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.cartera_add_cambiodomicilio)}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'FINALIZADO'} value={2} {...a11yProps(2)} />
        <Tab label={'SIN FACTIBILIDAD'} value={3} {...a11yProps(3)} />
        <Tab label={'CANCELADO'} value={4} {...a11yProps(4)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <CambioDomicilioByStatePage
          state={EstadoCambioDomicilioEnumChoice.ESPERA}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <CambioDomicilioByStatePage
          state={EstadoCambioDomicilioEnumChoice.FINALIZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <CambioDomicilioByStatePage
          state={EstadoCambioDomicilioEnumChoice.SIN_FACTIBILIDAD}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <CambioDomicilioByStatePage
          state={EstadoCambioDomicilioEnumChoice.CANCELADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default CambioDomicilioPage;

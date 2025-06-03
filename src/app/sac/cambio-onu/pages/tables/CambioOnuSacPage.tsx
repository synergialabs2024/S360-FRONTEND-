import { ROUTER_PATHS } from '@/router/constants';
import { cambioOnuSacEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import CambioOnuSacByStatePage from './CambioOnuSacByStatePage';

export const returnUrlTicketsCrear =
  ROUTER_PATHS.operaciones.cambioOnuActivacionNav;

export type AprobacionTicketsVisitaPageProps = {};

const CambioOnuSacPage: React.FC<AprobacionTicketsVisitaPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Cambio Onu"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'PENDIENTE'} value={1} {...a11yProps(1)} />
        <Tab label={'REALIZADO'} value={2} {...a11yProps(2)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <CambioOnuSacByStatePage state={cambioOnuSacEnumChoice.PENDIENTE} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <CambioOnuSacByStatePage state={cambioOnuSacEnumChoice.REALIZADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default CambioOnuSacPage;

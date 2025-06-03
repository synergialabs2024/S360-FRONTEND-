import { ROUTER_PATHS } from '@/router/constants';
import { cambioOnuSacEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import CambioOnuSacByStatePage from './CambioOnuActivacionByStatePage';

export const returnUrlTicketsCrear = ROUTER_PATHS.tickets.ticketsNav;

export type AprobacionTicketsVisitaPageProps = {};

const CambioOnuActivacionPage: React.FC<
  AprobacionTicketsVisitaPageProps
> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Cambio Onu (Activaciones)"
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

export default CambioOnuActivacionPage;

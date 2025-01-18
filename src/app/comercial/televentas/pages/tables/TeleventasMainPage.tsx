import { Tab } from '@mui/material';
import {
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
  a11yProps,
} from '@/shared/components';

import { useTabsOnly } from '@/shared/hooks/ui/useTabsOnly';

import TeleventasEsperaPage from './TeleventasEsperaPage';

export const returnUrlTeleventasPage = '';

export type TeleventasMainPageProps = {};

const TeleventasMainPage: React.FC<TeleventasMainPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Televentas"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'ESPERA'} value={1} {...a11yProps(1)} />
        <Tab label={'APROBADAS'} value={2} {...a11yProps(6)} />
        <Tab label={'RECHAZADAS'} value={3} {...a11yProps(7)} />
      </BoxFormTabsOnly>
      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <TeleventasEsperaPage />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={6} ptGrid="0">
        <TeleventasEsperaPage />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={7} ptGrid="0">
        <TeleventasEsperaPage />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default TeleventasMainPage;

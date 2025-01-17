import { Tab } from '@mui/material';

import { RecepcionMaterialEnumChoice, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import RecepcionMaterialByStatePage from './RecepcionMaterialByStatePage';

export type RecepcionMaterialPageProps = {};

const RecepcionMaterialMainPage: React.FC<RecepcionMaterialPageProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Recepcion de solicitud de materiales"
      showCreateBtn={false}
      isMainTableStates
    >
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'PENDIENTE'} value={1} {...a11yProps(1)} />
        <Tab label={'APROBADO'} value={2} {...a11yProps(2)} />
        <Tab label={'RECHAZADO'} value={3} {...a11yProps(3)} />
        <Tab label={'CANCELADO'} value={4} {...a11yProps(4)} />
        <Tab label={'FINALIZADO'} value={5} {...a11yProps(5)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <RecepcionMaterialByStatePage
          state={RecepcionMaterialEnumChoice.PENDIENTE}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <RecepcionMaterialByStatePage
          state={RecepcionMaterialEnumChoice.APROBADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <RecepcionMaterialByStatePage
          state={RecepcionMaterialEnumChoice.RECHAZADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={4} ptGrid="0">
        <RecepcionMaterialByStatePage
          state={RecepcionMaterialEnumChoice.CANCELADO}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={5} ptGrid="0">
        <RecepcionMaterialByStatePage
          state={RecepcionMaterialEnumChoice.FINALIZADO}
        />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default RecepcionMaterialMainPage;

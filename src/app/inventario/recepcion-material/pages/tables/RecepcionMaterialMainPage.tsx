import { Tab } from '@mui/material';

import { InventarioEnumChoice, PermissionsEnum, useTabsOnly } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import RecepcionMaterialByStatePage from './RecepcionMaterialByStatePage';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';

export const returnUrlRecepcionMaterialPage =
  ROUTER_PATHS.inventario.RecepcionMaterialesNav;

export type RecepcionMaterialPageProps = {};

const RecepcionMaterialMainPage: React.FC<RecepcionMaterialPageProps> = () => {
  useCheckPermissionsArray([
    PermissionsEnum.inventario_view_solicitudmaterial,
    PermissionsEnum.inventario_add_solicitudmaterial,
    PermissionsEnum.inventario_add_ingresomaterial,
    PermissionsEnum.inventario_view_ingresomaterial,
  ]);
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene
      title="Recepción de solicitudes de materiales"
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
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <RecepcionMaterialByStatePage state={InventarioEnumChoice.PENDIENTE} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <RecepcionMaterialByStatePage state={InventarioEnumChoice.APROBADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <RecepcionMaterialByStatePage state={InventarioEnumChoice.RECHAZADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default RecepcionMaterialMainPage;

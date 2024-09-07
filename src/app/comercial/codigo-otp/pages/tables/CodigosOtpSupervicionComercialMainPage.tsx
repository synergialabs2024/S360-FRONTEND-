import { Tab } from '@mui/material';

import { OtpStatesEnumChoice } from '@/shared';
import {
  a11yProps,
  BoxFormTabsOnly,
  CustomTabPanel,
  SingleTableBoxScene,
} from '@/shared/components';
import { useTabsOnly } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import CodigosOtpByStatePage from './CodigosOtpByStatePage';

export type CodigosOtpSupervicionComercialMainPageProps = {};

const CodigosOtpSupervicionComercialMainPage: React.FC<
  CodigosOtpSupervicionComercialMainPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_view_codigootp);

  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <SingleTableBoxScene title="Códigos OTP" showCreateBtn={false}>
      <BoxFormTabsOnly
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMainTableStates
      >
        <Tab label={'PENDIENTES'} value={1} {...a11yProps(1)} />
        <Tab label={'VERIFICADOS'} value={2} {...a11yProps(2)} />
        <Tab label={'EXPIRADOS'} value={3} {...a11yProps(3)} />
      </BoxFormTabsOnly>

      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <CodigosOtpByStatePage state={OtpStatesEnumChoice.PENDIENTE} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <CodigosOtpByStatePage state={OtpStatesEnumChoice.VERIFICADO} />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3} ptGrid="0">
        <CodigosOtpByStatePage state={OtpStatesEnumChoice.EXPIRADO} />
      </CustomTabPanel>
    </SingleTableBoxScene>
  );
};

export default CodigosOtpSupervicionComercialMainPage;

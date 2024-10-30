import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  activacionInstallOTSchema,
  getKeysFormErrorsMessage,
  gridSize,
  gridSizeMdLg9,
  OrdenTrabajo,
  Preventa,
  SolicitudServicio,
  ToastWrapper,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { returnUrlActivacionesInstallacionesOT } from '../../../pages/tables/ActivacionesInstalacionesMainPage';
import ActivacionInstallOTDetallesEquiposFormTab from './ActivacionInstallOTDetallesEquiposFormTab';
import ActivacionInstallOTGeneralInfoTab from './ActivacionInstallOTGeneralInfoTab';

export type SaveActivacionInstallPendienteOTProps = {
  titleNode: React.ReactNode;
  ordentrabajo: OrdenTrabajo;
};

export type ActicacionInstallOTSaveFormData = Partial<OrdenTrabajo> &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {};

const SaveActivacionInstallPendienteOT: React.FC<
  SaveActivacionInstallPendienteOTProps
> = ({ titleNode, ordentrabajo }) => {
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly();

  ///* form ---------------------
  const form = useForm<ActicacionInstallOTSaveFormData>({
    resolver: yupResolver(activacionInstallOTSchema) as any,
    defaultValues: {},
  });
  const { handleSubmit } = form;

  ///* global state --------------------
  const materialesUtilizados = useInstalacionesStore(
    s => s.materialesUtilizados,
  );

  ///* mutations ----------------

  ///* handlers -----------------
  const onSave = (data: ActicacionInstallOTSaveFormData) => {
    console.log(data);
  };

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      onCancel={() => navigate(returnUrlActivacionesInstallacionesOT)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Detalles de Activación" value={2} {...a11yProps(2)} />
          {/* <Tab label="Equipos" value={3} {...a11yProps(3)} /> */}
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <ActivacionInstallOTGeneralInfoTab
          ordenTrabajo={ordentrabajo}
          form={form}
        />
      </CustomTabPanel>

      {/* ========================= Detalles de Activación ========================= */}
      <CustomTabPanel index={2} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <ActivacionInstallOTDetallesEquiposFormTab
          ordenTrabajo={ordentrabajo}
        />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveActivacionInstallPendienteOT;

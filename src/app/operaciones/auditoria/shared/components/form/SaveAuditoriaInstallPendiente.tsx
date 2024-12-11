import { Tab } from '@mui/material';
import { useNavigate } from 'react-router';

import {
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
import { useForm } from 'react-hook-form';
import { returnUrlAuditoriaInstallacionesOT } from '../../../pages/tables/AuditoriaInstalacionesMainPage';

export type SaveAuditoriaInstallPendienteProps = {
  titleNode: React.ReactNode;
  ordentrabajo: OrdenTrabajo;
};

export type AuditoriaInstallOTSaveFormData = Partial<OrdenTrabajo> &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {};

const SaveAuditoriaInstallPendiente: React.FC<
  SaveAuditoriaInstallPendienteProps
> = ({ ordentrabajo, titleNode }) => {
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly();

  ///* form ---------------------
  const form = useForm<AuditoriaInstallOTSaveFormData>({
    defaultValues: {},
  });
  const { handleSubmit } = form;

  ///* mutations ----------------

  ///* handlers -----------------
  const onSave = async (data: AuditoriaInstallOTSaveFormData) => {
    console.log('data', data);
    console.log('ordentrabajo', ordentrabajo);
  };

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      onCancel={() => navigate(returnUrlAuditoriaInstallacionesOT)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(`Error en: ${getKeysFormErrorsMessage(errors)}`);
      })}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Detalles de Activación" value={2} {...a11yProps(2)} />
          <Tab label="Equipos" value={3} {...a11yProps(3)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        GENERAL INFO
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveAuditoriaInstallPendiente;

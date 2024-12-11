import { Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ClienteFibraOTFotosPart } from '@/app/cliente/cliente/shared/components/fibra/servicio';
import { ClienteFibraOTEquiposMaterialesPart } from '@/app/cliente/cliente/shared/components/fibra/servicio/equipos';
import {
  InstallAsigOrdenTrabajoFormTab,
  InstallAsigTecnicoOTFormTab,
} from '@/app/tecnico/install-asignada/shared/components/form';
import {
  getKeysFormErrorsMessage,
  gridSize,
  gridSizeMdLg9,
  OrdenTrabajo,
  Preventa,
  sanitizeDataResetForm,
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
import { returnUrlAuditoriaInstallacionesOT } from '../../../pages/tables/AuditoriaInstalacionesMainPage';
import AuditoriaInstallRequestUpdOT from './AuditoriaInstallRequestUpdOT';

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

  ///* local states ---------------------
  const [openRequestUpdOTModal, setOpenRequestUpdOTModal] = useState(false);

  ///* form ---------------------
  const form = useForm<AuditoriaInstallOTSaveFormData>({
    defaultValues: {},
  });
  const { handleSubmit, reset } = form;

  ///* mutations ----------------

  ///* handlers -----------------
  const onSave = async (data: AuditoriaInstallOTSaveFormData) => {
    console.log('data', data);
    console.log('ordentrabajo', ordentrabajo);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!ordentrabajo?.id) return;

    const { solicitud_servicio_data, preventa_data, agendamiento_data } =
      ordentrabajo;

    const dataToReset = {
      ...ordentrabajo,
      ...solicitud_servicio_data,
      ...preventa_data,
      ...agendamiento_data,

      serie_ont: ordentrabajo?.serie_ont || undefined,
      metraje_autorizado_fibra:
        ordentrabajo?.ciudad_data?.metraje_autorizado || '',
      rawNap: ordentrabajo?.nap_data || undefined,
    };

    reset({
      ...sanitizeDataResetForm(dataToReset),
    } as AuditoriaInstallOTSaveFormData);
  }, [ordentrabajo, reset]);

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      // action btns
      onCancel={() => navigate(returnUrlAuditoriaInstallacionesOT)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(`Error en: ${getKeysFormErrorsMessage(errors)}`);
      })}
      rejectTextBtn="Solicitar Actualización"
      onReject={() => {
        setOpenRequestUpdOTModal(true);
      }}
      // tabs
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Órden de trabajo" value={2} {...a11yProps(2)} />
          <Tab label="Materiales" value={3} {...a11yProps(3)} />
          <Tab label="Fotos" value={4} {...a11yProps(4)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <InstallAsigTecnicoOTFormTab
          form={form as any}
          ordenTrabajo={ordentrabajo!}
        />
      </CustomTabPanel>

      {/* ========================= Orden de Trabajo ========================= */}
      <CustomTabPanel index={2} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <InstallAsigOrdenTrabajoFormTab
          form={form as any}
          ordenTrabajo={ordentrabajo!}
          onlyView
        />
      </CustomTabPanel>

      {/* ========================= Materiales ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <ClienteFibraOTEquiposMaterialesPart
          serviceLine={
            {
              orden_trabajo_data: ordentrabajo,
              preventa_data: ordentrabajo?.preventa_data,
              ciudad_data: ordentrabajo?.ciudad_data,
            } as any
          }
        />
      </CustomTabPanel>

      {/* ========================= Fotos ========================= */}
      <CustomTabPanel index={4} value={tabValue}>
        <ClienteFibraOTFotosPart
          serviceLine={
            {
              orden_trabajo_data: ordentrabajo,
            } as any
          }
        />
      </CustomTabPanel>

      {/* ========================= modals ========================= */}
      <AuditoriaInstallRequestUpdOT
        open={openRequestUpdOTModal}
        onClose={() => setOpenRequestUpdOTModal(false)}
        ordenTrabajo={ordentrabajo!}
      />
    </TabsFormBoxScene>
  );
};

export default SaveAuditoriaInstallPendiente;

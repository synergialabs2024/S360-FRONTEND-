import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { OrdenTrabajoTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
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
  CustomCardAlert,
  CustomTabPanel,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';
import { Tab } from '@mui/material';
import { returnUrlAuditoriaInstallacionesOT } from '../../../pages/tables/AuditoriaInstalacionesMainPage';
import AuditoriaInstallRequestUpdOT from './AuditoriaInstallRequestUpdOT';

export type SaveAuditoriaFixedDataOtProps = {
  ot: OrdenTrabajo;
  titleNode: React.ReactNode;
};

type AuditoriaInstallFixedDataOTSaveFormData = Partial<OrdenTrabajo> &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {};

const SaveAuditoriaFixedDataOt: React.FC<SaveAuditoriaFixedDataOtProps> = ({
  ot,
  titleNode,
}) => {
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly();

  ///* local states ---------------------
  const [openRequestUpdOTModal, setOpenRequestUpdOTModal] = useState(false);

  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form ---------------------
  const form = useForm<AuditoriaInstallFixedDataOTSaveFormData>();
  const { handleSubmit, reset } = form;

  ///* mutations ---------------------
  const approveOtInstall = useGenericPATCH<any, OrdenTrabajo>(
    `/orden-trabajo/instalaciones/audit-uploaded/${ot?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast:
        'Orden de trabajo de instalación actualizada aprobada con éxito',
      navigate,
      returnUrl: returnUrlAuditoriaInstallacionesOT,
      customOnSuccess() {
        setConfirmDialogIsOpen(false);
      },
    },
  );

  ///* handlers ---------------------
  const onSave = () => {
    setConfirmDialog({
      isOpen: true,
      title:
        '¿Estás seguro de aprobar la actualización de la orden de trabajo?',
      subtitle: 'Una vez aprobada no se podrá modificar',
      onConfirm: () => {
        approveOtInstall.mutate({});
      },
    });
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!ot?.id) return;

    const { solicitud_servicio_data, preventa_data, agendamiento_data } = ot;

    const dataToReset = {
      ...ot,
      ...solicitud_servicio_data,
      ...preventa_data,
      ...agendamiento_data,

      serie_ont: ot?.serie_ont || undefined,
      metraje_autorizado_fibra: ot?.ciudad_data?.metraje_autorizado || '',
      rawNap: ot?.nap_data || undefined,
    };

    reset({
      ...sanitizeDataResetForm(dataToReset),
    } as AuditoriaInstallFixedDataOTSaveFormData);
  }, [ot, reset]);

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      // action btns
      onCancel={() => navigate(returnUrlAuditoriaInstallacionesOT)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(`Error en: ${getKeysFormErrorsMessage(errors)}`);
      })}
      saveTextBtn="Aprobar"
      rejectTextBtn="Solicitar Actualización"
      onReject={() => {
        setOpenRequestUpdOTModal(true);
      }}
      // tabs
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Órden de trabajo" value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <InstallAsigTecnicoOTFormTab form={form as any} ordenTrabajo={ot!} />
      </CustomTabPanel>

      {/* ========================= Orden de Trabajo ========================= */}
      <CustomTabPanel index={2} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <InstallAsigOrdenTrabajoFormTab
          form={form as any}
          ordenTrabajo={ot!}
          onlyView
          customCardNode={
            <CustomCardAlert
              sizeType="medium"
              alertSeverity="info"
              alertTitle="OBSERVACIONES"
              alertContentNode={<>{ot?.observacion_correccion}</>}
            />
          }
        />
      </CustomTabPanel>

      {/* ========================= modals ========================= */}
      <AuditoriaInstallRequestUpdOT
        open={openRequestUpdOTModal}
        onClose={() => setOpenRequestUpdOTModal(false)}
        ordenTrabajo={ot!}
      />
    </TabsFormBoxScene>
  );
};

export default SaveAuditoriaFixedDataOt;

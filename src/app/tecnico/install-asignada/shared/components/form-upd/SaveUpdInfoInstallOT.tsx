import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { OrdenTrabajoTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  getKeysFormErrorsMessage,
  gridSize,
  gridSizeMdLg9,
  OrdenTrabajo,
  Preventa,
  sanitizeDataResetForm,
  SolicitudServicio,
  ToastWrapper,
  updDataInstallOtByTechReqAuditSchema,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlInstallAsignadasOT } from '../../../pages/tables/InstalacionesAsignadasOTMainPage';
import InstallAsigOrdenTrabajoFormTab from '../form/InstallAsigOrdenTrabajoFormTab';
import InstallAsigTecnicoOTFormTab from '../form/InstallAsigTecnicoOTFormTab';

export type SaveUpdInfoInstallOTProps = {
  ordenTrabajo: OrdenTrabajo;
  titleNode: React.ReactNode;
};

type SaveUpdInfoInstallOTForm = Partial<OrdenTrabajo> &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {};

const SaveUpdInfoInstallOT: React.FC<SaveUpdInfoInstallOTProps> = ({
  ordenTrabajo,
  titleNode,
}) => {
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly();

  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form ---------------------
  const form = useForm<SaveUpdInfoInstallOTForm>({
    resolver: yupResolver(updDataInstallOtByTechReqAuditSchema) as any,
  });
  const { handleSubmit, reset } = form;

  ///* mutations ---------------------
  const approveOtInstall = useGenericPATCH<any, OrdenTrabajo>(
    `/orden-trabajo/instalaciones/fix-data/${ordenTrabajo?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast:
        'Orden de trabajo de instalación actualizada con éxito',
      navigate,
      // returnUrl: returnUrlInstallAsignadasOT,
      customOnSuccess() {
        setConfirmDialogIsOpen(false);
      },
    },
  );

  ///* handlers ---------------------
  const onSave = (data: SaveUpdInfoInstallOTForm) => {
    setConfirmDialog({
      isOpen: true,
      title: '¿Estás seguro de guardar los cambios?',
      subtitle:
        'Una vez guardados no podrás modificar la información y esta se enviará a revisión',
      onConfirm: () => {
        approveOtInstall.mutate({
          direccion_referencia: data.direccion_referencia,
          potencia_ont: data.potencia_ont,
          observaciones_adicionales: data.observaciones_adicionales,
          coordenadas: data.coordenadas,
          sector: data.sector,
          zona: data.zona,
          nap: data.nap,
          distancia_nap: data.distancia_nap,
          puerto_nap: data.puerto_nap,
        });
      },
    });
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!ordenTrabajo?.id) return;

    const { solicitud_servicio_data, preventa_data, agendamiento_data } =
      ordenTrabajo;

    const dataToReset = {
      ...ordenTrabajo,
      ...solicitud_servicio_data,
      ...preventa_data,
      ...agendamiento_data,

      serie_ont: ordenTrabajo?.serie_ont || undefined,
      metraje_autorizado_fibra:
        ordenTrabajo?.ciudad_data?.metraje_autorizado || '',
      rawNap: ordenTrabajo?.nap_data || undefined,
    };

    reset({
      ...sanitizeDataResetForm(dataToReset),
    } as SaveUpdInfoInstallOTForm);
  }, [ordenTrabajo, reset]);

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      // action btns
      onCancel={() => navigate(returnUrlInstallAsignadasOT)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(`Error en: ${getKeysFormErrorsMessage(errors)}`);
      })}
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
        <InstallAsigTecnicoOTFormTab
          form={form as any}
          ordenTrabajo={ordenTrabajo!}
        />
      </CustomTabPanel>

      {/* ========================= Orden de Trabajo ========================= */}
      <CustomTabPanel index={2} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <InstallAsigOrdenTrabajoFormTab
          form={form as any}
          ordenTrabajo={ordenTrabajo!}
        />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveUpdInfoInstallOT;

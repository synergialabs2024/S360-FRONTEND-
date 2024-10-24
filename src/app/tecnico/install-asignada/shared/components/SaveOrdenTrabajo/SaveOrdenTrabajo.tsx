import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateOrdenTrabajoParamsBase,
  useCreateOrdenTrabajo,
  useUpdateOrdenTrabajo,
} from '@/actions/app';
import {
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
import { OrdenTrabajo } from '@/shared/interfaces';
import {
  getKeysFormErrorsMessage,
  ordenTrabajoFormSchema,
  sanitizeDataResetForm,
} from '@/shared/utils';
import { returnUrlInstallAsignadasOT } from '../../../pages/tables/InstalacionesAsignadasOTMainPage';
import {
  InstallAsigOrdenTrabajoFormTab,
  InstallAsigOTMaterialesFormTab,
  InstallAsigTecnicoOTFormTab,
} from '../form';

export interface SaveOrdenTrabajoProps {
  titleNode: React.ReactNode;
  ordentrabajo?: OrdenTrabajo;
}

export type InstallAsignOTSaveFormData = CreateOrdenTrabajoParamsBase &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {};

const SaveOrdenTrabajo: React.FC<SaveOrdenTrabajoProps> = ({
  titleNode,
  ordentrabajo,
}) => {
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* form ---------------------
  const form = useForm<InstallAsignOTSaveFormData>({
    resolver: yupResolver(ordenTrabajoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  ///* mutations ---------------------
  const createOrdenTrabajoMutation = useCreateOrdenTrabajo({
    navigate,
    returnUrl: returnUrlInstallAsignadasOT,
    enableErrorNavigate: false,
  });
  const updateOrdenTrabajoMutation =
    useUpdateOrdenTrabajo<CreateOrdenTrabajoParamsBase>({
      navigate,
      returnUrl: returnUrlInstallAsignadasOT,
    });

  ///* handlers ---------------------
  const onSave = async (data: InstallAsignOTSaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (ordentrabajo?.id) {
      updateOrdenTrabajoMutation.mutate({ id: ordentrabajo.id!, data });
      return;
    }

    ///* create
    createOrdenTrabajoMutation.mutate(data);
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
    };

    reset({
      ...sanitizeDataResetForm(dataToReset),
    } as InstallAsignOTSaveFormData);
  }, [ordentrabajo, reset]);

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      onCancel={() => navigate(returnUrlInstallAsignadasOT)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Órden de trabajo" value={2} {...a11yProps(2)} />
          <Tab label="Materiales" value={3} {...a11yProps(3)} />
        </FormTabsOnly>
      }
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue}>
        <InstallAsigTecnicoOTFormTab form={form} ordenTrabajo={ordentrabajo!} />
      </CustomTabPanel>

      {/* ========================= Orden de Trabajo ========================= */}
      <CustomTabPanel index={2} value={tabValue}>
        <InstallAsigOrdenTrabajoFormTab
          form={form}
          ordenTrabajo={ordentrabajo!}
        />
      </CustomTabPanel>

      {/* ========================= Materiales ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <InstallAsigOTMaterialesFormTab form={form} />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveOrdenTrabajo;

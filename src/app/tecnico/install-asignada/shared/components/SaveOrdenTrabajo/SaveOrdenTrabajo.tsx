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
} from '@/shared/utils';
import { returnUrlInstallAsignadasOT } from '../../../pages/tables/InstalacionesAsignadasOTMainPage';
import { InstallAsigTecnicoOTFormTab } from '../form';

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
    reset(ordentrabajo);
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
          <Tab label="Materiales" value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue}>
        <InstallAsigTecnicoOTFormTab form={form} />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveOrdenTrabajo;

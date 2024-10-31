import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { OrdenTrabajoTSQEnum } from '@/actions/app';
import { ActivateInstalacionOTData } from '@/actions/app/tecnico/orden-trabajo-action-types.interface';
import { useGenericPATCH } from '@/actions/shared';
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
import dayjs from 'dayjs';
import { returnUrlActivacionesInstallacionesOT } from '../../../pages/tables/ActivacionesInstalacionesMainPage';
import { useEquiposActivacionInstallOT } from '../../hooks';
import ActivacionInstallOTDetallesEquiposFormTab from './ActivacionInstallOTDetallesEquiposFormTab';
import ActivacionInstallOTEquiposFormTab from './ActivacionInstallOTEquiposFormTab';
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
  useEquiposActivacionInstallOT({ ordenTrabajo: ordentrabajo });

  ///* form ---------------------
  const form = useForm<ActicacionInstallOTSaveFormData>({
    resolver: yupResolver(activacionInstallOTSchema) as any,
    defaultValues: {},
  });
  const { handleSubmit } = form;

  ///* mutations ----------------
  const activateInstalacion = useGenericPATCH<
    ActivateInstalacionOTData,
    OrdenTrabajo
  >(
    `/orden-trabajo/instalaciones/activate/${ordentrabajo?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast: 'Activación de instalación exitosa',
      navigate,
      returnUrl: returnUrlActivacionesInstallacionesOT,
    },
  );

  ///* handlers -----------------
  const onSave = (data: ActicacionInstallOTSaveFormData) => {
    const equiposUtilizados =
      useInstalacionesStore.getState().equiposUtilizados;

    const ont = equiposUtilizados?.at(0);
    if (!ont || !ont?.savedSeries?.length)
      return ToastWrapper.error('No se han seleccionado la serie de la ONT');

    const selectedSerie = ont?.savedSeries?.at(0);
    const currentDate = dayjs().format('YYYY-MM-DD');
    const horaInicio = dayjs(`${currentDate} ${data.hora_inicio}`).format();
    const horaFin = dayjs(`${currentDate} ${data.hora_fin}`).format();

    activateInstalacion.mutate({
      hora_fin: horaFin,
      hora_inicio: horaInicio,
      serie_ont: selectedSerie,
      observacion_activacion: data.observacion_activacion!,
      producto: ont?.producto_data?.id!,
    });
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
          <Tab label="Equipos" value={3} {...a11yProps(3)} />
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
          form={form}
        />
      </CustomTabPanel>

      {/* ========================= Equipos ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <ActivacionInstallOTEquiposFormTab ordenTrabajo={ordentrabajo} />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveActivacionInstallPendienteOT;

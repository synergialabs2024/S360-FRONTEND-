import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { OrdenTrabajoTSQEnum } from '@/actions/app';
import { ActivateInstalacionOTData } from '@/actions/app/tecnico/orden-trabajo-action-types.interface';
import { useGenericPATCH } from '@/actions/shared';
import { EquiposUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
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
  // old logic (now there are ont models)
  // useEquiposActivacionInstallOT({ ordenTrabajo: ordentrabajo });

  ///* global states ---------------------
  const clearAll = useInstalacionesStore(state => state.clearAll);

  ///* form ---------------------
  const form = useForm<ActicacionInstallOTSaveFormData>({
    resolver: yupResolver(activacionInstallOTSchema) as any,
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
      customOnSuccess() {
        clearAll();
      },
    },
  );

  ///* handlers -----------------
  const onSave = (data: ActicacionInstallOTSaveFormData) => {
    const equiposUtilizados =
      useInstalacionesStore.getState().equiposUtilizados;
    const selectedProductModel =
      useInstalacionesStore.getState().selectedProductModel;

    if (!equiposUtilizados?.length)
      return ToastWrapper.error('No se han seleccionado equipos');
    // if (equiposUtilizados?.length > 1)
    //   return ToastWrapper.error('Solo se puede seleccionar un equipo');

    let thereAreEquiposWithoutSerie = false;
    let equiposWithoutSerie: EquiposUtilizadosOTTableType = {} as any;
    equiposUtilizados?.forEach(equipo => {
      if (!equipo.savedSeries?.length) {
        thereAreEquiposWithoutSerie = true;
        equiposWithoutSerie = equipo;
      }
    });
    if (thereAreEquiposWithoutSerie)
      return ToastWrapper.error(
        `El equipo ${equiposWithoutSerie?.producto_data?.nombre} no tiene serie seleccionada`,
      );

    const ont = equiposUtilizados?.at(0);
    if (!ont || !ont?.savedSeries?.length)
      return ToastWrapper.error('No se han seleccionado la serie de la ONT');
    if (!selectedProductModel)
      return ToastWrapper.error('No se ha seleccionado un modelo de ONT');
    if (selectedProductModel !== ont?.modelo_data?.codigo)
      return ToastWrapper.error(
        'El modelo de ONT seleccionado no coincide con el modelo del equipo seleccionado',
      );

    const selectedSerie = ont?.savedSeries?.at(0);

    activateInstalacion.mutate({
      hora_fin: data.hora_fin!,
      hora_inicio: data.hora_inicio!,
      serie_ont: selectedSerie,
      ...(data.observacion_activacion && {
        observacion_activacion: data.observacion_activacion,
      }),
      producto: ont?.producto_data?.id!,
      modelo_ont_wifi: selectedProductModel,
    });
  };

  ///* effects -----------------
  useEffect(() => {
    if (
      !ordentrabajo?.id ||
      !ordentrabajo?.agendamiento_data?.fecha_hora_instalacion
    )
      return;

    const fechaHoraInstalacion = dayjs(
      ordentrabajo?.agendamiento_data?.fecha_hora_instalacion,
    ).format();
    const fechaHoraFinInstalacion = dayjs(fechaHoraInstalacion)
      .add(1, 'hour')
      .add(30, 'minute')
      .format();

    form.setValue('hora_inicio', fechaHoraInstalacion);
    form.setValue('hora_fin', fechaHoraFinInstalacion);
  }, [form, ordentrabajo]);

  useEffect(() => {
    return () => {
      clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

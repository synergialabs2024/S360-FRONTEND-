import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { OrdenTrabajoTSQEnum } from '@/actions/app';
import { FailInstalacionOTData } from '@/actions/app/tecnico/orden-trabajo-action-types.interface';
import { useGenericPATCH } from '@/actions/shared';
import {
  activacionInstallOTSchema,
  getKeysFormErrorsMessage,
  gridSize,
  gridSizeMdLg9,
  OrdenTrabajo,
  ToastWrapper,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomConfirmDialogProps,
  CustomTabPanel,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import DatosClienteTecnicoOTPart from '../form/general/DatosClienteTecnicoOTPart';
import DatosMotivoRechazoTabPart from '../form/general/DatosMotivoRechazoTabPart';
import DatosPlanBasicoTecnicoPart from '../form/general/DatosPlanBasicoTecnicoPart';
import DatosUbicacionTabPart from '../form/general/DatosUbicacionTabPart';
import { returnUrlInstalacionesPage } from '../../../pages/tables/InstalacionComercialOTByState';
import { RequestRecoordinacionAgendaTableBtn } from '@/app/comercial/agendamiento/shared/components';

export type SaveInstalacionPreRechazadaProps = {
  titleNode: React.ReactNode;
  ordentrabajo: OrdenTrabajo;
};

export type ActicacionInstallOTSaveFormData = Partial<OrdenTrabajo>;

const SaveInstalacionPreRechazada: React.FC<
  SaveInstalacionPreRechazadaProps
> = ({ titleNode, ordentrabajo }) => {
  ///* local state -------------
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalRejected, setOpenModalRejected] = useState<boolean>(false);

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

  const failInstalacion = useGenericPATCH<FailInstalacionOTData, OrdenTrabajo>(
    `/orden-trabajo/instalaciones/fail/${ordentrabajo?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast: 'Se ha dado por fallida la instalacion exitosamente',
      navigate,
      returnUrl: returnUrlInstalacionesPage,
      customOnSuccess() {
        clearAll();
      },
    },
  );

  ///* handlers -----------------
  const onSaveRecoordinacion = () => {
    setOpenModal(true);
  };

  const onSaveRejected = () => {
    failInstalacion.mutate({
      id: ordentrabajo.id,
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
    console.log('ordentrabajo', ordentrabajo);
    console.log(
      'ordentrabajo.agendamiento_data',
      ordentrabajo.agendamiento_data,
    );
    return () => {
      clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenRejected = () => {
    setOpenModalRejected(true);
  };

  const handleCloseRejected = () => {
    setOpenModalRejected(false);
  };

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      onCancel={() => navigate(returnUrlInstalacionesPage)}
      onSave={handleSubmit(onSaveRecoordinacion, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
      saveTextBtn="Enviar a recoordinacion"
      onReject={() => handleOpenRejected()}
      rejectTextBtn="Dar por fallido"
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Motivos Rechazo" value={2} {...a11yProps(2)} />
          <Tab label="Datos Plan" value={3} {...a11yProps(3)} />
          <Tab label="Datos Ubicacion" value={4} {...a11yProps(4)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <DatosClienteTecnicoOTPart ordenTrabajo={ordentrabajo} />
      </CustomTabPanel>

      {/* ========================= Detalles de Activación ========================= */}
      <CustomTabPanel index={2} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <DatosMotivoRechazoTabPart ordenTrabajo={ordentrabajo} />
      </CustomTabPanel>

      {/* ========================= Equipos ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <DatosPlanBasicoTecnicoPart ordenTrabajo={ordentrabajo} />
      </CustomTabPanel>

      <CustomTabPanel index={4} value={tabValue}>
        <DatosUbicacionTabPart ordenTrabajo={ordentrabajo} />
      </CustomTabPanel>

      {/* ============= modal ============= */}
      <RequestRecoordinacionAgendaTableBtn
        open={openModal}
        onClose={() => setOpenModal(false)}
        agendamiento={ordentrabajo.agendamiento_data!}
        urlRedirect={returnUrlInstalacionesPage}
      />

      <CustomConfirmDialogProps
        open={openModalRejected}
        title="Dar por fallida"
        subtitle="¿Está seguro de que desea rechazar esta instalación asignada?"
        confirmTextBtn="Confirmar"
        onClose={handleCloseRejected}
        onConfirm={onSaveRejected}
      />
    </TabsFormBoxScene>
  );
};

export default SaveInstalacionPreRechazada;

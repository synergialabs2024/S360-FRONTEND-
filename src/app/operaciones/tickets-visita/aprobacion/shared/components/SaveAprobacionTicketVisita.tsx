import { Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  getKeysFormErrorsMessage,
  gridSize,
  gridSizeMdLg9,
  ToastWrapper,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import { useForm } from 'react-hook-form';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { CreateTicketParamsBase, TicketTSQEnum } from '@/actions/app/tickets';
import { useInstalacionesStore } from '@/store/app';
import { useGenericPATCH } from '@/actions/shared';
import { useState } from 'react';
import InstallAsigTecnicoTicketFormTab from '@/app/tecnico/tickets-tecnico/shared/components/form/InstallAsigTecnicoTicketFormTab';
import AprobacionAsigTicketImagenesFormTab from './form/AprobacionAsigTicketImagenesFormTab';
import AprobacionAsigTicketSolucionFormTab from './form/AprobacionAsigTicketSolucionFormTab';
import AprobacionRequestUpdTicketVisita from './form/AprobacionRequestUpdTicketVisita';
import ClienteFibraTVEquiposMaterialesPart from './form/equipos/ClienteFibraTVEquiposMaterialesPart';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlTicketVisitaAprobacion =
  ROUTER_PATHS.operaciones.aprobacionicketsVisitaNav;

export interface SaveAprobacionTicketVisitaProps {
  titleNode: React.ReactNode;
  ticket?: Ticket;
}

export type InstallAsignTicketTecnicoSaveFormData = CreateTicketParamsBase & {};

const SaveAprobacionTicketVisita: React.FC<SaveAprobacionTicketVisitaProps> = ({
  titleNode,
  ticket,
}) => {
  ///* hooks --------------------
  const navigate = useNavigate();
  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  ///* local states ---------------------
  const [openRequestUpdOTModal, setOpenRequestUpdOTModal] = useState(false);
  ///* mutations ---------------------
  const uploadTicketVisitaTecnico = useGenericPATCH<any, Ticket>(
    `/ticket-tecnico/approve/${ticket?.id!}/`,
    TicketTSQEnum.TICKETS,
    {
      customMessageToast: 'Ticket de visita aprobado con éxito',
      navigate,
      returnUrl: returnUrlTicketVisitaAprobacion,
      customOnSuccess() {
        clearAll();
        setConfirmDialogIsOpen(false);
      },
    },
  );

  ///* global states ---------------------
  const clearAll = useInstalacionesStore(state => state.clearAll);

  ///* form ---------------------
  const form = useForm<InstallAsignTicketTecnicoSaveFormData>({});
  const { handleSubmit } = form;

  ///* states ---------------------
  // const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* handlers ---------------------
  const onSave = async () => {
    setConfirmDialog({
      isOpen: true,
      title: '¿Estás seguro de aprobar la visita tecnica?',
      subtitle: 'Una vez aprobada no se podrá modificar',
      onConfirm: () => {
        uploadTicketVisitaTecnico.mutate({});
      },
    });
  };

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      // action btns
      onCancel={() => navigate(returnUrlTicketVisitaAprobacion)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(`Error en: ${getKeysFormErrorsMessage(errors)}`);
      })}
      onReject={() => {
        setOpenRequestUpdOTModal(true);
      }}
      // tabs
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Materiales" value={2} {...a11yProps(2)} />
          <Tab
            label="Informacion sobre la visita"
            value={3}
            {...a11yProps(3)}
          />
          <Tab label="Fotos" value={4} {...a11yProps(4)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <InstallAsigTecnicoTicketFormTab form={form} ticket={ticket!} />
      </CustomTabPanel>

      {/* ========================= Materiales ========================= */}
      <CustomTabPanel index={2} value={tabValue}>
        <ClienteFibraTVEquiposMaterialesPart ticket_data={ticket} />
      </CustomTabPanel>
      {/* ========================= Informacion sobre la visita ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <AprobacionAsigTicketSolucionFormTab ticket={ticket!} />
      </CustomTabPanel>
      {/* ========================= Fotos ========================= */}
      <CustomTabPanel index={4} value={tabValue}>
        <AprobacionAsigTicketImagenesFormTab ticket={ticket!} />
      </CustomTabPanel>

      {/* ========================= modals ========================= */}
      {/* <PrerejectInstalacionAsignadaOTModal
        open={isOpenRejectModal}
        onClose={() => setIsOpenRejectModal(false)}
        ordenTrabajo={ordentrabajo!}
      /> */}
      <AprobacionRequestUpdTicketVisita
        open={openRequestUpdOTModal}
        onClose={() => setOpenRequestUpdOTModal(false)}
        ticket={ticket!}
      />
    </TabsFormBoxScene>
  );
};

export default SaveAprobacionTicketVisita;

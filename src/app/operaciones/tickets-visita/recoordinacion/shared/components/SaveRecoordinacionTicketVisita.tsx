import { Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  Flota,
  getKeysFormErrorsMessage,
  gridSize,
  gridSizeMdLg9,
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
import { ROUTER_PATHS } from '@/router/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import {
  CreateRecoordinacionTicketVisitaFormData,
  CreateTicketParamsBase,
  TicketTSQEnum,
} from '@/actions/app/tickets';
import RecoordinacionAsigTicketVisitaFormTab from './form/RecoordinacionAsigTicketVisitaFormTab';
import RecoordinacionUbicacionTicketVisitaFormTab from './form/RecoordinacionUbicacionTicketVisitaFormTab';
import TicketVisitaSaveAgenda from './SaveAgendamiento/form/TicketVisitaSaveAgenda';
import { usePlanificadorAgendamientoTv } from '../hooks/usePlanificadorAgendamientoTv';
import { CacheBaseKeysPreventaEnum } from '@/actions/app';
import { useEffect } from 'react';
import { useAgendamientoVentasStore } from '@/store/app';
import { useGenericPATCH } from '@/actions/shared';
import { reAgendamientoTicketVisitaFormSchema } from '@/shared/utils/validation-schemas/app/tickets/ticket.schema';

export const returnUrlTicketVisitaTecnico = ROUTER_PATHS.tecnico.ticketsNav;

export interface SaveRecoordinacionTicketVisitaProps {
  titleNode: React.ReactNode;
  ticket?: Ticket;
}

export type SaveFormDataAgendaTicketsVisita = CreateTicketParamsBase &
  Partial<SolicitudServicio> &
  Partial<Ticket> & {
    // helpers
    provinceName?: string;
    cityName?: string;
    zoneName?: string;
    sectorName?: string;
    planName?: string;
    entidadFinancieraName?: string;
    tarjetaName?: string;
    paymentMethodName?: string;

    rawFlota?: Flota;
    flotaUUID?: string;
  };

const SaveRecoordinacionTicketVisita: React.FC<
  SaveRecoordinacionTicketVisitaProps
> = ({ titleNode, ticket }) => {
  ///* global state ---------------------
  const setActiveTicketVisita = useAgendamientoVentasStore(
    s => s.setActiveTicketVisita,
  );

  ///* form ---------------------
  const form = useForm<SaveFormDataAgendaTicketsVisita>({
    resolver: yupResolver(reAgendamientoTicketVisitaFormSchema) as any,
  });

  const { handleSubmit, reset } = form;

  usePlanificadorAgendamientoTv({
    cackeKey: `${CacheBaseKeysPreventaEnum.HORARIO_VISITA_AGENDA_VENTAS}_${ticket?.uuid!}`,
    form,
  });

  ///* states ---------------------
  // const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* effects ---------------------
  useEffect(() => {
    if (!ticket?.id) return;
    const { solicitud_servicio_data, ...rest } = ticket || {};
    setActiveTicketVisita(ticket);

    reset({
      ...rest,
      ...solicitud_servicio_data,

      sectorName: solicitud_servicio_data?.sector_data?.name,
      zoneName: solicitud_servicio_data?.zona_data?.name,
      cityName: solicitud_servicio_data?.ciudad_data?.name,
      provinceName: solicitud_servicio_data?.provincia_data?.name,
      flotaUUID: ticket?.flota_data?.uuid,
      zona: ticket?.linea_servicio_data?.solicitud_servicio_data?.zona,
    } as SaveFormDataAgendaTicketsVisita);
  }, [ticket, reset, setActiveTicketVisita]);

  const uploadTicketVisitaTecnico = useGenericPATCH<
    CreateRecoordinacionTicketVisitaFormData,
    Ticket
  >(`/ticket-tecnico/rearrange/${ticket?.id!}/`, TicketTSQEnum.TICKETS, {
    customMessageToast: 'Ticket de visita recoordinado con éxito',
    // navigate,
    returnUrl: returnUrlTicketVisitaTecnico,
    customOnSuccess() {
      navigate(returnUrlTicketVisitaTecnico);
    },
  });

  const onSave = async (data: SaveFormDataAgendaTicketsVisita) => {
    uploadTicketVisitaTecnico.mutate({
      flota: data.flota,
      fecha: data.fecha_instalacion,
      hora: data.hora_instalacion,
    });
  };

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      // action btns
      onCancel={() => navigate(returnUrlTicketVisitaTecnico)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Faltan campos requeridos: ${keys}`);
      })}
      // tabs
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Ubicacion" value={2} {...a11yProps(2)} />
          <Tab label="Planificador" value={3} {...a11yProps(3)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <RecoordinacionAsigTicketVisitaFormTab ticket={ticket!} />
      </CustomTabPanel>

      {/* ========================= Ubicacion ========================= */}
      <CustomTabPanel index={2} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <RecoordinacionUbicacionTicketVisitaFormTab ticket={ticket!} />
      </CustomTabPanel>

      {/* ========================= Agenda - Planificador ========================= */}
      <CustomTabPanel index={3} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <TicketVisitaSaveAgenda form={form} ticket={ticket!} />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveRecoordinacionTicketVisita;

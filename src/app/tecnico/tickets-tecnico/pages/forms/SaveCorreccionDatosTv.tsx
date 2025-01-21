import { Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  getKeysFormErrorsMessage,
  gridSize,
  gridSizeMdLg9,
  TipoProductoEnumChoice,
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
import { ROUTER_PATHS } from '@/router/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketTecnicoFormSchema } from '@/shared/utils/validation-schemas/app/tickets/ticket-tecnico.schema';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import {
  CreateTicketParamsBase,
  TicketTSQEnum,
  UploadTicketVisitaCorreccionData,
} from '@/actions/app/tickets';
import { useInstalacionesStore } from '@/store/app';
import { useUiConfirmModalStore, useUiStore } from '@/store/ui';
import { useGenericPATCH } from '@/actions/shared';
import { EquiposUtilizadosOTTableType } from '../../shared/components/form/EquiposUtilizadosTicketAsignFormPart';
import { MaterialesUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import InstallAsigTecnicoTicketFormTab from '../../shared/components/form/InstallAsigTecnicoTicketFormTab';
import InstallAsigTicketSolucionFormTab from '../../shared/components/form/InstallAsigTicketSolucionFormTab';
import { useEffect } from 'react';

export const returnUrlTicketVisitaTecnico = ROUTER_PATHS.tecnico.ticketsNav;

export interface SaveCorreccionDatosTvProps {
  titleNode: React.ReactNode;
  ticket?: Ticket;
}

export type InstallAsignTicketTecnicoSaveFormData = CreateTicketParamsBase & {};

const SaveCorreccionDatosTv: React.FC<SaveCorreccionDatosTvProps> = ({
  titleNode,
  ticket,
}) => {
  ///* mutations ---------------------
  const uploadTicketVisitaTecnico = useGenericPATCH<
    UploadTicketVisitaCorreccionData,
    Ticket
  >(`/ticket-tecnico/fix/${ticket?.id!}/`, TicketTSQEnum.TICKETS, {
    customMessageToast: 'Informacion corregida enviada con éxito',
    // navigate,
    returnUrl: returnUrlTicketVisitaTecnico,
    customOnSuccess() {
      clearAll();
      navigate(returnUrlTicketVisitaTecnico);
    },
  });

  ///* global states ---------------------
  const clearAll = useInstalacionesStore(state => state.clearAll);
  const setIsGlobalLoading = useUiStore(state => state.setIsGlobalLoading);

  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form ---------------------
  const form = useForm<Ticket>({
    defaultValues: {
      solucion_tecnico: ticket?.solucion_tecnico,
      observacion_extra_solucion_visita:
        ticket?.observacion_extra_solucion_visita,
      modelo_fibra_utilizada: ticket?.modelo_fibra_utilizada,
      punta_inicial_fibra: ticket?.punta_inicial_fibra,
      punta_final_fibra: ticket?.punta_final_fibra,
      equipos_utilizados: ticket?.equipos_utilizados,
      materiales_utilizados: ticket?.materiales_utilizados,
    },
    resolver: yupResolver(ticketTecnicoFormSchema) as any,
  });

  const { handleSubmit } = form;

  useEffect(() => {
    console.log('ticket?.equipos_utilizados!', ticket?.equipos_utilizados!);
    form.setValue('equipos_utilizados', ticket?.equipos_utilizados!);
  });
  ///* states ---------------------
  // const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* handlers ---------------------
  const onSave = async (data: InstallAsignTicketTecnicoSaveFormData) => {
    setConfirmDialog({
      isOpen: true,
      title:
        'Esta seguro de que la informacion ha sido actualizada correctamente?',
      onConfirm: async () => {
        setConfirmDialogIsOpen(false);
        const equiposUtilizados: EquiposUtilizadosOTTableType[] =
          useInstalacionesStore.getState().equiposUtilizados;
        const materialesUtilizados: MaterialesUtilizadosOTTableType[] =
          useInstalacionesStore.getState().materialesUtilizados;
        const selectedFibraModel =
          useInstalacionesStore.getState().selectedFibraModel;

        // validate series in equipos ----------
        let thereAreEmptySeries = false;
        let equipo: EquiposUtilizadosOTTableType = null as any;
        let thereAreEquiposWithoutQuantity = false;
        equiposUtilizados.forEach(eq => {
          if (eq.containsSeries && !eq.savedSeries.length) {
            thereAreEmptySeries = true;
            equipo = eq;
          }
          if (!eq.usedQuantity) {
            thereAreEquiposWithoutQuantity = true;
            equipo = eq;
          }
        });
        if (thereAreEmptySeries)
          return ToastWrapper.error(
            `No se han seleccionado series en los equipos: ${equipo.producto_data?.codigo}`,
          );
        if (thereAreEquiposWithoutQuantity)
          return ToastWrapper.error(
            `No se puede guardar equipos sin cantidad utilizada: ${equipo.producto_data?.codigo}`,
          );

        // validate materiales =================
        let thereAreMaterialsWithoutQuantity = false;
        let material: MaterialesUtilizadosOTTableType = null as any;
        console.log('materialesUtilizados', materialesUtilizados);
        materialesUtilizados.forEach(mat => {
          if (!mat.usedQuantity) {
            thereAreMaterialsWithoutQuantity = true;
            material = mat;
          }
        });
        if (thereAreMaterialsWithoutQuantity)
          return ToastWrapper.error(
            `No se puede guardar materiales sin cantidad utilizada: ${material.producto_data?.codigo}`,
          );

        // fibra -------------
        const fibraItems: MaterialesUtilizadosOTTableType[] =
          materialesUtilizados.filter(
            mat => mat?.producto_data?.tipo === TipoProductoEnumChoice.FIBRA,
          ) || [];
        if (fibraItems.length > 1) {
          return ToastWrapper.error(
            'Solo se puede seleccionar un item de tipo FIBRA',
          );
        }

        const firstFibra = fibraItems?.[0];

        if (firstFibra) {
          if (firstFibra?.usedQuantity > 1 && firstFibra.isFibraPreconect) {
            return ToastWrapper.error(
              'Solo se puede seleccionar un item de tipo FIBRA modelo Preconecteriorizada',
            );
          }

          if (firstFibra.modelo_data?.codigo !== selectedFibraModel) {
            return ToastWrapper.error(
              `El modelo de la fibra no coincide con el modelo seleccionado. Requedido: ${selectedFibraModel} - Provisto: ${firstFibra.modelo_data?.codigo}`,
            );
          }
        }

        ///* upload images -------
        // validate imgs

        setIsGlobalLoading(true);
        // upload images ---
        // required

        uploadTicketVisitaTecnico.mutate({
          solucion_tecnico: data.solucion_tecnico,
          observacion_extra_solucion_visita:
            data.observacion_extra_solucion_visita,

          asunto_ticket_tecnico: ticket?.asunto_ticket,
        });
      },
    });
  };

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      // action btns
      onCancel={() => navigate(returnUrlTicketVisitaTecnico)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(`Error en: ${getKeysFormErrorsMessage(errors)}`);
      })}
      // tabs
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          {/* <Tab label="Materiales" value={2} {...a11yProps(2)} /> */}
          <Tab
            label="Informacion sobre la visita"
            value={3}
            {...a11yProps(3)}
          />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <CustomCardAlert
          sizeType="medium"
          alertSeverity="info"
          alertTitle="OBSERVACIONES"
          alertContentNode={<>{ticket?.observacion_correccion}</>}
        />
        <InstallAsigTecnicoTicketFormTab form={form} ticket={ticket!} />
      </CustomTabPanel>

      {/* ========================= Materiales ========================= */}
      {/* <CustomTabPanel index={2} value={tabValue}>
        <InstallAsigTicketMaterialesFormTab form={form} ticket={ticket!} />
      </CustomTabPanel> */}
      {/* ========================= Informacion sobre la visita ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <InstallAsigTicketSolucionFormTab form={form} ticket={ticket!} />
      </CustomTabPanel>

      {/* ========================= modals ========================= */}
      {/* <PrerejectInstalacionAsignadaOTModal
        open={isOpenRejectModal}
        onClose={() => setIsOpenRejectModal(false)}
        ordenTrabajo={ordentrabajo!}
      /> */}
    </TabsFormBoxScene>
  );
};

export default SaveCorreccionDatosTv;

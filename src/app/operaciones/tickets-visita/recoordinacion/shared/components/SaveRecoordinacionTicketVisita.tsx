import { Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  Flota,
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
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketTecnicoFormSchema } from '@/shared/utils/validation-schemas/app/tickets/ticket-tecnico.schema';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { CreateTicketParamsBase } from '@/actions/app/tickets';
import RecoordinacionAsigTicketVisitaFormTab from './form/RecoordinacionAsigTicketVisitaFormTab';
import RecoordinacionUbicacionTicketVisitaFormTab from './form/RecoordinacionUbicacionTicketVisitaFormTab';

export const returnUrlTicketVisitaTecnico = ROUTER_PATHS.tecnico.ticketsNav;

export interface SaveRecoordinacionTicketVisitaProps {
  titleNode: React.ReactNode;
  ticket?: Ticket;
}

export type SaveFormDataTicketsVisita = CreateTicketParamsBase & {
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

export type InstallAsignTicketTecnicoSaveFormData = CreateTicketParamsBase & {};

const SaveRecoordinacionTicketVisita: React.FC<
  SaveRecoordinacionTicketVisitaProps
> = ({ titleNode, ticket }) => {
  ///* form ---------------------
  const form = useForm<Ticket>({
    resolver: yupResolver(ticketTecnicoFormSchema) as any,
  });

  const { handleSubmit } = form;
  ///* states ---------------------
  // const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* handlers ---------------------
  const onSave = async (data: InstallAsignTicketTecnicoSaveFormData) => {
    console.log('data', data);
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
    </TabsFormBoxScene>
  );
};

export default SaveRecoordinacionTicketVisita;

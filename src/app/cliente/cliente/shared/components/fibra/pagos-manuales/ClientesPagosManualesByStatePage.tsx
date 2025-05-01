import { EstadoTareaEnumChoice, LineaServicio, Rubro } from '@/shared';
import { CustomTable } from '@/shared/components';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ClienteInfoPagoManualModal from './ClienteInfoPagoManualModal';
import axios from 'axios';

export type ClientesPagosManualesByStatePageProps = {
  state?: EstadoTareaEnumChoice;
  serviceLine: LineaServicio;
};

const ClientesPagosManualesByStatePage: React.FC<
  ClientesPagosManualesByStatePageProps
> = ({ serviceLine }) => {
  const [open, setOpen] = useState(false);

  // const navigate = useNavigate();

  ///* global state -------------------------

  ///* table -------------------------
  // server side filters - colums table

  ///* mutations -------------------------
  // const createPagoManual = useGenericPOST<any, any>(
  //   '/nuevo-pago/',
  //   RubroTSQEnum.RUBROS,
  //   {
  //     customMessageToast: 'Rubro de servicio pagado correctamente',
  //     customOnSuccess() {},
  //     customOnSettled() {
  //       setConfirmDialogIsOpen(false);
  //     },
  //   },
  // );

  const [selectedRubro, setSelectedRubro] = useState<Rubro | null>(null);

  ///* handlers ---------------------
  const onEdit = (rubro: Rubro) => {
    setSelectedRubro(rubro);
    setOpen(true);
    // setConfirmDialog({
    //   isOpen: true,
    //   title: 'Aplicar pago manual',
    //   subtitle: '¿Está seguro que desea realizar el pago manual?',
    //   onConfirm: () => {
    //     createPagoManual.mutate({
    //       contrapartida: rubro.cliente_data?.identificacion,
    //       linea: linea,
    //       deuda: rubro.valor_total,
    //       canalPago: 'WEB',
    //       fechaTransaccion: fechaTransaccion,
    //       ifi: 'S360',
    //     });
    //     setConfirmDialogIsOpen(false);
    //     // navigate(`${returnUrlClientesSuspendidosAsignadas}/${firstLine}`);
    //   },
    // });
  };

  const fetchAuthToken = async () => {
    try {
      const response = await axios.post(
        'http://192.168.10.107/api/v1/oauth/token/',
        {
          client_id: 'admin',
          client_secret: 'admin',
          grant_type: 'client_credentials',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error de Axios:', error.response?.data || error.message);
      }
      throw error;
    }
  };

  const fetchNuevaConsultaContrapartida = async (accessToken: string) => {
    try {
      const response = await axios.post(
        'http://192.168.10.107/api/v1/nueva-consulta-contrapartida/',
        {
          contrapartida: serviceLine?.cliente_data?.identificacion,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error de Axios:', error.response?.data || error.message);
      }
      throw error;
    }
  };

  // 1. Agrega un estado para guardar los datos de las líneas
  const [lineasData, setLineasData] = useState<any[]>([]);

  // 2. Crea columnas específicas para los datos de líneas
  const columnsLineasView = [
    {
      accessorKey: 'linea',
      header: 'Línea',
    },
    {
      accessorKey: 'deuda',
      header: 'Deuda',
    },
    {
      accessorKey: 'cliente',
      header: 'Cliente',
    },
    {
      accessorKey: 'direccion',
      header: 'Dirección',
    },
  ];

  // 3. Modifica el useEffect para guardar los datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenData = await fetchAuthToken();

        const consultaData = await fetchNuevaConsultaContrapartida(
          tokenData.access_token,
        );

        // Guarda las líneas en el estado
        if (consultaData?.lineas) {
          setLineasData(consultaData.lineas);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Grid item container xs={12}>
        {/* ================= table ================= */}
        {/* ================= Tabla de Líneas ================= */}
        <Grid item xs={12}>
          <CustomTable
            columns={columnsLineasView}
            data={lineasData}
            isLoading={false}
            isRefetching={false}
            enableManualFiltering={false}
            enableGlobalFilter={false}
            enableActionsColumn={true}
            editIconToolTipTitle="Gestionar"
            canEdit={true}
            onEdit={onEdit}
            arrowIcon
            showCustomButtonsSpaceEnd={true}
          />
        </Grid>

        {/* -------------- modals -------------- */}
        <ClienteInfoPagoManualModal
          open={open}
          onClose={() => setOpen(false)}
          rubro={selectedRubro!}
          serviceLine={serviceLine}
        />

        {/* <ScrollableDialogProps
          title="Editar Rubro de Servicio"
          open={open}
          onClose={handleClose}
          minWidth="81%"
          // confirm --------
          onConfirm={form.handleSubmit(onSave, errors => {
            const keys = getKeysFormErrorsMessage(errors);
            ToastWrapper.error(`Campos requeridos: ${keys}`);
          })}
          confirmVariantBtn="outlined"
          confirmTextBtn="Guardar"
          // // content --------
          contentNode={
            <>
            </>
          }
        /> */}
      </Grid>
    </>
  );
};

export default ClientesPagosManualesByStatePage;

import { EstadoTareaEnumChoice, getEnvs, LineaServicio, Rubro } from '@/shared';
import { CustomTable } from '@/shared/components';
import { Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ClienteInfoPagoManualModal from './ClienteInfoPagoManualModal';
import axios from 'axios';

const {
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_GRANT_TYPE,
  VITE_PAGOMANUAL_URL,
} = getEnvs();

export type ClientesPagosManualesByStatePageProps = {
  state?: EstadoTareaEnumChoice;
  serviceLine: LineaServicio;
};

const ClientesPagosManualesByStatePage: React.FC<
  ClientesPagosManualesByStatePageProps
> = ({ serviceLine }) => {
  const [open, setOpen] = useState(false);

  const [selectedRubro, setSelectedRubro] = useState<Rubro | null>(null);

  ///* handlers ---------------------
  const onEdit = (rubro: Rubro) => {
    setSelectedRubro(rubro);
    setOpen(true);
  };

  const fetchAuthToken = async () => {
    try {
      const response = await axios.post(
        `${VITE_PAGOMANUAL_URL}/oauth/token/`,
        {
          client_id: VITE_CLIENT_ID,
          client_secret: VITE_CLIENT_SECRET,
          grant_type: VITE_GRANT_TYPE,
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
        `${VITE_PAGOMANUAL_URL}/nueva-consulta-contrapartida/`,
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
  const fetchData = useCallback(async () => {
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
  }, [serviceLine?.cliente_data?.identificacion]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            rowCount={lineasData?.length}
            showCustomButtonsSpaceEnd={true}
          />
        </Grid>

        {/* -------------- modals -------------- */}
        <ClienteInfoPagoManualModal
          open={open}
          onClose={() => setOpen(false)}
          rubro={selectedRubro!}
          serviceLine={serviceLine}
          onSuccess={fetchData}
        />
      </Grid>
    </>
  );
};

export default ClientesPagosManualesByStatePage;

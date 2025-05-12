import {
  EstadoTareaEnumChoice,
  LineaServicio,
  Rubro,
  useLoaders,
} from '@/shared';
import { CustomTable } from '@/shared/components';
import { Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ClienteInfoPagoManualModal from './ClienteInfoReversoModal';
import axios from 'axios';
import { useFetchTransaccions } from '@/actions/app';
import { getEnvs } from '@/shared/utils/get-evns';

export type ClientesReversoByStatePageProps = {
  state?: EstadoTareaEnumChoice;
  serviceLine: LineaServicio;
};

const ClientesReversoByStatePage: React.FC<ClientesReversoByStatePageProps> = ({
  serviceLine,
}) => {
  const { VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_GRANT_TYPE } = getEnvs();

  const [open, setOpen] = useState(false);
  const [selectedRubro, setSelectedRubro] = useState<Rubro | null>(null);
  const [transaccionFiltrada, setTransaccionFiltrada] = useState<any>(null); // Nueva variable de estado

  const {
    data: TransaccionsPagingRes,
    isLoading: isTransaccionsLoading,
    isRefetching: isTransaccionsRefetching,
  } = useFetchTransaccions({
    params: {
      cliente: serviceLine?.cliente_data?.id!,
    },
  });

  const fetchAuthToken = async () => {
    try {
      const response = await axios.post(
        'https://s360-switch-transaccional.yiga5.com/api/v1/oauth/token/',
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

  const fetchTransacciones = async (
    accessToken: string,
    contrapartida: string,
  ) => {
    try {
      const response = await axios.get(
        `https://s360-switch-transaccional.yiga5.com/api/v1/transaccion/?numeroAutorizacion=${contrapartida}&reversado=false`,
        {
          headers: {
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

  const [transaccionesData, setTransaccionesData] = useState<any[]>([]);

  // Columnas de la tabla
  const columns = [
    {
      accessorKey: 'codigo',
      header: 'Código Transacción',
    },
    {
      accessorKey: 'service_code',
      header: 'Línea',
    },
    {
      accessorKey: 'monto',
      header: 'Monto',
      cell: (info: any) => `$${info.getValue()}`,
    },
    {
      accessorKey: 'tipo_transaccion',
      header: 'Tipo',
    },
    {
      accessorKey: 'estado_transaccion',
      header: 'Estado',
      cell: (info: any) => (
        <span
          style={{
            color: info.getValue() === 'COMPLETADO' ? 'green' : 'orange',
            fontWeight: 'bold',
          }}
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'payment_date',
      header: 'Fecha Pago',
      cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: 'numeroAutorizacion',
      header: 'N° Autorización',
    },
    {
      accessorKey: 'reversado',
      header: 'Reversado',
      cell: (info: any) => (info.getValue() ? 'Sí' : 'No'),
    },
  ];

  // Handler para editar
  const onEdit = (rowData: any) => {
    setSelectedRubro(rowData);
    setOpen(true);
  };

  // 3. Modifica el useEffect para guardar los datos
  const loadData = useCallback(async () => {
    if (!TransaccionsPagingRes?.data?.items?.length) return;

    try {
      const tokenData = await fetchAuthToken();
      const allTransacciones = [];

      // Recorrer todos los items y buscar sus transacciones
      for (const item of TransaccionsPagingRes.data.items) {
        if (item.numero_transaccion) {
          const transacciones = await fetchTransacciones(
            tokenData.access_token,
            item.numero_transaccion,
          );

          if (transacciones.data?.data?.length) {
            allTransacciones.push(...transacciones.data.data);
          }
        }
      }

      console.log('Transacciones encontradas:', allTransacciones);
      setTransaccionesData(allTransacciones);

      // Si hay transacciones, establecer la primera como filtrada
      if (allTransacciones.length > 0) {
        const numeroAutorizacion = allTransacciones[0].numeroAutorizacion;
        const transaccionEncontrada = TransaccionsPagingRes.data.items.find(
          (item: any) => item.numero_transaccion === numeroAutorizacion,
        );

        if (transaccionEncontrada) {
          setTransaccionFiltrada(transaccionEncontrada);
        }
      }
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
    }
  }, [TransaccionsPagingRes?.data?.items]);

  // 2. Actualiza el useEffect
  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    console.log('TransaccionsPagingRes', TransaccionsPagingRes);
  }, []);

  const isCustomLoading = isTransaccionsLoading || isTransaccionsRefetching;
  useLoaders(isCustomLoading);

  return (
    <>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <CustomTable
            columns={columns}
            data={transaccionesData}
            isLoading={isCustomLoading}
            isRefetching={false}
            enableManualFiltering={false}
            enableGlobalFilter={false}
            enableActionsColumn={true}
            editIconToolTipTitle="Reversar Pago"
            canEdit={true} // Solo permite editar si hay un rubro
            onEdit={onEdit}
            arrowIcon
            rowCount={transaccionesData?.length}
            showCustomButtonsSpaceEnd={true}
          />
        </Grid>

        <ClienteInfoPagoManualModal
          open={open}
          onClose={() => setOpen(false)}
          rubro={selectedRubro!}
          serviceLine={serviceLine}
          transaccionesData={transaccionesData}
          transaccionFiltrada={transaccionFiltrada}
          onSuccess={loadData}
        />
      </Grid>
    </>
  );
};

export default ClientesReversoByStatePage;

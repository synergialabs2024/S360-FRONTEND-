import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { LineaServicio, Rubro, useLoaders } from '@/shared';
import {
  CustomTextFieldNoForm,
  ScrollableDialogProps,
} from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { useRubroStore } from '@/store/app/rubros';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useGetTransaccion } from '@/actions/app';
import { toast } from 'react-toastify';
import { useState } from 'react';

export type ClienteInfoReversoModalProps = {
  open: boolean;
  onClose: () => void;
  rubro?: any;
  serviceLine: LineaServicio;
  transaccionesData: any;
  transaccionFiltrada: any;
};

export type RubrosClienteFormData = Partial<Rubro> & {
  // helpers to fetch items ------------
  bodega?: number;
  ubicacion?: number;
  categoria_producto?: number;
};

const ClienteInfoReversoModal: React.FC<ClienteInfoReversoModalProps> = ({
  open,
  onClose,
  rubro,
  serviceLine,
  transaccionFiltrada,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    isLoading: isTransactionLoading,
    isRefetching: isTransactionRefetching,
  } = useGetTransaccion(serviceLine?.cliente_data?.identificacion.toString()!);
  ///* global state --------------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAll);
  const clearAllItemsStore = useInstalacionesStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<FormData>({
    defaultValues: {},
  });
  ///* mutations --------------------------
  const createReverso = async (accessToken: string) => {
    setIsLoading(true);
    const fechaTransaccion = dayjs().format('YYYYMMDD');
    try {
      const response = await axios.post(
        'http://192.168.10.107/api/v1/nuevo-reverso/',
        {
          contrapartida: serviceLine?.cliente_data?.identificacion,
          linea: rubro?.service_code,
          idTransaccion: transaccionFiltrada?.id_switch,
          numeroAutorizacion: transaccionFiltrada?.numero_transaccion,
          valorPagado: rubro?.monto,
          fechaTransaccion: fechaTransaccion,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      toast.success('Reverso generado correctamente');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error de Axios:', error.response?.data || error.message);
      }
      toast.error('Ha ocurrido un error al generar el reverso');
      throw error;
    } finally {
      setIsLoading(false);
    }
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

  const handleClose = () => {
    form.reset();
    onClose();
    clearAllRubroStore();
    clearAllItemsStore();
  };

  // useEffect(() => {}, [rubro, serviceLine, transaccionesData]);

  const isCustomLoading = isTransactionLoading || isTransactionRefetching;
  useLoaders(isCustomLoading);

  return (
    <>
      <ScrollableDialogProps
        title={'Reverso Manual'}
        open={open}
        onClose={handleClose}
        minWidth="50%"
        // confirm --------
        onConfirm={async () => {
          try {
            const tokenData = await fetchAuthToken();
            await createReverso(tokenData.access_token);
            handleClose();
          } catch (error) {
            console.error('Error en onSave:', error);
          }
        }}
        confirmVariantBtn="outlined"
        confirmTextBtn="Generar Reverso"
        disabledConfirmBtn={isLoading}
        // // content --------
        contentNode={
          <>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <CustomTextFieldNoForm
                label="LINEA"
                value={rubro?.service_code}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="NUMERO AUDITORIA"
                value={rubro?.audit_number}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="NUMERO AUTORIZACION"
                value={rubro?.numeroAutorizacion}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="FECHA PAGO"
                value={rubro?.payment_date}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="VALOR TOTAL PAGADO"
                value={rubro?.monto}
                required={false}
                disabled
              />
            </Grid>
          </>
        }
      />
    </>
  );
};

export default ClienteInfoReversoModal;

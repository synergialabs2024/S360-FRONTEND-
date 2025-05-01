import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import {
  CustomTextFieldNoForm,
  ScrollableDialogProps,
} from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { useRubroStore } from '@/store/app/rubros';
import { Grid } from '@mui/material';
import axios from 'axios';
import { LineaServicio } from '@/shared';
import { useEffect } from 'react';

export type ClienteInfoPagoManualModalProps = {
  open: boolean;
  onClose: () => void;
  rubro?: any;
  serviceLine: LineaServicio;
};

export type RubrosClienteFormData = Partial<any> & {
  // helpers to fetch items ------------
  bodega?: number;
  ubicacion?: number;
  categoria_producto?: number;
};

const ClienteInfoPagoManualModal: React.FC<ClienteInfoPagoManualModalProps> = ({
  open,
  onClose,
  rubro,
  serviceLine,
}) => {
  ///* global state --------------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAll);
  const clearAllItemsStore = useInstalacionesStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<FormData>({
    defaultValues: {},
  });
  ///* mutations --------------------------
  const createPagoManual = async (accessToken: string) => {
    const fechaTransaccion = dayjs().format('YYYYMMDD');
    try {
      const response = await axios.post(
        'http://192.168.10.107/api/v1/nuevo-pago/',
        {
          contrapartida: serviceLine?.cliente_data?.identificacion,
          linea: rubro?.linea,
          deuda: rubro?.deuda,
          canalPago: 'WEB',
          fechaTransaccion: fechaTransaccion,
          numeroAutorizacion: 'S0000000020',
          ifi: '360',
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

  useEffect(() => {
    console.log('serviceLine', serviceLine);
  }, []);
  return (
    <>
      <ScrollableDialogProps
        title={'Crear Pago Manual'}
        open={open}
        onClose={handleClose}
        minWidth="50%"
        // confirm --------
        onConfirm={async () => {
          // const fechaTransaccion = dayjs().format('YYYYMMDD');
          // const partesContrato =
          //   rubro?.contrato_data?.numero_contrato?.split('-') || [];
          // const linea = partesContrato[1] || 'L1';

          try {
            const tokenData = await fetchAuthToken();

            await createPagoManual(tokenData.access_token);

            // Aquí puedes continuar con el resto de tu lógica usando el token
            /* createPagoManual.mutate({
              contrapartida: data.cliente_data?.identificacion,
              linea: linea,
              deuda: data.valor_total,
              canalPago: 'WEB',
              fechaTransaccion: fechaTransaccion,
              ifi: 'S360',
            }); */
            // createPagoManual.mutate({
            //   contrapartida: rubro?.cliente_data?.identificacion,
            //   linea: linea,
            //   deuda: rubro?.valor_total,
            //   canalPago: 'WEB',
            //   fechaTransaccion: fechaTransaccion,
            //   ifi: '360',
            // });
          } catch (error) {
            console.error('Error en onSave:', error);
            // Manejar el error según necesites
          }
        }}
        /* onConfirm={form.handleSubmit(onSave, errors => {
          const keys = getKeysFormErrorsMessage(errors);
          ToastWrapper.error(`Campos requeridos: ${keys}`);
        })} */
        confirmVariantBtn="outlined"
        confirmTextBtn="Generar Pago"
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
                label="RAZON SOCIAL"
                value={rubro?.cliente}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="LINEA"
                value={rubro?.linea}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="DEUDA"
                value={rubro?.deuda}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="DIRECCION"
                value={rubro?.direccion}
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

export default ClienteInfoPagoManualModal;

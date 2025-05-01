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
import { useEffect } from 'react';
import { useGetTransaccion } from '@/actions/app';

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
  transaccionesData,
  transaccionFiltrada,
}) => {
  const {
    data: transactionPagingRes,
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
    console.log('transactionPagingRes', transactionPagingRes);
    console.log(
      'transactionPagingRes?.data?.id_switch',
      transactionPagingRes?.data?.id_switch,
    );
    const fechaTransaccion = dayjs().format('YYYYMMDD');
    try {
      const response = await axios.post(
        'http://192.168.10.107/api/v1/nuevo-reverso/',
        {
          contrapartida: serviceLine?.cliente_data?.identificacion,
          linea: rubro?.service_code,
          idTransaccion: transaccionFiltrada?.id_switch,
          numeroAutorizacion: 'S000000019',
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error de Axios:', error.response?.data || error.message);
      }
      throw error;
    }
  };

  const fetchAuthToken = async () => {
    console.log('Entra');
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

  useEffect(() => {}, [rubro, serviceLine, transaccionesData]);

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
          // const fechaTransaccion = dayjs().format('YYYYMMDD');
          // const partesContrato =
          //   rubro?.contrato_data?.numero_contrato?.split('-') || [];
          // const linea = partesContrato[1] || 'L1';

          try {
            const tokenData = await fetchAuthToken();
            console.log('Token data:', tokenData);

            const pagoReverso = await createReverso(tokenData.access_token);
            console.log('pagoManual:', pagoReverso);

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
        confirmTextBtn="Generar Reverso"
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

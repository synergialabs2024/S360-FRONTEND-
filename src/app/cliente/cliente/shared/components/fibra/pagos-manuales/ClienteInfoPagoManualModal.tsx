import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { RubroTSQEnum } from '@/actions/app';
import { formatDate, Rubro } from '@/shared';
import {
  CustomTextFieldNoForm,
  ScrollableDialogProps,
} from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { useRubroStore } from '@/store/app/rubros';
import { Grid } from '@mui/material';
import { useGenericPOST } from '@/actions/shared';
import axios from 'axios';

export type ClienteInfoPagoManualModalProps = {
  open: boolean;
  onClose: () => void;
  rubro?: Rubro;
};

export type RubrosClienteFormData = Partial<Rubro> & {
  // helpers to fetch items ------------
  bodega?: number;
  ubicacion?: number;
  categoria_producto?: number;
};

const ClienteInfoPagoManualModal: React.FC<ClienteInfoPagoManualModalProps> = ({
  open,
  onClose,
  rubro,
}) => {
  ///* global state --------------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAll);
  const clearAllItemsStore = useInstalacionesStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<FormData>({
    defaultValues: {},
  });
  ///* mutations --------------------------
  const createPagoManual = useGenericPOST<any, any>(
    '/nuevo-pago/',
    RubroTSQEnum.RUBROS,
    {
      customMessageToast: 'Rubro de servicio pagado correctamente',
      customOnSuccess() {},
      customOnSettled() {
        onClose();
      },
    },
  );

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

  return (
    <>
      <ScrollableDialogProps
        title={'Crear Pago Manual'}
        open={open}
        onClose={handleClose}
        minWidth="50%"
        // confirm --------
        onConfirm={async () => {
          const fechaTransaccion = dayjs().format('YYYYMMDD');
          const partesContrato =
            rubro?.contrato_data?.numero_contrato?.split('-') || [];
          const linea = partesContrato[1] || 'L1';

          try {
            const tokenData = await fetchAuthToken();
            console.log('Token data:', tokenData);

            // Aquí puedes continuar con el resto de tu lógica usando el token
            /* createPagoManual.mutate({
              contrapartida: data.cliente_data?.identificacion,
              linea: linea,
              deuda: data.valor_total,
              canalPago: 'WEB',
              fechaTransaccion: fechaTransaccion,
              ifi: 'S360',
            }); */
            createPagoManual.mutate({
              contrapartida: rubro?.cliente_data?.identificacion,
              linea: linea,
              deuda: rubro?.valor_total,
              canalPago: 'WEB',
              fechaTransaccion: fechaTransaccion,
              ifi: '360',
            });
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
                value={rubro?.cliente_data?.razon_social}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="IDENTIFICACION"
                value={rubro?.cliente_data?.identificacion}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="NUMERO CONTRATO"
                value={rubro?.contrato_data?.numero_contrato}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="TIPO"
                value={rubro?.tipo_rubro}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="EMISION"
                value={
                  rubro?.fecha_emision ? formatDate(rubro?.fecha_emision) : ''
                }
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="VENCIMIENTO"
                value={
                  rubro?.fecha_vencimiento
                    ? formatDate(rubro?.fecha_vencimiento)
                    : ''
                }
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="NUM REFERENCIA"
                value={rubro?.numero_referencia}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="NUM RUBRO"
                value={rubro?.numero_rubro}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="CONCEPTO"
                value={rubro?.concepto}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="SUBTOTAL"
                value={rubro?.subtotal}
                required={false}
                disabled
              />
              <CustomTextFieldNoForm
                label="TAXES"
                value={rubro?.valor_taxes}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="VALOR TOTAL A PAGAR"
                value={rubro?.valor_total}
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

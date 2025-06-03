import { useForm } from 'react-hook-form';

import {
  CustomTextFieldNoForm,
  ScrollableDialogProps,
} from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { useRubroStore } from '@/store/app/rubros';
import { Grid } from '@mui/material';
import {
  EntidadFinanciera,
  getKeysFormErrorsMessage,
  pagoManualFormSchema,
  ToastWrapper,
} from '@/shared';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';

export type CambioOnuSacModalProps = {
  open: boolean;
  onClose: () => void;
  ticket: Ticket;
  onSuccess?: () => void;
};

export type SaveFormDataPagoManual = {
  entidad_financiera?: number;
  entidad_financiera_data?: EntidadFinanciera;
  numero_autorizacion?: string;
  code?: string;
};

const CambioOnuSacModal: React.FC<CambioOnuSacModalProps> = ({
  open,
  onClose,
  ticket,
  onSuccess,
}) => {
  const [isLoading] = useState(false);
  ///* global state --------------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAll);
  const clearAllItemsStore = useInstalacionesStore(s => s.clearAll);

  const generateRandomAuthorizationNumber = (): string => {
    const randomNumber = Math.floor(Math.random() * 10000000000); // Genera un número entre 0 y 9999999999
    const paddedNumber = randomNumber.toString().padStart(10, '0'); // Asegura que siempre tenga 10 dígitos
    return `S${paddedNumber}`;
  };

  ///* form --------------------------
  const form = useForm<SaveFormDataPagoManual>({
    resolver: yupResolver(pagoManualFormSchema) as any,
    defaultValues: {
      numero_autorizacion: generateRandomAuthorizationNumber(),
    },
  });

  ///* mutations --------------------------
  // const createPagoManual = async (accessToken: string) => {
  //   setIsLoading(true);
  //   const fechaTransaccion = dayjs().format('YYYYMMDD');
  //   try {
  //     const response = await axios.post(
  //       'https://s360-switch-transaccional.yiga5.com/api/v1/nuevo-pago/',
  //       {
  //         contrapartida: serviceLine?.cliente_data?.identificacion,
  //         linea: rubro?.linea,
  //         deuda: rubro?.deuda,
  //         canalPago: 'WEB',
  //         fechaTransaccion: fechaTransaccion,
  //         numeroAutorizacion: form.getValues().numero_autorizacion,
  //         ifi: form.getValues().code,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );
  //     toast.success('Pago manual generado correctamente');
  //     return response.data;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error('Error de Axios:', error.response?.data || error.message);
  //     }
  //     toast.error('Ha ocurrido un error al generar el pago manual');
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleClose = () => {
    form.reset();
    onClose();
    clearAllRubroStore();
    clearAllItemsStore();
  };

  ///* fetch data

  ///* handlers ---------------------
  const onSave = async () => {
    try {
      // const tokenData = await fetchAuthToken();
      // await createPagoManual(tokenData.access_token);
      handleClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error en onSave:', error);
    }
  };

  return (
    <>
      <ScrollableDialogProps
        title={'Crear Pago Manual'}
        open={open}
        onClose={handleClose}
        minWidth="50%"
        // confirm --------
        onConfirm={form.handleSubmit(onSave, errors => {
          const keys = getKeysFormErrorsMessage(errors);
          ToastWrapper.error(`Faltan campos: ${keys}`);
        })}
        confirmVariantBtn="outlined"
        confirmTextBtn="Generar Pago"
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
                label="RAZON SOCIAL"
                value={ticket?.asunto_ticket}
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

export default CambioOnuSacModal;

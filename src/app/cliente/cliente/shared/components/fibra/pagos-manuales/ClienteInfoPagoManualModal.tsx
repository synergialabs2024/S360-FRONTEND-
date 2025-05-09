import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import {
  CustomAutocomplete,
  CustomTextField,
  CustomTextFieldNoForm,
  ScrollableDialogProps,
} from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { useRubroStore } from '@/store/app/rubros';
import { Grid } from '@mui/material';
import axios from 'axios';
import {
  EntidadFinanciera,
  getKeysFormErrorsMessage,
  gridSizeMdLg6,
  LineaServicio,
  pagoManualFormSchema,
  ToastWrapper,
} from '@/shared';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useFetchEntidadFinancieras } from '@/actions/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { getEnvs } from '@/shared/utils/get-evns';

export type ClienteInfoPagoManualModalProps = {
  open: boolean;
  onClose: () => void;
  rubro?: any;
  serviceLine: LineaServicio;
  onSuccess?: () => void;
};

export type SaveFormDataPagoManual = {
  entidad_financiera?: number;
  entidad_financiera_data?: EntidadFinanciera;
  numero_autorizacion?: string;
  code?: string;
};

const ClienteInfoPagoManualModal: React.FC<ClienteInfoPagoManualModalProps> = ({
  open,
  onClose,
  rubro,
  serviceLine,
  onSuccess,
}) => {
  const { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE } = getEnvs();

  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
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

  const { errors } = form.formState;

  ///* mutations --------------------------
  const createPagoManual = async (accessToken: string) => {
    setIsLoading(true);
    const fechaTransaccion = dayjs().format('YYYYMMDD');
    try {
      const response = await axios.post(
        'https://s360-switch-transaccional.yiga5.com/api/v1/nuevo-pago/',
        {
          contrapartida: serviceLine?.cliente_data?.identificacion,
          linea: rubro?.linea,
          deuda: rubro?.deuda,
          canalPago: 'WEB',
          fechaTransaccion: fechaTransaccion,
          numeroAutorizacion: form.getValues().numero_autorizacion,
          ifi: form.getValues().code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      toast.success('Pago manual generado correctamente');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error de Axios:', error.response?.data || error.message);
      }
      toast.error('Ha ocurrido un error al generar el pago manual');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuthToken = async () => {
    try {
      const response = await axios.post(
        'https://s360-switch-transaccional.yiga5.com/api/v1/oauth/token/',
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: GRANT_TYPE,
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

  ///* fetch data
  const {
    data: entidadFinancierasPaging,
    isLoading: isLoadingEntidadFinancieras,
    isRefetching: isRefetchingEntidadFinancieras,
  } = useFetchEntidadFinancieras({
    params: {
      page_size: 900,
    },
  });

  ///* handlers ---------------------
  const onSave = async () => {
    try {
      const tokenData = await fetchAuthToken();
      await createPagoManual(tokenData.access_token);
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

              <CustomAutocomplete<EntidadFinanciera>
                label="Entidad financiera"
                name="entidad_financiera"
                // options
                options={entidadFinancierasPaging?.data?.items || []}
                valueKey="name"
                actualValueKey="id"
                defaultValue={form.getValues().entidad_financiera}
                isLoadingData={
                  isLoadingEntidadFinancieras || isRefetchingEntidadFinancieras
                }
                // vaidation
                control={form.control}
                error={errors.entidad_financiera}
                helperText={errors.entidad_financiera?.message}
                size={gridSizeMdLg6}
                onChangeRawValue={e => {
                  form.setValue('code', e.code);
                  setCode(e.code);
                }}
              />

              {form.watch('code') ? (
                <>
                  <CustomTextFieldNoForm
                    label="IFI"
                    value={code}
                    required={false}
                    disabled
                  />

                  <CustomTextField
                    label="Numero authorizacion"
                    name="numero_autorizacion"
                    control={form.control}
                    defaultValue={form.getValues().numero_autorizacion}
                    error={errors.numero_autorizacion}
                    helperText={errors.numero_autorizacion?.message}
                  />
                </>
              ) : (
                <></>
              )}
            </Grid>
          </>
        }
      />
    </>
  );
};

export default ClienteInfoPagoManualModal;

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { CreateSaldoClientePart, useCreateSaldo } from '@/actions/app';
import {
  getKeysFormErrorsMessage,
  LineaServicio,
  Saldo,
  saldoFormSchema,
  ToastWrapper,
} from '@/shared';
import {
  CustomNumberTextField,
  CustomTextArea,
  ScrollableDialogProps,
} from '@/shared/components';

export type ClienteFibraCreateSaldoModalProps = {
  serviceLine?: LineaServicio;
  open: boolean;
  onClose: () => void;
};

type FormData = Partial<Saldo> & {};

const ClienteFibraCreateSaldoModal: React.FC<
  ClienteFibraCreateSaldoModalProps
> = ({ onClose, open, serviceLine }) => {
  ///* form ---------------------
  const form = useForm<FormData>({
    resolver: yupResolver(saldoFormSchema as any),
  });
  const { errors } = form.formState;

  ///* mutations ---------------------
  const createSaldo = useCreateSaldo<CreateSaldoClientePart>({
    customMessageToast: 'Saldo creado con éxito',
  });

  ///* handlers ---------------------
  const onSave = (data: FormData) => {
    createSaldo.mutate({
      monto: data.monto!,
      descripcion: data.descripcion!,
      linea_servicio: serviceLine?.id!,
      cliente: serviceLine?.cliente!,
    });
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title="Crear saldo"
        onClose={handleClose}
        onConfirm={form.handleSubmit(onSave, errors => {
          const keys = getKeysFormErrorsMessage(errors);
          ToastWrapper.error(`Faltan campos: ${keys}`);
        })}
        contentNode={
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Aquí puedes agregar saldos al cliente{' '}
                <b>{serviceLine?.cliente_data?.razon_social}</b> en el contrato{' '}
                <b>{serviceLine?.contrato_data?.numero_contrato}</b>, ya sea un
                salfo a favor del cliente o descuento (Ejm.: -100), o un saldo
                en contra (Ejm.: 100).
              </Typography>
            </Grid>

            <CustomNumberTextField
              label="Monto"
              name="monto"
              control={form.control}
              defaultValue={form.getValues().monto}
              error={errors.monto}
              helperText={errors.monto?.message}
              min={-9999}
            />
            <CustomTextArea
              label="Descripción"
              name="descripcion"
              control={form.control}
              defaultValue={form.getValues().descripcion}
              error={errors.descripcion}
              helperText={errors.descripcion?.message}
              required={false}
            />
          </Grid>
        }
      />
    </>
  );
};

export default ClienteFibraCreateSaldoModal;

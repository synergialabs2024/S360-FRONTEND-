import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateTransaccionParamsBase,
  useCreateTransaccion,
  useUpdateTransaccion,
} from '@/actions/app';
import { ToastWrapper } from '@/shared';
import {
  CustomNumberTextField,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { Transaccion } from '@/shared/interfaces';
import {
  getKeysFormErrorsMessage,
  transaccionFormSchema,
} from '@/shared/utils';
import { returnUrlTransaccionsPage } from '../../../pages/tables/TransaccionsPage';

export interface SaveTransaccionProps {
  title: string;
  transaccion?: Transaccion;
}

type SaveFormData = CreateTransaccionParamsBase & {};

const SaveTransaccion: React.FC<SaveTransaccionProps> = ({
  title,
  transaccion,
}) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(transaccionFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations ---------------------
  const createTransaccionMutation = useCreateTransaccion({
    navigate,
    returnUrl: returnUrlTransaccionsPage,
    enableErrorNavigate: false,
  });
  const updateTransaccionMutation =
    useUpdateTransaccion<CreateTransaccionParamsBase>({
      navigate,
      returnUrl: returnUrlTransaccionsPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (transaccion?.id) {
      updateTransaccionMutation.mutate({ id: transaccion.id!, data });
      return;
    }

    ///* create
    createTransaccionMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!transaccion?.id) return;
    reset(transaccion);
  }, [transaccion, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTransaccionsPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomTextField
        label="Monto"
        name="monto"
        control={form.control}
        defaultValue={form.getValues().monto}
        error={errors.monto}
        helperText={errors.monto?.message}
        size={gridSizeMdLg6}
      />

      <CustomNumberTextField
        label="Rubro"
        name="rubro"
        control={form.control}
        defaultValue={form.getValues().rubro}
        error={errors.rubro}
        helperText={errors.rubro?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Metodo pago"
        name="metodo_pago"
        control={form.control}
        defaultValue={form.getValues().metodo_pago}
        error={errors.metodo_pago}
        helperText={errors.metodo_pago?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Cliente"
        name="cliente"
        control={form.control}
        defaultValue={form.getValues().cliente}
        error={errors.cliente}
        helperText={errors.cliente?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Linea servicio"
        name="linea_servicio"
        control={form.control}
        defaultValue={form.getValues().linea_servicio}
        error={errors.linea_servicio}
        helperText={errors.linea_servicio?.message}
        size={gridSizeMdLg6}
        min={0}
      />
    </SingleFormBoxScene>
  );
};

export default SaveTransaccion;

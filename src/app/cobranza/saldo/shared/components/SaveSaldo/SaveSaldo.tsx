import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateSaldoParamsBase,
  useCreateSaldo,
  useUpdateSaldo,
} from '@/actions/app';
import { ToastWrapper } from '@/shared';
import {
  CustomDatePicker,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { Saldo } from '@/shared/interfaces';
import { getKeysFormErrorsMessage, saldoFormSchema } from '@/shared/utils';
import { returnUrlSaldosPage } from '../../../pages/tables/SaldosPage';

export interface SaveSaldoProps {
  title: string;
  saldo?: Saldo;
}

type SaveFormData = CreateSaldoParamsBase & {};

const SaveSaldo: React.FC<SaveSaldoProps> = ({ title, saldo }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(saldoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations ---------------------
  const createSaldoMutation = useCreateSaldo({
    navigate,
    returnUrl: returnUrlSaldosPage,
    enableErrorNavigate: false,
  });
  const updateSaldoMutation = useUpdateSaldo<CreateSaldoParamsBase>({
    navigate,
    returnUrl: returnUrlSaldosPage,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (saldo?.id) {
      updateSaldoMutation.mutate({ id: saldo.id!, data });
      return;
    }

    ///* create
    createSaldoMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!saldo?.id) return;
    reset(saldo);
  }, [saldo, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSaldosPage)}
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

      <CustomDatePicker
        label="Fecha consumo"
        name="fecha_consumo"
        control={form.control}
        defaultValue={form.getValues().fecha_consumo!}
        error={errors.fecha_consumo}
        helperText={errors.fecha_consumo?.message}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveSaldo;

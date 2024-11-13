import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateRubroParamsBase,
  useCreateRubro,
  useUpdateRubro,
} from '@/actions/app';
import { ToastWrapper } from '@/shared';
import {
  CustomDatePicker,
  CustomNumberTextField,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { Rubro } from '@/shared/interfaces';
import { getKeysFormErrorsMessage, rubroFormSchema } from '@/shared/utils';
import { returnUrlRubrosPage } from '../../../pages/tables/RubrosPage';

// TODO: implement this RUBROS form in actual page

export interface SaveRubroProps {
  title: string;
  rubro?: Rubro;
}

type SaveFormData = CreateRubroParamsBase & {};

const SaveRubro: React.FC<SaveRubroProps> = ({ title, rubro }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(rubroFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations ---------------------
  const createRubroMutation = useCreateRubro({
    navigate,
    returnUrl: returnUrlRubrosPage,
    enableErrorNavigate: false,
  });
  const updateRubroMutation = useUpdateRubro<CreateRubroParamsBase>({
    navigate,
    returnUrl: returnUrlRubrosPage,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (rubro?.id) {
      updateRubroMutation.mutate({ id: rubro.id!, data });
      return;
    }

    ///* create
    createRubroMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!rubro?.id) return;
    reset(rubro);
  }, [rubro, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlRubrosPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomTextField
        label="Concepto"
        name="concepto"
        control={form.control}
        defaultValue={form.getValues().concepto}
        error={errors.concepto}
        helperText={errors.concepto?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Subtotal"
        name="subtotal"
        control={form.control}
        defaultValue={form.getValues().subtotal}
        error={errors.subtotal}
        helperText={errors.subtotal?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Valor taxes"
        name="valor_taxes"
        control={form.control}
        defaultValue={form.getValues().valor_taxes}
        error={errors.valor_taxes}
        helperText={errors.valor_taxes?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Valor total"
        name="valor_total"
        control={form.control}
        defaultValue={form.getValues().valor_total}
        error={errors.valor_total}
        helperText={errors.valor_total?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Valor ice"
        name="valor_ice"
        control={form.control}
        defaultValue={form.getValues().valor_ice}
        error={errors.valor_ice}
        helperText={errors.valor_ice?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Valor pagado"
        name="valor_pagado"
        control={form.control}
        defaultValue={form.getValues().valor_pagado}
        error={errors.valor_pagado}
        helperText={errors.valor_pagado?.message}
        size={gridSizeMdLg6}
      />

      <CustomDatePicker
        label="Fecha pago"
        name="fecha_pago"
        control={form.control}
        defaultValue={form.getValues().fecha_pago}
        error={errors.fecha_pago}
        helperText={errors.fecha_pago?.message}
        size={gridSizeMdLg6}
      />

      <CustomDatePicker
        label="Fecha emision"
        name="fecha_emision"
        control={form.control}
        defaultValue={form.getValues().fecha_emision}
        error={errors.fecha_emision}
        helperText={errors.fecha_emision?.message}
        size={gridSizeMdLg6}
      />

      <CustomDatePicker
        label="Fecha vencimiento"
        name="fecha_vencimiento"
        control={form.control}
        defaultValue={form.getValues().fecha_vencimiento}
        error={errors.fecha_vencimiento}
        helperText={errors.fecha_vencimiento?.message}
        size={gridSizeMdLg6}
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

      <CustomNumberTextField
        label="Contrato"
        name="contrato"
        control={form.control}
        defaultValue={form.getValues().contrato}
        error={errors.contrato}
        helperText={errors.contrato?.message}
        size={gridSizeMdLg6}
        min={0}
      />
    </SingleFormBoxScene>
  );
};

export default SaveRubro;

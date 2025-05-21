import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  a11yProps,
  CustomTabPanel,
  CustomTextArea,
  CustomTextField,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import {
  useTabsOnly,
  gridSizeMdLg4,
  gridSizeMdLg6,
  gridSizeMdLg10,
  gridSizeMdLg12,
  TransaccionPichinchaPago,
  transaccionpichinchapagoFormSchema,
} from '@/shared';
import {
  useCreateTransaccionPichinchaPago,
  useUpdateTransaccionPichinchaPago,
  CreateTransaccionPichinchaPagoParamsBase,
} from '@/actions/app';
import { returnUrlTransaccionPichinchaPagoPage } from '../../../pages/tables/TransaccionPichinchaPagoPage';
import { Tab } from '@mui/material';

export interface SaveTransaccionPichinchaPagoProps {
  title: string;
  tpp?: TransaccionPichinchaPago;
}

type SaveFormData = CreateTransaccionPichinchaPagoParamsBase & {};

const SaveTransaccionPichinchaPago: React.FC<
  SaveTransaccionPichinchaPagoProps
> = ({ title, tpp }) => {
  ///* hooks ----------------
  const navigate = useNavigate();

  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(transaccionpichinchapagoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createTransaccionPichinchaPagoMutation =
    useCreateTransaccionPichinchaPago({
      navigate,
      returnUrl: returnUrlTransaccionPichinchaPagoPage,
      enableErrorNavigate: false,
    });
  const updateTransaccionPichinchaPagoMutation =
    useUpdateTransaccionPichinchaPago<CreateTransaccionPichinchaPagoParamsBase>(
      {
        navigate,
        returnUrl: returnUrlTransaccionPichinchaPagoPage,
      },
    );

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (tpp?.id) {
      updateTransaccionPichinchaPagoMutation.mutate({ id: tpp.id!, data });
      return;
    }

    ///* create
    createTransaccionPichinchaPagoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!tpp?.id) return;
    reset(tpp);
  }, [tpp, reset]);

  return (
    <TabsFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTransaccionPichinchaPagoPage)}
      onSave={handleSubmit(onSave, () => {})}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Primero" value={1} {...a11yProps(1)} />
          <Tab label="Segundo" value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
      formSize={gridSizeMdLg10}
    >
      <CustomTabPanel value={tabValue} index={1} ptGrid="0">
        <CustomTextField
          label="Id Sobre"
          name="id_sobre"
          control={form.control}
          defaultValue={form.getValues().id_sobre}
          error={errors.id_sobre}
          helperText={errors.id_sobre?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Id Item"
          name="id_item"
          control={form.control}
          defaultValue={form.getValues().id_item}
          error={errors.id_item}
          helperText={errors.id_item?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Estado"
          name="estado"
          control={form.control}
          defaultValue={form.getValues().estado}
          error={errors.estado}
          helperText={errors.estado?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Pais Banco Cuenta"
          name="pais_banco_cuenta"
          control={form.control}
          defaultValue={form.getValues().pais_banco_cuenta}
          error={errors.pais_banco_cuenta}
          helperText={errors.pais_banco_cuenta?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Banco"
          name="banco"
          control={form.control}
          defaultValue={form.getValues().banco}
          error={errors.banco}
          helperText={errors.banco?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Numero Cuenta"
          name="numero_cuenta"
          control={form.control}
          defaultValue={form.getValues().numero_cuenta}
          error={errors.numero_cuenta}
          helperText={errors.numero_cuenta?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Forma Pago"
          name="formapago"
          control={form.control}
          defaultValue={form.getValues().formapago}
          error={errors.formapago}
          helperText={errors.formapago?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Tipo Pago"
          name="tipo_pago"
          control={form.control}
          defaultValue={form.getValues().tipo_pago}
          error={errors.tipo_pago}
          helperText={errors.tipo_pago?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Moneda"
          name="moneda"
          control={form.control}
          defaultValue={form.getValues().moneda}
          error={errors.moneda}
          helperText={errors.moneda?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Valor"
          name="valor"
          control={form.control}
          defaultValue={form.getValues().valor}
          error={errors.valor}
          helperText={errors.valor?.message}
        />
        <CustomTextArea
          label="Mensaje"
          name="mensaje"
          control={form.control}
          defaultValue={form.getValues().mensaje}
          error={errors.mensaje}
          helperText={errors.mensaje?.message}
          size={gridSizeMdLg12}
        />

        <CustomTextField
          label="Valor PROCC"
          name="valor_procc"
          control={form.control}
          defaultValue={form.getValues().valor_procc}
          error={errors.valor_procc}
          helperText={errors.valor_procc?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Fecha Proceso"
          name="fecha_proceso"
          control={form.control}
          defaultValue={form.getValues().fecha_proceso}
          error={errors.fecha_proceso}
          helperText={errors.fecha_proceso?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextField
          label="Hora Proceso"
          name="hora_proceso"
          control={form.control}
          defaultValue={form.getValues().hora_proceso}
          error={errors.hora_proceso}
          helperText={errors.hora_proceso?.message}
          size={gridSizeMdLg4}
        />
        <CustomTextArea
          label="Refencia"
          name="referencia"
          control={form.control}
          defaultValue={form.getValues().referencia}
          error={errors.referencia}
          helperText={errors.referencia?.message}
          size={gridSizeMdLg12}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <CustomTextField
          label="Pais"
          name="pais"
          control={form.control}
          defaultValue={form.getValues().pais}
          error={errors.pais}
          helperText={errors.pais?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="Contra Partida"
          name="contrapartida"
          control={form.control}
          defaultValue={form.getValues().contrapartida}
          error={errors.contrapartida}
          helperText={errors.contrapartida?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="Numero Documento"
          name="numero_documento"
          control={form.control}
          defaultValue={form.getValues().numero_documento}
          error={errors.numero_documento}
          helperText={errors.numero_documento?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="No Documento"
          name="no_documento"
          control={form.control}
          defaultValue={form.getValues().no_documento}
          error={errors.no_documento}
          helperText={errors.no_documento?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="Referencia Sobre"
          name="referencia_sobre"
          control={form.control}
          defaultValue={form.getValues().referencia_sobre}
          error={errors.referencia_sobre}
          helperText={errors.referencia_sobre?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="Estado Impresion"
          name="estado_impresion"
          control={form.control}
          defaultValue={form.getValues().estado_impresion}
          error={errors.estado_impresion}
          helperText={errors.estado_impresion?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="Secuencial Cobro"
          name="secuencial_cobro"
          control={form.control}
          defaultValue={form.getValues().secuencial_cobro}
          error={errors.secuencial_cobro}
          helperText={errors.secuencial_cobro?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="Numero Comprobante"
          name="numero_comprobante"
          control={form.control}
          defaultValue={form.getValues().numero_comprobante}
          error={errors.numero_comprobante}
          helperText={errors.numero_comprobante?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="BITMAP39"
          name="bitmap39"
          control={form.control}
          defaultValue={form.getValues().bitmap39}
          error={errors.bitmap39}
          helperText={errors.bitmap39?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="BITMAP40"
          name="bitmap40"
          control={form.control}
          defaultValue={form.getValues().bitmap40}
          error={errors.bitmap40}
          helperText={errors.bitmap40?.message}
          size={gridSizeMdLg6}
        />
        <CustomTextArea
          label="Referencia Adicional"
          name="referencia_adicional"
          control={form.control}
          defaultValue={form.getValues().referencia_adicional}
          error={errors.referencia_adicional}
          helperText={errors.referencia_adicional?.message}
          size={gridSizeMdLg12}
        />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveTransaccionPichinchaPago;

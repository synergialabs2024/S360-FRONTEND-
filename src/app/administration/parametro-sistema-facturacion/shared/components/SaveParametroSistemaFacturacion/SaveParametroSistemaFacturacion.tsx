import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateParametroSistemaFacturacionParamsBase,
  useCreateParametroSistemaFacturacion,
} from '@/actions/app';
import {
  CustomTextField,
  SingleFormBoxScene,
  UploadFileDropZone,
} from '@/shared/components';
import {
  gridSizeMdLg12,
  gridSizeMdLg4,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { parametro_sistemaFacturacionFormSchema } from '@/shared/utils';
import { returnUrlParamestrosSistemasPage } from '@/app/administration/parametro-sistema/pages/tables/ParametrosSistemasPage';
import {
  BucketTypeEnumChoice,
  ToastWrapper,
  useUploadFileGeneric,
} from '@/shared';
import { uploadFileToBucket } from '@/actions/statics-api';

export interface SaveParametroSistemaFacturacionProps {}

type SaveFormData = CreateParametroSistemaFacturacionParamsBase & {};

const SaveParametroSistemaFacturacion: React.FC<
  SaveParametroSistemaFacturacionProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_view_parametrosistema);
  const navigate = useNavigate();

  //* State Global
  const { file1: File_url, setFile1: setFile_url } = useUploadFileGeneric();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(parametro_sistemaFacturacionFormSchema) as any,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createParametroSistemaFacturacionMutation =
    useCreateParametroSistemaFacturacion({
      navigate,
      returnUrl: returnUrlParamestrosSistemasPage,
      enableErrorNavigate: false,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    if (!File_url) return ToastWrapper.error('La archivo p12 es requerido');

    // upload ----
    const [Url] = await Promise.all([
      uploadFileToBucket({
        file: File_url,
        file_name: 'file_parametrosistema_facturacion_p12',
        bucketDir: BucketTypeEnumChoice.FILES_PARAMETRO_SISTEMA_FACTURACION,
      }),
    ]);

    data.FIRMA_URL = Url.streamUlr;

    ///* create
    try {
      createParametroSistemaFacturacionMutation.mutate(data);
    } catch (error) {
      return;
    }
    form.reset();
    setFile_url(null);
  };

  return (
    <SingleFormBoxScene
      titlePage={'Parámetro del sistema de facturación'}
      onCancel={() => navigate(returnUrlParamestrosSistemasPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="SECUENCIAL FACTURA"
        name="SECUENCIAL_FACTURA"
        control={form.control}
        defaultValue={form.getValues().SECUENCIAL_FACTURA}
        error={errors.SECUENCIAL_FACTURA}
        helperText={errors.SECUENCIAL_FACTURA?.message}
        size={gridSizeMdLg4}
        onlyNumbers
        ignoreTransform
      />

      <CustomTextField
        label="CLAVE FIRMA P12"
        name="FIRMA_CLAVE"
        control={form.control}
        defaultValue={form.getValues().FIRMA_CLAVE}
        error={errors.FIRMA_CLAVE}
        helperText={errors.FIRMA_CLAVE?.message}
        size={gridSizeMdLg4}
        ignoreTransform
      />
      <CustomTextField
        label="RUC EMPRESARIAL"
        name="RUC_EMPRESA"
        control={form.control}
        defaultValue={form.getValues().RUC_EMPRESA}
        error={errors.RUC_EMPRESA}
        helperText={errors.RUC_EMPRESA?.message}
        size={gridSizeMdLg4}
        ignoreTransform
      />
      <CustomTextField
        label="RAZON SOCIAL"
        name="RAZON_SOCIAL"
        control={form.control}
        defaultValue={form.getValues().RAZON_SOCIAL}
        error={errors.RAZON_SOCIAL}
        helperText={errors.RAZON_SOCIAL?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="NOMBRE COMERCIAL"
        name="NOMBRE_COMERCIAL"
        control={form.control}
        defaultValue={form.getValues().NOMBRE_COMERCIAL}
        error={errors.NOMBRE_COMERCIAL}
        helperText={errors.NOMBRE_COMERCIAL?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="DIRECCION MATRIZ"
        name="DIRECCION_MATRIZ"
        control={form.control}
        defaultValue={form.getValues().DIRECCION_MATRIZ}
        error={errors.DIRECCION_MATRIZ}
        helperText={errors.DIRECCION_MATRIZ?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="ESTABLECIMIENTO"
        name="ESTABLECIMIENTO"
        control={form.control}
        defaultValue={form.getValues().ESTABLECIMIENTO}
        error={errors.ESTABLECIMIENTO}
        helperText={errors.ESTABLECIMIENTO?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />

      <CustomTextField
        label="PUNTO DE EMISION"
        name="PUNTO_EMISION"
        control={form.control}
        defaultValue={form.getValues().PUNTO_EMISION}
        error={errors.PUNTO_EMISION}
        helperText={errors.PUNTO_EMISION?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="AMBIENTE"
        name="AMBIENTE_SRI"
        control={form.control}
        defaultValue={form.getValues().AMBIENTE_SRI}
        error={errors.AMBIENTE_SRI}
        helperText={errors.AMBIENTE_SRI?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="OBLIGADO A LLEVAR CONTABILIDAD"
        name="OBLIGADO_CONTABILIDAD"
        control={form.control}
        defaultValue={form.getValues().OBLIGADO_CONTABILIDAD}
        error={errors.OBLIGADO_CONTABILIDAD}
        helperText={errors.OBLIGADO_CONTABILIDAD?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="CONTRIBUYENTE ESPECIAL"
        name="CONTRIBUYENTE_ESPECIAL"
        control={form.control}
        defaultValue={form.getValues().CONTRIBUYENTE_ESPECIAL}
        error={errors.CONTRIBUYENTE_ESPECIAL}
        helperText={errors.CONTRIBUYENTE_ESPECIAL?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="DIRECCION ESTABLECIMIENTO"
        name="DIRECCION_ESTABLECIMIENTO"
        control={form.control}
        defaultValue={form.getValues().DIRECCION_ESTABLECIMIENTO}
        error={errors.DIRECCION_ESTABLECIMIENTO}
        helperText={errors.DIRECCION_ESTABLECIMIENTO?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="REGIMEN MICROEMPRESAS"
        name="REGIMEN_MICROEMPRESAS"
        control={form.control}
        defaultValue={form.getValues().REGIMEN_MICROEMPRESAS}
        error={errors.REGIMEN_MICROEMPRESAS}
        helperText={errors.REGIMEN_MICROEMPRESAS?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <UploadFileDropZone
        buttonLabel="FIRMA ELECTRONICA"
        type="any"
        selectedFile={File_url}
        setSelectedFile={setFile_url}
        sizeContainer={gridSizeMdLg12}
      />
    </SingleFormBoxScene>
  );
};

export default SaveParametroSistemaFacturacion;

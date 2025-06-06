import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  ToastWrapper,
  BucketTypeEnumChoice,
  useUploadFileGeneric,
} from '@/shared';
import {
  PermissionsEnum,
  ParametroSistemaFacturacion,
} from '@/shared/interfaces';
import {
  CustomPasswordTextField,
  CustomTextField,
  SingleFormBoxScene,
  UploadFileDropZone,
} from '@/shared/components';
import {
  gridSizeMdLg12,
  gridSizeMdLg4,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import {
  useCreateParametroSistemaFacturacion,
  useFetchParametrosSistemaFacturacion,
  CreateParametroSistemaFacturacionParamsBase,
} from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { uploadFileToBucket } from '@/actions/statics-api';
import { parametro_sistemaFacturacionFormSchema } from '@/shared/utils';
import { returnUrlParamestrosSistemasPage } from '@/app/administration/parametro-sistema/pages/tables/ParametrosSistemasPage';

export interface SaveParametroSistemaFacturacionProps {}

type SaveFormData = CreateParametroSistemaFacturacionParamsBase & {};

const SaveParametroSistemaFacturacion: React.FC<
  SaveParametroSistemaFacturacionProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_view_parametrosistema);
  const navigate = useNavigate();

  ///* local state ----------------
  const [canWritePassword] = useState<boolean>(true);

  //* State Global
  const { file1: File_url, setFile1: setFile_url } = useUploadFileGeneric();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(parametro_sistemaFacturacionFormSchema) as any,
  });

  const watchedFIRMA_URL = form.watch('FIRMA_URL');

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const { data: ParamSisFacturacionPagingRes } =
    useFetchParametrosSistemaFacturacion({});

  useEffect(() => {
    if (ParamSisFacturacionPagingRes) {
      reset(
        ParamSisFacturacionPagingRes as unknown as ParametroSistemaFacturacion,
      );
    }
  }, [ParamSisFacturacionPagingRes]);

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

    // validate file -----------
    if (!File_url && !watchedFIRMA_URL) {
      return ToastWrapper.error('El logo principal es requerida');
    }

    // upload ----
    if (File_url) {
      const [Url] = await Promise.all([
        uploadFileToBucket({
          file: File_url,
          file_name: 'file_parametrosistema_facturacion_p12',
          bucketDir: BucketTypeEnumChoice.FILES_PARAMETRO_SISTEMA_FACTURACION,
        }),
      ]);
      data.FIRMA_URL = Url.streamUlr;
    }

    ///* create
    createParametroSistemaFacturacionMutation.mutate(data);
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

      <CustomPasswordTextField
        label="CLAVE FIRMA P12"
        name="FIRMA_CLAVE"
        defaultValue={form.getValues().FIRMA_CLAVE}
        control={form.control}
        errors={errors?.FIRMA_CLAVE}
        helperText={errors?.FIRMA_CLAVE?.message}
        disabled={!canWritePassword}
        size={gridSizeMdLg4}
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

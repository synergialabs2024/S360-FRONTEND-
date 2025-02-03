import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CustomNumberTextField,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { ToastWrapper } from '@/shared';
import {
  SolicitudAprobacionIAPreventa,
  Preventa,
  Vendedor,
  Area,
  Departamento,
  Canal_venta,
  Usuario_gestion,
} from '@/shared/interfaces';
import {
  solicitudAprobacionIAPreventaFormSchema,
  getKeysFormErrorsMessage,
} from '@/shared/utils';
import {
  useCreateSolicitudAprobacionIAPreventa,
  useUpdateSolicitudAprobacionIAPreventa,
  CreateSolicitudAprobacionIAPreventaParamsBase,
} from '@/actions/app';
import { returnUrlSolicitudsAprobacionIAPreventaPage } from '../../../pages';

export interface SaveSolicitudAprobacionIAPreventaProps {
  title: string;
  solicitudaprobacioniapreventa?: SolicitudAprobacionIAPreventa;
}

type SaveFormData = CreateSolicitudAprobacionIAPreventaParamsBase & {};

const SaveSolicitudAprobacionIAPreventa: React.FC<
  SaveSolicitudAprobacionIAPreventaProps
> = ({ title, solicitudaprobacioniapreventa }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudAprobacionIAPreventaFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations ---------------------
  const createSolicitudAprobacionIAPreventaMutation =
    useCreateSolicitudAprobacionIAPreventa({
      navigate,
      returnUrl: returnUrlSolicitudsAprobacionIAPreventaPage,
      enableErrorNavigate: false,
    });
  const updateSolicitudAprobacionIAPreventaMutation =
    useUpdateSolicitudAprobacionIAPreventa<CreateSolicitudAprobacionIAPreventaParamsBase>(
      {
        navigate,
        returnUrl: returnUrlSolicitudsAprobacionIAPreventaPage,
      },
    );

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (solicitudaprobacioniapreventa?.id) {
      updateSolicitudAprobacionIAPreventaMutation.mutate({
        id: solicitudaprobacioniapreventa.id!,
        data,
      });
      return;
    }

    ///* create
    createSolicitudAprobacionIAPreventaMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!solicitudaprobacioniapreventa?.id) return;
    reset(solicitudaprobacioniapreventa);
  }, [solicitudaprobacioniapreventa, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudsAprobacionIAPreventaPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomNumberTextField
        label="Id"
        name="id"
        control={form.control}
        defaultValue={form.getValues().id}
        error={errors.id}
        helperText={errors.id?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomTextField
        label="Uuid"
        name="uuid"
        control={form.control}
        defaultValue={form.getValues().uuid}
        error={errors.uuid}
        helperText={errors.uuid?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Estado solicitud"
        name="estado_solicitud"
        control={form.control}
        defaultValue={form.getValues().estado_solicitud}
        error={errors.estado_solicitud}
        helperText={errors.estado_solicitud?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Descripcion"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
        size={gridSizeMdLg6}
      />

      <CustomNumberTextField
        label="Preventa"
        name="preventa"
        control={form.control}
        defaultValue={form.getValues().preventa}
        error={errors.preventa}
        helperText={errors.preventa?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Vendedor"
        name="vendedor"
        control={form.control}
        defaultValue={form.getValues().vendedor}
        error={errors.vendedor}
        helperText={errors.vendedor?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Area"
        name="area"
        control={form.control}
        defaultValue={form.getValues().area}
        error={errors.area}
        helperText={errors.area?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Departamento"
        name="departamento"
        control={form.control}
        defaultValue={form.getValues().departamento}
        error={errors.departamento}
        helperText={errors.departamento?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Canal venta"
        name="canal_venta"
        control={form.control}
        defaultValue={form.getValues().canal_venta}
        error={errors.canal_venta}
        helperText={errors.canal_venta?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomAutocomplete<Preventa>
        label="Preventa"
        name="preventa"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().preventa}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.preventa}
        helperText={errors.preventa?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Vendedor>
        label="Vendedor"
        name="vendedor"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().vendedor}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.vendedor}
        helperText={errors.vendedor?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Area>
        label="Area"
        name="area"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().area}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.area}
        helperText={errors.area?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Departamento>
        label="Departamento"
        name="departamento"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().departamento}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.departamento}
        helperText={errors.departamento?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Canal_venta>
        label="Canal_venta"
        name="canal_venta"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().canal_venta}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.canal_venta}
        helperText={errors.canal_venta?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Usuario_gestion>
        label="Usuario_gestion"
        name="usuario_gestion"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().usuario_gestion}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.usuario_gestion}
        helperText={errors.usuario_gestion?.message}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudAprobacionIAPreventa;

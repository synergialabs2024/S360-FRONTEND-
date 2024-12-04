import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateConfiguracionPlantillaParamsBase,
  useCreateConfiguracionPlantilla,
  useUpdateConfiguracionPlantilla,
} from '@/actions/app';
import { ToastWrapper } from '@/shared';
import {
  CustomNumberTextField,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { ConfiguracionPlantillaCliente } from '@/shared/interfaces';
import {
  configuracionPlantillaFormSchema,
  getKeysFormErrorsMessage,
} from '@/shared/utils';
import { returnUrlConfiguracionsPlantillaPage } from '../../../pages/tables/ConfiguracionsPlantillaPage';

export interface SaveConfiguracionPlantillaProps {
  title: string;
  configuracionplantilla?: ConfiguracionPlantillaCliente;
}

type SaveFormData = CreateConfiguracionPlantillaParamsBase & {};

const SaveConfiguracionPlantilla: React.FC<SaveConfiguracionPlantillaProps> = ({
  title,
  configuracionplantilla,
}) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(configuracionPlantillaFormSchema) as any,
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
  const createConfiguracionPlantillaMutation = useCreateConfiguracionPlantilla({
    navigate,
    returnUrl: returnUrlConfiguracionsPlantillaPage,
    enableErrorNavigate: false,
  });
  const updateConfiguracionPlantillaMutation =
    useUpdateConfiguracionPlantilla<CreateConfiguracionPlantillaParamsBase>({
      navigate,
      returnUrl: returnUrlConfiguracionsPlantillaPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (configuracionplantilla?.id) {
      updateConfiguracionPlantillaMutation.mutate({
        id: configuracionplantilla.id!,
        data,
      });
      return;
    }

    ///* create
    createConfiguracionPlantillaMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!configuracionplantilla?.id) return;
    reset(configuracionplantilla);
  }, [configuracionplantilla, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlConfiguracionsPlantillaPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
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
        label="Name"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      />

      <CustomNumberTextField
        label="Dia pago"
        name="dia_pago"
        control={form.control}
        defaultValue={form.getValues().dia_pago}
        error={errors.dia_pago}
        helperText={errors.dia_pago?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Dia facturacion"
        name="dia_facturacion"
        control={form.control}
        defaultValue={form.getValues().dia_facturacion}
        error={errors.dia_facturacion}
        helperText={errors.dia_facturacion?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Dia suspension"
        name="dia_suspension"
        control={form.control}
        defaultValue={form.getValues().dia_suspension}
        error={errors.dia_suspension}
        helperText={errors.dia_suspension?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Dia pago limite"
        name="dia_pago_limite"
        control={form.control}
        defaultValue={form.getValues().dia_pago_limite}
        error={errors.dia_pago_limite}
        helperText={errors.dia_pago_limite?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomTextField
        label="Crea factura"
        name="crea_factura"
        control={form.control}
        defaultValue={form.getValues().crea_factura}
        error={errors.crea_factura}
        helperText={errors.crea_factura?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Dias gracia"
        name="dias_gracia"
        control={form.control}
        defaultValue={form.getValues().dias_gracia}
        error={errors.dias_gracia}
        helperText={errors.dias_gracia?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Aplica corte"
        name="aplica_corte"
        control={form.control}
        defaultValue={form.getValues().aplica_corte}
        error={errors.aplica_corte}
        helperText={errors.aplica_corte?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="Aplica mora"
        name="aplica_mora"
        control={form.control}
        defaultValue={form.getValues().aplica_mora}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="Bajar velocidad"
        name="bajar_velocidad"
        control={form.control}
        defaultValue={form.getValues().bajar_velocidad}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="Aplica reconexion"
        name="aplica_reconexion"
        control={form.control}
        defaultValue={form.getValues().aplica_reconexion}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Aviso pantalla"
        name="aviso_pantalla"
        control={form.control}
        defaultValue={form.getValues().aviso_pantalla}
        error={errors.aviso_pantalla}
        helperText={errors.aviso_pantalla?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Recordatorio pago"
        name="recordatorio_pago"
        control={form.control}
        defaultValue={form.getValues().recordatorio_pago}
        error={errors.recordatorio_pago}
        helperText={errors.recordatorio_pago?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Recordatorio 1"
        name="recordatorio_1"
        control={form.control}
        defaultValue={form.getValues().recordatorio_1}
        error={errors.recordatorio_1}
        helperText={errors.recordatorio_1?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Recordatorio 2"
        name="recordatorio_2"
        control={form.control}
        defaultValue={form.getValues().recordatorio_2}
        error={errors.recordatorio_2}
        helperText={errors.recordatorio_2?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Recordatorio 3"
        name="recordatorio_3"
        control={form.control}
        defaultValue={form.getValues().recordatorio_3}
        error={errors.recordatorio_3}
        helperText={errors.recordatorio_3?.message}
        size={gridSizeMdLg6}
      />

      <CustomNumberTextField
        label="Impuesto 1"
        name="impuesto_1"
        control={form.control}
        defaultValue={form.getValues().impuesto_1}
        error={errors.impuesto_1}
        helperText={errors.impuesto_1?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Impuesto 2"
        name="impuesto_2"
        control={form.control}
        defaultValue={form.getValues().impuesto_2}
        error={errors.impuesto_2}
        helperText={errors.impuesto_2?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Impuesto 3"
        name="impuesto_3"
        control={form.control}
        defaultValue={form.getValues().impuesto_3}
        error={errors.impuesto_3}
        helperText={errors.impuesto_3?.message}
        size={gridSizeMdLg6}
        min={0}
      />
    </SingleFormBoxScene>
  );
};

export default SaveConfiguracionPlantilla;

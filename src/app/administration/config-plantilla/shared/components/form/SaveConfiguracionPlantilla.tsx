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
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg10, gridSizeMdLg6 } from '@/shared/constants/ui';
import { ConfiguracionPlantillaCliente } from '@/shared/interfaces';
import {
  configuracionPlantillaFormSchema,
  getKeysFormErrorsMessage,
} from '@/shared/utils';
import { returnUrlConfiguracionsPlantillaPage } from '../../../pages/tables/ConfiguracionsPlantillaPage';
import ConfiguracionPlantillaFacturacionPart from './ConfiguracionPlantillaFacturacionPart';
import ConfiguracionPlantillaNotificacionPart from './ConfiguracionPlantillaNotificacionPart';

export interface SaveConfiguracionPlantillaProps {
  title: string;
  configuracionplantilla?: ConfiguracionPlantillaCliente;
}

export type SaveFormDataConfigPlantilla =
  CreateConfiguracionPlantillaParamsBase & {};

const SaveConfiguracionPlantilla: React.FC<SaveConfiguracionPlantillaProps> = ({
  title,
  configuracionplantilla,
}) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormDataConfigPlantilla>({
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
  const onSave = async (data: SaveFormDataConfigPlantilla) => {
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
      maxWidth="xl"
      gridSizeForm={gridSizeMdLg10}
    >
      <CustomTextField
        label="Nombre de la plantilla"
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

      <>
        <CustomTypoLabel
          text="Facturación"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <ConfiguracionPlantillaFacturacionPart form={form} />
      </>

      <>
        <CustomTypoLabel
          text="Notificaciones"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <ConfiguracionPlantillaNotificacionPart form={form} />
      </>
    </SingleFormBoxScene>
  );
};

export default SaveConfiguracionPlantilla;

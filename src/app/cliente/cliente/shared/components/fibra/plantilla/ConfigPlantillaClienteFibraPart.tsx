import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  CreateConfiguracionPlantillaParamsBase,
  LineaServicioTSQEnum,
} from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  ConfiguracionPlantillaFacturacionPart,
  ConfiguracionPlantillaNotificacionPart,
} from '@/app/administration/config-plantilla/shared/components';
import { SaveFormDataConfigPlantilla } from '@/app/administration/config-plantilla/shared/components/form/SaveConfiguracionPlantilla';
import {
  configuracionPlantillaFormSchema,
  Contrato,
  getKeysFormErrorsMessage,
  gridSizeMdLg6,
  LineaServicio,
  ToastWrapper,
} from '@/shared';
import {
  CreateOrCancelButtonsForm,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SampleCheckbox,
} from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';
import ConfigPlantillaClienteFibraFacturacionCards from './ConfigPlantillaClienteFibraFacturacionCards';

export type ConfigPlantillaClienteFibraPartProps = {
  serviceLine: LineaServicio;
};

const ConfigPlantillaClienteFibraPart: React.FC<
  ConfigPlantillaClienteFibraPartProps
> = ({ serviceLine }) => {
  const configPlantillaArray =
    serviceLine?.contrato_data?.config_plantilla_cliente_json || [];
  const configuracionplantilla = configPlantillaArray?.at(0);

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

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
  const updateConfiguracionPlantillaMutation = useGenericPATCH<
    CreateConfiguracionPlantillaParamsBase,
    Contrato
  >(
    `/contrato/update-template-config/${configuracionplantilla?.id}/`,
    LineaServicioTSQEnum.LINEASERVICIO,
    {
      customMessageToast:
        'Configuración de plantilla actualizada correctamente',
    },
  );

  ///* handlers ---------------------
  const onSave = async (data: SaveFormDataConfigPlantilla) => {
    if (!isValid) return;

    ///* upd
    if (configuracionplantilla?.id) {
      updateConfiguracionPlantillaMutation.mutate({
        ...data,
      });
      return;
    }
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!configuracionplantilla?.id) return;
    reset(configuracionplantilla);
  }, [configuracionplantilla, reset]);

  return (
    <Grid item container spacing={3}>
      <CustomTextField
        label="Nombre de la plantilla"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
        disabled
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
        disabled
      />

      <>
        <CustomTypoLabel
          text="Facturación"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <ConfiguracionPlantillaFacturacionPart form={form} />
        <ConfigPlantillaClienteFibraFacturacionCards form={form} />
      </>

      <>
        <CustomTypoLabel
          text="Notificaciones"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <ConfiguracionPlantillaNotificacionPart form={form} />
      </>

      <CreateOrCancelButtonsForm
        onCancel={() => {}}
        onSave={() => {
          setConfirmDialog({
            isOpen: true,
            title: 'Editar configuración de plantilla',
            subtitle: `¿Está seguro que desea actualizar la configuración de plantilla del cliente ${serviceLine?.cliente_data?.razon_social} para la línea de servicio ${serviceLine?.contrato_data?.identificacion_pago}?`,
            onConfirm: () => {
              setConfirmDialogIsOpen(false);

              handleSubmit(onSave, errors => {
                ToastWrapper.error(
                  `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
                );
              })();
            },
          });
        }}
        cancelBtnHidden
      />
    </Grid>
  );
};

export default ConfigPlantillaClienteFibraPart;

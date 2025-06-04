import { useForm } from 'react-hook-form';

import {
  CustomTextArea,
  CustomTextField,
  CustomTextFieldNoForm,
  ScrollableDialogProps,
} from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { useRubroStore } from '@/store/app/rubros';
import { Grid } from '@mui/material';
import {
  CambioOnu,
  getKeysFormErrorsMessage,
  gridSizeMdLg12,
  gridSizeMdLg6,
  pagoManualFormSchema,
  ToastWrapper,
} from '@/shared';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { useNavigate } from 'react-router';
import { returnCambioOnuSac } from '../../../pages/tables/CambioOnuSacPage';
import { useGenericPATCH } from '@/actions/shared';
import { CambioOnuTSQEnum } from '@/actions/app/sac';

export type CambioOnuSacModalProps = {
  open: boolean;
  onClose: () => void;
  ticket: Ticket;
  onSuccess?: () => void;
};

export type SaveFormDataCambioOnu = Partial<CambioOnu>;

const CambioOnuSacModal: React.FC<CambioOnuSacModalProps> = ({
  open,
  onClose,
  ticket,
  onSuccess,
}) => {
  const navigate = useNavigate();

  const [isLoading] = useState(false);
  ///* global state --------------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAll);
  const clearAllItemsStore = useInstalacionesStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<SaveFormDataCambioOnu>({
    resolver: yupResolver(pagoManualFormSchema) as any,
  });

  const { errors } = form.formState;

  const handleClose = () => {
    form.reset();
    onClose();
    clearAllRubroStore();
    clearAllItemsStore();
  };

  ///* mutations ---------------------

  const updateCambioOnuNegociacionFinish = useGenericPATCH(
    `/cambio-onu/negociacion/finish/${ticket?.id}/`,
    CambioOnuTSQEnum.CAMBIOONUS,
    {
      enableErrorNavigate: false,
      customOnSuccess: () => {
        navigate(returnCambioOnuSac);
      },
      navigate,
      returnUrl: returnCambioOnuSac,
    },
  );

  ///* fetch data

  ///* handlers ---------------------
  const onSave = async (data: SaveFormDataCambioOnu) => {
    try {
      await updateCambioOnuNegociacionFinish.mutate({
        descuento: data?.descuento,
        cuotas: data?.cuotas,
        comentario_negociacion: data?.comentario_negociacion,
      });
      handleClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error en onSave:', error);
    }
  };

  return (
    <>
      <ScrollableDialogProps
        title={'Cambio Onu'}
        open={open}
        onClose={handleClose}
        minWidth="50%"
        // confirm --------
        onConfirm={form.handleSubmit(onSave, errors => {
          const keys = getKeysFormErrorsMessage(errors);
          ToastWrapper.error(`Faltan campos: ${keys}`);
        })}
        confirmVariantBtn="outlined"
        confirmTextBtn="Finalizar Negociacion"
        disabledConfirmBtn={isLoading}
        // // content --------
        contentNode={
          <>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <CustomTextFieldNoForm
                label="RAZON SOCIAL"
                value={ticket?.asunto_ticket}
                required={false}
                size={gridSizeMdLg12}
                disabled
              />
              <CustomTextField
                label="DESCUENTO"
                name="descuento"
                control={form.control}
                defaultValue={form.getValues().descuento}
                error={errors.descuento}
                helperText={errors.descuento?.message}
                size={gridSizeMdLg6}
                ignoreTransform
              />
              <CustomTextField
                label="CUOTAS"
                name="cuotas"
                control={form.control}
                defaultValue={form.getValues().cuotas?.toString()}
                error={errors.cuotas}
                helperText={errors.cuotas?.message}
                size={gridSizeMdLg6}
                ignoreTransform
              />
              <CustomTextArea
                label="COMENTARIO NEGOCIACION"
                name="comentario_negociacion"
                control={form.control}
                defaultValue={form.getValues().comentario_negociacion}
                error={errors.comentario_negociacion}
                helperText={errors.comentario_negociacion?.message}
                size={gridSizeMdLg12}
              />
            </Grid>
          </>
        }
      />
    </>
  );
};

export default CambioOnuSacModal;

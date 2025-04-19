import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  createRubroServiceClienteFormSchema,
  getKeysFormErrorsMessage,
  Rubro,
  ToastWrapper,
} from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { useRubroStore } from '@/store/app/rubros';
import ClienteFibraRubroLibreHeader from '../libre/ClienteFibraRubroLibreHeader';
import ClienteFibraRubroServiceDetailRubroItem from './ClienteFibraRubroServiceDetailRubroItem';

export type ClienteFibraEditServiceRubroModalProps = {
  open: boolean;
  onClose: () => void;

  // isCreating?: boolean;
  // isEditing?: boolean;
};

export type RubroServicioClienteFormData = Partial<Rubro> & {};

const ClienteFibraEditServiceRubroModal: React.FC<
  ClienteFibraEditServiceRubroModalProps
> = ({ open, onClose }) => {
  ///* global state --------------------------
  const activeRubro = useRubroStore(s => s.activeRubro); // to edit
  const clearAllMinusSL = useRubroStore(s => s.clearAllMinusSL);
  const serviceLine = useRubroStore(s => s.activeServiceLine);

  ///* form --------------------------
  const form = useForm<RubroServicioClienteFormData>({
    resolver: yupResolver(createRubroServiceClienteFormSchema) as any,
    defaultValues: {
      fecha_emision: dayjs(activeRubro?.fecha_emision).format(),
      fecha_vencimiento: dayjs(activeRubro?.fecha_vencimiento).format(),
    },
  });

  ///* mutations --------------------------

  ///* handlers --------------------------
  const onSave = (data: RubroServicioClienteFormData) => {
    console.log('onSave', {
      data,
    });
  };

  const handleClose = () => {
    // form.reset();
    onClose();
    clearAllMinusSL();
  };

  ///* effects --------------------------
  useEffect(() => {
    if (!open || !activeRubro) return;

    form.reset({
      ...activeRubro,
      fecha_emision: dayjs(activeRubro?.fecha_emision).format(),
      fecha_vencimiento: dayjs(activeRubro?.fecha_vencimiento).format(),
    });
  }, [activeRubro, form, open]);

  if (!open || !activeRubro || !serviceLine) return null;

  return (
    <>
      <ScrollableDialogProps
        title={`Editar Rubro: ${activeRubro?.tipo_rubro} - ${activeRubro?.numero_referencia || ''}`}
        open={open}
        onClose={handleClose}
        minWidth="90%"
        // confirm --------
        onConfirm={form.handleSubmit(onSave, errors => {
          const keys = getKeysFormErrorsMessage(errors);
          ToastWrapper.error(`Campos requeridos: ${keys}`);
        })}
        confirmVariantBtn="outlined"
        confirmTextBtn="Guardar"
        // // content --------
        contentNode={
          <>
            <Grid container spacing={3} mt={2} mb={1}>
              {/* ==================== headers ==================== */}
              <Grid item xs={12}>
                <ClienteFibraRubroLibreHeader
                  form={form}
                  serviceLine={serviceLine!}
                />
                <Divider></Divider>
              </Grid>

              {/* ==================== detail body ==================== */}
              <Grid item xs={12}>
                <ClienteFibraRubroServiceDetailRubroItem />
              </Grid>
            </Grid>
          </>
        }
      />
    </>
  );
};

export default ClienteFibraEditServiceRubroModal;

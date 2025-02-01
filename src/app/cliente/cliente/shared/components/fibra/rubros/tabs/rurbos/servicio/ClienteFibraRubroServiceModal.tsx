import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CreateRubroSerivicioClienteData, useCreateRubro } from '@/actions/app';
import {
  createRubroServiceClienteFormSchema,
  getKeysFormErrorsMessage,
  LineaServicio,
  Rubro,
  ToastWrapper,
} from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { useRubroStore } from '@/store/app/rubros';

export type ClienteFibraRubroServiceModalProps = {
  open: boolean;
  onClose: () => void;
  serviceLine: LineaServicio;

  isCreating?: boolean;
  isEditing?: boolean;
};

export type RubroServicioClienteFormData = Partial<Rubro> & {};

const ClienteFibraRubroServiceModal: React.FC<
  ClienteFibraRubroServiceModalProps
> = ({ onClose, open, isCreating = false, isEditing = false }) => {
  ///* global state --------------------------
  const activeRubro = useRubroStore(s => s.activeRubro); // to edit
  const clearAllRubroStore = useRubroStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<RubroServicioClienteFormData>({
    resolver: yupResolver(createRubroServiceClienteFormSchema) as any,
    defaultValues: {
      fecha_emision: dayjs().format(),
    },
  });

  ///* mutations --------------------------
  const createRurbo = useCreateRubro<CreateRubroSerivicioClienteData>({
    customMessageToast: 'Rubro creado correctamente',
    customOnSuccess: () => {
      // form.reset();
      handleClose();
    },
  });

  ///* handlers --------------------------
  const onSave = (data: RubroServicioClienteFormData) => {
    createRurbo.mutate({
      detalle: data?.detalle!,
    });
  };

  const handleClose = () => {
    // form.reset();
    onClose();
    clearAllRubroStore();
  };

  ///* effects --------------------------
  useEffect(() => {
    if (!open) return;

    if (isCreating) {
      console.log({
        isCreating: isCreating,
      });
    }

    if (isEditing) {
      console.log({
        isEditing: isEditing,
      });
    }

    console.log({
      activeRubro,
    });
  }, [activeRubro, isCreating, isEditing, open]);

  return (
    <>
      <ScrollableDialogProps
        title={`${isEditing ? 'Editar' : 'Crear'} Rubro de Servicio`}
        open={open}
        onClose={handleClose}
        minWidth="81%"
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
              Main content here
            </Grid>
          </>
        }
      />
    </>
  );
};

export default ClienteFibraRubroServiceModal;

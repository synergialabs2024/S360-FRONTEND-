import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { CreateRubroLibreClienteData, useCreateRubro } from '@/actions/app';
import {
  createRubroClienteFormSchema,
  getKeysFormErrorsMessage,
  LineaServicio,
  Rubro,
  ToastWrapper,
} from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { useRubroStore } from '@/store/app/rubros';
import ClienteFibraRubroLibreItemsTable from './ClienteFibraRubroLibreItemsTable';

export type ClienteFibraRubroLibreModalProps = {
  open: boolean;
  onClose: () => void;
  serviceLine: LineaServicio;
};

export type RubrosClienteFormData = Partial<Rubro> & {
  // helpers to fetch items ------------
  bodega?: number;
  ubicacion?: number;
  categoria_producto?: number;
};

const ClienteFibraRubroLibreModal: React.FC<
  ClienteFibraRubroLibreModalProps
> = ({ open, onClose, serviceLine }) => {
  ///* global state --------------------------
  const activeRubro = useRubroStore(s => s.activeRubro);
  const clearAllRubroStore = useRubroStore(s => s.clearAllMinusSL);
  const clearAllItemsStore = useInstalacionesStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<RubrosClienteFormData>({
    resolver: yupResolver(createRubroClienteFormSchema) as any,
    defaultValues: {
      fecha_emision: dayjs().format(),
    },
  });

  ///* mutations --------------------------
  const createRurbo = useCreateRubro<CreateRubroLibreClienteData>({
    customMessageToast: 'Rubro creado correctamente',
    customOnSuccess: () => {
      form.reset();
      handleClose();
    },
  });

  ///* handlers --------------------------
  const onSave = (data: RubrosClienteFormData) => {
    createRurbo.mutate({
      detalle: data?.detalle!,
      fecha_vencimiento: data?.fecha_vencimiento!,
      subtotal: data?.subtotal!,
      tipo_rubro: data?.tipo_rubro!,
      valor_taxes: data?.valor_taxes!,
      valor_total: data?.valor_total!,
      linea_servicio: serviceLine.id,
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
    clearAllRubroStore();
    clearAllItemsStore();
  };

  return (
    <>
      <ScrollableDialogProps
        title={`${activeRubro?.id ? 'Editar' : 'Crear'} Rubro Libre`}
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
              <ClienteFibraRubroLibreItemsTable
                serviceLine={serviceLine}
                form={form}
              />

              {/* ================== add item table ================== */}
            </Grid>
          </>
        }
      />
    </>
  );
};

export default ClienteFibraRubroLibreModal;

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useCreateAlquiler,
  useFetchProductos,
  CreateAlquilerParamsBase,
} from '@/actions/app';
import {
  CustomTextArea,
  CustomTextField,
  CustomAutocomplete,
  ScrollableDialogProps,
} from '@/shared/components';
import {
  Alquiler,
  Producto,
  gridSizeMdLg6,
  LineaServicio,
  gridSizeMdLg12,
  alquilerFormSchema,
  TIPO_RECURRENCIA_ALQUILER_ARRAY_OBJ_ONT,
  TipoRecurrenciaAlquilerEnumChoiceType,
  valueTipoRecuerrenciaAlquilerEnumChoice,
} from '@/shared';
import dayjs from 'dayjs';

export type ClienteFibraRubroAlquilerModalProps = {
  open: boolean;
  onClose: () => void;
  serviceLine: LineaServicio;
};
type SaveFormData = CreateAlquilerParamsBase & {};

export type RubrosClienteAlquilerFormData = Partial<Alquiler> & {};

const ClienteFibraRubroAlquilerModal: React.FC<
  ClienteFibraRubroAlquilerModalProps
> = ({ open, onClose, serviceLine }) => {
  const [compValor, setCompValor] = useState<boolean>(false);
  const [prodValor, setProdValor] = useState<number>();

  ///* form --------------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(alquilerFormSchema) as any,
    defaultValues: {
      cliente: serviceLine.cliente,
      linea_servicio: serviceLine.id,
      contrato: serviceLine.contrato_data!.id,
      fecha_inicio: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
  });

  const {
    formState: { errors },
    watch,
  } = form;

  const watchedProducto = watch('producto');
  const watchedTipoRecurrencia = watch('tipo_recurrencia');

  ///* fetch data
  const {
    data: ProductosPagingRes,
    isLoading: isLoadingProducto,
    isRefetching: isRefetchingProducto,
  } = useFetchProductos({
    params: {
      page_size: 200,
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  ///* mutations
  const createAlquilerMutation = useCreateAlquiler({
    enableErrorNavigate: false,
  });

  ///* handlers --------------------------
  const onSave = (data: RubrosClienteAlquilerFormData) => {
    if (data.total_cuotas === 0) {
      data.tipo_recurrencia = valueTipoRecuerrenciaAlquilerEnumChoice.MENSUAL;
    } else if (data.total_cuotas === 1) {
      data.tipo_recurrencia =
        valueTipoRecuerrenciaAlquilerEnumChoice.UN_SOLO_PAGO;
    } else {
      data.tipo_recurrencia = valueTipoRecuerrenciaAlquilerEnumChoice.CUOTAS;
    }
    createAlquilerMutation.mutate(data);
    handleClose();
  };

  return (
    <>
      <ScrollableDialogProps
        title="Alquileres rubro de servicio"
        open={open}
        onClose={handleClose}
        minWidth="81%"
        // confirm --------
        cancelTextBtn="Guardar cambios"
        onConfirm={form.handleSubmit(onSave)}
        confirmVariantBtn="outlined"
        confirmTextBtn="Guardar"
        contentNode={
          <Grid
            item
            container
            spacing={3}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <CustomAutocomplete<Producto>
              label="Producto"
              name="producto"
              // options
              options={ProductosPagingRes?.data?.items || []}
              valueKey="nombre"
              actualValueKey="id"
              defaultValue={form.getValues().producto}
              isLoadingData={isLoadingProducto || isRefetchingProducto}
              // vaidation
              control={form.control}
              error={errors.producto}
              helperText={errors.producto?.message}
              size={gridSizeMdLg6}
              onChangeRawValue={row => {
                if (row?.categoria_data?.nombre == 'DIGITAL') {
                  setCompValor(false);
                } else {
                  setCompValor(true);
                }

                const precioDefaultValor = row.precios?.find(
                  precio => precio.default,
                )?.valor;

                setProdValor(precioDefaultValor);
                form.setValue('tipo_recurrencia', '' as any);
                form.setValue('valor_base_cuota', '' as any);
              }}
            />
            <CustomAutocomplete<TipoRecurrenciaAlquilerEnumChoiceType>
              label="Tipo Recurrencia"
              name="tipo_recurrencia"
              // options
              options={TIPO_RECURRENCIA_ALQUILER_ARRAY_OBJ_ONT}
              valueKey="label"
              actualValueKey="value"
              defaultValue={form.getValues().tipo_recurrencia}
              isLoadingData={false}
              // validation
              control={form.control}
              error={errors.tipo_recurrencia}
              helperText={errors.tipo_recurrencia?.message}
              onChangeRawValue={row => {
                form.setValue('total_cuotas', row?.value);
                const value = row?.value === 0 ? 1 : row?.value;
                if (prodValor !== undefined) {
                  if (compValor) {
                    const valor = prodValor / value;
                    form.setValue('valor_base_cuota', String(valor));
                  } else {
                    form.setValue('valor_base_cuota', String(prodValor as any));
                  }
                }
              }}
              size={gridSizeMdLg6}
              disabled={!watchedProducto}
            />
            <CustomTextField
              label="Monto"
              name="valor_base_cuota"
              type="number"
              control={form.control}
              defaultValue={form.getValues().valor_base_cuota}
              error={errors.valor_base_cuota}
              helperText={errors.valor_base_cuota?.message}
              size={gridSizeMdLg12}
              disabled={!watchedTipoRecurrencia}
            />
            <CustomTextArea
              label="Descripcion"
              name="descripcion"
              control={form.control}
              defaultValue={form.getValues().descripcion}
              error={errors.descripcion}
              helperText={errors.descripcion?.message}
              required={false}
            />
          </Grid>
        }
      />
    </>
  );
};

export default ClienteFibraRubroAlquilerModal;

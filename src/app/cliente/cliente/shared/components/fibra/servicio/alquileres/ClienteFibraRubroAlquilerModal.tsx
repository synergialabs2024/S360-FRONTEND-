import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';

import {
  useCreateAlquiler,
  useFetchProductos,
  CreateAlquilerParamsBase,
} from '@/actions/app';
import {
  CustomTextArea,
  CustomAutocomplete,
  ScrollableDialogProps,
  CustomFormLabel,
  CustomNumberTextField,
} from '@/shared/components';
import {
  Alquiler,
  Producto,
  gridSizeMdLg6,
  LineaServicio,
  gridSizeMdLg12,
  alquilerFormSchema,
  TipoRecurrenciaAlquilerEnumChoiceType,
  valueTipoRecuerrenciaAlquilerEnumChoice,
  TIPO_RECURRENCIA_ALQUILER_ARRAY_OBJ_ONT,
  CATEGORIA_TYPE_ARRAY_CHOICES,
  gridSize,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { SelectArrayStringSimple } from '@/app/administracion-red/trafico/custom';

export type ClienteFibraRubroAlquilerModalProps = {
  open: boolean;
  onClose: () => void;
  serviceLine: LineaServicio;
};
type SaveFormData = CreateAlquilerParamsBase & {
  categoria__code: string;
};

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

  const categoriaValue = form.watch('categoria__code');

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
    enabled: open,
    params: {
      page_size: 200,

      es_para_venta: true,
      categoria__code: categoriaValue,
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

  // alets: not found
  useEffect(() => {
    if (isLoadingProducto || isRefetchingProducto || !categoriaValue) return;
    !ProductosPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron producto para la categoria seleccionada con aceptacion para venta',
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingProducto, isRefetchingProducto]);

  useLoaders(isLoadingProducto || isRefetchingProducto);

  return (
    <>
      <ScrollableDialogProps
        title="Alquileres rubro de servicio"
        open={open}
        onClose={handleClose}
        minWidth="81%"
        // confirm --------
        cancelTextBtn="Cerrar"
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
            <Grid item {...gridSize}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="Categoria"
                required={true}
              >
                Categoria
              </CustomFormLabel>
              <SelectArrayStringSimple
                textFieldKey="CATEGORIA"
                options={CATEGORIA_TYPE_ARRAY_CHOICES}
                name="categoria__code"
                control={form.control}
                gridSize={gridSizeMdLg12}
                onChangeValue={() => {
                  form.setValue('producto', '' as any);
                  form.setValue('tipo_recurrencia', '' as any);
                  form.setValue('valor_base_cuota', '' as any);
                  form.setValue('descripcion', '' as any);
                }}
              />
            </Grid>
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
              size={gridSizeMdLg12}
              disabled={!categoriaValue}
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
                form.setValue('descripcion', row.nombre);
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
                    const num = valor;
                    const n = num.toFixed(2); // Redondear a 2 decimales
                    form.setValue('valor_base_cuota', String(n));
                  } else {
                    form.setValue('valor_base_cuota', String(prodValor as any));
                  }
                }
              }}
              size={gridSizeMdLg6}
              disabled={!watchedProducto}
            />
            <CustomNumberTextField
              label="Monto"
              name="valor_base_cuota"
              control={form.control}
              defaultValue={form.getValues().valor_base_cuota}
              error={errors.valor_base_cuota}
              helperText={errors.valor_base_cuota?.message}
              size={gridSizeMdLg6}
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
              disabled
            />
          </Grid>
        }
      />
    </>
  );
};

export default ClienteFibraRubroAlquilerModal;

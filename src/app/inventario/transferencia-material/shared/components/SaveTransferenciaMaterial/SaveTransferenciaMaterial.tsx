import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  CreateTransferenciaMaterialParamsBase,
  useCreateTransferenciaMaterial,
  useFetchBodegas,
  useFetchUbicacions,
} from '@/actions/app';
import {
  Bodega,
  gridSizeMdLg6,
  ToastWrapper,
  TransferenciaMaterial,
  transferenciaMaterialFormSchema,
  Ubicacion,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTextArea,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { returnUrlTransferenciaMaterialesPage } from '../../../pages/tables/TransferenciaMaterialPage';
import { Grid } from '@mui/material';
import { FiPlus } from 'react-icons/fi';
import { useUbicacionProductosStore } from '@/store/app';
import { useEffect, useState } from 'react';
import UbicacionProductosDisponiblesModal, {
  UbicacionProductosDisponiblesTableType,
} from '@/app/inventario/egreso-material/pages/modal/UbicacionProductosDisponiblesModal';
import { useColumnsUbicacionProductosDisponibles } from '@/app/inventario/egreso-material/shared/hooks';

export interface SaveTransferenciaMaterialProps {
  title: string;
  transferenciaMaterial?: TransferenciaMaterial;
}

type SaveFormData = CreateTransferenciaMaterialParamsBase & {};

const SaveTransferenciaMaterial: React.FC<SaveTransferenciaMaterialProps> = ({
  title,
}) => {
  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const ubicacionProductosDisponibles = useUbicacionProductosStore(
    s => s.ubicacionProductosDisponibles,
  );
  const ubicacionProductosEnviar = useUbicacionProductosStore(
    s => s.setUbicacionProductosDisponibles,
  );

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(transferenciaMaterialFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const watchedBodegaOrigen = form.watch('bodega_origen');
  const watchedBodegaDestino = form.watch('bodega_destino');
  const watchedUbicacionOrigen = form.watch('ubicacion_origen');
  const watchedUbicacionDestino = form.watch('ubicacion_destino');

  ///* fetch data ---------------------
  const {
    data: bodegaOrigenPagingRes,
    isLoading: isLoadingBodegaOrigen,
    isRefetching: isRefetchingBodegaOrigen,
  } = useFetchBodegas({
    params: {
      page_size: 600,
    },
  });
  const {
    data: bodegaDestinoPagingRes,
    isLoading: isLoadingBodegaDestino,
    isRefetching: isRefetchingBodegaDestino,
  } = useFetchBodegas({
    params: {
      page_size: 600,
    },
  });
  const {
    data: ubicacionOrigenPaging,
    isLoading: isLoadingUbicacionOrigen,
    isRefetching: isRefetchingUbicacionOrigen,
  } = useFetchUbicacions({
    enabled: !!watchedBodegaOrigen,
    params: {
      page_size: 1200,
      bodega: watchedBodegaOrigen!,
    },
  });
  const {
    data: ubicacionDestinoPaging,
    isLoading: isLoadingUbicacionDestino,
    isRefetching: isRefetchingUbicacionDestino,
  } = useFetchUbicacions({
    enabled: !!watchedBodegaDestino,
    params: {
      page_size: 1200,
      bodega: watchedBodegaDestino!,
    },
  });

  ///* mutations
  const createTransferenciaMaterialMutation = useCreateTransferenciaMaterial({
    navigate,
    returnUrl: returnUrlTransferenciaMaterialesPage,
    enableErrorNavigate: false,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = ubicacionProductosDisponibles.map(producto => ({
      cantidad: producto.cantidad,
      categoria_data: producto.categoria_data,
      producto: producto.producto,
      stock_actual: producto.stock_actual,
      producto_data: producto.producto_data,
      series: producto.series ? producto.series : [],
    }));

    let hasError = false;

    for (const producto of mappedProductos) {
      if (producto.producto_data?.requiere_series === true) {
        if (producto.cantidad !== producto.series.length) {
          ToastWrapper.error(
            'Las series deben tener la misma cifra que la cantidad',
          );
          return;
        }
      }
    }

    mappedProductos.forEach(producto => {
      const cantidad = producto.cantidad ?? 0;
      if (cantidad > producto.stock_actual) {
        ToastWrapper.error(
          `
            El producto con código ${producto.producto_data?.codigo}
            tiene una cantidad ${cantidad} mayor que el stock actual
            ${producto.stock_actual}.
          `,
        );
        hasError = true;
      }
    });

    if (hasError) {
      return;
    }

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }

    const preparedData = {
      ...data,
      productos: mappedProductos,
    };

    createTransferenciaMaterialMutation.mutate(preparedData);
  };

  ///* effects
  useEffect(() => {
    ubicacionProductosEnviar([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ///* columns --------------------
  const { crearEgresoMaterialColumns } =
    useColumnsUbicacionProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTransferenciaMaterialesPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomAutocomplete<Bodega>
        label="Bodega Origen"
        name="bodega_origen"
        // options
        options={bodegaOrigenPagingRes?.data?.items || []}
        valueKey="nombre"
        actualValueKey="id"
        defaultValue={form.getValues().bodega_origen}
        isLoadingData={isLoadingBodegaOrigen || isRefetchingBodegaOrigen}
        // vaidation
        control={form.control}
        error={errors.bodega_origen}
        helperText={errors.bodega_origen?.message}
        onChangeRawValue={value => {
          form.setValue('bodega_origen', Number(value?.id));
          form.setValue('ubicacion_origen', '' as any);
          ubicacionProductosEnviar([]);
        }}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<Bodega>
        label="Bodega Destino"
        name="bodega_destino"
        // options
        options={bodegaDestinoPagingRes?.data?.items || []}
        valueKey="nombre"
        actualValueKey="id"
        defaultValue={form.getValues().bodega_destino}
        isLoadingData={isLoadingBodegaDestino || isRefetchingBodegaDestino}
        // vaidation
        control={form.control}
        error={errors.bodega_destino}
        helperText={errors.bodega_destino?.message}
        onChangeRawValue={value => {
          form.setValue('bodega_destino', Number(value?.id));
          form.setValue('ubicacion_destino', '' as any);
          ubicacionProductosEnviar([]);
        }}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<Ubicacion>
        label="Ubicacion Origen"
        name="ubicacion_origen"
        defaultValue={form.getValues().ubicacion_origen || ''}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={ubicacionOrigenPaging?.data.items || []}
        isLoadingData={isLoadingUbicacionOrigen || isRefetchingUbicacionOrigen}
        disableClearable
        // errors
        control={form.control}
        error={errors.ubicacion_origen as any}
        helperText={errors.ubicacion_origen?.message}
        size={gridSizeMdLg6}
        onChangeRawValue={value => {
          form.setValue('ubicacion_origen', Number(value?.id));
          ubicacionProductosEnviar([]);
        }}
      />
      <CustomAutocomplete<Ubicacion>
        label="Ubicacion Destino"
        name="ubicacion_destino"
        defaultValue={form.getValues().ubicacion_destino || ''}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={
          watchedBodegaOrigen === watchedBodegaDestino
            ? ubicacionDestinoPaging?.data.items.filter(
              item => item.id !== watchedUbicacionOrigen,
            ) || []
            : ubicacionDestinoPaging?.data.items || []
        }
        isLoadingData={
          isLoadingUbicacionDestino || isRefetchingUbicacionDestino
        }
        disableClearable
        // errors
        control={form.control}
        error={errors.ubicacion_destino as any}
        helperText={errors.ubicacion_destino?.message}
        size={gridSizeMdLg6}
        onChangeRawValue={value => {
          form.setValue('ubicacion_destino', Number(value?.id));
          ubicacionProductosEnviar([]);
        }}
      />
      <CustomTextArea
        label="Observación"
        name="observacion"
        control={form.control}
        defaultValue={form.getValues().observacion}
        error={errors.observacion}
        helperText={errors.observacion?.message}
        required={false}
      />
      {/* ==================== PRODUCTS ==================== */}
      <CustomTypoLabel
        text="Productos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <Grid container justifyContent="flex-end">
        {!!watchedUbicacionOrigen && !!watchedUbicacionDestino && (
          <CustomSingleButton
            label="AGREGAR PRODUCTO"
            color="primary"
            variant="text"
            startIcon={<FiPlus />}
            onClick={() => {
              setOpenAddProducts(true);
            }}
            justifyContent="flex-end"
          />
        )}

        <CustomMinimalTable<UbicacionProductosDisponiblesTableType>
          columns={crearEgresoMaterialColumns}
          data={ubicacionProductosDisponibles || []}
          enablePagination
          density="comfortable"
        />
        <UbicacionProductosDisponiblesModal
          pk_ubicacion={watchedUbicacionOrigen}
          open={openAddProducts}
          onClose={() => setOpenAddProducts(false)}
        />
      </Grid>
    </SingleFormBoxScene>
  );
};

export default SaveTransferenciaMaterial;

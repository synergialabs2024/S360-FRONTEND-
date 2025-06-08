import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  CreateSolicitudTransferenciaMaterialParamsBase,
  CreateTransferenciaMaterialParamsBase,
  useCreateTransferenciaMaterial,
  useFetchMotivoTransferencia,
  useFetchProductos,
  useUpdateSolicitudTransferenciaMaterial,
} from '@/actions/app';
import {
  gridSizeMdLg12,
  gridSizeMdLg6,
  MotivoTransferencia,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  SolicitudTransferenciaMaterial,
  ToastWrapper,
  transferenciaMaterialFormSchema,
  useColumnsProductosDisponibles,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTextArea,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';
import { useAuthStore } from '@/store/auth';
import { useProductosStore } from '@/store/app';
import { returnUrlAprobarSolTransferenciaPage } from '../../../pages/tables/AprobarSolTransferencia';

export interface SaveAprobSolTransferenciaProps {
  title: string;
  aprobTransferencia?: SolicitudTransferenciaMaterial;
}

type SaveFormData = CreateTransferenciaMaterialParamsBase & {};

const SaveAprobSolTransferencia: React.FC<SaveAprobSolTransferenciaProps> = ({
  title,
  aprobTransferencia,
}) => {
  const user = useAuthStore(s => s.user);

  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);
  const [uuidUbicacion, setUUIDUbicacion] = useState<string | undefined>('');

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);
  const clearAllStore = useProductosStore(s => s.clearAll);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(transferenciaMaterialFormSchema) as any,
    defaultValues: {
      state: true,
      user_create: user?.id,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data ---------------------
  const {
    data: motivoTransferenciaPaging,
    isLoading: isLoadingMotivoTransferencia,
    isRefetching: isRefetchingMotivoTransferencia,
  } = useFetchMotivoTransferencia({
    params: {
      page_size: 1200,
    },
  });

  const { data: productosPaging } = useFetchProductos({
    params: {
      page_size: 90000,
    },
  });

  const updateRecepcionTransferenciaAprobarMutation =
    useUpdateSolicitudTransferenciaMaterial<CreateSolicitudTransferenciaMaterialParamsBase>(
      {
        enableNavigate: true,
        enableErrorNavigate: true,
        customOnSuccess: () => clearAllStore(), // solo aquí
      },
    );

  const createTransferenciaMaterialMutation = useCreateTransferenciaMaterial({
    navigate,
    returnUrl: returnUrlAprobarSolTransferenciaPage,
    enableErrorNavigate: false,
    customOnSuccess: () => clearAllStore(),
  });

  ///* handlers
  const onSave = async (data: any) => {
    if (!isValid) return;

    const mappedProductos = productosDisponibles.map(producto => ({
      producto: producto.id,
      cantidad: producto.cantidad,
      series: producto.series ? producto.series : [],
    }));

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }

    // Validaciones
    for (const prod of mappedProductos) {
      const detalles = productosPaging?.data.items.find(
        item => item.id === prod.producto,
      );

      if (!detalles) {
        ToastWrapper.error(
          `No se encontró el producto con ID ${prod.producto}`,
        );
        return;
      }

      // Validar cantidad
      if (
        prod.cantidad === undefined ||
        prod.cantidad === null ||
        prod.cantidad === 0 ||
        prod.cantidad < 0
      ) {
        ToastWrapper.error(
          `El producto "${detalles.codigo}" necesita cantidad.`,
        );
        return;
      }

      // Validaciones según `requiere_series`
      if (
        detalles.requiere_series &&
        (!prod.series || prod.series.length === 0)
      ) {
        ToastWrapper.error(`El producto "${detalles.codigo}" requiere series.`);
        return;
      } else if (
        detalles.requiere_series &&
        prod.series.length !== prod.cantidad
      ) {
        ToastWrapper.error(
          `La cantidad del producto "${detalles.nombre}" debe ser igual a la cantidad de series existente.`,
        );
        return;
      } else if (!detalles.requiere_series && prod.series.length > 0) {
        ToastWrapper.error(
          `El producto "${detalles.nombre}" no necesita series.`,
        );
        return;
      }
    }

    const preparedData = {
      state: data.state,
      observacion: data.observacion,
      motivo_transferencia: data.motivo_transferencia,
      user_create: user?.id,
      productos: mappedProductos,

      bodega_origen: aprobTransferencia?.bodega_origen!,
      ubicacion_origen: aprobTransferencia?.ubicacion_origen!,
      bodega_destino: aprobTransferencia?.bodega_destino!,
      ubicacion_destino: aprobTransferencia?.ubicacion_destino!,
    };

    try {
      createTransferenciaMaterialMutation.mutate(preparedData);
    } catch (error) {
      return;
    }
    if (aprobTransferencia) {
      aprobTransferencia.estado_solicitud = 'FINALIZADO';
      updateRecepcionTransferenciaAprobarMutation.mutate({
        id: Number(aprobTransferencia.id),
        data: aprobTransferencia,
      });
    }
  };

  ///* effects
  useEffect(() => {
    const resultado = aprobTransferencia?.productos.map(d => {
      const productoEncontrado = productosPaging?.data?.items.find(
        i => i.id === d.producto,
      );
      return {
        ...d,
        ...productoEncontrado,
      };
    });

    productosEnviar(resultado!);
    form.setValue('observacion', aprobTransferencia?.observacion!);
    setUUIDUbicacion(aprobTransferencia?.ubicacion_origen_data?.uuid);
  }, [
    aprobTransferencia,
    reset,
    form,
    productosEnviar,
    productosPaging?.data?.items,
  ]);

  ///* columns --------------------
  const { crearMaterialColumns } = useColumnsProductosDisponibles();

  const productosConUbicacion = productosDisponibles.map(producto => {
    return {
      ...producto,
      ubicacion: uuidUbicacion,
    };
  });

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlAprobarSolTransferenciaPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextFieldNoForm
        label="Bodega Origen"
        size={gridSizeMdLg6}
        value={aprobTransferencia?.bodega_origen_data?.nombre!}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Bodega Destino"
        size={gridSizeMdLg6}
        value={aprobTransferencia?.bodega_destino_data?.nombre!}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Ubicacion Origen"
        size={gridSizeMdLg6}
        value={aprobTransferencia?.ubicacion_origen_data?.nombre!}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Ubicacion Destino"
        size={gridSizeMdLg6}
        value={aprobTransferencia?.ubicacion_destino_data?.nombre!}
        required={false}
        disabled
      />

      <CustomAutocomplete<MotivoTransferencia>
        label="Motivo Transferencia"
        name="motivo_transferencia"
        defaultValue={form.getValues().motivo_transferencia}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={motivoTransferenciaPaging?.data.items || []}
        isLoadingData={
          isLoadingMotivoTransferencia || isRefetchingMotivoTransferencia
        }
        disableClearable
        // errors
        control={form.control}
        error={errors.motivo_transferencia as any}
        helperText={errors.motivo_transferencia?.message}
        size={gridSizeMdLg12}
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
        {!!aprobTransferencia?.ubicacion_origen_data?.uuid &&
          !!aprobTransferencia?.ubicacion_destino_data?.uuid && (
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

        <CustomMinimalTable<ProductosDisponiblesTableType>
          columns={crearMaterialColumns}
          data={productosConUbicacion || []}
          //enablePagination
          density="comfortable"
        />
        <ProductosDisponiblesModal
          askADD={true}
          pk_ubicacion={uuidUbicacion}
          open={openAddProducts}
          onClose={() => setOpenAddProducts(false)}
        />
      </Grid>
    </SingleFormBoxScene>
  );
};

export default SaveAprobSolTransferencia;

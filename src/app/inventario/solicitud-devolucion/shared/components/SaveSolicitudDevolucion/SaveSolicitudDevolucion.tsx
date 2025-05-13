import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  CustomTextArea,
  CustomTypoLabel,
  CustomMinimalTable,
  CustomSingleButton,
  SingleFormBoxScene,
  CustomTypoLabelEnum,
  CustomTextFieldNoForm,
} from '@/shared/components';
import {
  ToastWrapper,
  PermissionsEnum,
  SolicitudDevolucion,
  solicitudDevolucionFormSchema,
  useColumnsProductosDisponibles,
  ProductosDisponiblesTableType,
  ProductosDisponiblesModal,
} from '@/shared';
import {
  useFetchProductos,
  useCreateSolicitudDevolucion,
  CreateSolicitudDevolucionParamsBase,
} from '@/actions/app';
import { useAuthStore } from '@/store/auth';
import { useProductosStore } from '@/store/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlSolicitudDevolucionPage } from '../../../pages/tables/SolicitudDevolucionMainPages';

export interface SaveSolicitudDevolucionProps {
  title: string;
  solicitud_devolucion?: SolicitudDevolucion;
}

type SaveFormData = CreateSolicitudDevolucionParamsBase & {};

const SaveSolicitudDevolucion: React.FC<SaveSolicitudDevolucionProps> = ({
  title,
  solicitud_devolucion,
}) => {
  const user = useAuthStore(s => s.user);
  useCheckPermission(PermissionsEnum.inventario_view_solicituddevolicion);

  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const clearAllStore = useProductosStore(s => s.clearAll);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudDevolucionFormSchema) as any,
    defaultValues: {
      bodega: user?.flota_data?.ubicacion_data?.bodega,
      ubicacion: user?.flota_data?.ubicacion_data?.id,
      user_create: user?.id,
      state: true,
    },
  });

  ///* fetch data ---------------------
  const { data: productosPaging } = useFetchProductos({
    params: {
      page_size: 90000,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createSolicitudDevolucionMutation = useCreateSolicitudDevolucion({
    navigate,
    returnUrl: returnUrlSolicitudDevolucionPage,
    enableErrorNavigate: false,
    customOnSuccess: () => clearAllStore(),
  });

  const productosConUbicacion = productosDisponibles.map(producto => {
    return {
      ...producto,
      ubicacion: user?.flota_data?.ubicacion_data?.id,
    };
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    const mappedProductos = productosDisponibles.map(i => ({
      producto: i.id,
      cantidad: i.cantidad,
      series: i.series ? i.series : [],
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
    }

    const preparedData = {
      ...data,
      productos: mappedProductos,
    };
    createSolicitudDevolucionMutation.mutate(preparedData);
  };

  ///* effects
  useEffect(() => {
    reset(solicitud_devolucion);
  }, [solicitud_devolucion, reset]);

  ///* columns --------------------
  const { crearMaterialColumnsSinSerie } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudDevolucionPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextFieldNoForm
        label="Bodega"
        value={user?.flota_data?.bodega_data?.nombre}
        disabled
      />
      <CustomTextFieldNoForm
        label="Ubicacion"
        value={user?.flota_data?.ubicacion_data?.nombre}
        disabled
      />

      <CustomTextArea
        label="Observación"
        name="observacion"
        control={form.control}
        defaultValue={form.getValues().observacion}
        error={errors.observacion}
        helperText={errors.observacion?.message}
      />
      {/* ==================== PRODUCTS ==================== */}
      <CustomTypoLabel
        text="Productos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <Grid container justifyContent="flex-end">
        {!!user?.flota_data?.ubicacion_data?.id && (
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
      </Grid>
      <CustomMinimalTable<ProductosDisponiblesTableType>
        columns={crearMaterialColumnsSinSerie}
        data={productosConUbicacion || []}
        enablePagination
        density="comfortable"
      />
      <ProductosDisponiblesModal
        askADD={false}
        pk_ubicacion={user?.flota_data?.ubicacion_data?.uuid}
        open={openAddProducts}
        onClose={() => setOpenAddProducts(false)}
      />
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudDevolucion;

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
  SolicitudCompra,
  solicitudCompraFormSchema,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  useColumnsProductosDisponibles,
} from '@/shared';
import {
  useFetchProductos,
  useCreateSolicitudCompra,
  CreateSolicitudCompraParamsBase,
} from '@/actions/app';
import { useAuthStore } from '@/store/auth';
import { useProductosStore } from '@/store/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlSolicitudCompraPage } from '../../../pages/tables/SolicitudCompraMainPages';

export interface SaveSolicitudCompraProps {
  title: string;
  solicitud_compra?: SolicitudCompra;
}

type SaveFormData = CreateSolicitudCompraParamsBase & {};

const SaveSolicitudCompra: React.FC<SaveSolicitudCompraProps> = ({
  title,
  solicitud_compra,
}) => {
  const user = useAuthStore(s => s.user);
  useCheckPermission(PermissionsEnum.inventario_view_solicitudcompra);

  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  //const productosEnviar = useProductosStore(s => s.setProductosDisponibles);
  const clearAllStore = useProductosStore(s => s.clearAll);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudCompraFormSchema) as any,
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
  const createSolicitudCompraMutation = useCreateSolicitudCompra({
    navigate,
    returnUrl: returnUrlSolicitudCompraPage,
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
    createSolicitudCompraMutation.mutate(preparedData);
  };

  ///* effects
  useEffect(() => {
    //productosEnviar([]);
    reset(solicitud_compra);
  }, [solicitud_compra, reset]);

  ///* columns --------------------
  const { crearMaterialColumnsSinSerie } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudCompraPage)}
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

export default SaveSolicitudCompra;

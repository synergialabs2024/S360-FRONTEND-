import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  ToastWrapper,
  getKeysFormErrorsMessage,
  ProductosDisponiblesModal,
  solicitudMaterialFormSchema,
  ProductosDisponiblesTableType,
  useColumnsProductosDisponibles,
  PermissionsEnum,
} from '@/shared';

import {
  CustomTextArea,
  CustomTypoLabel,
  SingleFormBoxScene,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTypoLabelEnum,
  CustomTextFieldNoForm,
} from '@/shared/components';

import { useAuthStore } from '@/store/auth';
import { useFetchProductos } from '@/actions/app';
import {
  useCreateSolicitudMaterial,
  CreatesolicitudMaterialParamsBase,
} from '@/actions/app/inventario/solicitud-material';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useProductosStore } from '@/store/app/inventario/productos-disponible.store';
import { SolicitudMaterial } from '@/shared/interfaces/app/inventario/solicitud-material';
import { returnUrlSolicitudMaterialPage } from '../../../pages/tables/SolicitudMaterialMainPage';

export interface SaveSolicitudMaterialProps {
  title: string;
  SolicitudMaterial?: SolicitudMaterial;
}

type SaveFormData = CreatesolicitudMaterialParamsBase & {};

const SaveSolicitudMaterial: React.FC<SaveSolicitudMaterialProps> = ({
  title,
  SolicitudMaterial,
}) => {
  const user = useAuthStore(s => s.user);
  useCheckPermission(PermissionsEnum.inventario_view_solicitudmaterial);

  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);
  const clearAllStore = useProductosStore(s => s.clearAll);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudMaterialFormSchema) as any,
    defaultValues: {
      bodega: user?.flota_data?.ubicacion_data?.bodega,
      ubicacion: user?.flota_data?.ubicacion_data?.id,
      user_create: user?.id,
      state: true,
    },
  });
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
  const createSolicitudMaterialMutation = useCreateSolicitudMaterial({
    navigate,
    returnUrl: returnUrlSolicitudMaterialPage,
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

    const mappedProductos = productosDisponibles.map(producto => ({
      producto: producto.id,
      cantidad: producto.cantidad,
      series: producto.series ? producto.series : [],
    }));

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }
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

    createSolicitudMaterialMutation.mutate(preparedData);
  };

  ///* effects
  useEffect(() => {
    productosEnviar([]);
    reset(SolicitudMaterial);
  }, [SolicitudMaterial, reset]);

  ///* columns --------------------
  const { crearMaterialColumnsSinSerie } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudMaterialPage)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Errores en: ${keys}`);
      })}
    >
      <CustomTextFieldNoForm
        label="Bodega"
        value={user?.flota_data?.bodega_data?.nombre}
        disabled
      />
      <CustomTextFieldNoForm
        label="Ubicacion"
        disabled
        value={user?.flota_data?.ubicacion_data?.nombre}
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
      </Grid>
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudMaterial;

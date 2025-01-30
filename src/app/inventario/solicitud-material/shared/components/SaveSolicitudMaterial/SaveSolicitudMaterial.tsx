import { FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import {
  ToastWrapper,
  getKeysFormErrorsMessage,
  solicitudMaterialFormSchema,
} from '@/shared';

import {
  CustomMinimalTable,
  CustomSingleButton,
  CustomTextArea,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';

import { useProductosStore } from '@/store/app/inventario/productos-disponible.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { returnUrlSolicitudMaterialPage } from '../../../pages/tables/SolicitudMaterialMainPage';
import {
  CreatesolicitudMaterialParamsBase,
  useCreateSolicitudMaterial,
} from '@/actions/app/inventario/solicitud-material';
import { SolicitudMaterial } from '@/shared/interfaces/app/inventario/solicitud-material.ts';
import ProductosDisponiblesModal from '@/app/inventario/ingreso-material/pages/modal/ProductosDisponiblesModal';
import { useAuthStore } from '@/store/auth';
import {
  ProductosDisponiblesTableType,
  useColumnsProductosDisponibles,
} from '@/app/inventario/ingreso-material/shared/hooks';

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
  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const clearAllStore = useProductosStore(s => s.clearAll);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudMaterialFormSchema) as any,
    defaultValues: {
      bodega: user?.flota_data?.ubicacion_data?.bodega,
      ubicacion: user?.flota_data?.ubicacion_data?.id,
      state: true,
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

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = productosDisponibles.map(producto => ({
      id: producto.id,
      producto: producto.id,
      cantidad_recibida: producto.cantidad,
      cantidad: producto.cantidad,
      descripcion: producto.descripcion,
      nombre: producto.nombre,
      codigo: producto.codigo,
      codigo_auxiliar: producto.codigo_auxiliar,
      categoria: producto.categoria,
      categoria_data: producto.categoria_data,
      series: producto.series ? producto.series : [],
      requiere_series: producto.requiere_series,
      tipo: producto.tipo,
    }));

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }
    const preparedData = {
      ...data,
      productos: mappedProductos,
    };

    createSolicitudMaterialMutation.mutate(preparedData);
    productosEnviar([]);
  };

  ///* effects
  useEffect(() => {
    reset(SolicitudMaterial);
  }, [SolicitudMaterial, reset, productosEnviar]);

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
          data={productosDisponibles || []}
          enablePagination
          density="comfortable"
        />
        <ProductosDisponiblesModal
          askADD={true}
          pk_ubicacion={user?.flota_data?.ubicacion_data?.uuid}
          open={openAddProducts}
          onClose={() => setOpenAddProducts(false)}
        />
      </Grid>
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudMaterial;

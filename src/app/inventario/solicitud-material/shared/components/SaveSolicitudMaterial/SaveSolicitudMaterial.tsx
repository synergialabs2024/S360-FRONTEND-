import { FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { Producto, ToastWrapper, solicitudMaterialFormSchema } from '@/shared';

import {
  CustomMinimalTable,
  CustomSingleButton,
  CustomTextArea,
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
import { useColumnsSolicitudMaterialProductos } from '../../hooks/useColumnsSolicitudMaterialProductos';

export interface SaveSolicitudMaterialProps {
  title: string;
  SolicitudMaterial?: SolicitudMaterial;
}

export type ProductosDisponiblesTableType = Producto & {
  usedQuantity: number;

  containsSeries: boolean;
  selectedSeries: string[];
  savedSeries: string[];
  cantidad?: number;
  series?: any[];
  productos?: string[];
};

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
    formState: { errors },
  } = form;

  ///* mutations
  const createSolicitudMaterialMutation = useCreateSolicitudMaterial({
    navigate,
    returnUrl: returnUrlSolicitudMaterialPage,
    enableErrorNavigate: false,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    const mappedProductos = productosDisponibles.map(producto => ({
      ...producto,
      producto: producto.id,
      series: producto.series ? producto.series : [],
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
  };

  ///* effects
  useEffect(() => {
    reset(SolicitudMaterial);
  }, [SolicitudMaterial, reset, productosEnviar]);

  ///* columns --------------------
  const { crearSolicitudMaterialColumns } =
    useColumnsSolicitudMaterialProductos();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudMaterialPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      {/* ==================== PRODUCTS ==================== */}
      <CustomTypoLabel
        text="Productos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <Grid container justifyContent="flex-end">
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
      </Grid>
      <CustomMinimalTable<ProductosDisponiblesTableType>
        columns={crearSolicitudMaterialColumns}
        data={productosDisponibles || []}
        enablePagination
        density="comfortable"
      />
      <ProductosDisponiblesModal
        open={openAddProducts}
        onClose={() => setOpenAddProducts(false)}
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
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudMaterial;

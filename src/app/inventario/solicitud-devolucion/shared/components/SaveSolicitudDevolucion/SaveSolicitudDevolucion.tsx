import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  CustomTextArea,
  CustomTypoLabel,
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  SingleFormBoxScene,
  CustomTypoLabelEnum,
  CustomTextFieldNoForm,
} from '@/shared/components';
import {
  useLoaders,
  ToastWrapper,
  gridSizeMdLg4,
  IngresoMaterial,
  PermissionsEnum,
  SolicitudDevolucion,
  IngresosDisponiblesTableType,
  solicitudDevolucionFormSchema,
  useColumnsProductosDisponibles,
} from '@/shared';
import {
  useFetchProductos,
  useFetchIngresoMateriales,
  useCreateSolicitudDevolucion,
  CreateSolicitudDevolucionParamsBase,
} from '@/actions/app';
import { useAuthStore } from '@/store/auth';
import { useIngresosStore } from '@/store/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlSolicitudDevolucionPage } from '../../../pages/tables/SolicitudDevolucionMainPages';
import IngresoDisponiblesModal from '@/shared/hooks/app/inventario/solicitud-devolucion/modal/IngresoDisponiblesModal';

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
  const [uuidIngresoMaterial, setUUIDIngresoMaterial] = useState<
    string | undefined
  >('');

  ///* global state --------------------
  const ingresosDisponibles = useIngresosStore(s => s.ingresosDisponibles);
  const productosEnviar = useIngresosStore(s => s.setIngresosDisponibles);

  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudDevolucionFormSchema) as any,
    defaultValues: {
      state: true,
      user_create: user?.id,
      bodega: user?.flota_data?.ubicacion_data?.bodega,
      ubicacion: user?.flota_data?.ubicacion_data?.id,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const watchedIngresoMaterial = form.watch('ingreso_material');

  ///* fetch data ---------------------
  const {
    data: ingresoMaterialPaging,
    isLoading: isLoadingIngresoMaterial,
    isRefetching: isRefetchingIngresoMaterial,
  } = useFetchIngresoMateriales({
    enabled: !!user?.flota_data?.ubicacion_data?.id,
    params: {
      page_size: 1200,
      ubicacion: user?.flota_data?.ubicacion_data?.id!,
    },
  });
  const { data: productosPaging } = useFetchProductos({
    params: {
      page_size: 90000,
    },
  });

  ///* mutations
  const createSolicitudDevolucionMutation = useCreateSolicitudDevolucion({
    navigate,
    returnUrl: returnUrlSolicitudDevolucionPage,
    enableErrorNavigate: false,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    console.log(ingresosDisponibles);

    const mappedProductos = ingresosDisponibles.map(i => ({
      producto: i.id,
      cantidad: i.cantidad_pedida,
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
    console.log(preparedData);
    createSolicitudDevolucionMutation.mutate(preparedData);
    productosEnviar([]);
  };

  ///* effects
  useEffect(() => {
    if (!solicitud_devolucion?.id) return;
    reset(solicitud_devolucion);
  }, [solicitud_devolucion, reset]);

  useEffect(() => {
    if (
      isLoadingIngresoMaterial ||
      isRefetchingIngresoMaterial ||
      !user?.flota_data?.ubicacion_data
    )
      return;
    !user?.flota_data?.ubicacion_data &&
      ToastWrapper.error(`
        No se encontraron ingreso de material para la ubicacion
        seleccionada
      `);
  }, [
    ingresoMaterialPaging,
    isLoadingIngresoMaterial,
    isRefetchingIngresoMaterial,
  ]);

  const customLoader = isLoadingIngresoMaterial || isRefetchingIngresoMaterial;
  useLoaders(customLoader);

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
        size={gridSizeMdLg4}
      />
      <CustomTextFieldNoForm
        label="Ubicacion"
        value={user?.flota_data?.ubicacion_data?.nombre}
        disabled
        size={gridSizeMdLg4}
      />
      <CustomAutocomplete<IngresoMaterial>
        label="Ingreso Material"
        name="ingreso_material"
        // options
        options={ingresoMaterialPaging?.data?.items || []}
        valueKey="secuencial"
        actualValueKey="id"
        defaultValue={form.getValues().ingreso_material}
        isLoadingData={isLoadingIngresoMaterial || isRefetchingIngresoMaterial}
        // vaidation
        control={form.control}
        error={errors.ingreso_material}
        helperText={errors.ingreso_material?.message}
        size={gridSizeMdLg4}
        onChangeRawValue={row => {
          setUUIDIngresoMaterial(row?.uuid);
          productosEnviar([]);
        }}
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
        {!!watchedIngresoMaterial && (
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
      <CustomMinimalTable<IngresosDisponiblesTableType>
        columns={crearMaterialColumnsSinSerie}
        data={ingresosDisponibles || []}
        enablePagination
        density="comfortable"
      />
      <IngresoDisponiblesModal
        uuid_ingreso={uuidIngresoMaterial}
        open={openAddProducts}
        onClose={() => setOpenAddProducts(false)}
      />
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudDevolucion;

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  CreateSolicitudDevolucionParamsBase,
  useCreateSolicitudDevolucion,
  useFetchIngresoMateriales,
  useFetchUbicacions,
  useFetchBodegas,
  useFetchProductos,
} from '@/actions/app';
import {
  Bodega,
  Ubicacion,
  useLoaders,
  ToastWrapper,
  gridSizeMdLg4,
  IngresoMaterial,
  PermissionsEnum,
  SolicitudDevolucion,
  IngresosDisponiblesTableType,
  solicitudDevolucionFormSchema,
  useColumnsIngresosDisponibles,
} from '@/shared';
import {
  CustomTextArea,
  CustomTypoLabel,
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  SingleFormBoxScene,
  CustomTypoLabelEnum,
} from '@/shared/components';
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
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const watchedBodega = form.watch('bodega');
  const watchedUbicacion = form.watch('ubicacion');
  const watchedIngresoMaterial = form.watch('ingreso_material');

  ///* fetch data ---------------------
  const {
    data: bodegasPagingRes,
    isLoading: isLoadingBodegas,
    isRefetching: isRefetchingBodegas,
  } = useFetchBodegas({
    params: {
      page_size: 600,
    },
  });
  const {
    data: ubicacionesPaging,
    isLoading: isLoadingUbicaciones,
    isRefetching: isRefetchingUbicaciones,
  } = useFetchUbicacions({
    enabled: !!watchedBodega,
    params: {
      page_size: 1200,
      bodega: watchedBodega!,
    },
  });
  const {
    data: ingresoMaterialPaging,
    isLoading: isLoadingIngresoMaterial,
    isRefetching: isRefetchingIngresoMaterial,
  } = useFetchIngresoMateriales({
    enabled: !!watchedUbicacion || !!watchedBodega,
    params: {
      page_size: 1200,
      ubicacion: watchedUbicacion!,
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

    const mappedProductos = ingresosDisponibles.map(i => ({
      producto: i.id,
      cantidad: i.cantidad,
      series: i.series ? i.series : [],
    }));

    // Validaciones
    for (const prod of mappedProductos) {
      const detalles = productosPaging?.data.items.find(
        item => item.id === prod.producto,
      );

      if (!detalles) {
        console.error(`No se encontró el producto con ID ${prod.producto}`);
        ToastWrapper.error(
          `No se encontró el producto con ID ${prod.producto}`,
        );
        return;
      }

      // Validar cantidad
      if (
        prod.cantidad === undefined ||
        prod.cantidad === null ||
        prod.cantidad === 0
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
      } else if (!detalles.requiere_series && prod.series.length > 0) {
        ToastWrapper.error(
          `El producto "${detalles.nombre}" no necesita series.`,
        );
        return;
      }
    }

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }
    const preparedData = {
      ...data,
      productos: mappedProductos,
    };

    createSolicitudDevolucionMutation.mutate(preparedData);
    productosEnviar([]);
  };

  ///* effects
  useEffect(() => {
    if (!solicitud_devolucion?.id) return;
    reset(solicitud_devolucion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  useEffect(() => {
    if (isLoadingUbicaciones || isRefetchingUbicaciones || !watchedBodega)
      return;
    !ubicacionesPaging?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron ubicaciones para la bodega seleccionada',
      );

    if (
      isLoadingIngresoMaterial ||
      isRefetchingIngresoMaterial ||
      !watchedUbicacion
    )
      return;
    !ubicacionesPaging?.data?.items?.length &&
      ToastWrapper.error(`
        No se encontraron ingreso de material para la ubicacion
        seleccionada
      `);
  }, [
    watchedBodega,
    watchedUbicacion,
    ubicacionesPaging,
    ingresoMaterialPaging,
    isLoadingUbicaciones,
    isLoadingIngresoMaterial,
    isRefetchingUbicaciones,
    isRefetchingIngresoMaterial,
  ]);

  const customLoader =
    isLoadingUbicaciones ||
    isRefetchingUbicaciones ||
    isLoadingIngresoMaterial ||
    isRefetchingIngresoMaterial;
  useLoaders(customLoader);

  ///* columns --------------------
  const { crearMaterialColumnsRecepcion } = useColumnsIngresosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudDevolucionPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomAutocomplete<Bodega>
        label="Bodega"
        name="bodega"
        // options
        options={bodegasPagingRes?.data?.items || []}
        valueKey="nombre"
        actualValueKey="id"
        defaultValue={form.getValues().bodega}
        isLoadingData={isLoadingBodegas || isRefetchingBodegas}
        // vaidation
        control={form.control}
        error={errors.bodega}
        helperText={errors.bodega?.message}
        size={gridSizeMdLg4}
        onChangeRawValue={() => {
          form.setValue('ubicacion', '' as any);
          form.setValue('ingreso_material', '' as any);
          productosEnviar([]);
        }}
      />
      <CustomAutocomplete<Ubicacion>
        label="Ubicacion"
        name="ubicacion"
        defaultValue={form.getValues().ubicacion}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={ubicacionesPaging?.data.items || []}
        isLoadingData={isLoadingUbicaciones || isRefetchingUbicaciones}
        disableClearable
        // errors
        control={form.control}
        error={errors.ubicacion}
        helperText={errors.ubicacion?.message}
        size={gridSizeMdLg4}
        onChangeRawValue={() => {
          form.setValue('ingreso_material', '' as any);
          productosEnviar([]);
        }}
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
        columns={crearMaterialColumnsRecepcion}
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

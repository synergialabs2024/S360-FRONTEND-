import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import {
  CreateSolicitudDevolucionParamsBase,
  useCreateSolicitudDevolucion,
  useFetchBodegas,
  useFetchIngresoMateriales,
  useFetchUbicacions,
} from '@/actions/app';
import {
  Bodega,
  gridSizeMdLg4,
  IngresoMaterial,
  IngresosDisponiblesTableType,
  PermissionsEnum,
  SolicitudDevolucion,
  solicitudDevolucionFormSchema,
  ToastWrapper,
  Ubicacion,
  useColumnsIngresosDisponibles,
  useLoaders,
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
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlSolicitudDevolucionPage } from '../../../pages/tables/SolicitudDevolucionMainPages';
import { Grid } from '@mui/material';
import { FiPlus } from 'react-icons/fi';
import { useIngresosStore } from '@/store/app';
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
      id: i.id,
      producto: i.id,
      producto_uuid: i.uuid,
      cantidad: i.cantidad,
      cantidad_pedida: i.cantidad,
      descripcion: i.descripcion,
      nombre: i.nombre,
      codigo: i.codigo,
      codigo_auxiliar: i.codigo_auxiliar,
      categoria: i.categoria,
      categoria_data: i.categoria_data,
      series: i.series ? i.series : [],
      requiere_series: i.requiere_series,
      tipo: i.tipo,
    }));

    for (const producto of mappedProductos) {
      if (producto.requiere_series === true) {
        if (producto.cantidad !== producto.series.length) {
          ToastWrapper.error(`
            Las series deben tener la misma cifra que
            la cantidad aprobada
          `);
          return;
        }
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

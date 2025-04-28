import { useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  CustomTextArea,
  CustomTypoLabel,
  SingleFormBoxScene,
  CustomAutocomplete,
  CustomMinimalTable,
  CustomTypoLabelEnum,
} from '@/shared/components';
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
  useColumnsProductosDisponibles,
} from '@/shared';
import {
  useFetchBodegas,
  useFetchProductos,
  useFetchUbicacions,
  useFetchIngresoMateriales,
  CreateSolicitudDevolucionParamsBase,
  useUpdatesolicitudDevolucion,
} from '@/actions/app';
import { useAuthStore } from '@/store/auth';
import { useIngresosStore } from '@/store/app';
import { useUiConfirmModalStore } from '@/store/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlRecepcionSolicitudDevolucionMaterialesPage } from '../../../pages/tables/RecepcionSolDevolucionMainPages';
import { returnUrlTransferenciaMaterialesPage } from '@/app/inventario/transferencia-material/pages/tables/TransferenciaMaterialPage';

export interface SaveRecepSolDevolucionProps {
  title: string;
  recepcionDevolucion?: SolicitudDevolucion;
}

type SaveFormData = CreateSolicitudDevolucionParamsBase & {};

const SaveRecepSolDevolucion: React.FC<SaveRecepSolDevolucionProps> = ({
  title,
  recepcionDevolucion,
}) => {
  const user = useAuthStore(s => s.user);

  useCheckPermission(PermissionsEnum.inventario_view_solicituddevolicion);

  ///* global state --------------------
  const ingresosDisponibles = useIngresosStore(s => s.ingresosDisponibles);
  const productosEnviar = useIngresosStore(s => s.setIngresosDisponibles);

  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
  const updateRecepcionDevolucionMutation =
    useUpdatesolicitudDevolucion<CreateSolicitudDevolucionParamsBase>({
      navigate,
      returnUrl: returnUrlRecepcionSolicitudDevolucionMaterialesPage,
    });

  const updateRecepcionDevolucionAprobarMutation =
    useUpdatesolicitudDevolucion<CreateSolicitudDevolucionParamsBase>({
      enableNavigate: true,
      enableErrorNavigate: true,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = ingresosDisponibles.map(i => ({
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

    data.estado_solicitud = 'APROBADO';
    data.productos = mappedProductos;

    setConfirmDialog({
      isOpen: true,
      title: 'Solicitud de devolucion creada',
      subtitle: '¿Desea ingresar la devolucion de este material?',
      onConfirm: () => {
        productosEnviar([]);
        try {
          navigate(
            `${returnUrlTransferenciaMaterialesPage}/solicitud/${data.uuid}`,
            {
              state: { solicitud: 'solicitud_devolucion' },
            },
          );
          setConfirmDialogIsOpen(false);
          if (data.id !== undefined) {
            updateRecepcionDevolucionAprobarMutation.mutate({
              id: data.id,
              data,
            });
          }
        } catch (error) {
          setConfirmDialogIsOpen(false);
          ToastWrapper.error(`${error}`);
        }
      },
      confirmTextBtn: 'SI, CONTINUAR',
      cancelTextBtn: 'CERRAR',
      onClose: () => {
        setConfirmDialogIsOpen(false);
        updateRecepcionDevolucionMutation.mutate({ id: data.id!, data });
        navigate(returnUrlRecepcionSolicitudDevolucionMaterialesPage);
        productosEnviar([]);
      },
    });
  };

  const onRechazar = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (recepcionDevolucion?.id) {
      data.estado_solicitud = 'RECHAZADO';
      updateRecepcionDevolucionMutation.mutate({
        id: recepcionDevolucion.id!,
        data,
      });
      queryClient.invalidateQueries({ queryKey: ['solicitud-devolucion'] });
      return navigate(`${returnUrlRecepcionSolicitudDevolucionMaterialesPage}`);
    }
  };

  ///* effects
  useEffect(() => {
    const dataP = recepcionDevolucion?.productos
      ?.map(prod => {
        const itemEncontrado = productosPaging?.data?.items.find(
          item => item.id === prod.producto,
        );
        return itemEncontrado
          ? {
            ...itemEncontrado,
            producto: prod.producto,
            cantidad: prod.cantidad,
            cantidad_pedida: prod.cantidad,
            cantidad_aprobada: prod.cantidad,
            series: prod.series,
          }
          : null;
      })
      .filter(Boolean);

    productosEnviar((dataP as unknown as IngresosDisponiblesTableType[]) || []);
    if (!recepcionDevolucion?.id) return;
    reset(recepcionDevolucion);
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
  const { crearMaterialColumnsSolicitud } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() =>
        navigate(returnUrlRecepcionSolicitudDevolucionMaterialesPage)
      }
      onReject={handleSubmit(onRechazar, () => {})}
      onSave={handleSubmit(onSave, () => {})}
      saveTextBtn="Aprobar"
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
        disabled
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
        disabled
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
        disabled
      />
      <CustomTextArea
        label="Observación"
        name="observacion"
        control={form.control}
        defaultValue={form.getValues().observacion}
        error={errors.observacion}
        helperText={errors.observacion?.message}
        disabled
      />
      {/* ==================== PRODUCTS ==================== */}
      <CustomTypoLabel
        text="Productos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <CustomMinimalTable<IngresosDisponiblesTableType>
        columns={crearMaterialColumnsSolicitud}
        data={ingresosDisponibles || []}
        enablePagination
        density="comfortable"
      />
    </SingleFormBoxScene>
  );
};

export default SaveRecepSolDevolucion;

/* eslint-disable indent */
import { useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  CustomTextArea,
  CustomTypoLabel,
  CustomAutocomplete,
  CustomMinimalTable,
  SingleFormBoxScene,
  CustomTypoLabelEnum,
} from '@/shared/components';
import {
  Bodega,
  Ubicacion,
  ToastWrapper,
  gridSizeMdLg6,
  PermissionsEnum,
  RecepcionMaterial,
  solicitudMaterialFormSchema,
  ProductosDisponiblesTableType,
  useColumnsProductosDisponibles,
} from '@/shared';
import {
  useFetchBodegas,
  useFetchProductos,
  useFetchUbicacions,
  useUpdateRecepcionMaterial,
  CreateRecepcionMaterialParamsBase,
} from '@/actions/app';
import { useProductosStore } from '@/store/app';
import { useUiConfirmModalStore } from '@/store/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlRecepcionMaterialPage } from '../../../pages/tables/RecepcionMaterialMainPage';
import { returnUrlTransferenciaMaterialesPage } from '@/app/inventario/transferencia-material/pages/tables/TransferenciaMaterialPage';

export interface SaveRecepcionMaterialProps {
  title: string;
  recepcionMaterial?: RecepcionMaterial;
}

type SaveFormData = CreateRecepcionMaterialParamsBase & {};

const SaveRecepcionMaterial: React.FC<SaveRecepcionMaterialProps> = ({
  title,
  recepcionMaterial,
}) => {
  useCheckPermission(PermissionsEnum.inventario_view_solicitudmaterial);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);
  const clearAllStore = useProductosStore(s => s.clearAll);

  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudMaterialFormSchema) as any,
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
  const { data: productosPaging } = useFetchProductos({
    params: {
      page_size: 90000,
    },
  });

  ///* mutations
  const updateRecepcionMaterialMutation =
    useUpdateRecepcionMaterial<CreateRecepcionMaterialParamsBase>({
      navigate,
      returnUrl: returnUrlRecepcionMaterialPage,
      customOnSuccess: () => clearAllStore(),
    });

  const updateRecepcionMaterialAprobarMutation =
    useUpdateRecepcionMaterial<CreateRecepcionMaterialParamsBase>({
      enableNavigate: true,
      enableErrorNavigate: true,
      customOnSuccess: () => clearAllStore(),
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = productosDisponibles.map(producto => ({
      producto: producto.id,
      cantidad: producto.cantidad!,
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
    }

    data.estado_solicitud = 'APROBADO';
    data.productos = mappedProductos;

    setConfirmDialog({
      isOpen: true,
      title: 'Solicitud de material creada',
      subtitle: '¿Desea ingresar la solicitud de este material?',
      onConfirm: () => {
        try {
          navigate(
            `${returnUrlTransferenciaMaterialesPage}/solicitud/${data.uuid}`,
            {
              state: { solicitud: 'solicitud_material' },
            },
          );
          setConfirmDialogIsOpen(false);
          if (data.id !== undefined) {
            updateRecepcionMaterialAprobarMutation.mutate({
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
        updateRecepcionMaterialMutation.mutate({ id: data.id!, data });
        navigate(returnUrlRecepcionMaterialPage);
      },
    });
  };

  const onRechazar = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (recepcionMaterial?.id) {
      data.estado_solicitud = 'RECHAZADO';
      updateRecepcionMaterialMutation.mutate({
        id: recepcionMaterial.id!,
        data,
      });
      queryClient.invalidateQueries({ queryKey: ['solicitud-materiales'] });
      return navigate(`${returnUrlRecepcionMaterialPage}`);
    }
  };

  ///* effects
  useEffect(() => {
    const dataP = recepcionMaterial?.productos
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
    productosEnviar(dataP?.filter(item => item !== null) || []);
    if (!recepcionMaterial?.id) return;
    reset(recepcionMaterial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, productosPaging]);

  ///* columns --------------------
  const { crearMaterialColumnsSolicitud } = useColumnsProductosDisponibles();

  return (
    <>
      <SingleFormBoxScene
        titlePage={title}
        onCancel={() => navigate(returnUrlRecepcionMaterialPage)}
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
          size={gridSizeMdLg6}
          disabled={true}
        />
        <CustomAutocomplete<Ubicacion>
          label="Ubicacion"
          name="ubicacion"
          defaultValue={form.getValues().ubicacion || ''}
          // options
          valueKey="nombre"
          actualValueKey="id"
          options={ubicacionesPaging?.data.items || []}
          isLoadingData={isLoadingUbicaciones || isRefetchingUbicaciones}
          disableClearable
          // errors
          control={form.control}
          error={errors.ubicacion as any}
          helperText={errors.ubicacion?.message}
          size={gridSizeMdLg6}
          disabled={true}
        />
        <CustomTextArea
          label="Observación"
          name="observacion"
          control={form.control}
          defaultValue={form.getValues().observacion}
          error={errors.observacion}
          helperText={errors.observacion?.message}
          disabled={true}
        />

        {/* ==================== PRODUCTS ==================== */}
        <CustomTypoLabel
          text="Productos"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <CustomMinimalTable<ProductosDisponiblesTableType>
          columns={crearMaterialColumnsSolicitud}
          data={productosDisponibles || []}
          enablePagination
          density="comfortable"
        />
      </SingleFormBoxScene>
    </>
  );
};

export default SaveRecepcionMaterial;

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  CreateRecepcionMaterialParamsBase,
  useCreateIngresoMaterial,
  useFetchBodegas,
  useFetchProductos,
  useFetchUbicacions,
  useUpdateRecepcionMaterial,
} from '@/actions/app';
import {
  Bodega,
  gridSizeMdLg6,
  PermissionsEnum,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  RecepcionMaterial,
  solicitudMaterialFormSchema,
  ToastWrapper,
  Ubicacion,
  useColumnsProductosDisponibles,
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
import { useProductosStore } from '@/store/app';

import { FiPlus } from 'react-icons/fi';
import { returnUrlRecepcionMaterialPage } from '../../../pages/tables/RecepcionMaterialMainPage';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlIngresoMaterialesPage } from '@/app/inventario/ingreso-material/pages/tables/IngresoMaterialesPage';

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

  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);

  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const navigate = useNavigate();

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
    });

  const updateRecepcionMaterialAprobarMutation =
    useUpdateRecepcionMaterial<CreateRecepcionMaterialParamsBase>({
      enableNavigate: true,
      enableErrorNavigate: true,
    });

  const createIngresoMaterialMutation = useCreateIngresoMaterial({
    navigate,
    returnUrl: returnUrlIngresoMaterialesPage,
    enableErrorNavigate: false,
  });

  const onSuccessCreateIngreso = (dato: RecepcionMaterial) => {
    updateRecepcionMaterialAprobarMutation.mutate(
      {
        id: dato.id!,
        data: dato,
      },
      {
        onSuccess: () => {
          const preparedData = {
            state: dato.state,
            observacion: dato.observacion,
            productos: dato.productos,
            bodega: dato.bodega,
            ubicacion: dato.ubicacion,
            user_create: dato.user_create,
          };

          setConfirmDialog({
            isOpen: true,
            title: 'Solicitud de material creada',
            subtitle:
              'La solicitud ha sido creada con éxito. ¿Desea continuar con la preventa?',
            onConfirm: () => {
              setConfirmDialogIsOpen(false);
              createIngresoMaterialMutation.mutate(preparedData);
            },
            confirmTextBtn: 'SI, CONTINUAR',
            cancelTextBtn: 'CERRAR',
            onClose: () => {
              setConfirmDialogIsOpen(false);
              navigate(returnUrlRecepcionMaterialPage);
            },
          });
        },
        onError: error => {
          ToastWrapper.error(
            `Error al actualizar la recepción del material. ${error}`,
          );
        },
      },
    );
  };

  ///* handlers
  const onSave = async (data: SaveFormData) => {
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

      const validarCantidad = (
        detalles?.ubicaciones_producto as unknown as {
          stock: number;
          ubicacion: string;
        }[]
      )?.find(i => i.ubicacion == recepcionMaterial?.ubicacion_data.uuid);

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
      } else if (validarCantidad && validarCantidad.stock < prod.cantidad) {
        ToastWrapper.error(
          `El producto "${detalles.codigo}" tiene una cantidad
              de ${prod.cantidad} y solo existe ${validarCantidad.stock}.`,
        );
        return;
      }

      // Validaciones según `requiere_series`
      if (!detalles.requiere_series && prod.series.length > 0) {
        ToastWrapper.error(
          `El producto "${detalles.nombre}" no necesita series.`,
        );
        return;
      }
    }

    data.estado_solicitud = 'APROBADO';
    data.productos = mappedProductos;

    onSuccessCreateIngreso(data as RecepcionMaterial);
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
  const { crearMaterialColumnsRecepcion } = useColumnsProductosDisponibles();

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
        {!!recepcionMaterial?.ubicacion && (
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
          columns={crearMaterialColumnsRecepcion}
          data={productosDisponibles || []}
          enablePagination
          density="comfortable"
        />
        <ProductosDisponiblesModal
          askADD={true}
          pk_ubicacion={recepcionMaterial?.ubicacion_data?.uuid}
          open={openAddProducts}
          onClose={() => setOpenAddProducts(false)}
        />
      </SingleFormBoxScene>
    </>
  );
};

export default SaveRecepcionMaterial;

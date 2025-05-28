import { useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  CustomTextArea,
  CustomTypoLabel,
  SingleFormBoxScene,
  CustomMinimalTable,
  CustomTypoLabelEnum,
  CustomTextFieldNoForm,
} from '@/shared/components';
import {
  ToastWrapper,
  PermissionsEnum,
  SolicitudCompra,
  IngresosDisponiblesTableType,
  solicitudCompraFormSchema,
  useColumnsProductosDisponibles,
} from '@/shared';
import {
  useFetchProductos,
  useUpdatesolicitudCompra,
  CreateSolicitudCompraParamsBase,
} from '@/actions/app';
import { useAuthStore } from '@/store/auth';
import { useProductosStore } from '@/store/app';
import { useUiConfirmModalStore } from '@/store/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlRecepSolCompraPage } from '../../../pages/tables/RecepcionSolCompraMainPages';
import { returnUrlAprobarSolCompraPage } from '../../../pages/tables/AprobarSolCompra';

export interface SaveRecepSolCompraProps {
  title: string;
  recepcionCompra?: SolicitudCompra;
}

type SaveFormData = CreateSolicitudCompraParamsBase & {};

const SaveRecepSolCompra: React.FC<SaveRecepSolCompraProps> = ({
  title,
  recepcionCompra,
}) => {
  const user = useAuthStore(s => s.user);

  useCheckPermission(PermissionsEnum.inventario_view_solicitudcompra);

  ///* global state --------------------
  const ingresosDisponibles = useProductosStore(s => s.productosDisponibles);
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
    resolver: yupResolver(solicitudCompraFormSchema) as any,
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

  ///* fetch data ---------------------
  const { data: productosPaging } = useFetchProductos({
    params: {
      page_size: 90000,
    },
  });

  ///* mutations
  const updateRecepcionCompraMutation =
    useUpdatesolicitudCompra<CreateSolicitudCompraParamsBase>({
      navigate,
      returnUrl: returnUrlRecepSolCompraPage,
      customOnSuccess: () => clearAllStore(),
    });

  const updateRecepcionCompraAprobarMutation =
    useUpdatesolicitudCompra<CreateSolicitudCompraParamsBase>({
      enableNavigate: true,
      enableErrorNavigate: true,
      customOnSuccess: () => clearAllStore(),
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
    }

    data.estado_solicitud = 'APROBADO';
    data.productos = mappedProductos;

    setConfirmDialog({
      isOpen: true,
      title: 'Solicitud de Compra creada',
      subtitle: '¿Desea ingresar la Compra de este material?',
      onConfirm: () => {
        try {
          navigate(`${returnUrlAprobarSolCompraPage}/editar/${data.uuid}`);
          setConfirmDialogIsOpen(false);
          if (data.id !== undefined) {
            updateRecepcionCompraAprobarMutation.mutate({
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
        updateRecepcionCompraMutation.mutate({ id: data.id!, data });
        navigate(returnUrlRecepSolCompraPage);
      },
    });
  };

  const onRechazar = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (recepcionCompra?.id) {
      data.estado_solicitud = 'RECHAZADO';
      updateRecepcionCompraMutation.mutate({
        id: recepcionCompra.id!,
        data,
      });
      queryClient.invalidateQueries({ queryKey: ['solicitud-Compra'] });
      return navigate(`${returnUrlRecepSolCompraPage}`);
    }
  };

  ///* effects
  useEffect(() => {
    const dataP = recepcionCompra?.productos
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
    if (!recepcionCompra?.id) return;
    reset(recepcionCompra);
  }, [reset, productosEnviar, productosPaging?.data?.items]);

  ///* columns --------------------
  const { crearMaterialColumnsSolicitud } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlRecepSolCompraPage)}
      onReject={handleSubmit(onRechazar, () => {})}
      onSave={handleSubmit(onSave, () => {})}
      saveTextBtn="Aprobar"
    >
      <CustomTextFieldNoForm
        label="Bodega"
        value={form.getValues().bodega_data?.nombre}
        disabled
      />
      <CustomTextFieldNoForm
        label="Ubicacion"
        value={form.getValues().ubicacion_data?.nombre}
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

export default SaveRecepSolCompra;

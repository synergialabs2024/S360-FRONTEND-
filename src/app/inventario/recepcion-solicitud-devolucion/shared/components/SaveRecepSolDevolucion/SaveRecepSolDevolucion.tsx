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
  SolicitudDevolucion,
  IngresosDisponiblesTableType,
  solicitudDevolucionFormSchema,
  useColumnsProductosDisponibles,
} from '@/shared';
import {
  useFetchProductos,
  useUpdatesolicitudDevolucion,
  CreateSolicitudDevolucionParamsBase,
} from '@/actions/app';
import { useAuthStore } from '@/store/auth';
import { useProductosStore } from '@/store/app';
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

  ///* fetch data ---------------------
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
      customOnSuccess: () => clearAllStore(),
    });

  const updateRecepcionDevolucionAprobarMutation =
    useUpdatesolicitudDevolucion<CreateSolicitudDevolucionParamsBase>({
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
      title: 'Solicitud de devolucion creada',
      subtitle: '¿Desea ingresar la devolucion de este material?',
      onConfirm: () => {
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

    productosEnviar(dataP?.filter(item => item !== null) || []);
    if (!recepcionDevolucion?.id) return;
    reset(recepcionDevolucion);
  }, [reset, productosEnviar]);

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

export default SaveRecepSolDevolucion;

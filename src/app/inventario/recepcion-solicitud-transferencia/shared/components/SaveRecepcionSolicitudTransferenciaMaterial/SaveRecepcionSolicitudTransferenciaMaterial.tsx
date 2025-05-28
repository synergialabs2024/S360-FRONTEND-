/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';

import {
  CustomTextArea,
  CustomTypoLabel,
  CustomMinimalTable,
  SingleFormBoxScene,
  CustomTypoLabelEnum,
  CustomTextFieldNoForm,
} from '@/shared/components';
import {
  ToastWrapper,
  ProductosDisponiblesTableType,
  SolicitudTransferenciaMaterial,
  useColumnsProductosDisponibles,
  solicitudTransferenciaMaterialFormSchema,
  Producto,
} from '@/shared';
import {
  useFetchProductos,
  useUpdateSolicitudTransferenciaMaterial,
  CreateSolicitudTransferenciaMaterialParamsBase,
} from '@/actions/app';
import { useProductosStore } from '@/store/app';
import { useUiConfirmModalStore } from '@/store/ui';
import ProductosDisponiblesModal from '@/shared/hooks/app/inventario/modals/ProductosDisponiblesModal';
import { returnUrlRecepcionSolicitudTransferenciaMaterialesPage } from '../../../pages/tables/RecepcionSolicitudTransferenciaMaterialMainPages';
import { returnUrlAprobarSolTransferenciaPage } from '../../../pages/tables/AprobarSolTransferencia';

export interface SaveRecepcionSolicitudTransferenciaMaterialProps {
  title: string;
  solicitudTransferenciaMaterial?: SolicitudTransferenciaMaterial;
}

type SaveFormData = CreateSolicitudTransferenciaMaterialParamsBase & {};

const SaveRecepcionSolicitudTransferenciaMaterial: React.FC<
  SaveRecepcionSolicitudTransferenciaMaterialProps
> = ({ title, solicitudTransferenciaMaterial }) => {
  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);

  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudTransferenciaMaterialFormSchema) as any,
    defaultValues: {
      state: true,
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
  const updateRecepcionSolicitudTransferenciaMaterialMutation =
    useUpdateSolicitudTransferenciaMaterial<CreateSolicitudTransferenciaMaterialParamsBase>(
      {
        navigate,
        returnUrl: returnUrlRecepcionSolicitudTransferenciaMaterialesPage,
      },
    );
  const updateRecepcionSolicitudTransferenciaAprobarMutation =
    useUpdateSolicitudTransferenciaMaterial<CreateSolicitudTransferenciaMaterialParamsBase>(
      {
        enableNavigate: true,
        enableErrorNavigate: true,
      },
    );

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = productosDisponibles.map(producto => ({
      producto: producto.id,
      cantidad: producto.cantidad ?? 0,
      series: producto.series ? producto.series : [],
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

      const validarCantidad = (
        detalles?.ubicaciones_producto as unknown as {
          stock: number;
          ubicacion: string;
        }[]
      )?.find(
        i =>
          i.ubicacion ==
          solicitudTransferenciaMaterial?.ubicacion_origen_data?.uuid,
      );

      if (!detalles) {
        ToastWrapper.error(
          `No se encontró el producto con ID ${prod.producto}`,
        );
        return;
      }

      // Validar cantidad
      if (prod.cantidad <= 0) {
        ToastWrapper.error(
          `El producto "${detalles.codigo}" necesita cantidad.`,
        );
        return;
      } else if (validarCantidad && validarCantidad.stock < prod.cantidad) {
        ToastWrapper.error(
          `El producto "${detalles.codigo}" tiene una cantidad de ${prod.cantidad} y solo existe ${validarCantidad.stock}.`,
        );
        return;
      }
    }

    data.estado_solicitud = 'APROBADO';
    data.productos = mappedProductos as Producto[];

    setConfirmDialog({
      isOpen: true,
      title: 'Solicitud de material creada',
      subtitle: '¿Desea ingresar la solicitud de este material?',
      onConfirm: () => {
        try {
          navigate(
            `${returnUrlAprobarSolTransferenciaPage}/editar/${data.uuid}`,
          );
          setConfirmDialogIsOpen(false);
          if (data.id !== undefined) {
            updateRecepcionSolicitudTransferenciaAprobarMutation.mutate({
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
        updateRecepcionSolicitudTransferenciaMaterialMutation.mutate({
          id: data.id!,
          data,
        });
        navigate(returnUrlRecepcionSolicitudTransferenciaMaterialesPage);
      },
    });
  };

  const onRechazar = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (solicitudTransferenciaMaterial?.id) {
      data.estado_solicitud = 'RECHAZADO';
      updateRecepcionSolicitudTransferenciaMaterialMutation.mutate({
        id: solicitudTransferenciaMaterial.id!,
        data,
      });
      return navigate(
        `${returnUrlRecepcionSolicitudTransferenciaMaterialesPage}`,
      );
    }
  };

  ///* effects
  useEffect(() => {
    const dataP = solicitudTransferenciaMaterial?.productos
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
              ubicacion:
                solicitudTransferenciaMaterial.ubicacion_origen_data?.id,
              series: prod.series,
            }
          : null;
      })
      .filter(Boolean);

    productosEnviar(dataP?.filter(item => item !== null) || []);
    if (!solicitudTransferenciaMaterial?.id) return;
    reset(solicitudTransferenciaMaterial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  ///* columns --------------------
  const { crearMaterialColumnsSolicitud } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() =>
        navigate(returnUrlRecepcionSolicitudTransferenciaMaterialesPage)
      }
      onReject={handleSubmit(onRechazar, () => {})}
      onSave={handleSubmit(onSave, () => {})}
      saveTextBtn="Aprobar"
    >
      <CustomTextFieldNoForm
        label="Bodega Origen"
        value={form.getValues().bodega_origen_data?.nombre}
        disabled
      />
      <CustomTextFieldNoForm
        label="Bodega Destino"
        value={form.getValues().bodega_destino_data?.nombre}
        disabled
      />
      <CustomTextFieldNoForm
        label="Ubicacion Origen"
        value={form.getValues().ubicacion_origen_data?.nombre}
        disabled
      />
      <CustomTextFieldNoForm
        label="Ubicacion Destino"
        value={form.getValues().ubicacion_destino_data?.nombre}
        disabled
      />
      <CustomTextArea
        label="Observación"
        name="observacion"
        control={form.control}
        defaultValue={form.getValues().observacion}
        error={errors.observacion}
        helperText={errors.observacion?.message}
        required={false}
        disabled={true}
      />
      {/* ==================== PRODUCTS ==================== */}
      <CustomTypoLabel
        text="Productos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <Grid container justifyContent="flex-end">
        <CustomMinimalTable<ProductosDisponiblesTableType>
          columns={crearMaterialColumnsSolicitud}
          data={productosDisponibles || []}
          enablePagination
          density="comfortable"
        />
        <ProductosDisponiblesModal
          askADD={true}
          pk_ubicacion={
            solicitudTransferenciaMaterial?.ubicacion_origen_data?.uuid
          }
          open={openAddProducts}
          onClose={() => setOpenAddProducts(false)}
        />
      </Grid>
    </SingleFormBoxScene>
  );
};

export default SaveRecepcionSolicitudTransferenciaMaterial;

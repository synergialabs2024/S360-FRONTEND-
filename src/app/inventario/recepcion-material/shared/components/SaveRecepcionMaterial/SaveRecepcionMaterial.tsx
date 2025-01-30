import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  CreateRecepcionMaterialParamsBase,
  useFetchBodegas,
  useFetchUbicacions,
  useUpdateRecepcionMaterial,
} from '@/actions/app';
import {
  Bodega,
  gridSizeMdLg6,
  PermissionsEnum,
  RecepcionMaterial,
  solicitudMaterialFormSchema,
  ToastWrapper,
  Ubicacion,
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
import { returnUrlRecepcionMaterialPage } from '../../../pages/tables/RecepcionMaterialByStatePage';
import RecepcionEgresoModal from '../../../pages/modal/RecepcionEgresoModal';
import {
  ProductosDisponiblesTableType,
  useColumnsProductosDisponibles,
} from '@/app/inventario/ingreso-material/shared/hooks';
import { FiPlus } from 'react-icons/fi';
import ProductosDisponiblesModal from '@/app/inventario/ingreso-material/pages/modal/ProductosDisponiblesModal';

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
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);

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

  ///* mutations
  const updateRecepcionMaterialMutation =
    useUpdateRecepcionMaterial<CreateRecepcionMaterialParamsBase>({
      navigate,
      returnUrl: returnUrlRecepcionMaterialPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    const mappedProductos = productosDisponibles.map(producto => ({
      id: producto.id,
      producto: producto.id,
      cantidad: producto.cantidad,
      descripcion: producto.descripcion,
      nombre: producto.nombre,
      codigo: producto.codigo,
      codigo_auxiliar: producto.codigo_auxiliar,
      categoria: producto.categoria,
      categoria_data: producto.categoria_data,
      series: producto.series ? producto.series : [],
      requiere_series: producto.requiere_series,
      tipo: producto.tipo,
    }));

    for (const producto of mappedProductos) {
      if (producto.cantidad === undefined || producto.cantidad <= 0) {
        ToastWrapper.error(
          `El producto ${producto.codigo} tiene una cantidad de 0 o menor y no puede ser procesado.`,
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

    ///* upd
    if (recepcionMaterial?.id) {
      data.estado_solicitud = 'APROBADO';
      setModalData(preparedData);
      setOpenModal(true);
    }
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
    productosEnviar(
      (recepcionMaterial?.productos as ProductosDisponiblesTableType[]) || [],
    );
    if (!recepcionMaterial?.id) return;
    reset(recepcionMaterial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  ///* columns --------------------
  const { crearMaterialColumnsRecepcion } = useColumnsProductosDisponibles();

  return (
    <>
      {openModal && (
        <RecepcionEgresoModal
          Arrays={modalData}
          openModal={openModal}
          onClose={() => setOpenModal(false)} // Cierra el modal
        />
      )}
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

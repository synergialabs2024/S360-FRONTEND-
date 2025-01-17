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
import UbicacionProductosDisponiblesModal, {
  UbicacionProductosDisponiblesTableType,
} from '@/app/inventario/egreso-material/pages/modal/UbicacionProductosDisponiblesModal';
import { useColumnsUbicacionProductosDisponibles } from '@/app/inventario/egreso-material/shared/hooks';
import {
  Bodega,
  gridSizeMdLg6,
  PermissionsEnum,
  RecepcionMaterial,
  solicitudMaterialFormSchema,
  Ubicacion,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomMinimalTable,
  CustomTextArea,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useUbicacionProductosStore } from '@/store/app';
import { returnUrlRecepcionMaterialPage } from '../../../pages/tables/RecepcionMaterialByStatePage';
import RecepcionEgresoModal from '../../../pages/modal/RecepcionEgresoModal';

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
  const ubicacionProductosDisponibles = useUbicacionProductosStore(
    s => s.ubicacionProductosDisponibles,
  );
  const ubicacionProductosEnviar = useUbicacionProductosStore(
    s => s.setUbicacionProductosDisponibles,
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

  ///* mutations
  const updateRecepcionMaterialMutation =
    useUpdateRecepcionMaterial<CreateRecepcionMaterialParamsBase>({
      navigate,
      returnUrl: returnUrlRecepcionMaterialPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (recepcionMaterial?.id) {
      data.estado_solicitud = 'APROBADO';
      setModalData(data);
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
    ubicacionProductosEnviar(recepcionMaterial?.productos || []);
    if (!recepcionMaterial?.id) return;
    reset(recepcionMaterial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recepcionMaterial, reset]);

  ///* columns --------------------
  const { seriesEgresoColumns } = useColumnsUbicacionProductosDisponibles();

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
        <CustomMinimalTable<UbicacionProductosDisponiblesTableType>
          columns={seriesEgresoColumns}
          data={ubicacionProductosDisponibles || []}
          enablePagination
          density="comfortable"
        />
        <UbicacionProductosDisponiblesModal
          pk_ubicacion={watchedUbicacion}
          open={openAddProducts}
          onClose={() => setOpenAddProducts(false)}
        />
      </SingleFormBoxScene>
    </>
  );
};

export default SaveRecepcionMaterial;

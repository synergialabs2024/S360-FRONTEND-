import { useEffect } from 'react';

import { useFetchUbicacionProductos } from '@/actions/app';
import {
  CodigoModeloProductoEnumChoice,
  InventarioEnumUUID,
  OrdenTrabajo,
  TipoProductoEnumChoice,
  ToastWrapper,
  UbicacionProducto,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomSingleButton,
  ScrollableDialogProps,
  TableWithoutActions,
} from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';
import { useColumnsEquiposMaterialesInstallOT } from '../../../hooks';

export type MaterialesDisponiblesOTTecModalProps = {
  open: boolean;
  onClose: () => void;
  ordenTrabajo: OrdenTrabajo;
};

const MaterialesDisponiblesOTTecModal: React.FC<
  MaterialesDisponiblesOTTecModalProps
> = ({ onClose, open, ordenTrabajo }) => {
  ///* hooks ---------------------
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  const {
    pagination,
    globalFilter,
    searchTerm,
    setPagination,
    onChangeFilter,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* global state ---------------------
  const addSelectedItem = useInstalacionesStore(s => s.addSelectedItem);

  ///* fetch data ---------------------
  const {
    data: materialesDisponiblesPaging,
    isLoading: isLoadingItemsDisponibles,
    isRefetching: isRefetchingItemsDisponibles,
  } = useFetchUbicacionProductos({
    enabled: open,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      ...filterObject,
      producto__codigo: searchTerm,

      ubicacion: ordenTrabajo?.flota_data?.ubicacion_data?.id,
      producto__categoria__uuid:
        InventarioEnumUUID.CATEGORIA_PRODUCTO_MATERIALES,
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { baseColumnsMaterialesInstallOT1 } =
    useColumnsEquiposMaterialesInstallOT({
      showActionColumn: true,
      onActionEquiposRowNode(item) {
        return (
          <CustomSingleButton
            label="AGREGAR"
            variant="text"
            color="primary"
            onClick={() => {
              const isFibraGranel =
                item?.producto_data?.tipo === TipoProductoEnumChoice.FIBRA &&
                item?.modelo_data?.codigo ===
                  CodigoModeloProductoEnumChoice.FIBRA_GRANEL;

              const isFibraPreconect =
                item?.producto_data?.tipo === TipoProductoEnumChoice.FIBRA &&
                item?.modelo_data?.codigo ===
                  CodigoModeloProductoEnumChoice.FIBRA_PRECONECTORIZADA;

              const usedQuantity = isFibraGranel ? 0 : 1;

              addSelectedItem({
                keyStore: InstalacionesStoreKey.materialesUtilizados,
                item: {
                  ...item,

                  usedQuantity: usedQuantity,
                  isFibra: isFibraGranel,
                  isFibraPreconect,

                  ...(isFibraGranel && {
                    puntaInicio: item?.stock_actual || 0,
                  }),
                },
                showToast: true,
              });
            }}
          />
        );
      },
    });

  ///* effects ---------------------
  const isCustomLoading =
    isLoadingItemsDisponibles || isRefetchingItemsDisponibles;

  useEffect(() => {
    if (!open || isCustomLoading) return;

    if (!materialesDisponiblesPaging?.data?.meta?.count)
      ToastWrapper.error(
        `No se encontraron materiales disponibles en la unidad ${ordenTrabajo?.flota_data?.name}`,
      );
  }, [isCustomLoading, materialesDisponiblesPaging, ordenTrabajo, open]);
  useLoaders(isCustomLoading);

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title="Materiales disponibles"
        minWidth="60%"
        contentNode={
          <>
            <CustomSearch
              onChange={onChangeFilter}
              value={globalFilter}
              text="por código"
            />

            <TableWithoutActions<UbicacionProducto>
              columns={baseColumnsMaterialesInstallOT1}
              data={materialesDisponiblesPaging?.data?.items || []}
              isLoading={isLoadingItemsDisponibles}
              isRefetching={isRefetchingItemsDisponibles}
              rowCount={materialesDisponiblesPaging?.data?.meta?.count || 0}
              // search
              enableGlobalFilter={false}
              // // filters - server side
              enableManualFiltering={true}
              columnFilters={columnFilters}
              onColumnFiltersChange={setColumnFilters}
              // // pagination
              pagination={pagination}
              onPaging={setPagination}
            />
          </>
        }
        cancelTextBtn="Cerrar"
        onClose={handleClose}
      />
    </>
  );
};

export default MaterialesDisponiblesOTTecModal;

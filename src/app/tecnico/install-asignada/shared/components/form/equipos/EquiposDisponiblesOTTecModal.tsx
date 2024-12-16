import { useEffect } from 'react';

import { useFetchUbicacionProductos } from '@/actions/app';
import {
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
import { getFilteredSeriesOTInstall } from '@/shared/helpers';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';
import { useColumnsEquiposMaterialesInstallOT } from '../../../hooks';

export type EquiposDisponiblesOTTecModalProps = {
  open: boolean;
  onClose: () => void;
  ordenTrabajo: OrdenTrabajo;

  // helper product model
  filterByProductModel?: boolean;
  productModel?: string;
};

const EquiposDisponiblesOTTecModal: React.FC<
  EquiposDisponiblesOTTecModalProps
> = ({
  onClose,
  open,
  ordenTrabajo,

  // helper product model
  filterByProductModel,
  productModel,
}) => {
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
    data: equiposDisponiblesPaging,
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
      producto__categoria__uuid: InventarioEnumUUID.CATEGORIA_PRODUCTO_EQUIPOS,

      ...(filterByProductModel && {
        producto__modelo__codigo: productModel,
      }),
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { baseColumnsEquiposMaterialesInstallOT01 } =
    useColumnsEquiposMaterialesInstallOT({
      showActionColumn: true,
      onActionEquiposRowNode(item) {
        return (
          <CustomSingleButton
            label="AGREGAR"
            variant="text"
            color="primary"
            onClick={() => {
              const isONT =
                item?.producto_data?.tipo === TipoProductoEnumChoice.ONT;
              let series: string[] = item?.series || [];
              if (isONT) {
                const tempSeries = item?.series_temporal || [];
                const activationSerie = ordenTrabajo?.serie_ont;

                series = getFilteredSeriesOTInstall(
                  series,
                  tempSeries,
                  activationSerie || null,
                );
              }

              addSelectedItem({
                keyStore: InstalacionesStoreKey.equiposUtilizados,
                item: {
                  ...item,
                  series,
                  usedQuantity: 1,
                  selectedSeries: [],
                  savedSeries: [],
                  containsSeries: !!item?.series?.length,
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

    if (!equiposDisponiblesPaging?.data?.meta?.count)
      ToastWrapper.error(
        `No se encontraron equipos disponibles en la unidad ${ordenTrabajo?.flota_data?.name}`,
      );
  }, [isCustomLoading, equiposDisponiblesPaging, ordenTrabajo, open]);
  useLoaders(isCustomLoading);

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title="Equipos disponibles"
        minWidth="60%"
        contentNode={
          <>
            <CustomSearch
              onChange={onChangeFilter}
              value={globalFilter}
              text="por código"
            />

            <TableWithoutActions<UbicacionProducto>
              columns={baseColumnsEquiposMaterialesInstallOT01}
              data={equiposDisponiblesPaging?.data?.items || []}
              isLoading={isLoadingItemsDisponibles}
              isRefetching={isRefetchingItemsDisponibles}
              rowCount={equiposDisponiblesPaging?.data?.meta?.count || 0}
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

export default EquiposDisponiblesOTTecModal;

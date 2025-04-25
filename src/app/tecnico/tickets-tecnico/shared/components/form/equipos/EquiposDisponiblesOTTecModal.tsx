import { useEffect } from 'react';

import { useFetchUbicacionProductos } from '@/actions/app';
import {
  InventarioEnumUUID,
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
import { useColumnsEquiposMaterialesInstallOT } from '@/app/tecnico/install-asignada/shared/hooks';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';

export type EquiposDisponiblesTicketModalProps = {
  open: boolean;
  onClose: () => void;
  ticket: Ticket;

  // helper product model
  filterByProductModel?: boolean;
  productModel?: string;
};

const EquiposDisponiblesTicketModal: React.FC<
  EquiposDisponiblesTicketModalProps
> = ({
  onClose,
  open,
  ticket,

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

      ubicacion: ticket?.flota_data?.ubicacion_data?.id,
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
              // Verifica si el equipo es de tipo ONT

              let series: string[] = item?.series || [];
              const tempSeries = item?.series_temporal || [];
              const activationSerie = ticket?.serie_ont;

              series = getFilteredSeriesOTInstall(
                series,
                tempSeries,
                activationSerie || null,
              );

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
        `No se encontraron equipos disponibles en la unidad ${ticket?.flota_data?.name}`,
      );
  }, [isCustomLoading, equiposDisponiblesPaging, ticket, open]);
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

export default EquiposDisponiblesTicketModal;

import { useFetchUbicacionProductos } from '@/actions/app';
import {
  InventarioEnumUUID,
  OrdenTrabajo,
  UbicacionProducto,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  ScrollableDialogProps,
  TableWithoutActions,
} from '@/shared/components';
import { useColumnsEquiposMaterialesInstallOT } from '../../../hooks';

export type EquiposDisponiblesOTTecModalProps = {
  open: boolean;
  onClose: () => void;
  ordenTrabajo: OrdenTrabajo;
};

const EquiposDisponiblesOTTecModal: React.FC<
  EquiposDisponiblesOTTecModalProps
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

  ///* fetch data ---------------------
  const {
    data: itemsDisponiblesPaging,
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

      producto__es_para_venta: true,
      producto__categoria__uuid: InventarioEnumUUID.CATEGORIA_PRODUCTO_EQUIPOS,
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { baseColumnsEquiposMaterialesInstallOT01 } =
    useColumnsEquiposMaterialesInstallOT();

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title="Equipos disponibles"
        width="60%"
        contentNode={
          <>
            <CustomSearch
              onChange={onChangeFilter}
              value={globalFilter}
              text="por código"
            />

            <TableWithoutActions<UbicacionProducto>
              columns={baseColumnsEquiposMaterialesInstallOT01}
              data={itemsDisponiblesPaging?.data?.items || []}
              isLoading={isLoadingItemsDisponibles}
              isRefetching={isRefetchingItemsDisponibles}
              rowCount={itemsDisponiblesPaging?.data?.meta?.count || 0}
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

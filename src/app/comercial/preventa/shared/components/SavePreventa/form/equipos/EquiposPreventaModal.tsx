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
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import { useAuthStore } from '@/store/auth';
import { useColumnsEquiposPreventa } from '../../../../hooks';
import { EquiposSeleccionadosTableType } from './EquiposSeleccionadosPreventa';

export type EquiposPreventaModalProps = {
  open: boolean;
  onClose: () => void;
};

const EquiposPreventaModal: React.FC<EquiposPreventaModalProps> = ({
  open,
  onClose,
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
  const user = useAuthStore(s => s.user);
  const { addSelectedItem } =
    useTypedGenericInventoryStore<EquiposSeleccionadosTableType>(
      GenericInventoryStoreKey.equiposVentaPreventa,
    );

  ///* fetch data ---------------------
  const {
    data: itemsDisponiblesPaging,
    isLoading: isLoadingItemsDisponibles,
    isRefetching: isRefetchingItemsDisponibles,
  } = useFetchUbicacionProductos({
    enabled: open && !!user?.centro_costo,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      ...filterObject,
      producto__codigo: searchTerm,

      producto__es_para_venta: true,
      producto__categoria__uuid: InventarioEnumUUID.CATEGORIA_PRODUCTO_EQUIPOS,
      bodega__centro_costo__pk: user?.centro_costo!,
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { baseColumns01 } = useColumnsEquiposPreventa({
    onActionRowNode(item) {
      return (
        <CustomSingleButton
          label="AGREGAR"
          variant="text"
          color="primary"
          onClick={() => {
            addSelectedItem({ idKey: 'id', item, showToast: true });
          }}
        />
      );
    },
  });

  ///* effects ---------------------
  useEffect(() => {
    if (!open || !user) return;
    if (isLoadingItemsDisponibles || isRefetchingItemsDisponibles) return;

    if (!user?.centro_costo) {
      ToastWrapper.error('El usuario no tiene un centro de costo asignado');
    }
    if (!itemsDisponiblesPaging?.data?.meta?.count && !searchTerm) {
      ToastWrapper.error('No se encontraron equipos disponibles para la venta');
    }
  }, [
    isLoadingItemsDisponibles,
    isRefetchingItemsDisponibles,
    itemsDisponiblesPaging?.data?.meta?.count,
    open,
    searchTerm,
    user,
  ]);
  const isCustomLoading =
    isLoadingItemsDisponibles || isRefetchingItemsDisponibles;
  useLoaders(isCustomLoading);

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
              columns={baseColumns01}
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

export default EquiposPreventaModal;

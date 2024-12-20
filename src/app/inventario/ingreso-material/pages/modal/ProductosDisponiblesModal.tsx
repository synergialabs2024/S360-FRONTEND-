import { useFetchUbicacionProductos } from '@/actions/app';
import {
  UbicacionProducto,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  ProductosDisponiblesStoreKey,
  useProductosStore,
} from '@/store/app/inventario/productos-disponible.store';
import { useColumnsProductosDisponibles } from '../../shared/hooks';
import {
  CustomSearch,
  CustomSingleButton,
  ScrollableDialogProps,
  TableWithoutActions,
} from '@/shared/components';
import { useEffect } from 'react';

export type ProductosDisponiblesModalProps = {
  open: boolean;
  onClose: () => void;
  ubicacionIngresoMaterial: number;
};

const ProductosDisponiblesModal: React.FC<ProductosDisponiblesModalProps> = ({
  onClose,
  open,
  ubicacionIngresoMaterial,
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
  const addSelectedItem = useProductosStore(s => s.addSelectedItem);

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
      ubicacion: ubicacionIngresoMaterial,
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { modalMaterialColumns } = useColumnsProductosDisponibles({
    showActionColumn: true,
    onActionProductosRowNode(item) {
      return (
        <CustomSingleButton
          label="AGREGAR"
          variant="text"
          color="primary"
          onClick={() => {
            addSelectedItem({
              keyStore: ProductosDisponiblesStoreKey.productosDisponibles,
              item: {
                ...item,
                usedQuantity: 1,
                selectedSeries: [],
                savedSeries: [],
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
  }, [isCustomLoading, open]);
  useLoaders(isCustomLoading);

  return (
    <ScrollableDialogProps
      open={open}
      title="Productos"
      minWidth="60%"
      contentNode={
        <>
          <CustomSearch
            onChange={onChangeFilter}
            value={globalFilter}
            text="por código"
          />

          <TableWithoutActions<UbicacionProducto>
            columns={modalMaterialColumns}
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
  );
};

export default ProductosDisponiblesModal;

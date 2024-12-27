import { useEffect } from 'react';

import { useFetchProductos } from '@/actions/app';
import {
  CATEGORIA_PRODUCTO_ARRAY_OBJ_INVENTARIO,
  CodigoCategoriaProductoEnumChoiceType,
  gridSizeMdLg6,
  Producto,
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
  CustomAutocompleteNoForm,
  CustomSearch,
  CustomSingleButton,
  ScrollableDialogProps,
  TableWithoutActions,
} from '@/shared/components';

export type ProductosDisponiblesModalProps = {
  open: boolean;
  onClose: () => void;
};

const ProductosDisponiblesModal: React.FC<ProductosDisponiblesModalProps> = ({
  onClose,
  open,
}) => {
  ///* hooks ---------------------
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  const {
    pagination,
    globalFilter,
    //searchTerm,
    setPagination,
    onChangeFilter,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* global state ---------------------
  const addSelectedItem = useProductosStore(s => s.addSelectedItem);
  const selectedCategoria = useProductosStore(s => s.selectedCategoriaModel);
  const setSelectedCategoriaModel = useProductosStore(
    s => s.setSelectedCategoriaModel,
  );

  ///* fetch data ---------------------
  const {
    data: equiposDisponiblesPaging,
    isLoading: isLoadingItemsDisponibles,
    isRefetching: isRefetchingItemsDisponibles,
  } = useFetchProductos({
    enabled: open,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      ...filterObject,

      categoria_uuid: selectedCategoria,
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
            sxContainer={{
              mb: 5,
            }}
            customSpaceNode={
              <CustomAutocompleteNoForm<CodigoCategoriaProductoEnumChoiceType>
                label="CATEGORIA"
                value={selectedCategoria}
                actualValueKey="value"
                onChange={v => {
                  setSelectedCategoriaModel(v as string);
                }}
                options={CATEGORIA_PRODUCTO_ARRAY_OBJ_INVENTARIO}
                getOptionLabel={o => o.label}
                loading={false}
                required
                error={false}
                disableClearable
                size={gridSizeMdLg6}
              />
            }
          />
          <TableWithoutActions<Producto>
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

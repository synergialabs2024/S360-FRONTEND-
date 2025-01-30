import { useEffect } from 'react';

import { useFetchProductos } from '@/actions/app';
import {
  CATEGORIA_PRODUCTO_ARRAY_OBJ_INVENTARIO,
  CodigoCategoriaProductoEnumChoiceType,
  gridSizeMdLg6,
  Producto,
  ToastWrapper,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import { useColumnsProductosDisponibles } from '../../shared/hooks';
import {
  CustomAutocompleteNoForm,
  CustomSearch,
  CustomSingleButton,
  ScrollableDialogProps,
  TableWithoutActions,
} from '@/shared/components';
import { ProductosDisponiblesStoreKey, useProductosStore } from '@/store/app';

export type ProductosDisponiblesModalProps = {
  open: boolean;
  askADD: boolean;
  pk_ubicacion?: string | undefined;
  onClose: () => void;
};

const ProductosDisponiblesModal: React.FC<ProductosDisponiblesModalProps> = ({
  onClose,
  open,
  pk_ubicacion = '',
  askADD = true,
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

  const resultado = equiposDisponiblesPaging?.data?.items?.map(producto => {
    if (!Array.isArray(producto.ubicaciones_producto)) {
      return {
        id: producto.id,
        uuid: producto.uuid,
        stock_ubicacion_producto: 0,
        nombre: producto.nombre,
      };
    }

    // Buscar la ubicación que coincida
    const ubicacionEncontrada = producto.ubicaciones_producto.find(
      u => u.ubicacion === pk_ubicacion,
    );

    return {
      ...producto,
      stock_up: ubicacionEncontrada ? ubicacionEncontrada.stock : 0,
    };
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
            if (askADD && (item.stock_up === undefined || item.stock_up <= 0)) {
              ToastWrapper.error(`
              El producto de código ${item.codigo} no
              puede ser procesado porque su stock actual es 0 o menor.
            `);
              return;
            }

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
              <>
                <CustomAutocompleteNoForm<CodigoCategoriaProductoEnumChoiceType>
                  label=""
                  value={selectedCategoria}
                  actualValueKey="value"
                  onChange={v => {
                    setSelectedCategoriaModel(v as string);
                  }}
                  options={CATEGORIA_PRODUCTO_ARRAY_OBJ_INVENTARIO}
                  getOptionLabel={o => o.label}
                  loading={false}
                  error={false}
                  disableClearable
                  size={gridSizeMdLg6}
                />
              </>
            }
          />
          <TableWithoutActions<Producto>
            columns={modalMaterialColumns}
            data={selectedCategoria != null ? resultado || [] : []}
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

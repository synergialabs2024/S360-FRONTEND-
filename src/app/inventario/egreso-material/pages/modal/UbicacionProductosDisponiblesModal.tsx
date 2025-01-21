import { useFetchUbicacionProductos } from '@/actions/app';
import {
  CATEGORIA_PRODUCTO_ARRAY_OBJ_INVENTARIO,
  CodigoCategoriaProductoEnumChoiceType,
  gridSizeMdLg6,
  ToastWrapper,
  UbicacionProducto,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  UbicacionProductosDisponiblesStoreKey,
  useUbicacionProductosStore,
} from '@/store/app';
import { useColumnsUbicacionProductosDisponibles } from '../../shared/hooks/useColumnsUbicacionProductosDisponibles';
import {
  CustomAutocompleteNoForm,
  CustomSearch,
  CustomSingleButton,
  ScrollableDialogProps,
  TableWithoutActions,
} from '@/shared/components';
import { useEffect } from 'react';

export type UbicacionProductosDisponiblesTableType = UbicacionProducto & {
  cantidad?: number;
  series?: any[];
  serie?: any[];
  productos?: string[];
  categoria_data?: string[];
};

export type UbicacionProductosDisponiblesModalProps = {
  open: boolean;
  pk_ubicacion?: number | undefined;
  onClose: () => void;
};

const UbicacionProductosDisponiblesModal: React.FC<
  UbicacionProductosDisponiblesModalProps
> = ({ onClose, open, pk_ubicacion = undefined }) => {
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
  const addSelectedItem = useUbicacionProductosStore(s => s.addSelectedItem);
  const selectedCategoria = useUbicacionProductosStore(
    s => s.selectedCategoriaModel,
  );
  const setSelectedCategoriaModel = useUbicacionProductosStore(
    s => s.setSelectedCategoriaModel,
  );

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

      producto__categoria__uuid: selectedCategoria,
      ubicacion: pk_ubicacion,
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { modalEgresoMaterialColumns } =
    useColumnsUbicacionProductosDisponibles({
      showActionColumn: true,
      onActionProductosRowNode(item) {
        return (
          <CustomSingleButton
            label="AGREGAR"
            variant="text"
            color="primary"
            onClick={() => {
              if (item.stock_actual <= 0) {
                ToastWrapper.error('No existe stock disponible');
                return;
              }
              addSelectedItem({
                keyStore:
                  UbicacionProductosDisponiblesStoreKey.ubicacionProductosDisponibles,
                item: {
                  ...item,
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
          <TableWithoutActions<UbicacionProducto>
            columns={modalEgresoMaterialColumns}
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

export default UbicacionProductosDisponiblesModal;

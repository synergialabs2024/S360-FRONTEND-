import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useFetchProductos } from '@/actions/app';
import { useColumnsEquiposPreventa } from '@/app/comercial/preventa/shared/hooks';
import {
  CATEGORIA_PRODUCTOS_PROMOCION,
  GenericAutocompleteNoFormType,
  gridSizeMdLg8,
  InvetarioCodesEnum,
  Producto,
  ToastWrapper,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomAutocompleteNoForm,
  CustomSearch,
  CustomSingleButton,
  ScrollableDialogProps,
  TableWithoutActions,
} from '@/shared/components';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import { SelectedEqPromoctionType } from '../SavePromocion';

export type PromocionProductosDisponiblesModalProps = {
  open: boolean;
  onClose: () => void;
  genericStorageKey?: GenericInventoryStoreKey;
  defaultProductCategory?: InvetarioCodesEnum;
};

const PromocionProductosDisponiblesModal: React.FC<
  PromocionProductosDisponiblesModalProps
> = ({
  open,
  onClose,
  genericStorageKey = GenericInventoryStoreKey.equiposPromocion,
  defaultProductCategory = InvetarioCodesEnum.EQUIPOS,
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

  ///* local state ---------------------
  const [productCategory, setProductCategory] = useState<string>(
    defaultProductCategory,
  );

  ///* global state ---------------------
  const { addSelectedItem } =
    useTypedGenericInventoryStore<SelectedEqPromoctionType>(genericStorageKey);

  ///* fetch data ---------------------
  const {
    data: itemsDisponiblesPaging,
    isLoading: isLoadingItemsDisponibles,
    isRefetching: isRefetchingItemsDisponibles,
  } = useFetchProductos({
    enabled: open,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      ...filterObject,

      codigo: searchTerm,
      aplica_promocion: true,

      categoria__code: productCategory,
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
    setProductCategory(defaultProductCategory);
  };

  ///* columns ---------------------
  const { productsBaseColumns } = useColumnsEquiposPreventa({
    onActionRowNodeProducto(item) {
      return (
        <CustomSingleButton
          label="AGREGAR"
          variant="text"
          color="primary"
          onClick={() => {
            addSelectedItem({
              idKey: 'id',
              item: {
                uuid: uuidv4(),
                ...item,
                usedQuantity: 1,
                productoOptionItemList: [],
                isIncluded: true, // only for disccounts
              },
              showToast: true,
            });
          }}
        />
      );
    },
  });

  ///* effects ---------------------
  useEffect(() => {
    // alert no products data
    if (!open || isLoadingItemsDisponibles || isRefetchingItemsDisponibles)
      return;

    if (itemsDisponiblesPaging?.data?.items?.length === 0) {
      ToastWrapper.warning(
        'No se encontraron productos disponibles configurados para promoción con la categoría seleccionada',
      );
      return;
    }
  }, [
    open,
    itemsDisponiblesPaging?.data?.items,
    isLoadingItemsDisponibles,
    isRefetchingItemsDisponibles,
  ]);

  return (
    <ScrollableDialogProps
      open={open}
      onClose={handleClose}
      minWidth="60%"
      title="Productos Disponibles"
      cancelTextBtn="Cerrar"
      contentNode={
        <>
          <CustomSearch
            onChange={onChangeFilter}
            value={globalFilter}
            text="por código"
            customSpaceNode={
              <>
                <CustomAutocompleteNoForm<GenericAutocompleteNoFormType>
                  label="Categoría"
                  value={productCategory}
                  actualValueKey="value"
                  onChange={v => {
                    setProductCategory(v as string);
                  }}
                  options={CATEGORIA_PRODUCTOS_PROMOCION}
                  getOptionLabel={o => o.label}
                  loading={false}
                  required
                  error={false}
                  disableClearable
                  size={gridSizeMdLg8}
                />
              </>
            }
          />

          <TableWithoutActions<Producto>
            columns={productsBaseColumns}
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
    />
  );
};

export default PromocionProductosDisponiblesModal;

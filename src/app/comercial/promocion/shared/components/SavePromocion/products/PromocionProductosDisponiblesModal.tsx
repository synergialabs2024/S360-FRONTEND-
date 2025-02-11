import { useFetchProductos } from '@/actions/app';
import { useColumnsEquiposPreventa } from '@/app/comercial/preventa/shared/hooks';
import {
  InvetarioCodesEnum,
  Producto,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomSingleButton,
  CustomTextFieldControlled,
  ScrollableDialogProps,
  TableWithoutActions,
} from '@/shared/components';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import { useState } from 'react';
import { SelectedEqPromoctionType } from '../SavePromocion';

export type PromocionProductosDisponiblesModalProps = {
  open: boolean;
  onClose: () => void;
};

const PromocionProductosDisponiblesModal: React.FC<
  PromocionProductosDisponiblesModalProps
> = ({ open, onClose }) => {
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
  const [productCategory, setProductCategory] = useState<string>('');

  ///* global state ---------------------
  const { addSelectedItem } =
    useTypedGenericInventoryStore<SelectedEqPromoctionType>(
      GenericInventoryStoreKey.equiposPromocion,
    );

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

      categoria__code: InvetarioCodesEnum.EQUIPOS,
    },
  });

  ///* handlers ---------------------
  const handleConfirm = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
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
                ...item,
                usedQuantity: 1,
                // selectedCuotas: 1,
              },
              showToast: true,
            });
          }}
        />
      );
    },
  });

  return (
    <ScrollableDialogProps
      open={open}
      onClose={handleClose}
      title="Productos Disponibles"
      confirmTextBtn="Reasignar"
      onConfirm={handleConfirm}
      contentNode={
        <>
          <CustomSearch
            onChange={onChangeFilter}
            value={globalFilter}
            text="por código"
            customSpaceNode={
              <>
                <CustomTextFieldControlled
                  label="Categoría"
                  value={productCategory}
                  onChange={e => setProductCategory(e.target.value)}
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

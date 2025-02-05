import { useEffect } from 'react';

import { useFetchProductos } from '@/actions/app';
import {
  InvetarioCodesEnum,
  Producto,
  ToastWrapper,
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
import { EquiposSeleccionadosProductoType } from './EquiposSeleccionadosBeneficioMantenedorBeneficios';
import { useColumnsEquiposBeneficioMantenedorBeneficios } from '../../../../hooks';

export type EquiposBeneficioMantenedorBeneficiosModalProps = {
  open: boolean;
  onClose: () => void;
};

const EquiposBeneficioMantenedorBeneficiosModal: React.FC<
  EquiposBeneficioMantenedorBeneficiosModalProps
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

  ///* global state ---------------------
  const user = useAuthStore(s => s.user);
  const { addSelectedItem } =
    useTypedGenericInventoryStore<EquiposSeleccionadosProductoType>(
      GenericInventoryStoreKey.equiposVentaPreventa,
    );

  ///* fetch data ---------------------
  // const {
  //   data: itemsDisponiblesPaging,
  //   isLoading: isLoadingItemsDisponibles,
  //   isRefetching: isRefetchingItemsDisponibles,
  // } = useFetchUbicacionProductos({
  //   enabled: open && !!user?.centro_costo,
  //   params: {
  //     page: pageIndex + 1,
  //     page_size: pageSize,

  //     ...filterObject,
  //     producto__codigo: searchTerm,

  //     producto__es_para_venta: true,
  //     producto__categoria__uuid: InventarioEnumUUID.CATEGORIA_PRODUCTO_EQUIPOS,
  //     bodega__centro_costo__pk: user?.centro_costo!,

  //     // filtrar productos distincts por bodega del centro costo
  //     unique_centro_costo_equipos_venta: true,
  //   },
  // });

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
      es_para_venta: true,
      categoria__code: InvetarioCodesEnum.EQUIPOS,
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { productsBaseColumns } =
    useColumnsEquiposBeneficioMantenedorBeneficios({
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
              console.log('item', item);
            }}
          />
        );
      },
    });

  ///* effects ---------------------
  useEffect(() => {
    if (!open || !user) return;
    if (isLoadingItemsDisponibles || isRefetchingItemsDisponibles) return;

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
        cancelTextBtn="Cerrar"
        onClose={handleClose}
      />
    </>
  );
};

export default EquiposBeneficioMantenedorBeneficiosModal;

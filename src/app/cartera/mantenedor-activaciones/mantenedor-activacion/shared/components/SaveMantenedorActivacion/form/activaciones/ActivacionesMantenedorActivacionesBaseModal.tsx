import {
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
import { MantenedorActivacionBase } from '@/shared/interfaces/app/cartera/mantenedor-activaciones';
import { useFetchMantenedorActivacionesBase } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion-base.actions';
import { ActivacionesSeleccionadosProductoType } from './ActivacionesSeleccionadosMantenedorActivacionesBase';
import { useColumnsActivacionesMantenedorActivacionesBase } from '../../../../hooks';

export type ActivacionesMantenedorActivacionesBaseModalProps = {
  open: boolean;
  onClose: () => void;
  motivoMantenedorActivacion: number;
};

const ActivacionesMantenedorActivacionesBaseModal: React.FC<
  ActivacionesMantenedorActivacionesBaseModalProps
> = ({ open, onClose, motivoMantenedorActivacion }) => {
  ///* hooks ---------------------
  const { columnFilters, setColumnFilters } = useTableServerSideFiltering();

  const {
    pagination,
    globalFilter,
    searchTerm,
    setPagination,
    onChangeFilter,
  } = useTableFilter();

  ///* global state ---------------------
  const { items, addSelectedItem } =
    useTypedGenericInventoryStore<ActivacionesSeleccionadosProductoType>(
      GenericInventoryStoreKey.mantenedorActivaciones,
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
    data: mantenedorActivacionesBasePagingRes,
    isLoading: isLoadingMantenedorActivacionesBase,
    isRefetching: isRefetchingMantenedorActivacionesBase,
  } = useFetchMantenedorActivacionesBase({
    params: {
      page_size: 1000,
      code: searchTerm,
      motivo: motivoMantenedorActivacion,
    },
  });

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { activacionesBaseColumns } =
    useColumnsActivacionesMantenedorActivacionesBase({
      onActionRowNodeProducto(item) {
        return (
          <CustomSingleButton
            label="SELECCIONAR"
            variant="text"
            color="primary"
            onClick={() => {
              if (items.length > 0) {
                ToastWrapper.warning(
                  'Ya ha seleccionado un ítem. No puede seleccionar más de uno.',
                );
                return;
              }
              addSelectedItem({
                idKey: 'id',
                item: {
                  ...item,
                },
                showToast: true,
              });
              console.log('item', item);
            }}
          />
        );
      },
    });

  const isCustomLoading =
    isLoadingMantenedorActivacionesBase ||
    isRefetchingMantenedorActivacionesBase;
  useLoaders(isCustomLoading);

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title="Activaciones disponibles"
        minWidth="80%"
        contentNode={
          <>
            <CustomSearch
              onChange={onChangeFilter}
              value={globalFilter}
              text="por código"
            />

            <TableWithoutActions<MantenedorActivacionBase>
              columns={activacionesBaseColumns}
              data={mantenedorActivacionesBasePagingRes?.data?.items || []}
              isLoading={isLoadingMantenedorActivacionesBase}
              isRefetching={isRefetchingMantenedorActivacionesBase}
              rowCount={
                mantenedorActivacionesBasePagingRes?.data?.meta?.count || 0
              }
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

export default ActivacionesMantenedorActivacionesBaseModal;

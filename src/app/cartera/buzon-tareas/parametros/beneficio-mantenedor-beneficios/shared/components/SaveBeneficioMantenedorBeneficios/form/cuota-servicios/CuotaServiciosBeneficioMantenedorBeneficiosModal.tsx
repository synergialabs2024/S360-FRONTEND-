import { useTableFilter, useTableServerSideFiltering } from '@/shared';
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
import { useColumnsCuotaServiciosBeneficioMantenedorBeneficios } from '../../../../hooks';
import { CuotasServicioInternet } from '@/shared/interfaces/app/cartera/buzon-tareas';
import { CuotaServiciosSeleccionadosProductoType } from './CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios';

export type CuotaServiciosBeneficioMantenedorBeneficiosModalProps = {
  open: boolean;
  onClose: () => void;
};

const CuotaServiciosBeneficioMantenedorBeneficiosModal: React.FC<
  CuotaServiciosBeneficioMantenedorBeneficiosModalProps
> = ({ open, onClose }) => {
  ///* hooks ---------------------
  const { columnFilters, setColumnFilters } = useTableServerSideFiltering();

  const { pagination, globalFilter, setPagination, onChangeFilter } =
    useTableFilter();

  ///* global state ---------------------
  const { addSelectedItem } =
    useTypedGenericInventoryStore<CuotaServiciosSeleccionadosProductoType>(
      GenericInventoryStoreKey.servicioInternet,
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

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { cuotasBaseColumns } =
    useColumnsCuotaServiciosBeneficioMantenedorBeneficios({
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
                },
                showToast: true,
              });
              console.log('item', item);
            }}
          />
        );
      },
    });

  const cuotasServicioInternet: CuotasServicioInternet[] = [];

  for (let i = 1; i <= 24; i++) {
    cuotasServicioInternet.push({
      id: i,
      cuota: i.toString(),
      descuento: '',
    });
  }

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title="Cuotas disponibles"
        width="60%"
        contentNode={
          <>
            <CustomSearch
              onChange={onChangeFilter}
              value={globalFilter}
              text="por código"
            />

            <TableWithoutActions<CuotasServicioInternet>
              columns={cuotasBaseColumns}
              data={cuotasServicioInternet || []}
              rowCount={cuotasServicioInternet.length || 0}
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

export default CuotaServiciosBeneficioMantenedorBeneficiosModal;

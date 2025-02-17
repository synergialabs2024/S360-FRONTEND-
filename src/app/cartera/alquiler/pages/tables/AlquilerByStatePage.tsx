import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  Alquiler,
  useTableFilter,
  PermissionsEnum,
  useColumnsAlquiler,
  EstadoAlquilerEnumChoice,
  useTableServerSideFiltering,
} from '@/shared';
import { useFetchAlquileres } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';

export type AlquilerByStatePageProps = {
  state: string;
};

const AlquilerByStatePage: React.FC<AlquilerByStatePageProps> = ({ state }) => {
  useCheckPermission(PermissionsEnum.cobranza_view_alquileres);

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();
  ///* table
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data
  const {
    data: AlquilerPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAlquileres({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      cliente__razon_social: searchTerm,
      estado_alquiler: state,

      ...filterObject,
    },
  });

  ///* columns
  const { alquilerColumns, alquilerCancelarColumns } = useColumnsAlquiler();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por cliente"
      />
      <CustomTable<Alquiler>
        columns={
          state == EstadoAlquilerEnumChoice.CANCELADO
            ? alquilerCancelarColumns
            : alquilerColumns
        }
        data={AlquilerPagingRes?.data?.items || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        // // filters - server side
        enableManualFiltering={true}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={AlquilerPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default AlquilerByStatePage;

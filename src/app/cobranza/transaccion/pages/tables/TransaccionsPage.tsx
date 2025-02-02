import { useFetchTransaccions } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useColumnsTransaccionesCliente,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Transaccion } from '@/shared/interfaces';

export const returnUrlTransaccionsPage = ROUTER_PATHS.cartera.transaccionesNav;

export type TransaccionsPageProps = {};

const TransaccionsPage: React.FC<TransaccionsPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_transaccion);

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

  ///* fetch data -----------------
  const {
    data: TransaccionsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTransaccions({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      cliente__razon_social: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns -----------------
  const { generalTransaccionesColumns } = useColumnsTransaccionesCliente();

  return (
    <SingleTableBoxScene
      title="Transacciones"
      createPageUrl={`${returnUrlTransaccionsPage}/crear`}
      // showCreateBtn={hasPermission(PermissionsEnum.cobranza_add_transaccion)}
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Transaccion>
        columns={generalTransaccionesColumns}
        data={TransaccionsPagingRes?.data?.items || []}
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
        rowCount={TransaccionsPagingRes?.data?.meta?.count}
        // // actions
        enableActionsColumn={false}
        canEdit={false}
      />
    </SingleTableBoxScene>
  );
};

export default TransaccionsPage;

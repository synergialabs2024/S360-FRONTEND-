import { useFetchSaldos } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useColumnsSaldos,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Saldo } from '@/shared/interfaces';

export const returnUrlSaldosPage = ROUTER_PATHS.cartera.saldosNav;

export type SaldosPageProps = {};

const SaldosPage: React.FC<SaldosPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_saldo);

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table ---------------------
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data ---------------------
  const {
    data: SaldosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSaldos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      cliente__razon_social: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns ---------------------
  const { generalSaldoColumns } = useColumnsSaldos();

  return (
    <SingleTableBoxScene
      title="Saldos"
      createPageUrl={`${returnUrlSaldosPage}/crear`}
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por cliente"
      />

      <CustomTable<Saldo>
        columns={generalSaldoColumns}
        data={SaldosPagingRes?.data?.items || []}
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
        rowCount={SaldosPagingRes?.data?.meta?.count}
        // // actions
        enableActionsColumn={false}
        // crud
        canEdit={false}
      />
    </SingleTableBoxScene>
  );
};

export default SaldosPage;

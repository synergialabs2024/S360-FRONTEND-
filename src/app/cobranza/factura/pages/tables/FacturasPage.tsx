import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useColumsFactura,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useFetchFacturas } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Factura, PermissionsEnum } from '@/shared/interfaces';

export const returnUrlFacturasPage = ROUTER_PATHS.cobranza.facturasNav;

export type FacturasPageProps = {};

const FacturasPage: React.FC<FacturasPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_factura);

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
    data: FacturasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchFacturas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      numero: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns ---------------------
  const { facturasGenericColumns } = useColumsFactura();

  return (
    <SingleTableBoxScene
      title="Factura"
      showCreateBtn={false}
      isMainTableStates
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por numero"
      />

      <CustomTable<Factura>
        columns={facturasGenericColumns}
        data={FacturasPagingRes?.data?.items || []}
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
        rowCount={FacturasPagingRes?.data?.meta?.count}
        // // actions
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default FacturasPage;

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useTableFilter,
  PermissionsEnum,
  TransferenciaMaterial,
  useTableServerSideFiltering,
  useColumnsTransferenciaMaterial,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchTransferenciaMateriales } from '@/actions/app';

export const returnUrlTransferenciaMaterialesPage =
  ROUTER_PATHS.inventario.transferenciaMaterialesNav;

export type TransferenciaMaterialesPageProps = {};

const TransferenciaMaterialesPage: React.FC<
  TransferenciaMaterialesPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_transferenciamaterial);
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
    data: transferenciaMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTransferenciaMateriales({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      secuencial: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns
  const { transferenciaMaterialColumns } = useColumnsTransferenciaMaterial();

  return (
    <SingleTableBoxScene
      title="Transferencia de materiales"
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por Numero de Registro"
      />
      <CustomTable<TransferenciaMaterial>
        columns={transferenciaMaterialColumns}
        data={transferenciaMaterialPagingRes?.data?.items || []}
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
        rowCount={transferenciaMaterialPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default TransferenciaMaterialesPage;

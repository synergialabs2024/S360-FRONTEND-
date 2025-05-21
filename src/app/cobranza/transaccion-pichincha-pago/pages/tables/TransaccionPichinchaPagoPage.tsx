import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useTableFilter,
  PermissionsEnum,
  TransaccionPichinchaPago,
  useTableServerSideFiltering,
  useColumnsTransaccionPichinchaPago,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchTransaccionPichinchaPagos } from '@/actions/app';

export const returnUrlTransaccionPichinchaPagoPage =
  ROUTER_PATHS.cobranza.transaccionpichinchapagoNav;

export type TransaccionPichinchaPagosPageProps = {};

const TransaccionPichinchaPagosPage: React.FC<
  TransaccionPichinchaPagosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_transaccionpichinchapago);

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
    data: TransaccionPichinchaPagoPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTransaccionPichinchaPagos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns
  const { transaccionPichinchaPagoColumns } =
    useColumnsTransaccionPichinchaPago();

  return (
    <SingleTableBoxScene
      title="Transaccion Pichincha Pago de Crédito"
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<TransaccionPichinchaPago>
        columns={transaccionPichinchaPagoColumns}
        data={TransaccionPichinchaPagoPagingRes?.data?.items || []}
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
        rowCount={TransaccionPichinchaPagoPagingRes?.data?.meta?.count}
        // // actions
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default TransaccionPichinchaPagosPage;

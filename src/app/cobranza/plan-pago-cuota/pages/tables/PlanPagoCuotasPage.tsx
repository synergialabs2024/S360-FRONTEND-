import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  PlanPagoCuota,
  useTableFilter,
  PermissionsEnum,
  useColumnsPlanPagoCuota,
  useTableServerSideFiltering,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useFetchPlanPagoCuota } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';

export const returnUrlPlanPagoCuotasPage =
  ROUTER_PATHS.cobranza.planpagocuotasNav;

export type PlanPagoCuotasPageProps = {};

const PlanPagoCuotasPage: React.FC<PlanPagoCuotasPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_planpagocuota);

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
    data: planPagoCuotaPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPlanPagoCuota({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
    },
  });

  ///* columns
  const { planPagoMaterialColumns } = useColumnsPlanPagoCuota();

  return (
    <SingleTableBoxScene title="Plan pago cuota" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<PlanPagoCuota>
        columns={planPagoMaterialColumns}
        data={planPagoCuotaPagingRes?.data?.items || []}
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
        rowCount={planPagoCuotaPagingRes?.data?.meta?.count}
        // // actions
        enableActionsColumn={false}
        /*
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.cobranza_change_planpagocuota,
        )}
        // crud
        canEdit={hasPermission(PermissionsEnum.cobranza_change_planpagocuota)}
        onEdit={onEdit}
        canDelete={false}
        */
      />
    </SingleTableBoxScene>
  );
};

export default PlanPagoCuotasPage;

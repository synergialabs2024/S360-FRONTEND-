import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useTableFilter,
  CuentaContable,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsCuentaContable,
  useTableServerSideFiltering,
} from '@/shared';
import { hasPermission } from '@/shared/utils/auth';
import { useFetchCuentaContables } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import ModalDaughterCC from '../customs/ModalDaughterCC';

export type PlanCuentaPagesProps = {};

const PlanCuentaPages: React.FC<PlanCuentaPagesProps> = () => {
  useCheckPermission(PermissionsEnum.contabilidad_view_cuentacontable);

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
    data: CuentaContablePagingRes,
    isLoading,
    isRefetching,
  } = useFetchCuentaContables({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      nombre: searchTerm,
      ...filterObject,

      filterByState: false,
    },
  });

  ///* columns
  const { plancuentaColumns } = useColumnsCuentaContable();

  return (
    <SingleTableBoxScene title="Plan de Cuentas" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />
      <CustomTable<CuentaContable>
        columns={plancuentaColumns}
        data={CuentaContablePagingRes?.data?.items || []}
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
        rowCount={CuentaContablePagingRes?.data?.meta.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.contabilidad_change_cuentacontable,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.contabilidad_change_cuentacontable,
        )}
        editIconToolTipTitle="Gestionar"
        showCustomButtonsSpaceEnd
        customButtonsSpaceEnd={row => {
          if (
            hasPermission(PermissionsEnum.contabilidad_change_cuentacontable)
          ) {
            return <ModalDaughterCC Arrays={row} />;
          }
          return null;
        }}
      />
    </SingleTableBoxScene>
  );
};

export default PlanCuentaPages;

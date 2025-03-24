import {
  emptyCellOneLevel,
  EstadoTicketTecnicoEnumChoice,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { CambioPlan } from '@/shared/interfaces/app/cartera';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useFetchCambioPlanes } from '@/actions/app/cartera';
import { ROUTER_PATHS } from '@/router/constants';
import { useAuthStore } from '@/store/auth';

export const returnUrlBuzonTareasPage = ROUTER_PATHS.cartera.buzontareasNav;

export type BuzonTareasByStatePageProps = {
  state: EstadoTicketTecnicoEnumChoice;
};

const BuzonTareasByStatePage: React.FC<BuzonTareasByStatePageProps> = () => {
  const user = useAuthStore(s => s.user);
  console.log('user', user);
  useCheckPermission(PermissionsEnum.comercial_view_preventa);
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
    data: CambioPlanesPagingRes,
    isLoading,
    isRefetching,
  } = useFetchCambioPlanes({
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
  const columns = useMemo<MRT_ColumnDef<CambioPlan>[]>(
    () => [
      {
        accessorKey: 'plan_internet_anterior',
        header: 'PLAN INTERNET ANTERIOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'plan_internet_anterior'),
      },
      {
        accessorKey: 'plan_internet_nuevo',
        header: 'PLAN INTERNET NUEVO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'plan_internet_nuevo'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Buzon de Tareas"
      createPageUrl={`${returnUrlBuzonTareasPage}/crear`}
      showCreateBtn={true}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<CambioPlan>
        columns={columns}
        data={CambioPlanesPagingRes?.data?.items || []}
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
        rowCount={CambioPlanesPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // crud
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default BuzonTareasByStatePage;

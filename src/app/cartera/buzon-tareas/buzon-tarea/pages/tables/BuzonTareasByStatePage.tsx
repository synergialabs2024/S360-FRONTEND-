import {
  EstadoTareaEnumChoice,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { CambioPlan } from '@/shared/interfaces/app/cartera';
import { hasPermission } from '@/shared/utils/auth';
import { useFetchBuzonTareas } from '@/actions/app/cartera/buzon-tareas';
import { useColumnsBuzonTareas } from '@/shared/hooks/app/buzon-tareas';

export type BuzonTareasByStatePageProps = {
  state: EstadoTareaEnumChoice;
};

const BuzonTareasByStatePage: React.FC<BuzonTareasByStatePageProps> = ({
  state,
}) => {
  useCheckPermission(PermissionsEnum.cartera_view_buzontareamantenedor);
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
  } = useFetchBuzonTareas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
      estado_tarea: state,
    },
  });

  ///* columns
  const { tareasBaseColumns } = useColumnsBuzonTareas();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
        sxContainer={{
          mb: 5,
        }}
      />

      <CustomTable<CambioPlan>
        columns={
          state === EstadoTareaEnumChoice.EN_BORRADOR
            ? tareasBaseColumns
            : state === EstadoTareaEnumChoice.GESTIONADO
              ? tareasBaseColumns
              : state === EstadoTareaEnumChoice.RECHAZADO
                ? tareasBaseColumns
                : state === EstadoTareaEnumChoice.SEPARADO
                  ? tareasBaseColumns
                  : tareasBaseColumns
        }
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
        canEdit={hasPermission(
          PermissionsEnum.cartera_change_buzontareamantenedor,
        )}
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default BuzonTareasByStatePage;

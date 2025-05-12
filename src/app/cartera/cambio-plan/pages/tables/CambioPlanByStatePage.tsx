import {
  emptyCellNested,
  EstadoTicketTecnicoEnumChoice,
  formatDateWithTimeCell,
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

export const returnUrlCambioPlanPage = ROUTER_PATHS.cartera.cambioplanNav;

export type CambioPlanByStatePageProps = {
  state: EstadoTicketTecnicoEnumChoice;
};

const CambioPlanByStatePage: React.FC<CambioPlanByStatePageProps> = () => {
  useCheckPermission(PermissionsEnum.cartera_view_cambioplan);
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
        accessorKey:
          'linea_servicio_data__solicitud_servicio_data__razon_social',
        header: 'CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'solicitud_servicio_data',
            'razon_social',
          ]),
      },
      {
        accessorKey:
          'linea_servicio_data__solicitud_servicio_data__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'solicitud_servicio_data',
            'identificacion',
          ]),
      },
      {
        accessorKey: 'plan_internet_anterior_data__name',
        header: 'NOMBRE PLAN ANTERIOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['plan_internet_anterior_data', 'name']),
      },
      {
        accessorKey: 'plan_internet_anterior_data__valor',
        header: 'VALOR PLAN ANTERIOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['plan_internet_anterior_data', 'valor']),
      },
      {
        accessorKey: 'plan_internet_nuevo_data__name',
        header: 'NOMBRE PLAN NUEVO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['plan_internet_nuevo_data', 'name']),
      },
      {
        accessorKey: 'plan_internet_nuevo_data__valor',
        header: 'VALOR PLAN NUEVO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['plan_internet_nuevo_data', 'valor']),
      },
      {
        accessorKey: 'created_at',
        header: 'FECHA CREACION',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Cambio de Plan"
      createPageUrl={`${returnUrlCambioPlanPage}/crear`}
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

export default CambioPlanByStatePage;

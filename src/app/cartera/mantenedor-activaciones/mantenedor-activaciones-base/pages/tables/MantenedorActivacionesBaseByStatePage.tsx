import {
  emptyCellOneLevel,
  EstadoTicketTecnicoEnumChoice,
  formatBooleanCell,
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
import { returnUrlMantenedorActivacionesBasePage } from '../forms/MantenedorActivacionesBasePage';
import { useFetchMantenedorActivacionesBase } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion-base.actions';

export type MantenedorActivacionesBaseByStatePageProps = {
  state: EstadoTicketTecnicoEnumChoice;
};

const MantenedorActivacionesBaseByStatePage: React.FC<
  MantenedorActivacionesBaseByStatePageProps
> = () => {
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
  } = useFetchMantenedorActivacionesBase({
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
        accessorKey: 'code',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'code'),
      },
      {
        accessorKey: 'tiempo_bloqueo',
        header: 'Tiempo Bloqueo',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tiempo_bloqueo'),
      },
      {
        accessorKey: 'tiempo_limite',
        header: 'Tiempo Limite',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tiempo_limite'),
      },

      {
        accessorKey: 'incluye_facturacion',
        header: 'Incluye Facturacion',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatBooleanCell(row, 'incluye_facturacion'),
      },
      {
        accessorKey: 'incluye_notificacion',
        header: 'Incluye Notificacion',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatBooleanCell(row, 'incluye_notificacion'),
      },

      /* {
        accessorKey: 'usuarios_autorizados',
        header: 'Usuarios Autorizados',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'usuarios_autorizados'),
      }, */
      /* {
        accessorKey: 'motivo',
        header: 'Motivo',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'motivo'),
      }, */
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Mantenedor Activaciones"
      createPageUrl={`${returnUrlMantenedorActivacionesBasePage}/crear`}
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

export default MantenedorActivacionesBaseByStatePage;

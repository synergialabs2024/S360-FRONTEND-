import {
  emptyCellNested,
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
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { returnUrlMantenedorActivacionesPage } from '../forms/MantenedorActivacionPage';
import { useFetchMantenedorActivaciones } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion.actions';
import { MantenedorActivacion } from '@/shared/interfaces/app/cartera/mantenedor-activaciones/mantenedor-activacion.interface';

export type MantenedorActivacionByStatePageProps = {
  state: EstadoTicketTecnicoEnumChoice;
};

const MantenedorActivacionByStatePage: React.FC<
  MantenedorActivacionByStatePageProps
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
  } = useFetchMantenedorActivaciones({
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
  const columns = useMemo<MRT_ColumnDef<MantenedorActivacion>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'code'),
      },
      {
        accessorKey: 'criterio_data__name',
        header: 'CRITERIO',
        size: 312,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['criterio_data', 'name']),
      },
      {
        accessorKey: 'criterio_data__description',
        header: 'DESCRIPCION CRITERIO',
        size: 312,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['criterio_data', 'description']),
      },
      {
        accessorKey: 'motivo_data__nombre',
        header: 'MOTIVO',
        size: 312,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['motivo_data', 'nombre']),
      },
      {
        accessorKey: 'motivo_data__descripcion',
        header: 'DESCRIPCION MOTIVO',
        size: 312,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['motivo_data', 'descripcion']),
      },
      {
        accessorKey: 'permitido_en_anio',
        header: 'Permitido En Anio',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'permitido_en_anio'),
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
      createPageUrl={`${returnUrlMantenedorActivacionesPage}/crear`}
      showCreateBtn={true}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<MantenedorActivacion>
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

export default MantenedorActivacionByStatePage;

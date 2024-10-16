import { useFetchTrazabilidadVentas } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
  TABLE_CONSTANTS,
  TrazabilidadVenta,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

export const returnUrlTrazabilidadVentasPage =
  ROUTER_PATHS.administracion.trazabilidadesVenta;

export type TrazabilidadVentasPageProps = {};
const TrazabilidadVentasPage: React.FC<TrazabilidadVentasPageProps> = () => {
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
    data: TrazabilidadVentasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTrazabilidadVentas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<TrazabilidadVenta>[]>(
    () => [
      {
        accessorKey: 'modelo',
        header: 'MODELO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'modelo'),
      },
      {
        accessorKey: 'modelo_name',
        header: 'ACCION TOMADA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.modelo_name
            ? row.original.modelo_name
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Accion tomada del modelo ${row?.original?.modelo}`}
            />
          );
        },
      },
      {
        accessorKey: 'modelo_estado',
        header: 'MODELO ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.modelo_estado
            ? row.original.modelo_estado
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Estado del modelo ${row?.original?.modelo}`}
            />
          );
        },
      },
      {
        accessorKey: 'user__razon_social',
        header: 'USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['user_data', 'razon_social']),
      },

      {
        accessorKey: 'timestamp',
        header: 'TIMESTAMP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'timestamp'),
      },
      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene title="Trazabilidad Venta">
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<TrazabilidadVenta>
        columns={columns}
        data={TrazabilidadVentasPagingRes?.data?.items || []}
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
        rowCount={TrazabilidadVentasPagingRes?.data?.meta.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default TrazabilidadVentasPage;

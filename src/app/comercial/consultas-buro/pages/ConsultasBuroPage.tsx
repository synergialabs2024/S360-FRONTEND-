import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useFetchConsultasBuro } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  ConsultaBuro,
  emptyCellNested,
  emptyCellOneLevel,
  formatBooleanCell,
  formatDateWithTimeCell,
  MODEL_BOOLEAN,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';

export type ConsultasBuroPageProps = {};

export const returnUrlConsultasBuroPage =
  ROUTER_PATHS.supervisionComercial.consultasBuroNav;

const ConsultasBuroPage: React.FC<ConsultasBuroPageProps> = () => {
  ///*  hooks
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
    data: consultasBuroPagingRes,
    isLoading,
    isRefetching,
  } = useFetchConsultasBuro({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<ConsultaBuro>[]>(
    () => [
      {
        accessorKey: 'solicitud_servicio_data.name',
        header: 'SOLICITUD SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'solicitud_servicio_data',
            'numero_referencia',
          ]),
      },
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'identificacion'),
      },
      {
        accessorKey: 'tipo_identificacion',
        header: 'TIPO DE IDENTIFICACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_identificacion'),
      },
      {
        accessorKey: 'consulta_externa',
        header: 'CONSULTA EXTERNA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => formatBooleanCell(row, 'consulta_externa'),
      },
      {
        accessorKey: 'excedida',
        header: 'EXCEDIDA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => formatBooleanCell(row, 'excedida'),
      },
      {
        accessorKey: 'vendedor_data.name',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['vendedor_data', 'razon_social']),
      },
      {
        accessorKey: 'canal_venta_data.name',
        header: 'CANAL DE VENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['canal_venta_data', 'name']),
      },
      {
        accessorKey: 'departamento_data.name',
        header: 'DEPARTAMENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['departamento_data', 'name']),
      },
      {
        accessorKey: 'area_data.name',
        header: 'ÁREA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['area_data', 'name']),
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
    <SingleTableBoxScene
      title="Consultas EQUIFAX"
      createPageUrl={`${returnUrlConsultasBuroPage}/crear`}
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />

      <CustomTable<ConsultaBuro>
        columns={columns}
        data={consultasBuroPagingRes?.data?.items || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        enableManualFiltering={true}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        enableGlobalFilter={false}
        pagination={pagination}
        onPaging={setPagination}
        rowCount={consultasBuroPagingRes?.data?.meta?.count}
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
        canEdit={false}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default ConsultasBuroPage;

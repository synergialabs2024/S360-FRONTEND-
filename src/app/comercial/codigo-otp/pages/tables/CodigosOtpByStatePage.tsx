import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useFetchCodigoOtps } from '@/actions/app';
import {
  CodigoOtp,
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
  OtpStatesEnumChoice,
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

export type CodigosOtpByStatePageProps = {
  state: OtpStatesEnumChoice;
};

const CodigosOtpByStatePage: React.FC<CodigosOtpByStatePageProps> = ({
  state,
}) => {
  useCheckPermission(PermissionsEnum.administration_view_codigootp);

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
    data: codigosOtpPagingRes,
    isLoading,
    isRefetching,
  } = useFetchCodigoOtps({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      estado_otp: state,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<CodigoOtp>[]>(
    () => [
      {
        accessorKey: 'numero_referencia_solserv',
        header: '# REFERENCIA SOLICITUD SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'solicitud_servicio_data',
            'numero_referencia',
          ]),
      },
      {
        accessorKey: 'celular',
        header: 'CELULAR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'celular'),
      },
      {
        accessorKey: 'nombre_prospecto',
        header: 'NOMBRE SOLICITANTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'razon_social']),
      },

      {
        accessorKey: 'codigo_otp',
        header: 'CODIGO OTP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo_otp'),
      },
      {
        accessorKey: 'estado_otp',
        header: 'ESTADO OTP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_otp'),
      },

      {
        accessorKey: 'available_until',
        header: 'AVAILABLE UNTIL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'available_until'),
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
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
        sxContainer={{
          mb: 5,
        }}
      />

      <CustomTable<CodigoOtp>
        columns={columns}
        data={codigosOtpPagingRes?.data?.items || []}
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
        rowCount={codigosOtpPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
        // crud
        canEdit={false}
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default CodigosOtpByStatePage;

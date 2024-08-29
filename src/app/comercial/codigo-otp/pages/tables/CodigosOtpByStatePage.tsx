/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { useFetchCodigoOtps } from '@/actions/app';
import {
  CodigoOtp,
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
  OtpStatesEnumChoice,
  PermissionsEnum,
  SalesStatesActionsEnumChoice,
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

type MRTSCodigoOTPType = { row: MRT_Row<CodigoOtp> };

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
        header: '# REFERENCIA',
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

      // Trazabilidad: the last one that has OTP_CREADO in model_state (SalesStatesActionsEnumChoice)
      {
        accessorKey: 'usuario_solicita',
        header: 'COLABORADOR SOLICITA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const trazabilidadData = row.original?.trazabilidad_data || [];
          let lastOtpCreated = null;

          for (let i = trazabilidadData.length - 1; i >= 0; i--) {
            if (
              trazabilidadData[i].modelo_estado ===
              SalesStatesActionsEnumChoice.OTP_CREADO
            ) {
              lastOtpCreated = trazabilidadData[i];
              break;
            }
          }

          return lastOtpCreated?.user_data?.razon_social || '';
        },
      },

      {
        accessorKey: 'estado_otp',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_otp'),
      },

      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      // approved or rejected
      ...(state === OtpStatesEnumChoice.VERIFICADO
        ? [
            {
              accessorKey: 'aprobado_at',
              header: 'APROBADO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: false,
              enableSorting: false,
              Cell: ({ row }: MRTSCodigoOTPType) =>
                formatDateWithTimeCell(row, 'modified_at'),
            },
          ]
        : []),
      ...(state === OtpStatesEnumChoice.EXPIRADO
        ? [
            {
              accessorKey: 'expired_at',
              header: 'EXPIRADO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: false,
              enableSorting: false,
              Cell: ({ row }: MRTSCodigoOTPType) =>
                formatDateWithTimeCell(row, 'modified_at'),
            },
          ]
        : []),
    ],
    [state],
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

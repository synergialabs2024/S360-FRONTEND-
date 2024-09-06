/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useCallback, useMemo } from 'react';

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
  ChipModelState,
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useTheme } from '@mui/material';

export type CodigosOtpByStatePageProps = {
  state: OtpStatesEnumChoice;
};

type MRTSCodigoOTPType = { row: MRT_Row<CodigoOtp> };

const CodigosOtpByStatePage: React.FC<CodigosOtpByStatePageProps> = ({
  state,
}) => {
  useCheckPermission(PermissionsEnum.administration_view_codigootp);

  const theme = useTheme();

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

  ///* handlers
  const calculateColorState = useCallback(
    (estadoOtp: OtpStatesEnumChoice) => {
      switch (estadoOtp) {
        case OtpStatesEnumChoice.PENDIENTE:
          return theme.palette.warning.dark;
        case OtpStatesEnumChoice.VERIFICADO:
          return theme.palette.success.dark;
        case OtpStatesEnumChoice.EXPIRADO:
          return theme.palette.error.dark;
        default:
          return 'blue';
      }
    },
    [
      theme.palette.error.dark,
      theme.palette.success.dark,
      theme.palette.warning.dark,
    ],
  );

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

      {
        accessorKey: 'estado_otp',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const estadoOtp = row.original?.estado_otp;

          return (
            <ChipModelState
              label={estadoOtp}
              customColor={calculateColorState(estadoOtp)}
            />
          );
        },
      },

      // Trazabilidad: the last one that has OTP_CREADO in model_state (SalesStatesActionsEnumChoice)
      {
        accessorKey: 'usuario_solicita',
        header: 'COLABORADOR SOLICITA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
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
              accessorKey: 'user_vaerifica_otp',
              header: 'COLABORADOR VERIFICA OTP',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: false,
              enableSorting: false,
              Cell: ({ row }: MRTSCodigoOTPType) => {
                let firstOtpVerified = null;
                const trazabilidadData = row.original?.trazabilidad_data || [];

                for (let i = 0; i < trazabilidadData.length; i++) {
                  if (
                    trazabilidadData[i].modelo_estado ===
                    SalesStatesActionsEnumChoice.OTP_VERIFICADO
                  ) {
                    firstOtpVerified = trazabilidadData[i];
                    break;
                  }
                }

                return firstOtpVerified?.user_data?.razon_social || '';
              },
            },
            {
              accessorKey: 'aprobado_at',
              header: 'VERIFICADO',
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
    [calculateColorState, state],
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

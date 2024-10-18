/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useCallback, useMemo } from 'react';
import { MdCheckCircle } from 'react-icons/md';

import { useFetchCodigoOtps, useValidateOtpCode } from '@/actions/app';
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
  ChipModelState,
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useUiConfirmModalStore } from '@/store/ui';
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

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

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
        case OtpStatesEnumChoice.ESPERA_APROBACION:
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

  ///* mutations
  const validateOtp = useValidateOtpCode({
    enableNavigate: false,
    customMessageToast: 'Código OTP validado correctamente',
  });

  ///* handlers
  const calcCanEdit = () => {
    return state === OtpStatesEnumChoice.ESPERA_APROBACION;
  };
  const onApproveOtp = (otp: CodigoOtp) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Verificación manual de OTP',
      subtitle: '¿Está seguro que desea verificar manualmente este código OTP?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        validateOtp.mutate({
          identificacion: otp.solicitud_servicio_data?.at(-1)?.identificacion!,
          codigo_otp: otp.codigo_otp,
        });
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<CodigoOtp>[]>(
    () => [
      {
        accessorKey: 'solicitudes_servicio__numero_referencia',
        header: '# REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const solService = row.original?.solicitud_servicio_data?.at(-1);
          return solService?.numero_referencia || 'N/A';
        },
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
        accessorKey: 'solicitudes_servicio__razon_social',
        header: 'NOMBRE SOLICITANTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const solService = row.original?.solicitud_servicio_data?.at(-1);
          return solService?.razon_social || 'N/A';
        },
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
        accessorKey: 'vendedor__razon_social',
        header: 'COLABORADOR SOLICITA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['vendedor_data', 'razon_social']),
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
              accessorKey: 'gestionado_by__razon_social',
              header: 'COLABORADOR VERIFICA OTP',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              Cell: ({ row }: MRTSCodigoOTPType) =>
                emptyCellNested(row, ['gestionado_by_data', 'razon_social']),
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
        enableActionsColumn={calcCanEdit()}
        // crud
        canEdit={calcCanEdit()}
        onEdit={onApproveOtp}
        editIcon={<MdCheckCircle />}
        editIconColor="warning"
        editIconToolTipTitle="Verificar OTP"
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default CodigosOtpByStatePage;

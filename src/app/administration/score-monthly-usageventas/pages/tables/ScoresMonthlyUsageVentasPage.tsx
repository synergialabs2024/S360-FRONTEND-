import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchScoreMonthlyUsageVentass } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, ScoreMonthlyUsageVentas } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlScoresMonthlyUsageVentasPage =
  ROUTER_PATHS.administracion.scoreMonthlyUsageVentasNav;

export type ScoresMonthlyUsageVentasPageProps = {};

const ScoresMonthlyUsageVentasPage: React.FC<
  ScoresMonthlyUsageVentasPageProps
> = () => {
  useCheckPermission(PermissionsEnum.comercial_view_scoremonthlyusageventas);

  const navigate = useNavigate();

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
    data: ScoresMonthlyUsageVentasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchScoreMonthlyUsageVentass({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      score_letter: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (scoremonthlyusageventas: ScoreMonthlyUsageVentas) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar ScoreMonthlyUsageVentas',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlScoresMonthlyUsageVentasPage}/editar/${scoremonthlyusageventas.uuid}`,
        );
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<ScoreMonthlyUsageVentas>[]>(
    () => [
      {
        accessorKey: 'score_letter',
        header: 'SCORE LETRA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'score_letter'),
      },

      {
        accessorKey: 'year',
        header: 'AÑOS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'year'),
      },

      {
        accessorKey: 'month',
        header: 'MES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'month'),
      },

      {
        accessorKey: 'usage_count',
        header: 'CANTIDAD USO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'usage_count'),
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
      title="Uso de Ventas Mensual por Score"
      createPageUrl={`${returnUrlScoresMonthlyUsageVentasPage}/crear`}
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por letra de score"
      />

      <CustomTable<ScoreMonthlyUsageVentas>
        columns={columns}
        data={ScoresMonthlyUsageVentasPagingRes?.data?.items || []}
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
        rowCount={ScoresMonthlyUsageVentasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
        // crud
        canEdit={false}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default ScoresMonthlyUsageVentasPage;
